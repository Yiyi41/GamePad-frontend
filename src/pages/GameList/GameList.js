import "./GameList.css";
import logo from "../../assets/img/logo.png";
import Gamepad from "../../assets/img/Gamepad.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useEffect, useState } from "react";

const GameList = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/?page=${page}&search=${search}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, search]);
  return isLoading ? (
    <div>is loading</div>
  ) : (
    <div>
      <div className="searchContainer">
        <div className="search_container_img">
          <img src={logo} alt="" />
          <img src={Gamepad} alt="" />
        </div>

        <input
          className="search_Btn"
          type="text"
          placeholder="Search for a game"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <div className="listContainer">
        {data.results.map((game, index) => {
          return (
            <div key={game.id} className="gameCard">
              {game.background_image ? (
                <img src={game.background_image} alt="" />
              ) : null}
              <div className="gameName">{game.name}</div>
            </div>
          );
        })}
      </div>
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
