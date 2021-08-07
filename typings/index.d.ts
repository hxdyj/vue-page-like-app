import * as vue from 'vue';
import { Plugin } from 'vue';
import { Router, RouteLocationNormalized } from 'vue-router';

declare let routeQueue: vue.Ref<any[]>;

declare function setRalations(router: Router): void;

declare const Scroll: Plugin;

declare type DefaultTransitionName = 'fade' | 'slide-right' | 'slide-left';
interface MetaType<T> {
    deepth: number;
    transition?: DefaultTransitionName | T;
}
declare type TransitionOption = {
    onSameLevel?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void;
    onDeep?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void;
    onShallow?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void;
};
declare function setKeepAliveAndTransition(to: RouteLocationNormalized, from: RouteLocationNormalized, transitionOption?: TransitionOption): void;

export { MetaType, Scroll, TransitionOption, routeQueue, setKeepAliveAndTransition, setRalations };
