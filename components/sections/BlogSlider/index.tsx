import SliderDesktop from "./SliderDesktop";

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
    <section className="py-8 md:py-10">
      <div className="hidden lg:block">
        <SliderDesktop posts={data} />
      </div>
    </section>
  );
};

export default BlogSlider;
