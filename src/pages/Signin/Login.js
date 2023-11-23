import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import logo from "../../assets/img/logo.png";

import FormInstructions from "../../components/FormInstructions/FormInstructions";

const Login = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://my-gamepad-backend-projet.herokuapp.com/login",
        {
          email: email,
          password: password
        }
      );
      console.log(response);

      if (response.data.token) {
        setUserData(response.data.token, response.data.id);
        navigate("/");
      }
    } catch (error) {
      alert("Accès non autorisé");
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <Link to="/">
        <img src={logo} alt="logo" className="img-logo" />
      </Link>
      <FormInstructions />

      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Login</p>

        <input
          className="emailInput"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value.toLowerCase());
          }}
        />
        <input
          className="passwordInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value.toLowerCase());
          }}
        />
        <input type="submit" value="Login" className="loginBtn" />
        <Link to="/signup" className="linkToSignup">
          Don't have an account yet?
        </Link>
      </form>
    </div>
  );
};

export default Login;
