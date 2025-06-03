"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AnimationProvider } from "./AnimationProvider";
import LenisProvider from "./LenisProvider";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimationProvider>
        <LenisProvider>{children}</LenisProvider>
      </AnimationProvider>
    </QueryClientProvider>
  );
}
