"use client"

import { useParams, useEffect } from "next/navigation"

import { Layout } from ".."
import { Common } from "../../components"

const Search = () => {
  // Get search term
  let { term } = useParams()
  // Adding this for backward compatibility
  term = term.split("-", 5).join(" ")

  // Log search term for analytics and SEO (non-blocking)
  useEffect(() => {
    if (term) {
      // Fire and forget - don't wait for response
      fetch('/api/search/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchTerm: term,
          resultsCount: 0 // Will be updated when results are loaded
        }),
      }).catch(error => {
        console.error('Error logging search:', error);
      });
    }
  }, [term]);

  return (
    <Layout>
      <div className="container">
        {/* Add structured data for search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SearchResultsPage",
              "name": `Search Results for "${term}"`,
              "description": `Search results for "${term}" on Pacesetter Frontier Magazine`,
              "url": `https://pacesetterfrontier.com/search/${term.replace(/\s+/g, '-')}`,
              "mainEntity": {
                "@type": "ItemList",
                "name": `Search Results for "${term}"`,
                "description": `Articles and news related to "${term}"`
              }
            })
          }}
        />
        
        <Common name={term} start={0} skip={12} columns={4} extras={term} />
      </div>
    </Layout>
  )
}

export default Search
