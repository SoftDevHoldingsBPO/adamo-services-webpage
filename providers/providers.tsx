"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LenisProvider from "./LenisProvider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>{children}</LenisProvider>
    </QueryClientProvider>
  );
}
