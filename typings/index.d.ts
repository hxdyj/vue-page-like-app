import { Router, RouteLocationNormalized } from 'vue-router';
import { Plugin } from 'vue';

declare function setRalations(router: Router): void;

declare const Scroll: Plugin;

interface MetaType {
    deepth: number;
}
declare function setKeepAliveAndTransition(to: RouteLocationNormalized, from: RouteLocationNormalized): void;

export { MetaType, Scroll, setKeepAliveAndTransition, setRalations };
