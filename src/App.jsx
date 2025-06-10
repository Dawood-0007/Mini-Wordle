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
          <button onClick={scrollToBottom}>Learn to Play</button>
          <NavLink to="/game">
            <button>Play</button>
          </NavLink>
        </div>
        </div>
        <div className='instruction-div'>
          <h1>How To Play</h1>
          <p>Start by typing a 5-letter word.</p>
          <p>Press Enter to submit your guess.</p>
          <p>The color of the tiles will change to show how close your guess was:</p>
          <ul className='instruction=ul'>
            <li>🟩 Green: Correct letter in the correct position</li>
            <li>🟨 Yellow: Correct letter in the wrong position</li>
            <li>⬜ Gray: Letter not in the word</li>
          </ul>
          <p>You have 5 attempts to guess the word!</p>
        </div>
      
    </>
  )
}

export default App
