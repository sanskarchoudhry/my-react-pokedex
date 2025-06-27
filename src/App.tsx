import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import PokemonPage from "./pages/pokemon/PokemonPage";
import MovePage from "./pages/move/MovePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:id?" element={<PokemonPage />} />
          <Route path="/move/" element={<MovePage />} />
          <Route path="/move/generation/:genID?" />

          <Route path="/move/:moveName?" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
