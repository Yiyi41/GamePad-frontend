import "./Signup.css";
import logo from "../../assets/img/logo.png";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ setUserData }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState();
  const [alert, setAlert] = useState("😎 Welcome!");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log(username, email, password);
    if (!username || !email) {
      setAlert("username et email sont obligatoires!");
    } else if (password !== confirmPassword) {
      setAlert("password et confirmPass doivent être identiques!");
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", picture);
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setUserData(response.data.token, response.data.id);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="content-container">
      <img src={logo} alt="" className="img-logo" />
      <div className="instruction-container">
        <h3>How it works?</h3>
        <div>
          <FontAwesomeIcon icon="user" />
          <p style={{ width: "250px" }}>
            Login to your free account to be able to get all features of Gamepad
          </p>
        </div>
        <div>
          <FontAwesomeIcon icon="bookmark" />
          <p>Add a game to your collection</p>
        </div>
        <div>
          <FontAwesomeIcon icon="message" />
          <p>Leave a review for a game</p>
        </div>
      </div>
      <div>
        <form className="form-container" onSubmit={handleSubmit}>
          <p className="form-title">Signup</p>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <div className="password-btn">
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </div>
          {/* <label for="upload-photo">Ajouter</label>  */}
          <input
            type="file"
            // name="photo"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          <p className="alert">{alert}</p>
          <input type="submit" className="valid-input" value="Connexion" />
          <Link to="/login" className="account-already">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
