import './assets/style/transition.scss'

import { onRouteChangeDetectKeepAlive } from "./route/routeKeepAlive";
import { RouteLocationNormalized } from 'vue-router'
import { onRouteChangeDetectTransition } from './route/routeTransition';
export { setRalations } from './route/routeRalation';
export { Scroll } from "./components/install";
type DefaultTransitionName = 'fade' | 'slide-right' | 'slide-left'
export interface MetaType<T> {
    deepth: number,
    transition?: DefaultTransitionName | T
}
export type TransitionOption = {
    onSameLevel?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void
    onDeep?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void
    onShallow?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void
}
export function setKeepAliveAndTransition(to: RouteLocationNormalized, from: RouteLocationNormalized, transitionOption?: TransitionOption) {
    onRouteChangeDetectKeepAlive(to, from)
    onRouteChangeDetectTransition(to, from, transitionOption)
}
