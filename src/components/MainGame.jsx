import React, { useState, useEffect } from 'react'
import '../assets/MainGame.css'

const MainGame = () => {
  const [typedLetters, setTypedLetters] = useState([]);
  const [currentWord, setCurrectWord] = useState("");
  const [currentRow, setCurrentRow] = useState(1);
  const [words, setWords] = useState([]);
  const [message, setMessage] = useState("");
  const [disableKey, setDisableKey] = useState([]);
  const [disableAll, setDisableAll] = useState(false);
  const [greenKey, setGreenKey] = useState([]);
  const [yellowKey, setYellowKey] = useState([]);

  useEffect(() => {
    async function startingGame() {
      const start = await fetch("http://localhost:8080/api/start")
      const result = await start.json();
      console.log(result);
      setCurrectWord(result.word);
    }
    startingGame()
  }, [])

  const handleBackClick = () => {
    setTypedLetters((prevValues) => [...prevValues.slice(0, -1)])
  }

  const handleEnterKey = async () => {
    if (typedLetters.length != 5) {
      alert("Incorrect length. Word is not inserted");
    }
    else {
      const word = typedLetters.join('');
      if (words.includes(word)) {
        alert("Word already exists");
        return;
      } else {
        setWords((prevWords) => [...prevWords, typedLetters.join('')]);
        setTypedLetters([]);
        setCurrentRow((prevRow) => prevRow + 1)
        const checked = await checkGuess(word, currentWord);
        const checkedStr = checked.result;
        if (checked.result == "Correct Guess") {
          setMessage("You Won The game");
          for (let i = 0; i < 5; i++) {
            const box = document.querySelector(`.row-${currentRow - 1} .box-${i}`);

            if (!box) {
              console.error(`Could not find box at row ${currentRow - 1}, position ${i}`);
              continue;
            }

            box.style.backgroundColor = '#6aaa64';
            box.style.pointerEvents = 'none';

            setDisableAll(true);

          }
        } else {
          if ((currentRow) == 5) {
          setMessage("You Lost")
          setDisableAll(true);
        }
        
          for (let i = 0; i < 5; i++) {
            const letter = word[i].toLowerCase();
            const box = document.querySelector(`.row-${currentRow - 1} .box-${i}`);

            if (!box) {
              console.error(`Could not find box at row ${currentRow - 1}, position ${i}`);
              continue;
            }

            if (checkedStr[i] === letter) {

              box.style.backgroundColor = '#6aaa64';
              box.style.pointerEvents = 'none';
              setGreenKey((prevValues) => [...prevValues, word[i]])

            } else if (checkedStr[i] === "?") {
              box.style.backgroundColor = '#c9b458';
              box.style.pointerEvents = 'none';
              setYellowKey((prevValues) => [...prevValues, word[i]])

            } else {
              box.style.backgroundColor = '#787c7e';
              box.style.pointerEvents = 'none';
              setDisableKey((prevValues) => [...prevValues, word[i]])
            }
          }
        }
      }
    }
  }

  const handleKeyClick = (key) => {
    if (typedLetters.length < 5) {
      setTypedLetters((prevValues) => [...prevValues, key])
    }
  }

  const newGameClick = () => {
    setTypedLetters([]);
    setCurrectWord("");
    setCurrentRow(1);
    setWords([]);
    setMessage("");
    setDisableKey([]);
    setDisableAll(false);

    window.location.reload();
  }

  const line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const line2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const line3 = ["Z", "X", "C", "V", "B", "N", "M"]

  async function checkGuess(word, currentWord) {
    try {
      const response = await fetch('http://localhost:8080/api/checkGuess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          guess: word,
          targetWord: currentWord
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }
      return data;

    } catch (error) {
      console.error('Error during fetch:', error);
      throw new Error('Failed to check guess. Please try again.');
    }


  }

  return (
    <>
      <div className="game-info">
        <div className="game-title">
          <h1>Wordle Game </h1>
        </div>
        <div>
          <p>Guess the 5-letter word in 5 tries!</p>
          <p>🟩 = Correct letter and position</p>
          <p>🟨 = Correct letter, wrong position</p>
          <p>⬜ = Letter not in word</p>
        </div>

      </div>
      <div className="game-header">
        <div className="top-row row row-0">
          <div className="key box-0">{words[0] ? words[0][0] : (currentRow == 1 ? typedLetters[0] : null)}</div>
          <div className="key box-1">{words[0] ? words[0][1] : (currentRow == 1 ? typedLetters[1] : null)}</div>
          <div className="key box-2">{words[0] ? words[0][2] : (currentRow == 1 ? typedLetters[2] : null)}</div>
          <div className="key box-3">{words[0] ? words[0][3] : (currentRow == 1 ? typedLetters[3] : null)}</div>
          <div className="key box-4">{words[0] ? words[0][4] : (currentRow == 1 ? typedLetters[4] : null)}</div>
        </div>

        <div className="mid-row row row-1">
          <div className="key box-0">{words[1] ? words[1][0] : (currentRow == 2 ? typedLetters[0] : null)}</div>
          <div className="key box-1">{words[1] ? words[1][1] : (currentRow == 2 ? typedLetters[1] : null)}</div>
          <div className="key box-2">{words[1] ? words[1][2] : (currentRow == 2 ? typedLetters[2] : null)}</div>
          <div className="key box-3">{words[1] ? words[1][3] : (currentRow == 2 ? typedLetters[3] : null)}</div>
          <div className="key box-4">{words[1] ? words[1][4] : (currentRow == 2 ? typedLetters[4] : null)}</div>
        </div>

        <div className="mid-row row row-2">
          <div className="key box-0">{words[2] ? words[2][0] : (currentRow == 3 ? typedLetters[0] : null)}</div>
          <div className="key box-1">{words[2] ? words[2][1] : (currentRow == 3 ? typedLetters[1] : null)}</div>
          <div className="key box-2">{words[2] ? words[2][2] : (currentRow == 3 ? typedLetters[2] : null)}</div>
          <div className="key box-3">{words[2] ? words[2][3] : (currentRow == 3 ? typedLetters[3] : null)}</div>
          <div className="key box-4">{words[2] ? words[2][4] : (currentRow == 3 ? typedLetters[4] : null)}</div>
        </div>

        <div className="mid-row row row-3">
          <div className="key box-0">{words[3] ? words[3][0] : (currentRow == 4 ? typedLetters[0] : null)}</div>
          <div className="key box-1">{words[3] ? words[3][1] : (currentRow == 4 ? typedLetters[1] : null)}</div>
          <div className="key box-2">{words[3] ? words[3][2] : (currentRow == 4 ? typedLetters[2] : null)}</div>
          <div className="key box-3">{words[3] ? words[3][3] : (currentRow == 4 ? typedLetters[3] : null)}</div>
          <div className="key box-4">{words[3] ? words[3][4] : (currentRow == 4 ? typedLetters[4] : null)}</div>
        </div>

        <div className="row row-4">
          <div className="key box-0">{words[4] ? words[4][0] : (currentRow == 5 ? typedLetters[0] : null)}</div>
          <div className="key box-1">{words[4] ? words[4][1] : (currentRow == 5 ? typedLetters[1] : null)}</div>
          <div className="key box-2">{words[4] ? words[4][2] : (currentRow == 5 ? typedLetters[2] : null)}</div>
          <div className="key box-3">{words[4] ? words[4][3] : (currentRow == 5 ? typedLetters[3] : null)}</div>
          <div className="key box-4">{words[4] ? words[4][4] : (currentRow == 5 ? typedLetters[4] : null)}</div>
        </div>

        <div className='fix-height'></div>

        <div className="row typing-row">
          {line1.map((key) => (
            <div
              key={key}
              className={`key ${disableAll || disableKey.includes(key.toUpperCase()) ? 'disabled-key' : ''} ${greenKey.includes(key.toUpperCase()) ? 'green-key' : ''} ${yellowKey.includes(key.toUpperCase()) ? 'yellow-key' : ''}`}
              onClick={() => {              
                  handleKeyClick(key)
              }}
              style={{
                opacity: disableAll || disableKey.includes(key.toUpperCase()) ? 0.5 : 1,
              }}
            >
              {key}
            </div>
          ))}
        </div>

        <div className="row typing-row">
          {line2.map((key) => (
            <div
              key={key}
              className={`key ${disableAll || disableKey.includes(key.toUpperCase()) ? 'disabled-key' : ''} ${greenKey.includes(key.toUpperCase()) ? 'green-key' : ''} ${yellowKey.includes(key.toUpperCase()) ? 'yellow-key' : ''}`}
              onClick={() => { 
                  handleKeyClick(key)
              }}
              style={{
                opacity: disableAll || disableKey.includes(key.toUpperCase()) ? 0.5 : 1,
              }}
            >
              {key}
            </div>
          ))}
        </div>

        <div className="row bottom-row  typing-row">
          <div className={`key ${disableAll || disableKey.includes('enter') ? 'disabled-key' : ''}`} onClick={() => {
            if (!disableAll && !disableKey.includes('enter')) {
              handleEnterKey('enter')
            }
          }}>Enter</div>
          {line3.map((key) => (
            <div
              key={key}
              aria-disabled={disableAll}
             className={`key ${disableAll || disableKey.includes(key.toUpperCase()) ? 'disabled-key' : ''} ${greenKey.includes(key.toUpperCase()) ? 'green-key' : ''} ${yellowKey.includes(key.toUpperCase()) ? 'yellow-key' : ''}`}
              onClick={() => {              
                  handleKeyClick(key)
              }}
              style={{
                opacity: disableAll || disableKey.includes(key.toUpperCase()) ? 0.5 : 1,
              }}
            >
              {key}
            </div>
          ))}
          <div className={`key ${disableAll || disableKey.includes('backspace') ? 'disabled-key' : ''}`} onClick={() => {
            if (!disableAll && !disableKey.includes('backspace')) {
              handleBackClick()
            }
          }}>⌫</div>
        </div>

        <h1>{message}</h1>
        <p>Attempts Remaining: {5-(currentRow-1)}</p>


        <button className='btn-new-game' onClick={newGameClick}>New Game</button>
      </div>
    </>
  )
}

export default MainGame