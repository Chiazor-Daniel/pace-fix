import Contact from "../../src/assets/pages/contact"

export async function generateMetadata() {
  return {
    title: "Contact Us | Pacesetter Frontier Magazine",
    description: "Contact Pacesetter Frontier Magazine for inquiries, feedback, or advertising opportunities.",
    openGraph: {
      title: "Contact Us | Pacesetter Frontier Magazine",
      description: "Contact Pacesetter Frontier Magazine for inquiries, feedback, or advertising opportunities.",
      images: ["/top-logo.png"],
      type: "website",
      url: "https://pacesetterfrontier.com/contact-us",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Pacesetter Frontier Magazine",
      description: "Contact Pacesetter Frontier Magazine for inquiries, feedback, or advertising opportunities.",
      images: ["/top-logo.png"],
    },
  };
}

export default function ContactPage() {
  return <Contact />
}
