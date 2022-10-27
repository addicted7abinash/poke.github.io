import Pokedex from "pokedex-promise-v2";
import { useState } from "react";
const P = new Pokedex();
let search;

const GetPokemon = () => {
  const [pokemon, pokedex] = useState("");
  const [data, setData] = useState("Test");
  function infodex(e) {
    e.preventDefault();
    P.getPokemonByName(pokemon).then((res) => {
      search = res.sprites.front_default;
      setData(search);
    });
  }
  return (
    <div>
      <form className="form">
        <input
          type="text"
          name="pokemon"
          placeholder="Pokemon search"
          value={pokemon}
          onChange={(e) => pokedex(e.target.value)}
          className="input"
        />
        <button onClick={infodex} className="button">
          Search
        </button>
      </form>
      <img src={data} alt="" className="image" />
    </div>
  );
};
export default GetPokemon;
