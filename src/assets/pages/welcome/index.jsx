"use client"
import React, { useEffect } from "react"
import { Layout } from ".."
import dynamic from "next/dynamic"
import HeroSlider from "./HeroSlider"
import "./index.css"
import { Adverts } from "../../components"
import usePrefetchHomepage from "../../custom/UsePrefetchHomepage"

// Load first 3 sections eagerly for faster initial render
import News from "./News"
import Politics from "./Politics"
import Opinion from "./Opinion"

// Lazy load remaining sections with ssr: false for better performance
const sections = [
  { name: "News", component: News },
  { name: "Politics", component: Politics },
  { name: "Opinion", component: Opinion },
  { name: "World News", component: dynamic(() => import("./WorldNews"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Press Release", component: dynamic(() => import("./PressRelease"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "African News", component: dynamic(() => import("./AfricanNews"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Business & Economy", component: dynamic(() => import("./BusinessEconomy"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Interviews", component: dynamic(() => import("./Interviews"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Entertainment", component: dynamic(() => import("./Entertainment"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Fashion", component: dynamic(() => import("./Fashion"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Tech", component: dynamic(() => import("./Technology"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Lifestyle", component: dynamic(() => import("./Lifestyle"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Health", component: dynamic(() => import("./Health"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Education", component: dynamic(() => import("./Education"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
  { name: "Sports", component: dynamic(() => import("./Sports"), { ssr: false, loading: () => <div className="text-center py-4">Loading...</div> }) },
]

const SideBar = dynamic(() => import("./SideBar"), { loading: () => <div className="text-center py-4">Loading Sidebar...</div> })

const Welcome = () => {
  // Prefetch homepage data on mount
  usePrefetchHomepage();

  return (
    <Layout>
      <HeroSlider />
      <div className="my-5 container">
        <div className="row">
          <div className="col-lg-8">
            {sections.map(({ component: Section }, i) => (
              <React.Fragment key={i}>
                <Section />
                <Adverts index={i + 1} />
              </React.Fragment>
            ))}

          </div>
          <div className="col-lg-4 px-lg-5">
            <SideBar />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Welcome
