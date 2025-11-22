import React, { useState, useEffect } from 'react'
import Difficulty from './Difficulty';
import '../assets/MainGame.css'

const MainGame = () => {

  const easywordList = [
    "animal", "planet", "friend", "castle", "bubble", "bright", "singer", "danger",
    "forest", "guitar", "hunger", "jungle", "kitten", "leader", "magnet", "nation",
    "object", "pirate", "quartz", "rocket", "silver", "tunnel", "united", "violet",
    "wander", "yellow", "zipper", "breach", "circle", "candle", "evolve", "freeze",
    "glance", "humble", "island", "juggle", "laptop", "mantle", "narrow", "orange",
    "pepper", "quaint", "repair", "scribe", "travel", "update", "valley", "wealth",
    "xenial", "yearly", "essay", "later", "bravo"
  ];

  const mediumwordList = [
    "apple", "brave", "crane", "daisy", "eagle", "fancy", "glide", "haste",
    "irony", "jolly", "knock", "lucky", "mango", "noble", "ocean", "piano",
    "quiet", "risky", "sunny", "table", "under", "vivid", "witty", "xenon",
    "youth", "zebra", "angle", "blush", "candy", "drift", "elite", "frost",
    "grape", "honey", "input", "jelly", "karma", "lemon", "mirth", "nudge",
    "orbit", "plant", "quack", "rider", "shiny", "thick", "unity", "vapor",
    "whale", "zesty", "alert", "bloom", "charm", "dwell", "eager", "flame",
    "glory", "hatch", "ideal", "jewel", "knack", "latch", "mirth", "noble",
    "olive", "pouch", "quest", "ridge", "light", "tiger", "ultra", "vivid",
    "waste", "xylem", "yield", "zesty", "amber", "baker", "cider", "dough",
  ];

  const hardwordList = [
    "book", "tree", "lamp", "code", "desk", "fire", "game", "hand", "jump", "king",
    "love", "moon", "note", "open", "play", "quiz", "rain", "sand", "time", "user",
    "view", "wind", "zone", "bake", "clap", "dive", "echo", "frog", "glow", "hill",
    "idea", "joke", "kite", "lava", "milk", "nest", "oval", "pink", "quit", "rope",
    "snow", "talk", "unit", "vast", "wave", "xray", "yarn", "zero", "zinc", "wolf"
  ];

  const [typedLetters, setTypedLetters] = useState([]);
  const [totalLetters, setTotalLetters] = useState(0);
  const [currentWord, setCurrectWord] = useState("");
  const [currentRow, setCurrentRow] = useState(1);
  const [words, setWords] = useState([]);
  const [message, setMessage] = useState("");
  const [disableKey, setDisableKey] = useState([]);
  const [disableAll, setDisableAll] = useState(false);
  const [greenKey, setGreenKey] = useState([]);
  const [yellowKey, setYellowKey] = useState([]);
  const [score, setScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [difficultyHidden, setDifficultyHidden] = useState(true);
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    async function startingGame() {
      if (difficulty === '') {
        return;
      }
      const wordList = difficulty === "Easy" ? easywordList : difficulty === "Medium" ? mediumwordList : hardwordList;
      const result = wordList[Math.floor(Math.random() * wordList.length)];
      setCurrectWord(result);
      console.log("Current Word:", result);
      setDifficultyHidden(false);

      const prevScore = localStorage.getItem("MyScore");

      console.log(prevScore)
      if (prevScore === null) {
        return;
      } else {
        setPreviousScore(prevScore)
      }
    }
    startingGame()
  }, [difficulty]);

  const handleBackClick = () => {
    setTypedLetters((prevValues) => [...prevValues.slice(0, -1)])
  }

  const handleEnterKey = async () => {
    if (typedLetters.length != totalLetters) {
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
        setCurrentRow((prevRow) => prevRow + 1);
        const checked = await checkword(word, currentWord);
        if (checked == "Correct word") {
          for (let i = 0; i < totalLetters; i++) {
            const box = document.querySelector(`.row-${currentRow - 1} .box-${i}`);

            if (!box) {
              console.error(`Could not find box at row ${currentRow - 1}, position ${i}`);
              continue;
            }

            box.style.backgroundColor = '#6aaa64';
            box.style.pointerEvents = 'none';

            setDisableAll(true);

            console.log(previousScore)
            console.log(score + 1)

            if (score + 1 > previousScore) {
              localStorage.setItem("MyScore", score + 1);
              setPreviousScore(score + 1);
            }

          }

          setMessage("You Won The game");
          setScore((prevScore) => prevScore + 1);
          
        } else {
          if ((currentRow) == 5) {
            setMessage(`You Lost the game. The word was ${currentWord.toUpperCase()}`);
            setDisableAll(true);
          }

          for (let i = 0; i < totalLetters; i++) {
            const letter = word[i].toLowerCase();
            const box = document.querySelector(`.row-${currentRow - 1} .box-${i}`);

            if (!box) {
              console.error(`Could not find box at row ${currentRow - 1}, position ${i}`);
              continue;
            }

            if (checked[i] === letter) {

              box.style.backgroundColor = '#6aaa64';
              box.style.pointerEvents = 'none';
              setGreenKey((prevValues) => [...prevValues, word[i]])

            } else if (checked[i] === "?") {
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
    if (disableAll) {
      return;
    }
    if (typedLetters.length < totalLetters) {
      setTypedLetters((prevValues) => [...prevValues, key])
    }
  }

  const newGameClick = () => {
    let num = 2;
    while (currentRow - num >= 0) {
      for (let i = 0; i < totalLetters; i++) {
        const box = document.querySelector(`.row-${currentRow - num} .box-${i}`);

        if (!box) {
          console.error(`Could not find box at row ${currentRow - num}, position ${i}`);
          continue;
        }
        box.style.backgroundColor = 'black';
      }
      num += 1;
    }

    setTypedLetters([]);
    setCurrentRow(1);
    setWords([]);
    setMessage("");
    setDisableKey([]);
    setDisableAll(false);
    setGreenKey([]);
    setYellowKey([]);

    const wordList = difficulty === "Easy" ? easywordList : difficulty === "Medium" ? mediumwordList : hardwordList;
    const result = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrectWord(result);
  }

  const line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const line2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const line3 = ["Z", "X", "C", "V", "B", "N", "M"]

  async function checkword(word, currentWord) {
    try {
      if (word == null || currentWord == null || word.length != currentWord.length) {
        return "Invalid word";
      }
      word = word.toLowerCase();
      currentWord = currentWord.toLowerCase();
      if (word === currentWord) {
        return "Correct word";
      } else {
        let result = "";

        for (let i = 0; i < word.length; i++) {
          let c = word.charAt(i);

          if (currentWord.charAt(i) === c) {
            result += c;
          } else if (currentWord.includes(c)) {
            result += "?";
          } else {
            result += "_";
          }
        }

        return result.trim();

      }
    } catch (error) {
      console.error('Error during Process:', error);
      throw new Error('Failed to check word. Please try again.');
    }
  }

  const resetDifficulty = () => {
    let num = 2;
    while (currentRow - num >= 0) {
      for (let i = 0; i < totalLetters; i++) {
        const box = document.querySelector(`.row-${currentRow - num} .box-${i}`);

        if (!box) {
          console.error(`Could not find box at row ${currentRow - num}, position ${i}`);
          continue;
        }
        box.style.backgroundColor = 'black';
      }
      num += 1;
    }

    setTypedLetters([]);
    setCurrentRow(1);
    setWords([]);
    setMessage("");
    setDisableKey([]);
    setDisableAll(false);
    setGreenKey([]);
    setYellowKey([]);
    setDifficulty("");
    setTotalLetters(0);
    setDifficulty("")
    setScore(0);
    setDifficultyHidden(true);
  }

  return (
    <>
      <div className='main-game' hidden={difficultyHidden}>
        <div className="game-info">
          <div className="game-title">
            <h1>Wordle Game </h1>
            <p>Current Difficulty: {difficulty}</p>
          </div>
          <div>
            <p>Guess the word in 5 tries!</p>
            <p>🟩 = Correct letter and position</p>
            <p>🟨 = Correct letter, wrong position</p>
            <p>⬛ = Letter not in word</p>
          </div>

        </div>
        <div className="game-header">
          <div className="top-row row row-0">
            <div className="key box-0">{words[0] ? words[0][0] : (currentRow == 1 ? typedLetters[0] : null)}</div>
            <div className="key box-1">{words[0] ? words[0][1] : (currentRow == 1 ? typedLetters[1] : null)}</div>
            <div className="key box-2">{words[0] ? words[0][2] : (currentRow == 1 ? typedLetters[2] : null)}</div>
            <div className="key box-3">{words[0] ? words[0][3] : (currentRow == 1 ? typedLetters[3] : null)}</div>
            <div className={difficulty !== "Hard" ? "key box-4" : "key box-4 hidden"}>{words[0] ? words[0][4] : (currentRow == 1 ? typedLetters[4] : null)}</div>
            <div className={difficulty === "Easy" ? "key box-5" : "key box-5 hidden"}>{words[0] ? words[0][5] : (currentRow == 1 ? typedLetters[5] : null)}</div>
          </div>

          <div className="mid-row row row-1">
            <div className="key box-0">{words[1] ? words[1][0] : (currentRow == 2 ? typedLetters[0] : null)}</div>
            <div className="key box-1">{words[1] ? words[1][1] : (currentRow == 2 ? typedLetters[1] : null)}</div>
            <div className="key box-2">{words[1] ? words[1][2] : (currentRow == 2 ? typedLetters[2] : null)}</div>
            <div className="key box-3">{words[1] ? words[1][3] : (currentRow == 2 ? typedLetters[3] : null)}</div>
            <div className={difficulty !== "Hard" ? "key box-4" : "key box-4 hidden"}>{words[1] ? words[1][4] : (currentRow == 2 ? typedLetters[4] : null)}</div>
            <div className={difficulty === "Easy" ? "key box-5" : "key box-5 hidden"}>{words[1] ? words[1][5] : (currentRow == 2 ? typedLetters[5] : null)}</div>
          </div>

          <div className="mid-row row row-2">
            <div className="key box-0">{words[2] ? words[2][0] : (currentRow == 3 ? typedLetters[0] : null)}</div>
            <div className="key box-1">{words[2] ? words[2][1] : (currentRow == 3 ? typedLetters[1] : null)}</div>
            <div className="key box-2">{words[2] ? words[2][2] : (currentRow == 3 ? typedLetters[2] : null)}</div>
            <div className="key box-3">{words[2] ? words[2][3] : (currentRow == 3 ? typedLetters[3] : null)}</div>
            <div className={difficulty !== "Hard" ? "key box-4" : "key box-4 hidden"}>{words[2] ? words[2][4] : (currentRow == 3 ? typedLetters[4] : null)}</div>
            <div className={difficulty === "Easy" ? "key box-5" : "key box-5 hidden"}>{words[2] ? words[2][5] : (currentRow == 3 ? typedLetters[5] : null)}</div>
          </div>

          <div className="mid-row row row-3">
            <div className="key box-0">{words[3] ? words[3][0] : (currentRow == 4 ? typedLetters[0] : null)}</div>
            <div className="key box-1">{words[3] ? words[3][1] : (currentRow == 4 ? typedLetters[1] : null)}</div>
            <div className="key box-2">{words[3] ? words[3][2] : (currentRow == 4 ? typedLetters[2] : null)}</div>
            <div className="key box-3">{words[3] ? words[3][3] : (currentRow == 4 ? typedLetters[3] : null)}</div>
            <div className={difficulty !== "Hard" ? "key box-4" : "key box-4 hidden"}>{words[3] ? words[3][4] : (currentRow == 4 ? typedLetters[4] : null)}</div>
            <div className={difficulty === "Easy" ? "key box-5" : "key box-5 hidden"}>{words[3] ? words[3][5] : (currentRow == 4 ? typedLetters[5] : null)}</div>
          </div>

          <div className="row row-4">
            <div className="key box-0">{words[4] ? words[4][0] : (currentRow == 5 ? typedLetters[0] : null)}</div>
            <div className="key box-1">{words[4] ? words[4][1] : (currentRow == 5 ? typedLetters[1] : null)}</div>
            <div className="key box-2">{words[4] ? words[4][2] : (currentRow == 5 ? typedLetters[2] : null)}</div>
            <div className="key box-3">{words[4] ? words[4][3] : (currentRow == 5 ? typedLetters[3] : null)}</div>
            <div className={difficulty !== "Hard" ? "key box-4" : "key box-4 hidden"}>{words[4] ? words[4][4] : (currentRow == 5 ? typedLetters[4] : null)}</div>
            <div className={difficulty === "Easy" ? "key box-5" : "key box-5 hidden"}>{words[4] ? words[4][5] : (currentRow == 5 ? typedLetters[5] : null)}</div>
          </div>

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

          <div className="row bottom-row typing-row">
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
          <p>Attempts Remaining: {5 - (currentRow - 1)}</p>
          <p className='p-score'>Score: {score}</p>
          <p className='prevScore'>Previous Best Score: {previousScore} </p>

          <div className='btn-container'>
            <button className='btn-new-game' onClick={newGameClick}>New Game</button>
            <button className='btn-new-game' onClick={resetDifficulty}>Reset Difficulty</button>
          </div>
        </div>
      </div>
      <div hidden={!difficultyHidden} className='difficulty-container'>
        <Difficulty onSelect={(level) => {
          setDifficulty(level);
          setTotalLetters(level === "Easy" ? 6 : level === "Medium" ? 5 : 4);
          alert(`Difficulty set to ${level}`);
        }} />
      </div>
    </>
  )
}

export default MainGame