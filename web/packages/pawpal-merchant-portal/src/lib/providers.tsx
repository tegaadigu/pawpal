
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "../components/ui/sidebar"

interface ProvidersI {
  children: React.ReactNode
}
export const Providers = ({ children }: ProvidersI) => {
  const [queryClient] = React.useState(() => new QueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider style={
      {
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }>
      {children}
      </SidebarProvider>
    </QueryClientProvider>
  )
}