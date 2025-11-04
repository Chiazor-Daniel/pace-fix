import Terms from "../../src/assets/pages/terms"

export const metadata = {
  title: "Terms and Conditions | Pacesetter Frontier Magazine",
  description: "Read the terms and conditions for using Pacesetter Frontier Magazine. Understand your rights and responsibilities.",
  openGraph: {
    title: "Terms and Conditions | Pacesetter Frontier Magazine",
    description: "Read the terms and conditions for using Pacesetter Frontier Magazine. Understand your rights and responsibilities.",
    url: "https://pacesetterfrontier.com/terms-and-conditions",
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
    title: "Terms and Conditions | Pacesetter Frontier Magazine",
    description: "Read the terms and conditions for using Pacesetter Frontier Magazine. Understand your rights and responsibilities.",
    images: ["/logo.png"],
  },
};

export default function TermsPage() {
  return <Terms />
}
