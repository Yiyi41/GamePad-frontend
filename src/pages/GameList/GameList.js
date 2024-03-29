import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./GameList.css";
import Loader from "../../components/Loader/Loader";
import logo from "../../assets/img/logo.png";
import Gamepad from "../../assets/img/Gamepad.png";

import ComboBox from "react-responsive-combo-box"; //this package can be used just for array with string not is not suit for an array with obj
import "react-responsive-combo-box/dist/index.css";

import ReactPaginate from "react-paginate"; // package for pagination

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
  "Strategy"
];

let PlatformsTab = [
  "All",
  "PC",
  "IOS",
  "Android",
  "MacOS",
  "Nintendo Switch",
  "Playstation 5"
];

const GameList = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState("");
  const [platforms, setPlatforms] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const gamesPerPage = 20;
  const gamesVisisted = pageNumber * gamesPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let genre = genres.toLowerCase();
        const response = await axios.get(
          `https://my-gamepad-backend-projet.herokuapp.com/?page=${page}&search=${search}&genres=${genre}&platforms=${platforms}`
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
    <Loader />
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
        <p>Filtred by</p>
        <div className="type">
          <ComboBox
            popoverClassName="combo-box-popover"
            inputStyles={{
              borderRadius: "25px",
              backgroundColor: "white",
              textAlign: "center"
            }}
            style={{
              width: "90px",
              height: "30px"
            }}
            options={gameTypes}
            enableAutocomplete
            placeholder="Type"
            onSelect={(option) => setGenres(option)}
          />
        </div>

        <div className="platform">
          <ComboBox
            popoverClassName="combo-box-popover"
            inputStyles={{
              borderRadius: "25px",
              backgroundColor: "white",
              textAlign: "center",
              cursor: "pointer"
            }}
            style={{ width: "90px", height: "30px" }}
            options={PlatformsTab}
            enableAutocomplete
            placeholder="Platform"
            onSelect={(option) => {
              if (option === "All") setPlatforms("0");
              else if (option === "PC") setPlatforms("4");
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
        {data.results
          .slice(gamesVisisted, gamesVisisted + gamesPerPage)
          .map((game) => {
            return (
              <Link to={`/gamedetails/${game.id}`} key={game.id}>
                <div className="gameCard">
                  {game.background_image ? (
                    <img src={game.background_image} alt="game cover" />
                  ) : null}
                  <span className="gameName">{game.name}</span>
                </div>
              </Link>
            );
          })}

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(data.count / gamesPerPage)}
          onPageChange={({ selected }) => {
            setPage(selected + 1);
          }}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          breakLabel="..."
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
        />
      </div>
    </div>
  );
};

export default GameList;
