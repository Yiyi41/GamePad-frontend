import "./GameDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinesEllipsis from "react-lines-ellipsis";

import Modal from "../../components/Modal/Modal";
import ReviewList from "../../components/ReviewList/ReviewList";

import Cookies from "js-cookie";

const GameDetails = ({ setUserData, userId }) => {
  const { id } = useParams();
  const [game, setGame] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false); //STATE CHARGES SAVE GAME BTN
  const [loginNeeded, setLoginNeeded] = useState(false); //STATE TO INFORM AND SWITCH USER TO LOGIN IF USER WANT TO SAVE THE GAME IN MYCOLLECTION
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://my-gamepad-backend-projet.herokuapp.com/gamedetails/${id}`
        );
        // console.log(response.data);
        setGame(response.data);
        setIsLoading(false);

        // //  CHECK IF THE GAME IS IN FAVORIT
        const responseIsFavorite = await axios.post(
          "https://my-gamepad-backend-projet.herokuapp.com/isfavorite",
          {
            gameId: id,
            userId: userId,
          }
        );
        // console.log(responseIsFavorite.data);
        setFavorite(responseIsFavorite.data);
      } catch (error) {
        console.log(error.response.message);
      }
    };
    fetchData();
  }, [id, userId, modalOpen]);

  // FUNC TO ADD/REMOVE GAME TO FAVORITE
  const handleAdd = async () => {
    setLoginNeeded(false);
    console.log("for add");
    try {
      const response = await axios.post(
        "https://my-gamepad-backend-projet.herokuapp.com/addfavorite",
        {
          gameTitle: game.name,
          gameId: game.id,
          gameImage: game.background_image,
        },
        { headers: { authorization: `Bearer ${Cookies.get("userToken")}` } }
      );
      // console.log(response.data);
      if (response.data) {
        setFavorite(true);
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401) {
        // alert("please login:)");
        setLoginNeeded(true);
        navigate("/login");
      }
    }
  };

  const handleRemove = async () => {
    console.log("for remove");
    if (favorite === true) {
      try {
        const response = await axios.post(
          "https://my-gamepad-backend-projet.herokuapp.com/removefavorite",
          {
            gameId: game.id,
            userId: userId,
          }
        );

        // console.log(response.data);
        if (response.data) {
          setFavorite(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  //FUNC FOR ADD REVIEW
  const handleReview = async () => {
    setModalOpen(true);
  };

  return isLoading ? (
    <div className="loading ... ">🤖 in a few seconds... 🤩</div>
  ) : (
    <div className="content">
      <p className="title">{game.name}</p>

      {/* REVIEW MODAL */}
      {modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          userToken={Cookies.get("userToken")}
          userId={userId}
          gameId={id}
          gameTitle={game.name}
        />
      )}

      <div className="first-block-content">
        <div className="imgContainer">
          <img src={game.background_image} alt="" />
        </div>

        <div className="textContainer">
          {/* BTN BLOCK*/}
          <div className="btn-container">
            {favorite === true ? (
              <button onClick={handleRemove}>
                Saved to <span className="saved">Collection</span> &nbsp;
                <FontAwesomeIcon icon="bookmark" className="saved" />
              </button>
            ) : (
              <button onClick={handleAdd}>
                Save to <span className="save">Collection</span> &nbsp;
                <FontAwesomeIcon icon="bookmark" />
              </button>
            )}

            <button onClick={handleReview}>
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
                    <span key={index} className="platform_name">
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

      {/* SIMILAR GAMES SCROLL */}
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

      {/* REVIEW CONTAINER */}
      <div className="review-container">
        <ReviewList gameId={id} userId={userId} />
      </div>
    </div>
  );
};

export default GameDetails;
