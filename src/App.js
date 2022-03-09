import "./App.css";
import "./components/Header/Header.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GameList from "./pages/GameList/GameList";
import GameDetails from "./pages/GameDetails/GameDetails";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Signin/Login";
import MyCollection from "./pages/Collection/MyCollection";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faUser,
  faBookmark,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faUser,
  faBookmark,
  faMessage
);

function App() {
  const [userId, setUserId] = useState(Cookies.get("userId" || null));
  const [userToken, setUserToken] = useState(Cookies.get("userToken" || null));

  const setUserData = (token, user_id) => {
    if (token) {
      Cookies.set("userToken", token);
      Cookies.set("userId", user_id);
    } else {
      Cookies.remove("userToken");
      Cookies.remove("userId");
    }
    setUserId(user_id);
    setUserToken(token);
  };

  return (
    <Router>
      <Header setUserData={setUserData} userToken={userToken} />
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route
          path="/gamedetails/:id"
          element={<GameDetails setUserData={setUserData} userId={userId} />}
        />
        <Route path="/signup" element={<Signup setUserData={setUserData} />} />
        <Route path="/login" element={<Login setUserData={setUserData} />} />
        <Route path="/mycollection" element={<MyCollection />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
