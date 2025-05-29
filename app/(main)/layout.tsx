import { NavigationProvider } from "@/providers/NavigationProvider";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Navigation from "@/components/layout/Navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <Navbar />
      <Navigation />
      <main className="flex-auto">{children}</main>
      <Footer />
    </NavigationProvider>
  );
}
