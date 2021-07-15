import{isNumber,take}from"lodash";import{defineComponent,ref,onActivated,h}from"vue";import{onBeforeRouteLeave}from"vue-router";let routeRelations=[];function setRalations(t){if(0==routeRelations.length){let e=t.getRoutes();routeRelations=e.map(e=>({deepth:e.meta.deepth,routeName:e.name}))}}function getRouteRelationDeepth(t){var e=routeRelations.find(e=>e.routeName===t);return void 0===e?99:e.deepth}let routeQueue=[],firstKeepAlivedRoutes=[];function routeIndexInQueue(t){return routeQueue.findIndex(e=>e.name===t.name&&e.path===t.path)}function isRouteInQueue(e){return-1!==(isNumber(e)?e:routeIndexInQueue(e))}function isRouteFirstKeepAlived(t){return-1!==firstKeepAlivedRoutes.findIndex(e=>e.name===t.name&&e.path===t.path)}function addFirstKeepAliveRoute(e){isRouteFirstKeepAlived(e)||firstKeepAlivedRoutes.push(e)}function pushToRouteQueue(e){!isRouteInQueue(e)&&e&&routeQueue.push(e)}function onRouteChangeDetectKeepAlive(e,t){var u=routeIndexInQueue(e),o=routeIndexInQueue(t);isRouteInQueue(o)||(t.meta.keepAlive=!0,pushToRouteQueue(t)),isRouteInQueue(u)||isRouteFirstKeepAlived(e)||(e.meta.keepAlive=!0,addFirstKeepAliveRoute(e),pushToRouteQueue(e)),isRouteInQueue(u)&&isRouteInQueue(o)&&(t.meta.keepAlive=!1),isRouteInQueue(u)&&(e.meta.keepAlive=routeQueue[u].meta.keepAlive,routeQueue=take(routeQueue,u+1));var n=getRouteRelationDeepth(e.name),o=getRouteRelationDeepth(t.name),u=routeIndexInQueue(e),t=routeIndexInQueue(t);n<o&&-1!==t&&t<u&&(routeQueue[t]=e,routeQueue=take(routeQueue,t+1))}function onRouteChangeDetectTransition(e,t,u){var o=getRouteRelationDeepth(e.name),n=getRouteRelationDeepth(t.name);o===n&&99!==n?(e.meta.transition="fade",u?.onSameLevel(e,t)):n<=o?(e.meta.transition="slide-left",u?.onDeep(e,t)):(e.meta.transition="slide-right",u?.onShallow(e,t))}var scrollComponent=defineComponent({name:"scroll",setup(e,t){let u=ref(),o=ref(0);return onActivated(()=>{u.value&&(u.value.scrollTop=o.value)}),onBeforeRouteLeave(()=>{u.value&&(o.value=u.value.scrollTop)}),()=>h("div",{ref:u},t.slots.default())}});const Scroll={install(e,t){e.component(t?.name||scrollComponent.name,scrollComponent)}};function setKeepAliveAndTransition(e,t,u){onRouteChangeDetectKeepAlive(e,t),onRouteChangeDetectTransition(e,t,u)}export{Scroll,setKeepAliveAndTransition,setRalations};
