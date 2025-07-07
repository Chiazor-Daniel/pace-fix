"use client"

import { useParams } from "next/navigation"

import Layout from "../layout"
import { Common } from "../../components"

const Category = () => {
  // Get Category name.
  const { name } = useParams()
  return (
    <Layout>
      <div className="container-fluid">
        <Common name={name} start={0} skip={12} columns={4} />
      </div>
    </Layout>
  )
}

export default Category
