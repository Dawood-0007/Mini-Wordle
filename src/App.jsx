import './App.css'
import { NavLink } from 'react-router-dom'

function App() {
   function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  return (
    <>
      <div className='mainhome'>
        <h1>A Wordle Game</h1>
        <p>Guess the word in 5 tries.</p>
        <div className='buttons'>
          <NavLink to="/learn">
            <button onClick={scrollToBottom}>Learn to Play</button>
          </NavLink>
          <NavLink to="/game">
            <button>Play</button>
          </NavLink>
        </div>
        </div>
      
    </>
  )
}

export default App
