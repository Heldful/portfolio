import { Languages } from "./i18n.config";

enum Routes {
  Home = "/",
  Projects = "/projects",
  Contact = "/contact",
}

type RouteMap = {
  [K in keyof typeof Routes]: string;
};

export const getRoutesForLocale = (locale: Languages): RouteMap => {
  let routeMap: any = {};

  for (const key of Object.keys(Routes)) {
    if (key in Routes) {
      const routeKey = key as keyof typeof Routes;
      routeMap[routeKey] =
        routeKey === "Home" ? `/${locale}` : `/${locale}${Routes[routeKey]}`;
    }
  }

  return routeMap as RouteMap;
};
