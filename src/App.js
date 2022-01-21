import React, { useRef, useState, useEffect } from "react";
import "./App.scss";
import { ord4 } from "./ord4.js";

const COLORS = {
  red: "#ED553B",
  gray: "#dcdcde",
  yellow: "#F6F55C",
  green: "#3CAEA3",
  darkgreen: "darkgreen",
  darkyellow: "darkgoldenrod",
  darkgray: "darkgray",
};
/**
 * TODO:
 *
 * Lägg till  gula och gröna bokstäver i bokstäverna som är kvar
 *
 * Lägg till ett slutord
 *
 * Tärning för att blanda resterande bokstäver
 *
 * topp listan
 *
 * Ordlistan (?), använd azure för spellcheck och kör node där också
 * köp domän
 */

function App() {
  const [word, setWord] = useState(
    ord4[Math.floor(Math.random() * ord4.length)].toLowerCase()
  );

  const [usedLetters, setUsedLetters] = useState([]);
  const [level, setLevel] = useState(0);
  const [facit, setFacit] = useState([]);
  const [invalidWord, setInvalidWord] = useState("");
  const [cheat, setCheat] = useState(false);
  const [done, setDone] = useState(false);
  const [newUsedLetters, setNewUsedLetters] = useState([]);

  function getCorrectColor(letter, index, forUsedLetters = false) {
    if (letter === word[index]) {
      return {
        color: forUsedLetters ? COLORS["darkgreen"] : COLORS["green"],
        letter: letter,
      };
    } else if (word.includes(letter)) {
      return {
        color: forUsedLetters ? COLORS["darkyellow"] : COLORS["yellow"],
        letter: letter,
      };
    } else {
      return {
        color: forUsedLetters ? COLORS["darkgray"] : COLORS["gray"],
        letter: letter,
      };
    }
  }
  async function nextLevel(doneWord) {
    if (doneWord === word) {
      setDone(true);
      setFacit([
        ...facit,
        [
          { color: COLORS["green"] },
          { color: COLORS["green"] },
          { color: COLORS["green"] },
          { color: COLORS["green"] },
          { color: COLORS["green"] },
        ],
      ]);
      return;
    }
    const found = ord4.find((word) => word.toLowerCase() === doneWord);
    if (found) {
      setLevel(level + 1);
      let tempSet = new Set([
        ...usedLetters.map((elem) => elem.letter),
        ...doneWord,
      ]);

      const tempAry = Array.from(tempSet);
      /**
       * Här är bugg,  usedLetters måste göras om varje gång och kan inte bara appendas
       *
       */

      const tempis = tempAry.map((letter, index) =>
        getCorrectColor(letter, index, true)
      );

      const answer = [...doneWord].map((letter, index) =>
        getCorrectColor(letter, index)
      );

      setFacit([...facit, answer]);

      setUsedLetters(tempis);
    } else {
      setInvalidWord(doneWord);
      setTimeout(() => {
        setInvalidWord("");
      }, 3000);
    }
  }
  function checkLetterColor(letter) {
    const test = facit.map((array) =>
      array.includes((elem) => elem.letter === letter)
    );

    return "green";
  }
  return (
    <div>
      <header></header>
      <div className="alert-container">
        {invalidWord && (
          <div className="alert-inner">{`'${invalidWord}' finns inte i ordlistan`}</div>
        )}
      </div>
      <div className="container">
        <div>
          <RowComponent
            row={0}
            level={level}
            nextLevel={nextLevel}
            colors={facit[0]}
          />
          <RowComponent
            row={1}
            level={level}
            nextLevel={nextLevel}
            colors={facit[1]}
          />
          <RowComponent
            row={2}
            level={level}
            nextLevel={nextLevel}
            colors={facit[2]}
          />
          <RowComponent
            row={3}
            level={level}
            nextLevel={nextLevel}
            colors={facit[3]}
          />
          <RowComponent
            row={4}
            level={level}
            nextLevel={nextLevel}
            colors={facit[4]}
          />
          <RowComponent
            row={5}
            level={level}
            nextLevel={nextLevel}
            colors={facit[5]}
          />
        </div>
      </div>
      {(level === 6 || done) && (
        <div className="game-over-wrapper">
          <h3 className="game-over">
            {done ? "Bra jobbat" : `Order var: ${word}`}
            <button onClick={() => window.location.reload()}>Nytt ord</button>
          </h3>
        </div>
      )}
      <div className="used-letters">
        <div className="inner">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => console.log("slumpa 2")}
          >
            {console.log("kalle", usedLetters)}
            {usedLetters.map((letter) => {
              return (
                <span
                  className="letter"
                  key={letter.letter}
                  style={{ color: letter.color }}
                >
                  {letter.letter}
                </span>
              );
            })}
          </div>
          <hr className="letter-divider" onClick={() => setCheat(!cheat)} />
          <div
            style={{ cursor: "pointer" }}
            onClick={() => console.log("slumpa")}
          >
            {[..."qwertyuiopåasdfghjklöäzxcvbnm"]
              // {[..."abcdefghijklmnopqrstuvwxyzåäö"]
              .filter((l) => !usedLetters.includes(l))
              .map((letter) => (
                <span
                  className="letter"
                  style={{ color: COLORS["red"] }}
                  key={letter}
                >
                  {letter}
                </span>
              ))}
          </div>
          {cheat && <div style={{ marginTop: "2rem" }}>{word}</div>}
        </div>
      </div>
    </div>
  );
}

