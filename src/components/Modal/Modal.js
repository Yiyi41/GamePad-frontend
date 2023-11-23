import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

const Modal = ({ userToken, gameId, gameTitle, setOpenModal, modalOpen }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://my-gamepad-backend-projet.herokuapp.com/review",
        {
          title: title,
          content: content,
          gameId: gameId,
          gameTitle: gameTitle
        },
        { headers: { authorization: "Bearer " + userToken } }
      );
      console.log(response.data);
      if (response.data) {
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    // <div className="modalBackground">
    <div className={`modalBackground ${modalOpen ? "active" : ""}`}>
      <div className="modalContainer">
        <button
          className="close"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          <FontAwesomeIcon icon="xmark" />
        </button>
        <div className="modalTitle">
          <h3>Write a Review</h3>
        </div>
        <form onSubmit={handleSubmit} className="modalForm">
          <label>Review title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label>Review text</label>
          <textarea
            type="text"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
          <input type="submit" value="Publish" className="validateBtn" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
