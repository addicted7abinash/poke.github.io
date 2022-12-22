import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Pokedex from "pokedex-promise-v2";

const P = new Pokedex();
const random = Math.floor(Math.random() * 600) + 1;
let statflag = false;

const GetChallenger = () => {
  const [opponent, setPokemon] = useState({
    img: "",
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
    moves: [],
  });

  useEffect(() => {
    P.getPokemonByName(random)
      .then((res) => {
        statflag = true;
        console.log(res);
        setPokemon((prev) => ({
          ...prev,
          img: res.sprites.front_default,
          name: res.name,
          hp: res.stats[0].base_stat,
          attack: res.stats[1].base_stat,
          defense: res.stats[2].base_stat,
          special_attack: res.stats[3].base_stat,
          special_defense: res.stats[4].base_stat,
          speed: res.stats[5].base_stat,
          moves: res.moves,
        }));
      })
      .catch((error) => {
        console.error(error);
        statflag = false;
      });
  }, []);
  const poke = useLocation();
  return (
    <div>
      <div className="battle">
        <div>
          <p className="name">You are {poke.state.data.name}</p>
          <img src={poke.state.data.img} alt="" className="image" />
          <table
            className="table"
            id="table"
            style={{ visibility: statflag ? "visible" : "hidden" }}
          >
            <thead>
              <tr>
                <th>HP</th>
                <th>Attack</th>
                <th>Defense</th>
                <th>Special Attack</th>
                <th>Special Defense</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{poke.state.data.hp}</td>
                <td>{poke.state.data.attack}</td>
                <td>{poke.state.data.defense}</td>
                <td>{poke.state.data.special_attack}</td>
                <td>{poke.state.data.special_defense}</td>
                <td>{poke.state.data.speed}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p className="name">Your opponent is {opponent.name}</p>
          <img src={opponent.img} alt="" className="image" />
          <table
            className="table"
            id="table"
            style={{ visibility: statflag ? "visible" : "hidden" }}
          >
            <thead>
              <tr>
                <th>HP</th>
                <th>Attack</th>
                <th>Defense</th>
                <th>Special Attack</th>
                <th>Special Defense</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{opponent.hp}</td>
                <td>{opponent.attack}</td>
                <td>{opponent.defense}</td>
                <td>{opponent.special_attack}</td>
                <td>{opponent.special_defense}</td>
                <td>{opponent.speed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetChallenger;
