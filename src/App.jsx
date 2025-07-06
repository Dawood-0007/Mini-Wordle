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
        <h3>Mini Wordle</h3>
        <p>Guess the word in five tries.</p>
        <div className='buttons'>
          <NavLink to="/learn">
            <button onClick={scrollToBottom}>Learn to Play</button>
          </NavLink>
          <NavLink to="/game">
            <button>Play Now</button>
          </NavLink>
        </div>
        </div>
      
    </>
  )
}

export default App
