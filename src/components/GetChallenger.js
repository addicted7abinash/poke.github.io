import { useLocation } from "react-router-dom";
// import Pokedex from "pokedex-promise-v2";

// const P = new Pokedex();
// const random = Math.floor(Math.random() * 600) + 1;

const GetChallenger = (pokemon) => {
  const poke = useLocation();
  return <div className="wrapper">{poke.state}</div>;
};

export default GetChallenger;
