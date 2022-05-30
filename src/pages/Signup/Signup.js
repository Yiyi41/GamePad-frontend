import "./Signup.css";
import logo from "../../assets/img/logo.png";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ setUserData }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState(""); // /src/assets/img/logo.png");
  const [alert, setAlert] = useState("😎 Welcome!");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handle submit");
    // console.log(username, email, password);
    if (!username || !email) {
      setAlert("username et email sont obligatoires!");
    } else if (password !== confirmPassword) {
      setAlert("password et confirmPass doivent être identiques!");
    }
    console.log("picture path: " + picture);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", picture);
    // console.log(formData);

    try {
      const response = await axios.post(
        "https://my-gamepad-backend-projet.herokuapp.com/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.token) {
        setUserData(response.data.token, response.data.id);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="content-container">
      <Link to="/">
        <img src={logo} alt="" className="img-logo" />
      </Link>

      <div className="instruction-container">
        <h3>How it works?</h3>

        <div>
          <FontAwesomeIcon icon="user" />
          <p>
            Login to your free account to be
            <br /> able to get all features of Gamepad
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
              setEmail(event.target.value.toLowerCase());
            }}
          />
          <div className="password-btn">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value.toLowerCase());
              }}
            />
            <input
              type="text"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value.toLowerCase());
              }}
            />
          </div>

          <input
            type="file"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
          <p className="alert">{alert}</p>
          <input
            type="submit"
            className="valid-input"
            value="Creat my account"
          />
          <Link to="/login" className="account-already">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
