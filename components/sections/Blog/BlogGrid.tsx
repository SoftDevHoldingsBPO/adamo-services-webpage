import BlogCard from "./BlogCard";
import BlogHero from "./BlogHero";

export type BlogPost = {
  id: string;
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  date: string;
  coverImage: string;
  locales: {
    [locale: string]: {
      title: string;
      excerpt: string;
      content: string[];
    };
  };
};

const BlogGrid = async () => {
  const data = await fetch(
    "https://excel-document-reader-dev.adamoservices.co/documents/blog-posts",
  );
  const { blogPosts } = await data.json();

  return (
    <div className="container">
      <BlogHero posts={blogPosts.slice(0, 4)} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:gap-y-12 mt-6 md:mt-12">
        {blogPosts.map((post: BlogPost) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;
