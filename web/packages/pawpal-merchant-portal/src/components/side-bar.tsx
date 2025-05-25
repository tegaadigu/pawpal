import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useRoutes } from "@/routes"
import { Collapsible } from "@/components/ui/collapsible";
import { Link, useLocation } from "react-router";
import React from "react";
import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Separator } from "./ui/separator";
import { NavUser } from "./navigation/navigation-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  store: {
    name: "Hounds on Raw"
  }
}
export function AppSidebar({ ...props }) {
  const { routes: items } = useRoutes()
  const { pathname } = useLocation()
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">{data.store.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent  className="flex flex-col gap-2">
            <SidebarMenu>
              {items.map((item) => {
                const hasChildren = !!item?.children?.length
                const props = hasChildren ? { defaultOpen: false, className: 'group/collapsible w-full' } : {}
                const Wrapper = hasChildren ? Collapsible : React.Fragment
                const itemPath = `${item.url}` as string
                const isItemPath = pathname === itemPath && !hasChildren
                return (
                  <Wrapper {...props}>
                    <SidebarMenuItem key={item.title} className="flex flex-col">
                      {
                        hasChildren ? (
                          <>
                            <CollapsibleTrigger className="w-full flex gap-6">
                              <SidebarMenuButton asChild className="w-full">
                                <div className="w-full">
                                  {
                                    item.icon && <item.icon />
                                  }
                                  <span>{item.title}</span>
                                </div>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub className="flex ml-2 gap-2">
                                {
                                  item?.children?.map(child => {
                                    const path = `${item.url}/${child.url}` as string
                                    const isCurrentLocation = pathname === path
                                    return (
                                    <SidebarMenuSubItem key={child.title} className={`flex ml-2`} >
                                      <Link to={path} className={` ${isCurrentLocation ? 'underline decoration-indigo-500' : ''}`}>
                                        <span>{child.title}</span>
                                      </Link>
                                    </SidebarMenuSubItem>

                                  )})
                                }
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </>
                        ) : (
                          <SidebarMenuButton asChild>
                            <Link to={item.url as string} className={` ${isItemPath ? 'underline decoration-indigo-500' : ''}`}>
                              {
                                item.icon && <item.icon />
                              }
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        )
                      }
                    </SidebarMenuItem>
                  </Wrapper>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
