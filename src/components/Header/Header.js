import "./Header.css";
import logo from "../../assets/img/logo.png";
import Gamepad from "../../assets/img/Gamepad.png";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="logocontainer">
        <img src={logo} alt="" className="logo" />
        <img src={Gamepad} alt="" className="gamepad_img" />
      </Link>
      <div className="ongletBtn">
        <Link to="/mycollection">
          <button>My Collection</button>
        </Link>

        <Link to="/signup">
          <button>Sign up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
