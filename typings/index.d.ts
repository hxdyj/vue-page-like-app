import { Router, RouteLocationNormalized } from 'vue-router';
import { Plugin } from 'vue';

declare function setRalations(router: Router): void;

declare const Scroll: Plugin;

interface MetaType {
    deepth: number;
    transition?: string;
}
declare type TransitionOption = {
    onSameLevel: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void;
    onDeep: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void;
    onShallow: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void;
};
declare function setKeepAliveAndTransition(to: RouteLocationNormalized, from: RouteLocationNormalized, transitionOption?: TransitionOption): void;

export { MetaType, Scroll, TransitionOption, setKeepAliveAndTransition, setRalations };
