import BlogFilter from "@/components/sections/Blog/BlogFilter";
import BlogGrid from "@/components/sections/Blog/BlogGrid";

export default async function Page() {
  return (
    <>
      <BlogFilter />
      <BlogGrid />
    </>
  );
}
