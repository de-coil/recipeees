import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

export default function DettaglioRicetta() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ricetta, setRicetta] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRicetta = async () => {
            try {
                const response = await axios.get('/api/meals.json')
                const selected = response.data.find((item) => item.id === id)

                if (!selected) {
                    throw new Error('Ricetta non trovata')
                }

                setRicetta(selected)
            } catch (err) {
                setError(err.message || 'Impossibile caricare la ricetta')
            } finally {
                setLoading(false)
            }
        }

        fetchRicetta()
    }, [id])

    if (loading) {
        return <div className="container py-4"><p>Caricamento...</p></div>
    }

    if (error || !ricetta) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">{error || 'Ricetta non trovata'}</div>
                <button type="button" className="counter" onClick={() => navigate('/ricette')}>
                    Torna alle ricette
                </button>
            </div>
        )
    }

    return (
        <div className="container py-4">
            <h1>{ricetta.title}</h1>

            {ricetta.imageUrl && (
                <div className="recipe-image-wrapper">
                    <img
                        src={ricetta.imageUrl}
                        alt={ricetta.title}
                        className="img-fluid mb-4 recipe-image"
                    />
                </div>
            )}

            <div className="text-start">
                <p><strong>Prezzo:</strong> {ricetta.affordability}</p>
                <p><strong>Complessità:</strong> {ricetta.complexity}</p>
                <p><strong>Durata:</strong> {ricetta.duration} min</p>
                <p><strong>Gluten free:</strong> {ricetta.isGlutenFree ? 'Sì' : 'No'}</p>
                <p><strong>Vegan:</strong> {ricetta.isVegan ? 'Sì' : 'No'}</p>
                <p><strong>Vegetarian:</strong> {ricetta.isVegetarian ? 'Sì' : 'No'}</p>
                <p><strong>Lactose free:</strong> {ricetta.isLactoseFree ? 'Sì' : 'No'}</p>

                <h3 className="mt-4">Ingredienti</h3>
                <ul>
                    {ricetta.ingredients?.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>

                <h3 className="mt-4">Procedimento</h3>
                <ol>
                    {ricetta.steps?.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </div>

            <button type="button" className="counter mt-4" onClick={() => navigate('/ricette')}>
                Torna alle ricette
            </button>
        </div>
    )
}
