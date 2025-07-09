"use client"

import { GeneralProvider } from "../context"
import { HelmetProvider } from "react-helmet-async"

const helmetContext = {}

export default function Providers({ children }) {
  return (
    <HelmetProvider context={helmetContext}>
      <GeneralProvider>
        {children}
      </GeneralProvider>
    </HelmetProvider>
  )
}
