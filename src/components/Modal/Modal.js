import "./Modal.css";

import axios from "axios";
import { useState } from "react";

const Modal = ({ userId, userToken, gameId, gameTitle, setOpenModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(gameTitle);
    try {
      const response = await axios.post(
        "http://localhost:3000/review",
        {
          title: title,
          content: content,
          gameId: gameId,
          gameTitle: gameTitle,
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
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalTitle">
          <h3>Write a Review</h3>
        </div>
        <form onSubmit={handleSubmit} className="modalForm">
          <p>Review title</p>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <p>Review text</p>
          <textarea
            type="text"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
          <input type="submit" value="Publish" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
