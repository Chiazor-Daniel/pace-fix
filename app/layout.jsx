import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

import { ScrollToTop } from "../src/assets/custom/Utils";
import "../src/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Providers from "../src/assets/providers/Providers";
import BootstrapClientScript from "@/components/BootstrapClientScript";

export const metadata = {
  title: "Pacesetter Frontier Magazine",
  description: "Pacesetter Frontier Magazine - Setting the pace and leaving strides in time",
  icons: {
    icon: "/logo.png",
  },
  generator: "v0.dev",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pacesetterfrontier.com",
    siteName: "Pacesetter Frontier Magazine",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Pacesetter Frontier Magazine Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacesetter Frontier Magazine",
    description: "Setting the pace and leaving strides in time",
    images: ["/logo.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://pacesetterfrontier.com",
  },
  additionalMetaTags: [
    { name: "application-name", content: "Pacesetter Frontier Magazine" },
    { name: "apple-mobile-web-app-title", content: "Pacesetter Frontier" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "google-adsense-account", content: "ca-pub-3536158399576400" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>

        <Providers>
          <ScrollToTop>{children}</ScrollToTop>
        </Providers>
        <BootstrapClientScript />

        {/* Google Analytics using Next.js third-parties */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />

        {/* Mailchimp Script */}
        <Script id="mailchimp" strategy="afterInteractive">
          {`!function(c,h,i,m,p){
              m=c.createElement(h),p=c.getElementsByTagName(h)[0],
              m.async=1,m.src=i,p.parentNode.insertBefore(m,p)
            }(document,"script","https://chimpstatic.com/mcjs-connected/js/users/41cf0c45a5141cbfb27bfc3fd/bfb1cf43be183f753e97814fb.js");`}
        </Script>

        {/* Google Adsense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3536158399576400"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
