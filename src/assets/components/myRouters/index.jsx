import { Route, Routes } from "react-router-dom"

import {
  Welcome,
  PostPage,
  Contact,
  Category,
  Search,
  ErrorPage,
  Terms,
  Privacy,
  About,
  RemoveLater,
} from "../../pages"

const MyRouters = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/contact-us" element={<Contact />} />
    <Route path="/about-us" element={<About />} />
    <Route path="/terms and conditions" element={<Terms />} />
    <Route path="/privacy policy" element={<Privacy />} />
    <Route path="/post/:id/:title" element={<PostPage />} />
    <Route path="/category/:name" element={<Category />} />
    <Route path="/:year/:month/:day/:term" element={<Search />} />
    <Route path="/search/:term" element={<Search />} />
    <Route path="*" element={<ErrorPage />} />
    <Route path="/test" element={<RemoveLater />} />
  </Routes>
)

export default MyRouters
