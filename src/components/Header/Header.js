import "./Header.css";
import logo from "../../assets/img/logo.png";
import Gamepad from "../../assets/img/Gamepad.png";
import Cookies from "js-cookie";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = ({ setUserData, userToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className="header">
      <Link to="/" className="logocontainer">
        <img src={logo} alt="" className="logo" />
        <img src={Gamepad} alt="" className="gamepad_img" />
      </Link>
      <div className="ongletBtn">
        <div>
          <button
            className="myCollection-btn"
            onClick={() => {
              userToken ? navigate("/mycollection") : navigate("/login");
            }}
          >
            My Collection
          </button>
        </div>

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
          <div className="register-btn">
            {/* <Link to="/signup">
              <button>Sign up</button>
            </Link> */}
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
