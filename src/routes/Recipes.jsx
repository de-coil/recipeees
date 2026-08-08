import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

export default function Recipes() {
  const navigate = useNavigate()
  const [ricette, setRicette] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getDifficultyBadgeStyle = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }
      case 'medium':
        return { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeeba' }
      case 'hard':
        return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }
      default:
        return { backgroundColor: '#e2e3e5', color: '#383d41', border: '1px solid #d6d8db' }
    }
  }

  useEffect(() => {
    const fetchRicette = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/recipes')
        setRicette(response.data.recipes)
      } catch (err) {
        setError(err.message || 'Unable to load recipes')
      } finally {
        setLoading(false)
      }
    }

    fetchRicette()
  }, [])

  return (
    <div className="container py-4">
      <h1>The Recipeees</h1>
      <p>Welcome to the recipeees page!</p>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Preview</th>
              <th scope="col">Title</th>
              <th scope="col">Cuisine</th>
              <th scope="col">Difficulty</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>
            {ricette.map((ricetta, index) => (
              <tr key={ricetta.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {ricetta.image ? (
                    <img
                      src={ricetta.image}
                      alt={ricetta.name}
                      width="80"
                      height="80"
                      className="img-thumbnail"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="text-muted">No image</span>
                  )}
                </td>
                <td>
                  <Link
                    to={`/recipes/${ricetta.id}`}
                    className="text-decoration-underline"
                    style={{ color: 'inherit' }}
                  >
                    {ricetta.name}
                  </Link>
                </td>
                <td>{ricetta.cuisine}</td>
                <td>
                  <span
                    className="badge rounded-pill"
                    style={getDifficultyBadgeStyle(ricetta.difficulty)}
                  >
                    {ricetta.difficulty}
                  </span>
                </td>
                <td>{ricetta.prepTimeMinutes + ricetta.cookTimeMinutes} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button type="button" className="counter" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  )
}
