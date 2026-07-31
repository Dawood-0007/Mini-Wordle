import './App.css'
import { Link } from 'react-router-dom'
import { IoGameControllerSharp } from "react-icons/io5";

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
          <Link to="/learn">
            <button onClick={scrollToBottom}>See how to Play</button>
          </Link>
          <Link to="/game">
            <button> <IoGameControllerSharp style={{ marginRight: "10px"}}/> Play Now</button>
          </Link>
        </div>
        </div>
      
    </>
  )
}

export default App
