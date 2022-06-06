import React, { useState, useRef, useEffect } from "react";
import { createFullDeck } from "../useFetchCustomApi";
import "./new-game.styles.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cardsCode = [
  "2S",
  "2H",
  "2D",
  "2C",
  "3S",
  "3H",
  "3D",
  "3C",
  "4S",
  "4H",
  "4D",
  "4C",
  "5S",
  "5H",
  "5D",
  "5C",
  "6S",
  "6H",
  "6D",
  "6C",
  "7S",
  "7H",
  "7D",
  "7C",
  "8S",
  "8H",
  "8D",
  "8C",
  "9S",
  "9H",
  "9D",
  "9C",
  "0S",
  "0H",
  "0D",
  "0C",
  "JS",
  "JH",
  "JD",
  "JC",
  "QS",
  "QH",
  "QD",
  "QC",
  "KS",
  "KH",
  "KD",
  "KC",
  "AS",
  "AH",
  "aceDiamonds",
  "AC",
];

const cardRankingChecker = (card1, card2) => {
  let player, computer;
  cardsCode.forEach((code, index) => {
    if (card1 === code) {
      player = index;
    }
  });
  cardsCode.forEach((code, index) => {
    if (card2 === code) {
      computer = index;
    }
  });

  if (player > computer) {
    return 1;
  } else {
    return 0;
  }
};

function NewGameApi() {
  let CardDeck = useRef(null);
  const [twoCard, setTwoCard] = useState(null);
  const [rounds, setRounds] = useState(26);
  const [remaining, setRemaining] = useState(50);
  const [showWinner, setWinner] = useState(null);
  const [count, setCount] = useState({
    player: 0,
    computer: 0,
  });

  useEffect(() => {
    const asyncFetch = () => {
      CardDeck.current = createFullDeck();
    };
    asyncFetch();
  }, [CardDeck]);

  const drawCard = () => {
    var fullDeck = [null];
    fullDeck = CardDeck.current.cards;
    // console.log("Full deck", fullDeck);

    function shuffle(array) {
      // Fisher–Yates shuffle
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }

    fullDeck = shuffle(fullDeck);

    var card = ["2S", "2H"];
    card[0] = fullDeck[0].code;
    card[1] = fullDeck[1].code;
    console.log("Card1:", card[0], "and Card 2:", card[1]);

    function getCards(code1, code2) {
      return {
        success: true,
        remaining: `${remaining}`,
        cards: [
          {
            image: `https://deckofcardsapi.com/static/img/${code1}.png`,
            code: `${code1}`,
          },
          {
            image: `https://deckofcardsapi.com/static/img/${code2}.png`,
            code: `${code2}`,
          },
        ],
      };
    }

    const drawTwoCard = getCards(card[0], card[1]);
    setRemaining((remain) => remain - 2);
    // console.log("useState remaining ", remaining);

    if (drawTwoCard.success) {
      setTwoCard(drawTwoCard.cards);
      setRounds((rounds) => rounds - 1); // change
      setCount((prevState) => {
        const player = cardRankingChecker(card[0], card[1]);
        if (player) {
          return {
            ...count,
            player: prevState.player + 1,
          };
        } else {
          return {
            ...count,
            computer: prevState.computer + 1,
          };
        }
      });

      if (remaining === 0) {
        if (count.player > count.computer) {
          setWinner("Player Wins");
        } else if (count.player === count.computer) {
          setWinner("It's a Draw");
        } else {
          setWinner("Computer Wins");
        }
      }
    }
    fullDeck.shift();
    fullDeck.shift();
  };
  console.log(count);

  const QuickGame = () => {
    if (
      window.confirm("Are you sure you want to Simulate the game ?") === true
    ) {
      if (count.player !== 0 || count.computer !== 0) {
        let total = count.computer + count.player;
        let quickRemain = 26 - total;
        let quickWinPlayer = Math.round(Math.random() * quickRemain) + 0;
        let quickWinComputer = quickRemain - quickWinPlayer;
        count.player = quickWinPlayer + count.player;
        count.computer = quickWinComputer + count.computer;
        if (quickWinPlayer > quickWinComputer) {
          setWinner("Player Wins");
        } else if (quickWinComputer === quickWinPlayer) {
          setWinner("It's a Draw");
        } else {
          setWinner("Computer Wins");
        }
      } else {
        let quickWinPlayer = Math.round(Math.random() * 26) + 0;
        let quickWinComputer = 26 - quickWinPlayer;
        count.player = quickWinPlayer;
        count.computer = quickWinComputer;
        if (quickWinPlayer > quickWinComputer) {
          setWinner("Player Wins");
        } else if (quickWinComputer === quickWinPlayer) {
          setWinner("It's a Draw");
        } else {
          setWinner("Computer Wins");
        }
      }
    }
  };

  const QuitGame = () => {
    if (count.player === 0 && count.computer === 0) {
      alert("Cannot Quit Without Starting The Game.");
    } else if (
      window.confirm(
        "Are you sure you want to Quit? All Rounds will be awarded to Computer"
      ) === true
    ) {
      let total = count.computer + count.player;
      let quickRemain = 26 - total;
      count.computer = quickRemain + count.computer;
      if (count.player > count.computer) {
        setWinner("Player Wins");
      } else if (count.player === count.computer) {
        setWinner("It's a Draw");
      } else {
        setWinner("Computer Wins");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.2, duration: 1 }}
      className="newStart"
    >
      <div className={`center-screen ${showWinner ? "screen-blur" : ""}`}>
        <div className="player">
          <h1 className="title">Player - {count.player}</h1>
          <div className="card-draw">
            {Array.isArray(twoCard) && (
              <img src={twoCard[0].image} alt="card1" />
            )}
          </div>
        </div>

        <div className="start">
          <p>
            Rounds Left :<b> {rounds}</b>
          </p>
          <div>
            <button onClick={drawCard}> Play a Round </button>
            <button className="ml-2" onClick={QuickGame}>
              Quick Game
            </button>
            <button className="ml-2" onClick={QuitGame}>
              Quit
            </button>
          </div>
        </div>

        <div className="computer">
          <h1 className="title">Computer - {count.computer}</h1>
          <div className="card-draw">
            {Array.isArray(twoCard) && (
              <img src={twoCard[1].image} alt="card2" />
            )}
          </div>
        </div>
      </div>
      <div className={`playerwins ${showWinner ? "" : "hidden"}`}>
        <h1 className="winnerDiv">Player Won {count.player} times</h1>
        <h1 className="winnerDiv">Computer Won {count.computer} times</h1>
        <h1 className="winnerDiv">Result :- {showWinner} !!!</h1>
        <Link className="clickLink" to={"/"}>
          * Click Here To Play Again
        </Link>
      </div>
    </motion.div>
  );
}

export default NewGameApi;
