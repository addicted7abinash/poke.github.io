import Pokedex from "pokedex-promise-v2";
import { useState } from "react";
const P = new Pokedex();
// let url;
// let name;

const GetPokemon = () => {
  const [pokemon, pokedex] = useState("");
  const [data, setData] = useState({ img: "", name: "" });
  function infodex(e) {
    e.preventDefault();
    P.getPokemonByName(pokemon).then((res) => {
      const url = res.sprites.front_default;
      const name = res.name;
      setData((prev) => ({ ...prev, img: url, name: name }));
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
      <img src={data.img} alt="" className="image" />
      <p className="name">{data.name}</p>
    </div>
  );
};
export default GetPokemon;
