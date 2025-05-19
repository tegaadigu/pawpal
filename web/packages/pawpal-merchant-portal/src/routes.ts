import { createBrowserRouter, type RouteObject } from "react-router";
import { TagIcon, HomeIcon, User2Icon, type LucideProps } from "lucide-react"

import { Root } from "./pages/root";
import { ErrorBoundary } from "./components/error-boundary";
import { Home } from "./pages/home";
import React from "react";
import { ProductHome, ProductInventory } from "@/pages/products";
import { LoginPage } from "./pages/auth/login";

interface Route {
  path: string,
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
  Component?: unknown | React.JSX.Element,
  index?: boolean
  children?: Array<RouteObject | Route>
  title?: string,
  ErrorBoundary?: unknown
}

const items: Array<RouteObject | Route> = [
  {
    index: true,
    title: "Home",
    Component: Home,
    icon: HomeIcon,
    ErrorBoundary
  },
  {
    path: "/home",
    title: "Home",
    Component: Home,
    icon: HomeIcon,
    ErrorBoundary
  }
  ,{
    path: "/products",
    title: "Products",
    icon: TagIcon,
    ErrorBoundary,
    children: [
      {
        index: true,
        path: "",
        title: "Home",
        Component: ProductHome,
        ErrorBoundary,
      },
      {
        path: "inventory",
        title: "Inventory",
        Component: ProductInventory,
        ErrorBoundary,
      }
    ]
  },{
    path: "/customers",
    title: "Customers",
    icon: User2Icon,
    ErrorBoundary,
    children: [
      {
        path: "segments",
        title: "Segments",
        Component: ProductInventory,
        ErrorBoundary,
      }
    ]
  }
]

interface SideBarRoute {
  title?: string,
  url?: string,
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
  children?: Array<SideBarRoute>,
}

const getRoutesForSideBarFormat = (items: Array<RouteObject | Route>): Array<SideBarRoute> => {
  return items.map(route => {
    const { title, path, icon, children } = route as Route
    return {
      title,
      url: path,
      icon,
      children: children?.length ? getRoutesForSideBarFormat(children) : []
    }
  })
}

/**
 * In the case of duplicate routes return only the route with url for sidebar.
 * @param items 
 * @returns 
 */
const getUniqueRouteWithPath = (items: Array<SideBarRoute>): Array<SideBarRoute> => {
  return Array.from(
    new Map(items.sort((a, b) => {
      const aHasPath = 'url' in a && !!a.url;
      const bHasPath = 'url' in b && !!b.url;
      return Number(aHasPath) - Number(bHasPath);
    }).map(item => [item.title, item])).values()
  );
}

export const useRoutes = () => {
  const routes = React.useMemo(() => {
    const lists = getRoutesForSideBarFormat(items)
    const uniqueRoutes = getUniqueRouteWithPath(lists)
    return uniqueRoutes;
  }, [])
  return {
    routes
  }
}

const children = items.map((item) => {
  return {
    path: item.path,
    Component: item.Component,
    index: item.index,
    children: item?.children?.map((child) => ({
      ...(!child.index && { path: child.path}),
      Component: child.Component,
      ...(child.index && { index: child.index})
    }))
  }
}) as Array<RouteObject>
export default createBrowserRouter([{
  path: "/",
  Component: Root,
  children
}, {
  path: "auth",
  ErrorBoundary,
  children: [
    {
      path: "login",
      Component: LoginPage
    }
  ]
}])