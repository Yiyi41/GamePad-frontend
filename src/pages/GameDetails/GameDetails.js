import "./GameDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinesEllipsis from "react-lines-ellipsis";

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
      <p className="title">{game.name}</p>
      <div className="first-block-content">
        <div className="imgContainer">
          <img src={game.background_image} alt="" />
        </div>
        <div className="textContainer">
          {/* BTN BLOCK*/}
          <div className="btn-container">
            <button>
              Saved to <span>Collection</span> &nbsp;
              <FontAwesomeIcon icon="bookmark" />
            </button>
            <button>
              Add a Review &nbsp;
              <FontAwesomeIcon icon="message" />
            </button>
          </div>

          <div className="info-container">
            {/* COLUM LEFT */}
            <div className="left-colum">
              {/* PLATFORM */}
              <div className="plaform">
                <p>Platforms</p>
                {game.parent_platforms.map((platform, index) => {
                  return (
                    <span key={platform.id} className="platform_name">
                      {platform.platform.name} &nbsp;
                    </span>
                  );
                })}
              </div>

              {/* DATE */}
              <div className="date">
                <p className="date">Release date</p>
                <span>{game.released}</span>
              </div>

              {/* PUBLISHER */}
              <div className="publisher">
                <p>Publisher</p>
                <span>{game.publishers[0].name}</span>
              </div>
            </div>
            {/* RIGHT COLUM */}
            <div className="right-colum">
              {/* GENRE */}
              <div className="genre">
                <p>Genre</p>
                {game.genres.map((genre, index) => {
                  return <span key={index}>{genre.name} &nbsp;</span>;
                })}
              </div>

              {/* DEVELOPPER */}
              <div className="developer">
                <p>Developer</p>
                <span>{game.developers[0].name}</span>
              </div>

              {/* RATING */}
              <div>
                <p>Age rating</p>
                <span className="rating">{game.rating}</span>
              </div>
            </div>
          </div>

          <div className="about">
            <p>About</p>
            <LinesEllipsis
              text={game.description_raw}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
        </div>
      </div>
      <p className="title2">Game likes {game.name}</p>
      <div className="scroll-container">
        {game.tags.map((tag, index) => {
          return (
            <div key={index}>
              <img src={tag.image_background} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameDetails;
