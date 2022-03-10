import "./MyCollection.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const MyCollection = ({ userToken, userId }) => {
  // console.log(userId);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mycollection/${userId}`
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
    <div>is loading</div>
  ) : (
    <div>
      <h1>My Collection</h1>
      <div className="favoriteContent">
        {data.map((game, index) => {
          return (
            <div key={index} className="favoriteGameCard">
              <FontAwesomeIcon icon="bookmark" className="bookmark" />
              <img src={game.gameImage} alt="" />
              <p className="favoriteGameTitle">{game.gameTitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCollection;
