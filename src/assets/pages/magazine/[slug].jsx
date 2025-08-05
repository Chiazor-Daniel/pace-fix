import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaDownload, FaShoppingCart } from "react-icons/fa"

const MagazineDetails = ({ params }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [magazine, setMagazine] = useState(null)

  // TODO: Implement API call to fetch magazine details
  const fetchMagazine = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}magazines/${params.slug}`)
      const data = await response.json()
      setMagazine(data)
    } catch (error) {
      console.error("Error fetching magazine:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle buy button click
  const handleBuy = () => {
    // TODO: Implement payment logic
    console.log("Buy magazine:", magazine)
  }

  // Handle download button click
  const handleDownload = () => {
    // TODO: Implement download logic
    console.log("Download magazine:", magazine)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card p-4">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <>
                <div className="mb-4">
                  <h1>{magazine?.title}</h1>
                  <p className="text-muted">{magazine?.description}</p>
                </div>
                <div className="mb-4">
                  <img
                    src={magazine?.cover_image}
                    alt={magazine?.title}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="mb-4">
                  <p><strong>Price:</strong> ${magazine?.price}</p>
                  <p><strong>Issue Date:</strong> {magazine?.issue_date}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={handleBuy}
                  >
                    <FaShoppingCart className="me-2" /> Buy Now
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleDownload}
                  >
                    <FaDownload className="me-2" /> Download
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MagazineDetails
