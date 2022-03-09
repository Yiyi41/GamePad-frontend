import "./Header.css";
import logo from "../../assets/img/logo.png";
import Gamepad from "../../assets/img/Gamepad.png";
import Cookies from "js-cookie";

import { Link, useNavigate } from "react-router-dom";

const Header = ({ setUserData, userToken }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <Link to="/" className="logocontainer">
        <img src={logo} alt="" className="logo" />
        <img src={Gamepad} alt="" className="gamepad_img" />
      </Link>
      <div className="ongletBtn">
        <button>My Collection</button>
        {userToken ? (
          <button
            onClick={() => {
              setUserData(null);
              Cookies.remove("userToken");
              Cookies.remove("userId");
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <div>
            <Link to="/signup">
              <button>Sign up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
