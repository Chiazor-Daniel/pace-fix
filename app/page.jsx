import Welcome from "../src/assets/pages/welcome"

export const metadata = {
  title: "Home | Pacesetter Frontier Magazine",
  description: "Welcome to Pacesetter Frontier Magazine. Stay updated with the latest news, articles, and features across various categories.",
  openGraph: {
    title: "Home | Pacesetter Frontier Magazine",
    description: "Welcome to Pacesetter Frontier Magazine. Stay updated with the latest news, articles, and features across various categories.",
    url: "https://pacesetterfrontier.com/",
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
    title: "Home | Pacesetter Frontier Magazine",
    description: "Welcome to Pacesetter Frontier Magazine. Stay updated with the latest news, articles, and features across various categories.",
    images: ["/logo.png"],
  },
};

export default function HomePage() {
  return <Welcome />
}
