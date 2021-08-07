import { take, isNumber, cloneDeep } from 'lodash'
import { RouteLocationNormalized } from 'vue-router'
import { ref } from 'vue'
import { getRouteRelationDeepth } from './routeRalation'


function routeIndexInQueue(route: RouteLocationNormalized) {
  return routeQueue.value.findIndex(item => item.name === route.name && item.path === route.path)
}

function isRouteInQueue(routeOrIndex: RouteLocationNormalized | number) {
  return (isNumber(routeOrIndex) ? routeOrIndex : routeIndexInQueue(routeOrIndex as RouteLocationNormalized)) !== -1
}


function pushToRouteQueue(route: RouteLocationNormalized) {
  if (!isRouteInQueue(route) && route && route.name) {
    routeQueue.value.push(route)
  }
}

export function onRouteChangeDetectKeepAlive(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  let toIndex = routeIndexInQueue(to)
  let fromIndex = routeIndexInQueue(from)
  if (!isRouteInQueue(toIndex)) {
    pushToRouteQueue(to)
    console.log("【1】", cloneDeep(routeQueue.value));
  }
  /* if (!isRouteInQueue(toIndex)) {
    pushToRouteQueue(from)
    console.log("【1】", cloneDeep(routeQueue.value));
  } */

  if (isRouteInQueue(toIndex)) {
    routeQueue.value = take(routeQueue.value, toIndex + 1)
    console.log("【2】", cloneDeep(routeQueue.value));
  }

  let toDeepth = getRouteRelationDeepth(to.name as string)
  let fromDeepth = getRouteRelationDeepth(from.name as string)
  let toIndexNew = routeIndexInQueue(to)
  let fromIndexNew = routeIndexInQueue(from)
  console.log("【3-1】", toDeepth, fromDeepth, toIndexNew, fromIndexNew);
  if (toDeepth < fromDeepth && fromIndexNew !== -1 && toIndexNew > fromIndexNew) {
    let deepthArr = take(routeQueue.value.map(i => getRouteRelationDeepth(i.name)), toIndexNew)
    console.log('【3-deepthArr】', deepthArr);
    let replaceIndex = deepthArr.findIndex(i => i <= toDeepth)
    if (replaceIndex === -1) replaceIndex = 0
    console.log('【3-replaceIndex', replaceIndex);
    routeQueue.value[replaceIndex] = to
    console.log("【3-2】", cloneDeep(routeQueue.value));
    routeQueue.value = take(routeQueue.value, replaceIndex + 1)
    console.log("【3-3】", cloneDeep(routeQueue.value));
  }
}

export let routeQueue = ref<any[]>([])
