import "./GameList.css";
import logo from "../../assets/img/logo.png";
import Gamepad from "../../assets/img/Gamepad.png";

import ComboBox from "react-responsive-combo-box"; //this package can be used just for array with string not is not suit for an array with obj
import "react-responsive-combo-box/dist/index.css";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useEffect, useState } from "react";

let gameTypes = [
  "All",
  "Action",
  "Adventure",
  "RPG",
  "Shooter",
  "Puzzle",
  "Indie",
  "Simulation",
  "Racing",
  "Strategy",
];

let PlatformsTab = [
  "All",
  "PC",
  "IOS",
  "Android",
  "MacOS",
  "Nintendo Switch",
  "Playstation 5",
];

const GameList = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState("");
  const [platforms, setPlatforms] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("fetchdata genres: " + genres);
        const response = await axios.get(
          `http://localhost:3000/?page=${page}&search=${search}&genres=${genres}&platforms=${platforms}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, search, genres, platforms]);

  return isLoading ? (
    <div>is loading</div>
  ) : (
    <div>
      {/* SEARCH CONTAINER */}
      <div className="searchContainer">
        <div className="search_container_img">
          <img src={logo} alt="" className="img1" />
          <img src={Gamepad} alt="" className="img2" />
        </div>

        <input
          className="search_input"
          type="text"
          placeholder="Search for a game"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      {/* COMBO CONTAINER */}
      <div className="combo-container">
        <p>Filtre:</p>
        <div className="type">
          <ComboBox
            popoverClassName="combo-box-popover"
            inputStyles={{
              borderRadius: "10px",
              backgroundColor: "white",
              textAlign: "start",
            }}
            style={{ width: "70px", height: "30px" }}
            options={gameTypes}
            enableAutocomplete
            placeholder="Type"
            onSelect={(option) => setGenres(option)}
            renderRightElement={() => (
              <FontAwesomeIcon icon="angle-down" className="combo-icon" />
            )}
          />
        </div>

        <div className="platform">
          <ComboBox
            popoverClassName="combo-box-popover"
            inputStyles={{
              borderRadius: "10px",
              backgroundColor: "white",
              textAlign: "start",
            }}
            style={{ width: "100px", height: "30px" }}
            options={PlatformsTab}
            enableAutocomplete
            placeholder="Platform"
            renderRightElement={() => (
              <FontAwesomeIcon icon="angle-down" className="combo-icon" />
            )}
            onSelect={(option) => {
              if (option === "All") setPlatforms("0");
              else if (option === "Pc") setPlatforms("4");
              else if (option === "IOS") setPlatforms("3");
              else if (option === "Android") setPlatforms("21");
              else if (option === "MacOS") setPlatforms("5");
              else if (option === "Nintendo Switch") setPlatforms("7");
              else if (option === "Playstation 5") setPlatforms("187");
            }}
          />
        </div>
      </div>

      {/* LIST CONTAINER */}
      <div className="listContainer">
        {data.results.map((game, index) => {
          return (
            <Link to={`/gamedetails/${game.id}`} key={game.id}>
              <div className="gameCard">
                {game.background_image ? (
                  <img src={game.background_image} alt="" />
                ) : null}
                <div className="gameName">{game.name}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="btn_pagination">
        <button
          onClick={() => {
            page > 1 && setPage(page - 1);
          }}
        >
          <FontAwesomeIcon icon="angle-left" />
        </button>
        <div className="numberOfPage">
          <p>{page}</p>
        </div>

        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <FontAwesomeIcon icon="angle-right" />
        </button>
      </div>
    </div>
  );
};

export default GameList;
