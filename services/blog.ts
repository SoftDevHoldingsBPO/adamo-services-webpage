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

export type BlogPostsResponse = {
  success: boolean;
  blogPosts: BlogPost[];
};

export const getBlogPosts = async (): Promise<BlogPostsResponse> => {
  const response = await fetch(
    "https://excel-document-reader-dev.adamoservices.co/documents/blog-posts",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  return response.json() as Promise<BlogPostsResponse>;
};
