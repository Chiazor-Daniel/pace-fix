"use client";
import React, { Suspense } from "react";
import { Layout } from "..";
import dynamic from "next/dynamic";
import HeroSlider from "./HeroSlider";
import "./index.css";
import { Adverts } from "../../components";

// Lazy load CommonHome-based sections with loading fallback
const sections = [
  { name: "News", component: dynamic(() => import("./News"), { ssr: false }) },
  {
    name: "Politics",
    component: dynamic(() => import("./Politics"), { ssr: false }),
  },
  {
    name: "Opinion",
    component: dynamic(() => import("./Opinion"), { ssr: false }),
  },
  {
    name: "World News",
    component: dynamic(() => import("./WorldNews"), { ssr: false }),
  },
  {
    name: "Press Release",
    component: dynamic(() => import("./PressRelease"), { ssr: false }),
  },
  {
    name: "African News",
    component: dynamic(() => import("./AfricanNews"), { ssr: false }),
  },
  {
    name: "Business & Economy",
    component: dynamic(() => import("./BusinessEconomy"), { ssr: false }),
  },
  {
    name: "Interviews",
    component: dynamic(() => import("./Interviews"), { ssr: false }),
  },
  {
    name: "Entertainment",
    component: dynamic(() => import("./Entertainment"), { ssr: false }),
  },
  {
    name: "Fashion",
    component: dynamic(() => import("./Fashion"), { ssr: false }),
  },
  {
    name: "Tech",
    component: dynamic(() => import("./Technology"), { ssr: false }),
  },
  {
    name: "Lifestyle",
    component: dynamic(() => import("./Lifestyle"), { ssr: false }),
  },
  {
    name: "Health",
    component: dynamic(() => import("./Health"), { ssr: false }),
  },
  {
    name: "Education",
    component: dynamic(() => import("./Education"), { ssr: false }),
  },
  {
    name: "Sports",
    component: dynamic(() => import("./Sports"), { ssr: false }),
  },
];

const LoadingSection = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const SideBar = dynamic(() => import("./SideBar"), { ssr: false });

const Welcome = () => (
  <Layout>
    <HeroSlider />
    <div className="my-5 container">
      <div className="row">
        <div className="col-lg-8">
          {sections.map(({ component: Section }, i) => (
            <React.Fragment key={i}>
              <Suspense fallback={<LoadingSection />}>
                <Section />
              </Suspense>
              <Adverts index={i + 1} />
            </React.Fragment>
          ))}
        </div>
        <div className="col-lg-4 px-lg-5">
          <Suspense fallback={<LoadingSection />}>
            <SideBar />
          </Suspense>
        </div>
      </div>
    </div>
  </Layout>
);

export default Welcome;
