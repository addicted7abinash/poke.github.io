import Pokedex from "pokedex-promise-v2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const P = new Pokedex();

const GetPokemon = () => {
  const [pokemon, setPokemon] = useState("");
  const [statflag, setStatflag] = useState(false);
  const navigate = useNavigate();

  const toBattle = () => {
    navigate("/battle", { state: { data } });
  };
  const [data, setData] = useState({
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
  function getPokemon(e) {
    e.preventDefault();
    P.getPokemonByName(pokemon)
      .then((res) => {
        setData((prev) => ({
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
        setData(() => ({
          name: "Please enter a valid name",
          hp: 0,
        }));
      });
  }
  useEffect(() => {
    if (data.hp !== 0) {
      setStatflag(true);
    }
    return () => {
      setStatflag(false);
      data.hp = 0;
    };
  }, [data]);

  return (
    <div>
      <form className="form">
        <input
          type="text"
          name="pokemon"
          placeholder="Pokemon search"
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
          className="input"
        />
        <button onClick={getPokemon} className="button">
          Search
        </button>
      </form>
      <img src={data.img} alt="" className="image" />
      <p className="name">{data.name}</p>
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
            <td>{data.hp}</td>
            <td>{data.attack}</td>
            <td>{data.defense}</td>
            <td>{data.special_attack}</td>
            <td>{data.special_defense}</td>
            <td>{data.speed}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn"
        onClick={() => {
          toBattle();
        }}
        style={{ visibility: statflag ? "visible" : "hidden" }}
      >
        Battle!
      </button>
    </div>
  );
};
export default GetPokemon;
