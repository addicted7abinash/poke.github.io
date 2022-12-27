import React from "react";
import Pokedex from "pokedex-promise-v2";
import { useState, useEffect } from "react";
const P = new Pokedex();

const Moves = (data) => {
  let loglines = [];
  let logElement = document.getElementById("logs");

  function log(attacker, move, damage, health) {
    let logText = `${attacker} used ${move} and did ${damage} points of damage.\n
    Remaining health: ${health - damage}`;
    loglines.push(logText);
    if (loglines.length > 2) {
      loglines.shift();
    }
    logElement.innerHTML = loglines
      .map((line) => `<p class = "loglines">${line}</p>`)
      .join("\n");
  }

  function playmove(move) {
    let keys = Object.keys(playerMoves);
    let randomKey = keys[Math.floor(Math.random() * 3) + 1];
    let randomMove = playerMoves[randomKey];

    let playerdamage = Math.floor(
      ((2 * playerMoves.attack) / OppMoves.defense) *
        (Math.floor(Math.random() * 6) + 4)
    );

    let oppdamage = Math.floor(
      ((2 * OppMoves.attack) / playerMoves.defense) *
        (Math.floor(Math.random() * 6) + 4)
    );
    if (oppHP > 0 && playerHP > 0) {
      log("You", move, playerdamage, oppHP);
      oppHP = oppHP - playerdamage;
      log("Opponent", randomMove, oppdamage, playerHP);
      playerHP = playerHP - oppdamage;
    }

    if (oppHP <= 0) {
      logElement.innerHTML = "Opponent's pokemon fainted. You win!";
    }

    if (playerHP <= 0) {
      logElement.innerHTML = "Your pokemon fainted. You lose :(";
    }
  }
  const [playerMoves, setPMoves] = useState({
    move1: "",
    move2: "",
    move3: "",
    move4: "",
    attack: 0,
    defense: 0,
    hp: 0,
  });
  const [OppMoves, setOMoves] = useState({
    move1: "",
    move2: "",
    move3: "",
    move4: "",
    attack: 0,
    defense: 0,
    hp: 0,
  });
  useEffect(() => {
    if (data.opp) {
      P.getPokemonByName(data.opp)
        .then((res) => {
          setOMoves((prev) => ({
            ...prev,
            move1: res.moves[0].move.name,
            move2: res.moves[1].move.name,
            move3: res.moves[2].move.name,
            move4: res.moves[3].move.name,
            hp: res.stats[0].base_stat,
            attack: res.stats[1].base_stat,
            defense: res.stats[2].base_stat,
          }));
        })
        .catch((error) => {
          console.error(error);
          alert("Please refresh the page");
        });
    }
    P.getPokemonByName(data.player)
      .then((res) => {
        setPMoves((prev) => ({
          ...prev,
          move1: res.moves[0].move.name,
          move2: res.moves[1].move.name,
          move3: res.moves[2].move.name,
          move4: res.moves[3].move.name,
          hp: res.stats[0].base_stat,
          attack: res.stats[1].base_stat,
          defense: res.stats[2].base_stat,
        }));
        console.log("Run");
      })
      .catch((error) => {
        console.error(error);
        console.log("Not enough moves");
        alert("Please select a different pokemon");
      });
  }, [data.opp, data.player]);

  let oppHP = OppMoves.hp;
  let playerHP = playerMoves.hp;

  return (
    <div>
      <div className="log" id="logs">
        The battle is starting. Select a move to play. The damage is loosely
        based on your attack and opponent's defense. Have fun!
      </div>
      <div className="moves">
        Your moves are:
        <div className="move-container">
          <button
            className="btn-move"
            onClick={() => {
              playmove(playerMoves.move1);
            }}
          >
            {playerMoves.move1}
          </button>
          <button
            className="btn-move"
            onClick={() => {
              playmove(playerMoves.move2);
            }}
          >
            {playerMoves.move2}
          </button>
          <button
            className="btn-move"
            onClick={() => {
              playmove(playerMoves.move3);
            }}
          >
            {playerMoves.move3}
          </button>
          <button
            className="btn-move"
            onClick={() => {
              playmove(playerMoves.move4);
            }}
          >
            {playerMoves.move4}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Moves;
