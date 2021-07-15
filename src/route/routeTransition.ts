import { RouteLocationNormalized } from 'vue-router'
import { TransitionOption } from '..'
import { getRouteRelationDeepth } from './routeRalation'

export function onRouteChangeDetectTransition(to: RouteLocationNormalized, from: RouteLocationNormalized, transitionOption?: TransitionOption) {
  let toDeepth = getRouteRelationDeepth(to.name as string)
  let fromDeepth = getRouteRelationDeepth(from.name as string)
  // console.log('【0】', toDeepth, fromDeepth);
  if (toDeepth === fromDeepth && fromDeepth !== 99) {
    // console.log('【1】', toDeepth, fromDeepth);
    to.meta.transition = 'fade'
    transitionOption?.onSameLevel(to, from)
  } else {
    if (toDeepth >= fromDeepth) {
      to.meta.transition = 'slide-left'
      transitionOption?.onDeep(to, from)
      // console.log('【2】', toDeepth, fromDeepth);
    } else {
      to.meta.transition = 'slide-right'
      transitionOption?.onShallow(to, from)
      // console.log('【3】', toDeepth, fromDeepth);
    }
  }
}
