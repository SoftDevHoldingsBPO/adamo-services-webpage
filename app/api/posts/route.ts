import enPosts from "@/data/en_posts.json";
import esPosts from "@/data/es_posts.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");

  if (locale === "es") {
    return new Response(JSON.stringify(esPosts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(enPosts), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
