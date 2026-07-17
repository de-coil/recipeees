import { useState } from 'react'
import { useNavigate } from 'react-router'
import cookies from './assets/cookies.png'
import './App.css'

function App() {
  const navigate = useNavigate()
  const goToPage = () => { navigate('/ricette') }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={cookies} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Benvenuti in</h1>
          <h1>REACT RICETTE</h1>
        </div>
        <button
          type="button"
          className="counter"
          onClick={goToPage}
        >
        Vedi le Ricette
        </button>
      </section>
    </>
  )
}

export default App
