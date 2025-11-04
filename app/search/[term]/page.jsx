import Search from "../../../src/assets/pages/search"

// Generate metadata for search pages
export async function generateMetadata({ params }) {
  const searchTerm = params.term.replace(/-/g, ' ');
  const title = `Search Results for "${searchTerm}" | Pacesetter Frontier Magazine`;
  const description = `Find the latest articles and news related to "${searchTerm}" on Pacesetter Frontier Magazine.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://pacesetterfrontier.com/search/${params.term}`,
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function SearchPage() {
  return <Search />
}
