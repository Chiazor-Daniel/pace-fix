import Category from "../../../../../src/assets/pages/category"

export async function generateMetadata(context) {
  const params = await context.params;
  const categoryName = params.name.replace(/-/g, ' ');
  const title = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} | Pacesetter Frontier Magazine`;
  const description = `Explore the latest articles and news in the ${categoryName} category on Pacesetter Frontier Magazine.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://pacesetterfrontier.com/category/${params.name}`,
      images: [
        {
          url: "/logo.png",
          width: 800,
          height: 600,
          alt: "Pacesetter Frontier Magazine Logo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}

export default function CategoryPage() {
  return <Category />
}
