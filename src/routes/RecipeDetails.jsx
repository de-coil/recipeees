import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

export default function RecipeDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchrecipe = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/recipes/${id}`)
                setRecipe(response.data)
            } catch (err) {
                setError(err.message || 'Unable to load recipe')
            } finally {
                setLoading(false)
            }
        }

        fetchrecipe()
    }, [id])

    if (loading) {
        return <div className="container py-4"><p>Loading...</p></div>
    }

    if (error || !recipe) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">{error || 'Recipe not found'}</div>
                <button type="button" className="counter" onClick={() => navigate('/recipes')}>
                    Return to the recipes
                </button>
            </div>
        )
    }

    return (
        <div className="container py-4">
            <h1>{recipe.name}</h1>

            {recipe.image && (
                <div className="recipe-image-wrapper">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="img-fluid mb-4 recipe-image"
                    />
                </div>
            )}

            <div className="text-start">
                <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                <p><strong>Prep time:</strong> {recipe.prepTimeMinutes} min</p>
                <p><strong>Cook time:</strong> {recipe.cookTimeMinutes} min</p>
                <p><strong>Servings:</strong> {recipe.servings}</p>
                <p><strong>Calories per serving:</strong> {recipe.caloriesPerServing}</p>
                <p><strong>Rating:</strong> {recipe.rating} / 5 ({recipe.reviewCount} reviews)</p>
                <p><strong>Meal type:</strong> {recipe.mealType?.join(', ')}</p>
                {recipe.tags?.length > 0 && (
                    <p>
                        <strong>Tags:</strong>{' '}
                        {recipe.tags.map((tag) => (
                            <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                        ))}
                    </p>
                )}

                <h3 className="mt-4">Ingredients</h3>
                <ul>
                    {recipe.ingredients?.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                    ))}
                </ul>

                <h3 className="mt-4">Instructions</h3>
                <ol>
                    {recipe.instructions?.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ol>
            </div>

            <button type="button" className="counter mt-4" onClick={() => navigate('/recipes')}>
                Return to the recipeees
            </button>
        </div>
    )
}
