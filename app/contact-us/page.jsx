import Contact from "../../src/assets/pages/contact"

export const metadata = {
  title: "Contact Us | Pacesetter Frontier Magazine",
  description: "Get in touch with Pacesetter Frontier Magazine. Reach out for inquiries, feedback, or partnership opportunities.",
  openGraph: {
    title: "Contact Us | Pacesetter Frontier Magazine",
    description: "Get in touch with Pacesetter Frontier Magazine. Reach out for inquiries, feedback, or partnership opportunities.",
    url: "https://pacesetterfrontier.com/contact-us",
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
    title: "Contact Us | Pacesetter Frontier Magazine",
    description: "Get in touch with Pacesetter Frontier Magazine. Reach out for inquiries, feedback, or partnership opportunities.",
    images: ["/logo.png"],
  },
};

export default function ContactPage() {
  return <Contact />
}
