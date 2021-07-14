import { take, isNumber } from 'lodash'
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
  }
}

export function onRouteChangeDetectKeepAlive(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  let toIndex = routeIndexInQueue(to)
  let fromIndex = routeIndexInQueue(from)

  if (!isRouteInQueue(fromIndex)) {
    from.meta.keepAlive = true
    routeQueue.push(from)
  }
  if (!isRouteInQueue(toIndex) && !isRouteFirstKeepAlived(to)) {
    to.meta.keepAlive = true
    addFirstKeepAliveRoute(to)
    routeQueue.push(to)
  }

  if (isRouteInQueue(toIndex) && isRouteInQueue(fromIndex)) {
    from.meta.keepAlive = false
  }

  if (isRouteInQueue(toIndex)) {
    to.meta.keepAlive = routeQueue[toIndex].meta.keepAlive
    routeQueue = take(routeQueue, toIndex + 1)
  }

  let toDeepth = getRouteRelationDeepth(to.name as string)
  let fromDeepth = getRouteRelationDeepth(from.name as string)
  if (toDeepth < fromDeepth) {
    routeQueue[fromIndex] = to
    routeQueue = take(routeQueue, fromIndex + 1)
  }
}
