import "./App.css";
import "./components/Header/Header.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameList from "./pages/GameList/GameList";
import Header from "./components/Header/Header";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleLeft, faAngleRight);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GameList />} />
      </Routes>
    </Router>
  );
}

export default App;
