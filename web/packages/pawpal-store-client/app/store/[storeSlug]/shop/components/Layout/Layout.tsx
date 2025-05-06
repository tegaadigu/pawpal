'use client';
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <Header/>
      <div className="flex mt-4">
          <Sidebar />
          <div className="pl-8 pt-8">
              { children }
          </div>
      </div>
    </>
  )
}

export default Layout;