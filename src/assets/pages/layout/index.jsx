import { Footer, NavBar } from "../../components";

const index = ({children}) => {
  return (
    <>
        <NavBar/>
        {children}
        <Footer/>
    </>
  )
}

export default index
