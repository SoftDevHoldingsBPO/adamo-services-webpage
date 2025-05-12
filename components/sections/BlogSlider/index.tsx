import { getLocale } from "next-intl/server";

import SliderCTA from "./SliderCTA";
import SliderDesktop from "./SliderDesktop";
import SliderMobile from "./SliderMobile";

export type Post = {
  id: number;
  title: string;
  desc: string;
  img: string;
  link: string;
  date: string;
};

const BlogSlider = async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const locale = await getLocale();
  const res = await fetch(`https://localhost:3000/api/posts?locale=${locale}`);
  const data: Post[] = await res.json();

  const sortedPosts = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const latestThree = sortedPosts.slice(0, 3);

  return (
    <section className="pb-10 md:py-10">
      <div className="hidden lg:block">
        <SliderDesktop posts={latestThree} />
      </div>

      <div className="block lg:hidden">
        <SliderMobile posts={latestThree} />
      </div>
      <SliderCTA />
    </section>
  );
};

export default BlogSlider;
