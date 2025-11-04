import Privacy from "../../src/assets/pages/privacy"

export const metadata = {
  title: "Privacy Policy | Pacesetter Frontier Magazine",
  description: "Read the privacy policy of Pacesetter Frontier Magazine. Learn how we handle your data and protect your privacy.",
  openGraph: {
    title: "Privacy Policy | Pacesetter Frontier Magazine",
    description: "Read the privacy policy of Pacesetter Frontier Magazine. Learn how we handle your data and protect your privacy.",
    url: "https://pacesetterfrontier.com/privacy-policy",
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
    title: "Privacy Policy | Pacesetter Frontier Magazine",
    description: "Read the privacy policy of Pacesetter Frontier Magazine. Learn how we handle your data and protect your privacy.",
    images: ["/logo.png"],
  },
};

export default function PrivacyPage() {
  return <Privacy />
}
