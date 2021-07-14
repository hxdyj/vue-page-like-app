import './assets/style/transition.scss'

import { onRouteChangeDetectKeepAlive } from "./route/routeKeepAlive";
import { RouteLocationNormalized } from 'vue-router'
import { onRouteChangeDetectTransition } from './route/routeTransition';
export { setRalations } from './route/routeRalation';
export { Scroll } from "./components/install";
export type MetaType = {
    deepth: number
}
export function setKeepAliveAndTransition(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    onRouteChangeDetectKeepAlive(to, from)
    onRouteChangeDetectTransition(to, from)
}
