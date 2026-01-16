import PostPage from "../../../../src/assets/pages/post"

// Server-side metadata generation for SEO/social sharing
export async function generateMetadata(context) {
  const params = await context.params;
  const { id, title } = params;

  try {
    // Fetch post data from your API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`);
    if (!res.ok) return {};

    const data = await res.json();

    // Destructure fields for meta tags
    const { yoast_head_json } = data;
    const og_title = yoast_head_json?.title || data.title || "Post";
    const og_description = yoast_head_json?.og_description || data.excerpt || data.content?.substring(0, 160) || "";
    const og_image = yoast_head_json?.og_image?.[0]?.url || data.featured_image || "/logo.png";
    const published_date = data.date || data.created_at;
    const modified_date = data.modified || data.updated_at;
    const author = data.author || "Pacesetter Frontier Magazine";
    const categories = data.categories || [];

    return {
      title: og_title,
      description: og_description,
      keywords: categories.join(', '),
      authors: [{ name: author }],
      openGraph: {
        title: og_title,
        description: og_description,
        images: [og_image],
        type: "article",
        url: `https://pacesetterfrontier.com/post/${id}/${title}`,
        publishedTime: published_date,
        modifiedTime: modified_date,
        authors: [author],
        section: categories[0] || "News",
        tags: categories,
      },
      twitter: {
        card: "summary_large_image",
        title: og_title,
        description: og_description,
        images: [og_image],
        creator: "@pacesetterfrontier",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: `https://pacesetterfrontier.com/post/${id}/${title}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: `${title} | Pacesetter Frontier Magazine`,
      description: `Read the latest article: ${title}`,
    };
  }
}

export default function PostDetailPage() {
  return <PostPage />
}
