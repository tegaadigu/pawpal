import { Navigate, Outlet } from "react-router"
import { AppSidebar } from "./side-bar"
import { SidebarInset, SidebarProvider } from "./ui/sidebar"
import { SiteHeader } from "./navigation/navigation-header";
// import NavigationHeader from '@/components/navigation-header'

export const Root = () => {
  const isLoggedIn = false;
  if (!isLoggedIn && false) {
    return <Navigate to="/auth/login" replace />
  }
  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}