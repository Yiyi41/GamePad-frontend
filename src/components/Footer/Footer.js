import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <p>
          Thanks to
          <Link to="https://rawg.io/apidocs"> RAWG API</Link>
        </p>
      </div>
      ;
    </>
  );
};

export default Footer;
