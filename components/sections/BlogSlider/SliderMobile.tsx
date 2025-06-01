import { BlogPost } from "@/services/blog";

import SlideBlogCard from "./SlideBlogCard";

interface SliderMobileProps {
  posts: BlogPost[];
}

const SliderMobile = ({ posts }: SliderMobileProps) => {
  return (
    <div className="bg-neutral-100 py-14">
      <div className="flex px-4 gap-4 flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-pl-4">
        {posts.map((post) => (
          <SlideBlogCard
            className="snap-start shrink-0"
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderMobile;
