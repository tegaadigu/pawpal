import { Navigate, Outlet } from "react-router"
import { AppSidebar } from "../components/side-bar"
import { SidebarInset } from "../components/ui/sidebar"
import { SiteHeader } from "../components/navigation/navigation-header";
import { useAuth } from "@/hooks/use-auth";

export const Root = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />
  }
  return (
    <>
      <AppSidebar variant="inset" /><SidebarInset>
        <SiteHeader />
        <div className="p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </>
  )
}