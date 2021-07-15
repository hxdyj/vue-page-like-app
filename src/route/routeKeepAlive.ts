import { take, isNumber, cloneDeep } from 'lodash'
import { RouteLocationNormalized } from 'vue-router'
import { getRouteRelationDeepth } from './routeRalation'

let routeQueue: RouteLocationNormalized[] = []
let firstKeepAlivedRoutes: RouteLocationNormalized[] = []

function routeIndexInQueue(route: RouteLocationNormalized) {
  return routeQueue.findIndex(item => item.name === route.name && item.path === route.path)
}

function isRouteInQueue(routeOrIndex: RouteLocationNormalized | number) {
  return (isNumber(routeOrIndex) ? routeOrIndex : routeIndexInQueue(routeOrIndex as RouteLocationNormalized)) !== -1
}

function isRouteFirstKeepAlived(route: RouteLocationNormalized) {
  return firstKeepAlivedRoutes.findIndex(item => item.name === route.name && item.path === route.path) !== -1
}

function addFirstKeepAliveRoute(route: RouteLocationNormalized) {
  if (!isRouteFirstKeepAlived(route)) {
    firstKeepAlivedRoutes.push(route)
    // console.log("【firstKeepAlivedRoutes】", cloneDeep(firstKeepAlivedRoutes))
  }
}


function pushToRouteQueue(route: RouteLocationNormalized) {
  // console.log("【call pushToRouteQueue】", cloneDeep(routeQueue), cloneDeep(route), !isRouteInQueue(route));
  if (!isRouteInQueue(route) && route) {
    // console.log("【push before】", cloneDeep(routeQueue));
    routeQueue.push(route)
    // console.log("【push finished】", cloneDeep(routeQueue));
  }
}

export function onRouteChangeDetectKeepAlive(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  let toIndex = routeIndexInQueue(to)
  let fromIndex = routeIndexInQueue(from)
  // console.log("【0】", toIndex, fromIndex);
  if (!isRouteInQueue(fromIndex)) {
    from.meta.keepAlive = true
    pushToRouteQueue(from)
    // console.log("【1】", cloneDeep(routeQueue));

  }
  if (!isRouteInQueue(toIndex) && !isRouteFirstKeepAlived(to)) {
    to.meta.keepAlive = true
    addFirstKeepAliveRoute(to)
    pushToRouteQueue(to)
    // console.log("【2】", cloneDeep(routeQueue));
  }

  if (isRouteInQueue(toIndex) && isRouteInQueue(fromIndex)) {
    from.meta.keepAlive = false
    // console.log("【3】", cloneDeep(routeQueue));
  }

  if (isRouteInQueue(toIndex)) {
    to.meta.keepAlive = routeQueue[toIndex].meta.keepAlive
    // console.log("【4-1】", cloneDeep(routeQueue));
    routeQueue = take(routeQueue, toIndex + 1)
    // console.log("【4-2】", cloneDeep(routeQueue));

  }

  let toDeepth = getRouteRelationDeepth(to.name as string)
  let fromDeepth = getRouteRelationDeepth(from.name as string)
  let toIndexNew = routeIndexInQueue(to)
  let fromIndexNew = routeIndexInQueue(from)
  // console.log("【5】", cloneDeep(routeQueue), toDeepth, fromDeepth, toIndexNew, fromIndexNew);
  if (toDeepth < fromDeepth && fromIndexNew !== -1 && toIndexNew > fromIndexNew) {
    // console.log("【6】", cloneDeep(routeQueue));
    routeQueue[fromIndexNew] = to
    routeQueue = take(routeQueue, fromIndexNew + 1)
    // console.log("【7】", cloneDeep(routeQueue));
  }
}
