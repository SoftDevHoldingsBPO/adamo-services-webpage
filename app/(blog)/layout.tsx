import { BlogProvider } from "@/providers/BlogProvider";

import BlogNavbar from "@/components/layout/BlogNavbar";
import Footer from "@/components/layout/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlogProvider>
      <BlogNavbar />
      <main className="flex-auto">{children}</main>
      <Footer />
    </BlogProvider>
  );
}
