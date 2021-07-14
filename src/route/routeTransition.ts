import { RouteLocationNormalized } from 'vue-router'
import { getRouteRelationDeepth } from './routeRalation'

export function onRouteChangeDetectTransition(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  let toDeepth = getRouteRelationDeepth(to.name as string)
  let fromDeepth = getRouteRelationDeepth(from.name as string)

  if (toDeepth === fromDeepth && fromDeepth !== 99) {
    to.meta.transition = 'fade'
  } else {
    if (toDeepth >= fromDeepth) {
      to.meta.transition = 'slide-left'
    } else {
      to.meta.transition = 'slide-right'
    }
  }
}
