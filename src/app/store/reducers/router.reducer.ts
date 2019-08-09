import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';

import * as fromRouterStore from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export const reducer = fromRouterStore.routerReducer;

// https://ngrx.io/guide/router-store/configuration#custom-router-state-serializer
export class CustomSerializer implements fromRouterStore.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let route: ActivatedRouteSnapshot = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { params } = route;

    return { url, queryParams, params };
  }
}
