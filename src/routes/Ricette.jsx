import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

export default function Ricette() {
  const navigate = useNavigate()
  const [ricette, setRicette] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getPriceBadgeStyle = (affordability) => {
    switch (affordability?.toLowerCase()) {
      case 'affordable':
        return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }
      case 'pricey':
        return { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeeba' }
      case 'luxurious':
        return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }
      default:
        return { backgroundColor: '#e2e3e5', color: '#383d41', border: '1px solid #d6d8db' }
    }
  }

  const getComplexityBadgeStyle = (complexity) => {
    switch (complexity?.toLowerCase()) {
      case 'simple':
        return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }
      case 'challenging':
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
        const response = await axios.get('/api/meals.json')
        setRicette(response.data)
      } catch (err) {
        setError(err.message || 'Impossibile caricare le ricette')
      } finally {
        setLoading(false)
      }
    }

    fetchRicette()
  }, [])

  return (
    <div className="container py-4">
      <h1>Le Ricette</h1>
      <p>Benvenuto nella pagina delle ricette!</p>

      {loading && <p>Caricamento...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Preview</th>
              <th scope="col">Titolo</th>
              <th scope="col">Costo</th>
              <th scope="col">Complessità</th>
              <th scope="col">Durata</th>
            </tr>
          </thead>
          <tbody>
            {ricette.map((ricetta, index) => (
              <tr key={ricetta.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {ricetta.imageUrl ? (
                    <img
                      src={ricetta.imageUrl}
                      alt={ricetta.title}
                      width="80"
                      height="80"
                      className="img-thumbnail"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <span className="text-muted">Nessuna immagine</span>
                  )}
                </td>
                <td>
                  <Link
                    to={`/ricette/${ricetta.id}`}
                    className="text-decoration-underline"
                    style={{ color: 'inherit' }}
                  >
                    {ricetta.title}
                  </Link>
                </td>
                <td>
                  <span
                    className="badge rounded-pill"
                    style={getPriceBadgeStyle(ricetta.affordability)}
                  >
                    {ricetta.affordability}
                  </span>
                </td>
                <td>
                  <span
                    className="badge rounded-pill"
                    style={getComplexityBadgeStyle(ricetta.complexity)}
                  >
                    {ricetta.complexity}
                  </span>
                </td>
                <td>{ricetta.duration} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p>Sì, lo so. Le ricette sono inglese... Ops.</p>

      <button type="button" className="counter" onClick={() => navigate('/')}>
        Torna alla Home
      </button>
    </div>
  )
}
