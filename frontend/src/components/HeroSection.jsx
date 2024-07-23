import "../styles/herosection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-container">
      <div className="hero-background-image"></div>
      <h1 className="hero-heading">India's Finest Liquors</h1>
      <p className="hero-subtitle">
        A Sip of Authenticity, Directly from the Vintage Seller to Your Glass
      </p>
      <Link to="/all-products">
        <button className="shop-now">Explore</button>
      </Link>
    </div>
  );
}

export default HeroSection;
