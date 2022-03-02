import "./GameDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //   console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/gamedetails/${id}`
        );
        // console.log(response.data);
        setGame(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.message);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <div>is loading</div>
  ) : (
    <div className="content">
      <div className="imgContainer">
        <img src={game.background_image} alt="" />
        <img src={game.background_image_additional} alt="" />
      </div>

      <div className="textContainer">
        <p className="title">{game.name}</p>
        <div className="genre">
          Genre: &nbsp;
          {game.genres.map((genre, index) => {
            return <span key={index}>{genre.name} &nbsp;</span>;
          })}
        </div>
        <p>Release date: {game.released}</p>
        <div className="plaform_name_container">
          Platforms: &nbsp;
          {game.parent_platforms.map((platform, index) => {
            return (
              <span key={index} className="platform_name">
                {platform.platform.name} &nbsp;
              </span>
            );
          })}
        </div>
        {/* <p>{game.description}</p> */}
      </div>
    </div>
  );
};

export default GameDetails;
