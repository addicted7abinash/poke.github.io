import GetPokemon from "./components/GetPokemon";
import GetChallenger from "./components/GetChallenger";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <div className="wrapper">
          <h1 className="heading">PokeClash</h1>
          <Routes>
            <Route path="/battle" element={<GetChallenger />} />
            <Route path="/" element={<GetPokemon />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
