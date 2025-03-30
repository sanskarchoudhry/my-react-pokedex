import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import PokemonPage from "./pages/pokemon/PokemonPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id?" element={<PokemonPage />} />
          <Route path="/pokemon/name/:name?" element={<PokemonPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
