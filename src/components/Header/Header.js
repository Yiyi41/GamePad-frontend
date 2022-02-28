import "./Header.css";
import logo from "../../assets/img/logo.png";
import Gamepad from "../../assets/img/Gamepad.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logocontainer">
        <img src={logo} alt="" className="logo" />
        <img src={Gamepad} alt="" className="gamepad_img" />
      </div>
      <div className="ongletBtn">
        <button>My Collection</button>
        <button>Sign up</button>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Header;
