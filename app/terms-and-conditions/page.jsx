import Terms from "../../src/assets/pages/terms"

export async function generateMetadata() {
  return {
    title: "Terms and Conditions | Pacesetter Frontier Magazine",
    description: "Read the terms and conditions for using Pacesetter Frontier Magazine's website and services.",
    openGraph: {
      title: "Terms and Conditions | Pacesetter Frontier Magazine",
      description: "Read the terms and conditions for using Pacesetter Frontier Magazine's website and services.",
      images: ["/top-logo.png"],
      type: "website",
      url: "https://pacesetterfrontier.com/terms-and-conditions",
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms and Conditions | Pacesetter Frontier Magazine",
      description: "Read the terms and conditions for using Pacesetter Frontier Magazine's website and services.",
      images: ["/top-logo.png"],
    },
  };
}

export default function TermsPage() {
  return <Terms />
}
