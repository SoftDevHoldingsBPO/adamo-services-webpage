import BlogFilter from "@/components/sections/Blog/BlogFilter";
import BlogGrid from "@/components/sections/Blog/BlogGrid";

export default async function Page() {
  const data = await fetch(
    "https://excel-document-reader-dev.adamoservices.co/documents/blog-posts",
  );
  const { blogPosts } = await data.json();

  return (
    <>
      <BlogFilter />
      <BlogGrid posts={blogPosts} />
    </>
  );
}
