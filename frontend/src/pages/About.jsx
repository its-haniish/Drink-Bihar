import PagesHeader from "../components/PagesHeader.jsx";
import Footer from "../components/Footer.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../styles/about.css";

function About() {
  return (
    <div className="about-us-page">
      <PagesHeader />

      <main className="about-main-content">
        <section className="about-intro">
          <h1>About Drink Bihar</h1>
          <p className="tagline">
            A Sip of Authenticity, Directly from the Vintage Seller to Your Glass
          </p>
          <p>
            Nestled in the lush greenery, our company is dedicated to offering the finest selection of liquors. Our mission is to bring a variety of premium spirits from multiple brands and sellers directly to connoisseurs around the world. Explore our collection of top-quality liquors, discover authentic accessories, and find wholesale solutions to meet all your needs.
          </p>
        </section>

        <section className="our-mission">
          <h2>Our Mission</h2>
          <p>
            At Drink Bihar, we believe in the power of a single sip to connect you to the heritage and craftsmanship of fine liquors. Our commitment is to deliver this experience through our carefully curated selection of spirits, each promising an authentic taste and unmatched quality.
          </p>
        </section>

        <section className="our-products">
          <h2>Our Products</h2>
          <p>
            Explore our diverse range of products, including premium liquors from multiple brands, beautifully crafted glassware, and a variety of accessories. For those looking to stock up, we offer wholesale purchasing options.
          </p>
        </section>

        <section className="visit-us">
          <h2>Visit Us</h2>
          <p>
            Want to learn more or get in touch with us? Visit our <a href="/contact">Contact Page</a> and let's start a conversation. We're always here to help you explore the world of fine liquors.
          </p>
        </section>
      </main>

      <Footer />
      <BottomBar />
    </div>
  );
}

export default About;
