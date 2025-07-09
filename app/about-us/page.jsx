import About from "../../src/assets/pages/about"

export async function generateMetadata() {
  return {
    title: "About Us | Pacesetter Frontier Magazine",
    description: "Learn about Pacesetter Frontier Magazine, our mission, vision, and the team behind the stories.",
    openGraph: {
      title: "About Us | Pacesetter Frontier Magazine",
      description: "Learn about Pacesetter Frontier Magazine, our mission, vision, and the team behind the stories.",
      images: ["/top-logo.png"],
      type: "website",
      url: "https://pacesetterfrontier.com/about-us",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | Pacesetter Frontier Magazine",
      description: "Learn about Pacesetter Frontier Magazine, our mission, vision, and the team behind the stories.",
      images: ["/top-logo.png"],
    },
  };
}

export default function AboutPage() {
  return <About />
}
