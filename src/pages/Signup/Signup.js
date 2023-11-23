import "./Signup.css";
import logo from "../../assets/img/logo.png";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInstructions from "../../components/FormInstructions/FormInstructions";

const Signup = ({ setUserData }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email) {
      setAlert("username et email sont obligatoires!");
    } else if (password !== confirmPassword) {
      setAlert("password et confirmPass doivent être identiques!");
    }
    // console.log("picture path: " + picture);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "https://my-gamepad-backend-projet.herokuapp.com/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
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
        <img src={logo} alt="logo" className="img-logo" />
      </Link>

      <FormInstructions />

      <form className="form-container" onSubmit={handleSubmit}>
        <p className="form-title">Signup</p>
        <input
          className="userName"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value.toLowerCase());
          }}
        />
        <div className="passwordInputContainer">
          <input
            className="psw"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value.toLowerCase());
            }}
          />
          <input
            className="pswConfirm"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value.toLowerCase());
            }}
          />
        </div>
        <span className="noteInputFile">
          * You can upload an image for your profil
        </span>
        <div className="fileContainer">
          <div className="fileInputContainer">
            <span className="browse">Browse files</span>
            <input
              className="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />
          </div>
          {picture.name ? (
            <span className="fileName">{picture.name}</span>
          ) : (
            <span className="fileName">No file selected</span>
          )}
        </div>

        <span className="alert">{alert}</span>
        <input type="submit" className="submitBtn" value="Create" />
        <Link to="/login" className="account-already">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Signup;
