import { useNavigate } from 'react-router'
import cookies from './assets/cookies.png'
import './App.css'

function App() {
  const navigate = useNavigate()
  const goToPage = () => { navigate('/recipes') }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={cookies} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Welcome to</h1>
          <h1>Recipeees</h1>
        </div>
        <button
          type="button"
          className="counter"
          onClick={goToPage}
        >
        See the recipeees
        </button>
      </section>
    </>
  )
}

export default App
