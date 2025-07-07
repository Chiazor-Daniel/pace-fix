"use client"

import { Layout } from ".."
import { Container, Row, Col } from "react-bootstrap"
import News from "./News"
import Politics from "./Politics"
import BusinessEconomy from "./BusinessEconomy"
import Sports from "./Sports"
import Entertainment from "./Entertainment"
import Technology from "./Technology"
import Health from "./Health"
import Education from "./Education"
import Fashion from "./Fashion"
import Lifestyle from "./Lifestyle"
import Interviews from "./Interviews"
import Opinion from "./Opinion"
import PressRelease from "./PressRelease"
import WorldNews from "./WorldNews"
import AfricanNews from "./AfricanNews"
import SideBar from "./SideBar"
import HeroSlider from "./HeroSlider"
import "./index.css"
import { Adverts } from "../../components"

const Welcome = () => (
  <Layout>
    <Container fluid className="px-0">
      <HeroSlider />
    </Container>

    <Container className="my-5">
      <div className="row">
        <div className="col-lg-8">
          <News />
          <Adverts />
          <Politics />
          <WorldNews />
          <AfricanNews />
          <BusinessEconomy />
          <Entertainment />
          <Sports />
          <Technology />
          <Health />
          <Education /> 
          <Fashion /> 
          <Lifestyle /> 
          <Interviews /> 
          <Opinion />
          <PressRelease />
        </div>
        <div className="col-lg-4">
          <SideBar />
        </div>
      </div>
    </Container>
  </Layout>
)

export default Welcome
