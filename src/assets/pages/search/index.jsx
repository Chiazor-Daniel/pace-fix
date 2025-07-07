"use client"

import { useParams } from "next/navigation"

import { Layout } from ".."
import { Common } from "../../components"

const Search = () => {
  // Get search term
  let { term } = useParams()
  // Adding this for backward compatibility
  term = term.split("-", 5).join(" ")
  return (
    <Layout>
      <div className="container-fluid">
        <Common name={term} start={0} skip={12} columns={4} extras={term} />
      </div>
    </Layout>
  )
}

export default Search
