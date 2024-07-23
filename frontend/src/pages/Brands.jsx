import { useState, useEffect } from "react";
import "../styles/top-elixers.css";
import Header from "../components/Header.jsx";
import BottomBar from "../components/BottomBar.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";


function Brands() {




    return (
        <>

            <Header />

            <div class="water">
                <span>Our Brands</span>
                <span>Our Brands</span>
            </div>

            <div className="all-products-container"  >

                <div className="all-products">

                    <div className="all-product"
                        style={{
                            background: "none",
                            backgroundImage: 'url("https://wallpapercave.com/wp/wp13687098.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "contain"
                        }}
                    >
                        <div className="all-product-details">
                            <h3 className="all-product-name">
                                <Link to={`/brands`}
                                    style={{
                                        letterSpacing: '2px',
                                        textDecoration: 'underline',
                                        color: '#C660D6',
                                        fontFamily: 'Ga Maamli, sans-serif',
                                    }}
                                >
                                    Brands
                                </Link>
                            </h3>

                            <p className="all-product-size">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum non minima rem quis? Tempore dolorem explicabo corporis repudiandae illum velit! Praesentium vitae quo inventore saepe ad dolorum aperiam quod vero.
                            </p>

                            <div className="all-products-btns">
                                <button class="shop_now_btn"> Shop now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="all-product"
                        style={{
                            background: "none",
                            backgroundImage: 'url("https://wallpapercave.com/wp/wp3994472.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "contain"
                        }}
                    >
                        <div className="all-product-details">
                            <h3 className="all-product-name">
                                <Link to={`/brands`}
                                    style={{
                                        letterSpacing: '2px',
                                        textDecoration: 'underline',
                                        color: '#C660D6',
                                        fontFamily: 'Ga Maamli, sans-serif',
                                    }}
                                >
                                    Brands
                                </Link>
                            </h3>

                            <p className="all-product-size">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum non minima rem quis? Tempore dolorem explicabo corporis repudiandae illum velit! Praesentium vitae quo inventore saepe ad dolorum aperiam quod vero.
                            </p>

                            <div className="all-products-btns">
                                <button class="shop_now_btn"> Shop now
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="all-product"
                        style={{
                            background: "none",
                            backgroundImage: 'url("https://wallpapercave.com/wp/wp13687098.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "contain"
                        }}
                    >
                        <div className="all-product-details">
                            <h3 className="all-product-name">
                                <Link to={`/brands`}
                                    style={{
                                        letterSpacing: '2px',
                                        textDecoration: 'underline',
                                        color: '#C660D6',
                                        fontFamily: 'Ga Maamli, sans-serif',
                                    }}
                                >
                                    Brands
                                </Link>
                            </h3>

                            <p className="all-product-size">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum non minima rem quis? Tempore dolorem explicabo corporis repudiandae illum velit! Praesentium vitae quo inventore saepe ad dolorum aperiam quod vero.
                            </p>

                            <div className="all-products-btns">
                                <button class="shop_now_btn"> Shop now
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="all-product"
                        style={{
                            background: "none",
                            backgroundImage: 'url("https://wallpapercave.com/wp/wp3994472.jpg")',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: "contain"
                        }}
                    >
                        <div className="all-product-details">
                            <h3 className="all-product-name">
                                <Link to={`/brands`}
                                    style={{
                                        letterSpacing: '2px',
                                        textDecoration: 'underline',
                                        color: '#C660D6',
                                        fontFamily: 'Ga Maamli, sans-serif',
                                    }}
                                >
                                    Brands
                                </Link>
                            </h3>

                            <p className="all-product-size">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum non minima rem quis? Tempore dolorem explicabo corporis repudiandae illum velit! Praesentium vitae quo inventore saepe ad dolorum aperiam quod vero.
                            </p>

                            <div className="all-products-btns">
                                <button class="shop_now_btn"> Shop now
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
            <BottomBar />
        </>
    );
}

export default Brands;
