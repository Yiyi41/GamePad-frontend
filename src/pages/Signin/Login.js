import "../Signup/Signup.css";
import logo from "../../assets/img/logo.png";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          password: password,
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
    <div className="content-container">
      <Link to="/">
        <img src={logo} alt="" className="img-logo" />
      </Link>

      <div className="instruction-container">
        <h3>How it works?</h3>
        <div>
          <FontAwesomeIcon icon="user" />
          <p>
            Login to your free account to be <br />
            able to get all features of Gamepad
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

      <form className="form-container" onSubmit={handleSubmit}>
        <p className="form-title">Login</p>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input type="submit" value="Login" className="valid-input" />
        <Link to="/signup" className="account-already">
          Don't have an account yet?
        </Link>
      </form>
    </div>
  );
};

export default Login;
