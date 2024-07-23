import "../styles/header.css";
import headerLogo from "../assets/headerlogo.png";
import accountIcon from "../assets/account.svg";
import dropdown from "../assets/dd.svg";
import cartIcon from "../assets/cart2.svg";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
import { VscHistory } from "react-icons/vsc";

function Header({ cartCount, setCartVisible }) {
  return (
    <div className="header-container">
      <header className="header">
        <Link to="/">
          <img src={headerLogo} alt="" className="header-logo" />
        </Link>
        <ul className="navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/top-elixers">Top Elixirs</Link>
          </li>
          <li>
            <Link to="/brands">Brands</Link>
          </li>


          <li className="pages">
            Know Us <img className="dd" src={dropdown} alt="dropdown icon" />
            <ul className="dropdown-content">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
              <li>
                <Link to="/policies">Policies</Link>
              </li>
            </ul>
          </li>

        </ul>

        <div className="head-icons-container">
          <Search />
          <Link to="/account">
            {" "}
            <img
              src={accountIcon}
              alt="account-icon"
              className="account-icon head-icons"
            />{" "}
          </Link>

          <span className="wishlist-icon-container">
            <Link to="/wishlist">
              {" "}
              <VscHistory
                color="white"
                size={25}
              />
              {" "}
            </Link>
          </span>

          <span className="cart-icon-container">
            <img
              onClick={() => setCartVisible((preview) => !preview)}
              src={cartIcon}
              alt=""
              className="cart-icon head-icons"
            />
            {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
          </span>
        </div>
      </header>
    </div>
  );
}

export default Header;
