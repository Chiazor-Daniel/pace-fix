"use client"
import React from "react"
import { Layout } from ".."
import dynamic from "next/dynamic"
import HeroSlider from "./HeroSlider"
import "./index.css"
import {Adverts} from "../../components"

// Lazy load CommonHome-based sections with loading fallback
const sections = [
  { name: "News", component: dynamic(() => import("./News"), { loading: () => <div className="text-center py-4">Loading News...</div> }) },
  { name: "Politics", component: dynamic(() => import("./Politics"), { loading: () => <div className="text-center py-4">Loading Politics...</div> }) },
  { name: "Opinion", component: dynamic(() => import("./Opinion"), { loading: () => <div className="text-center py-4">Loading Opinion...</div> }) },
  { name: "World News", component: dynamic(() => import("./WorldNews"), { loading: () => <div className="text-center py-4">Loading World News...</div> }) },
  { name: "Press Release", component: dynamic(() => import("./PressRelease"), { loading: () => <div className="text-center py-4">Loading Press Release...</div> }) },
  { name: "African News", component: dynamic(() => import("./AfricanNews"), { loading: () => <div className="text-center py-4">Loading African News...</div> }) },
  { name: "Business & Economy", component: dynamic(() => import("./BusinessEconomy"), { loading: () => <div className="text-center py-4">Loading Business & Economy...</div> }) },
  { name: "Interviews", component: dynamic(() => import("./Interviews"), { loading: () => <div className="text-center py-4">Loading Interviews...</div> }) },
  { name: "Entertainment", component: dynamic(() => import("./Entertainment"), { loading: () => <div className="text-center py-4">Loading Entertainment...</div> }) },
  { name: "Fashion", component: dynamic(() => import("./Fashion"), { loading: () => <div className="text-center py-4">Loading Fashion...</div> }) },
  { name: "Tech", component: dynamic(() => import("./Technology"), { loading: () => <div className="text-center py-4">Loading Tech...</div> }) },
  { name: "Lifestyle", component: dynamic(() => import("./Lifestyle"), { loading: () => <div className="text-center py-4">Loading Lifestyle...</div> }) },
  { name: "Health", component: dynamic(() => import("./Health"), { loading: () => <div className="text-center py-4">Loading Health...</div> }) },
  { name: "Education", component: dynamic(() => import("./Education"), { loading: () => <div className="text-center py-4">Loading Education...</div> }) },
  { name: "Sports", component: dynamic(() => import("./Sports"), { loading: () => <div className="text-center py-4">Loading Sports...</div> }) },
]

const SideBar = dynamic(() => import("./SideBar"), { loading: () => <div className="text-center py-4">Loading Sidebar...</div> })

const Welcome = () => (
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
)

export default Welcome
