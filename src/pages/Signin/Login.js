import "../Signup/Signup.css";
import logo from "../../assets/img/logo.png";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [email, setEmail] = useState("toto@gmail.com");
  const [password, setPassword] = useState("jklm");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        navigate("/");
      }
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
    </div>
  );
};

export default Login;
