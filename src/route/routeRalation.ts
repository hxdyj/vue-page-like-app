import { Router } from "vue-router"

let routeRelations: {
  deepth: number
  routeName: string
}[] = []

export function setRalations(router: Router) {
  if (routeRelations.length != 0) return
  let routes = router.getRoutes()
  routeRelations = routes.map(route => {
    return {
      deepth: route.meta.deepth as number,
      routeName: route.name as string,
    }
  })
}

export function getRouteRelationDeepth(routeName: string) {
  let obj = routeRelations.find(i => i.routeName === routeName)
  return obj === undefined ? 99 : obj.deepth
}
