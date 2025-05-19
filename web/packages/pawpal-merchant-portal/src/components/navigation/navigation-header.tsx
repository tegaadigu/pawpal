import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { useLocation } from "react-router"

const buildCrumbs = (pathname: string) => {
  const crumbs =  pathname.substring(1, pathname.length).split('/');
  const result: Array<{ title: string, url: string}> = [];
  let current = "";
  
  for (const part of crumbs) {
    if(!part)
      continue 
    current = current ? `${current}/${part}` : part;
    result.push({
      title: part,
      url: current
    });
  }

  return result;
}
export function SiteHeader() {
  const { pathname } = useLocation()
  const crumbs = buildCrumbs(pathname)
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs?.map(path => (
              <>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${path.url}`}>
                  { path.title }
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
          </Button>
        </div>
      </div>
    </header>
  )
}