const RowComponent = (props) => {
  const { row, level, nextLevel, colors } = props;
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  useEffect(() => {
    if (row === level) {
      ref0.current.focus();
    }
  }, [level, row]);
  const changeHanler = (index, event) => {
    // kolla så att man inte kört backspace
    if (!event || event.target?.value)
      switch (index) {
        case 0:
          ref1.current.select();
          break;
        case 1:
          ref2.current.select();
          break;
        case 2:
          ref3.current.select();
          break;
        case 3:
          ref4.current.select();
          break;
        case 4:
          ref0.current.select();
          break;
        default:
          break;
      }
  };

  const submitHandler = (e) => {
    const doneWord =
      ref0.current.value +
      ref1.current.value +
      ref2.current.value +
      ref3.current.value +
      ref4.current.value;
    // validate that string is all letters and length 4
    if (
      ![...doneWord].includes(" ") &&
      RegExp(/^\p{L}/, "u").test(doneWord) &&
      doneWord.length === 5
    ) {
      nextLevel(doneWord.toLowerCase());
    }
  };

  const moveHandler = (event, ref, backwardIndex, forwardIndex) => {
    if (event.key === "ArrowLeft") {
      changeHanler(backwardIndex);
    } else if (event.key === "ArrowRight") {
      changeHanler(forwardIndex);
    } else if (event.key === "Enter") {
      submitHandler();
    } else if (event.target.value === ref.current.value) {
      event.target.select();
    }
  };

  return (
    <div>
      <input
        className="box"
        style={{ backgroundColor: colors && colors[0].color }}
        disabled={row !== level}
        maxLength={1}
        onClick={(e) => e.target.select()}
        onInput={(e) => changeHanler(0, e)}
        onKeyDown={(e) => {
          e.key === "Backspace" && !e.target.value && changeHanler(3);
        }}
        onKeyUp={(e) => moveHandler(e, ref0, 3, 0)}
        ref={ref0}
      />
      <input
        className="box"
        style={{ backgroundColor: colors && colors[1].color }}
        disabled={row !== level}
        maxLength={1}
        onClick={(e) => e.target.select()}
        onInput={(e) => changeHanler(1, e)}
        onKeyDown={(e) => {
          e.key === "Backspace" && !e.target.value && changeHanler(4);
        }}
        onKeyUp={(e) => moveHandler(e, ref1, 4, 1)}
        ref={ref1}
      />
      <input
        className="box"
        style={{ backgroundColor: colors && colors[2].color }}
        disabled={row !== level}
        maxLength={1}
        onClick={(e) => e.target.select()}
        onInput={(e) => changeHanler(2, e)}
        onKeyUp={(e) => moveHandler(e, ref2, 0, 2)}
        onKeyDown={(e) => {
          e.key === "Backspace" && !e.target.value && changeHanler(0);
        }}
        ref={ref2}
      />
      <input
        className="box"
        style={{ backgroundColor: colors && colors[3].color }}
        disabled={row !== level}
        maxLength={1}
        onClick={(e) => e.target.select()}
        onInput={(e) => changeHanler(3, e)}
        onKeyDown={(e) => {
          e.key === "Backspace" && !e.target.value && changeHanler(1);
        }}
        onKeyUp={(e) => moveHandler(e, ref3, 1, 3)}
        ref={ref3}
      />
      <input
        className="box"
        style={{ backgroundColor: colors && colors[4].color }}
        disabled={row !== level}
        maxLength={1}
        onClick={(e) => e.target.select()}
        // onInput={(e) => changeHanler(4, e)}
        onKeyDown={(e) => {
          e.key === "Backspace" && !e.target.value && changeHanler(2);
        }}
        onKeyUp={(e) => moveHandler(e, ref4, 2, 4)}
        ref={ref4}
      />
    </div>
  );
};

export default App;
