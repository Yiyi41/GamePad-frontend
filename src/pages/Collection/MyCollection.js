import "./MyCollection.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyCollection = ({ userToken, userId }) => {
  // console.log(userId);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-gamepad-backend-projet.herokuapp.com/mycollection/${userId}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userId]);

  return isLoading ? (
    <div className="loading ... ">🤖 in a few seconds... 🤩</div>
  ) : (
    <div className="main-container">
      <h1>My Collection</h1>
      <div className="favoriteContent">
        {data.map((game, index) => {
          return (
            <Link
              to={`/gamedetails/${game.gameId}`}
              key={index}
              className="favoriteGameCard"
            >
              <FontAwesomeIcon icon="bookmark" className="bookmark" />
              <img src={game.gameImage} alt="" />
              <p className="favoriteGameTitle">{game.gameTitle}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MyCollection;
