import Category from "../../../src/assets/pages/category"

export async function generateMetadata({ params }) {
  const name = params?.name || "Category";
  return {
    title: `${name} | Pacesetter Frontier Magazine`,
    description: `Read the latest articles and news in the ${name} category on Pacesetter Frontier Magazine.`,
    openGraph: {
      title: `${name} | Pacesetter Frontier Magazine`,
      description: `Read the latest articles and news in the ${name} category on Pacesetter Frontier Magazine.`,
      images: ["/top-logo.png"],
      type: "website",
      url: `https://pacesetterfrontier.com/category/${name}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Pacesetter Frontier Magazine`,
      description: `Read the latest articles and news in the ${name} category on Pacesetter Frontier Magazine.`,
      images: ["/top-logo.png"],
    },
  };
}

export default function CategoryPage() {
  return <Category />
}
