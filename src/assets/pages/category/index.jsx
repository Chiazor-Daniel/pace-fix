"use client"

import { useParams } from "next/navigation"

import Layout from "../layout"
import { Common } from "../../components"

const Category = () => {
  // Get Category name and decode it (handles spaces encoded as %20)
  const { name } = useParams()
  const decodedName = decodeURIComponent(name)

  return (
    <Layout>
      <div className="container">
        <Common name={decodedName} start={0} skip={12} columns={4} />
      </div>
    </Layout>
  )
}

export default Category
