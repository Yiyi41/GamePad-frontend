import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FormInstructions.css";

export default function FormInstructions() {
  return (
    <div className="instruction-container">
      <h3>How it works?</h3>

      <div>
        <FontAwesomeIcon icon="user" />
        <p className="instruction">
          Login to your free account to be
          <br /> able to get all features of Gamepad
        </p>
      </div>
      <div>
        <FontAwesomeIcon icon="bookmark" />
        <p className="instruction">Add a game to your collection</p>
      </div>
      <div>
        <FontAwesomeIcon icon="message" />
        <p className="instruction">Leave a review for a game</p>
      </div>
    </div>
  );
}
