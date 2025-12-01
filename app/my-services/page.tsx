"use client";

import { Header } from "@/features/my-services/components/header";
import { Services } from "@/features/my-services/components/services";
import { ProtectedRoute } from "@/features/auth/components/routing/protected-route";

import Hero from "@/components/sections/Hero";

export default function MyServices() {
  return (
    <ProtectedRoute>
      <Hero
        bgColor="bg-primary"
        sectionClassName="min-h-screen max-h-none h-auto md:h-auto"
        containerClassName="h-auto pb-16 md:pt-8 lg:p-16"
        contentClassName="relative max-w-[1440px]"
        containerStartChildren={
          <video
            aria-hidden="true"
            className="hidden md:flex absolute inset-0 h-full w-full object-cover brightness-50"
            autoPlay
            loop
            muted
            playsInline
            title="Background video"
          >
            <source src="/video/services.webm" type="video/webm" />
            <source src="/video/services.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        }
      >
        <Header />
        <Services />
      </Hero>
    </ProtectedRoute>
  );
}
