'use client';

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckoutProvider } from "./store/[storeSlug]/hooks/use-checkout";

interface ProvidersI {
  children: React.ReactNode
}
export const Providers = ({ children }: ProvidersI) => {
  const [queryClient] = React.useState(() => new QueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutProvider>
        {children}
      </CheckoutProvider>
    </QueryClientProvider>
  )
}