import SliderCTA from "./SliderCTA";
import SliderDesktop from "./SliderDesktop";
import SliderMobile from "./SliderMobile";

export type Post = {
  id: number;
  title: string;
  desc: string;
  img: string;
  link: string;
};

const BlogSlider = async () => {
  const res = await fetch("http://localhost:3000/api/posts");
  const data = await res.json();

  return (
    <section className="pb-10 md:py-10">
      <div className="hidden lg:block">
        <SliderDesktop posts={data} />
      </div>

      <div className="block lg:hidden">
        <SliderMobile posts={data} />
      </div>
      <SliderCTA />
    </section>
  );
};

export default BlogSlider;
