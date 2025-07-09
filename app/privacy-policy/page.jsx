import Privacy from "../../src/assets/pages/privacy"

export async function generateMetadata() {
  return {
    title: "Privacy Policy | Pacesetter Frontier Magazine",
    description: "Read the privacy policy of Pacesetter Frontier Magazine to learn how we handle your data.",
    openGraph: {
      title: "Privacy Policy | Pacesetter Frontier Magazine",
      description: "Read the privacy policy of Pacesetter Frontier Magazine to learn how we handle your data.",
      images: ["/top-logo.png"],
      type: "website",
      url: "https://pacesetterfrontier.com/privacy-policy",
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy | Pacesetter Frontier Magazine",
      description: "Read the privacy policy of Pacesetter Frontier Magazine to learn how we handle your data.",
      images: ["/top-logo.png"],
    },
  };
}

export default function PrivacyPage() {
  return <Privacy />
}
