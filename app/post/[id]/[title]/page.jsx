import PostPage from "../../../../src/assets/pages/post"

// Server-side metadata generation for SEO/social sharing
export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  // Fetch post data from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${awaitedParams.id}`);
  if (!res.ok) return {};

  const data = await res.json();

  // Destructure the fields you use for meta tags
  const { yoast_head_json } = data;
  const og_title = yoast_head_json?.title || "Post";
  const og_description = yoast_head_json?.og_description || "";
  const og_image = yoast_head_json?.og_image?.[0]?.url || "/logo.png";

  return {
    title: og_title,
    description: og_description,
    openGraph: {
      title: og_title,
      description: og_description,
      images: [og_image],
      type: "article",
      url: `https://pacesetterfrontier.com/post/${awaitedParams.id}/${awaitedParams.title}`,
    },
    twitter: {
      card: "summary_large_image",
      title: og_title,
      description: og_description,
      images: [og_image],
    },
  };
}

export default function PostDetailPage() {
  return <PostPage />
}
