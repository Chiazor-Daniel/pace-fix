"use client"

import { Layout } from ".."
import dynamic from "next/dynamic"
import { Adverts } from "../../components"
import HeroSlider from "./HeroSlider"
import "./index.css"

// Lazy load CommonHome-based sections
const sections = [
  { name: "News", component: dynamic(() => import("./News")) },
  { name: "Politics", component: dynamic(() => import("./Politics")) },
  { name: "World News", component: dynamic(() => import("./WorldNews")) },
  { name: "African News", component: dynamic(() => import("./AfricanNews")) },
  { name: "Business & Economy", component: dynamic(() => import("./BusinessEconomy")) },
  { name: "Entertainment", component: dynamic(() => import("./Entertainment")) },
  { name: "Sports", component: dynamic(() => import("./Sports")) },
  { name: "Technology", component: dynamic(() => import("./Technology")) },
  { name: "Health", component: dynamic(() => import("./Health")) },
  { name: "Education", component: dynamic(() => import("./Education")) },
  { name: "Fashion", component: dynamic(() => import("./Fashion")) },
  { name: "Lifestyle", component: dynamic(() => import("./Lifestyle")) },
  { name: "Interviews", component: dynamic(() => import("./Interviews")) },
  { name: "Opinion", component: dynamic(() => import("./Opinion")) },
  { name: "Press Release", component: dynamic(() => import("./PressRelease")) },
]

const SideBar = dynamic(() => import("./SideBar"))

const Welcome = () => (
  <Layout>
    <HeroSlider />
    <div className="my-5 container">
      <div className="row">
        <div className="col-lg-8">
          {sections.map(({ component: Section }, i) => (
            <Section key={i} />
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
