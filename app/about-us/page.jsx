import About from "../../src/assets/pages/about"

export const metadata = {
  title: "About Us | Pacesetter Frontier Magazine",
  description: "Learn more about Pacesetter Frontier Magazine, our mission, vision, and the team setting the pace in journalism.",
  openGraph: {
    title: "About Us | Pacesetter Frontier Magazine",
    description: "Learn more about Pacesetter Frontier Magazine, our mission, vision, and the team setting the pace in journalism.",
    url: "https://pacesetterfrontier.com/about-us",
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
    title: "About Us | Pacesetter Frontier Magazine",
    description: "Learn more about Pacesetter Frontier Magazine, our mission, vision, and the team setting the pace in journalism.",
    images: ["/logo.png"],
  },
};

export default function AboutPage() {
  return <About />
}
