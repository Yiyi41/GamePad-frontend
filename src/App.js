import "./App.css";
import "./components/Header/Header.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameList from "./pages/GameList/GameList";
import GameDetails from "./pages/GameDetails/GameDetails";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleLeft, faAngleRight);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/gamedetails/:id" element={<GameDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
