import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { NavLink } from 'react-router-dom';
import { autoLogin } from './utils/handleAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';

const messagesAndButtons = [
  {
    message: "Welcome back! Ready to check your latest orders?",
    buttonText: "Check Orders",
    buttonLink: "/orders",
    buttonColor: "bg-indigo-600"
  },
  {
    message: "Excited to add new products? Let's get started!",
    buttonText: "Add Product",
    buttonLink: "/add-product",
    buttonColor: "bg-green-600"
  },
  {
    message: "Explore all your products and manage them easily.",
    buttonText: "All Products",
    buttonLink: "/all-products",
    buttonColor: "bg-blue-600"
  },
  {
    message: "Manage your product categories effectively.",
    buttonText: "Manage Categories",
    buttonLink: "/manage-categories",
    buttonColor: "bg-purple-600"
  },
  {
    message: "Organize and update your brands here.",
    buttonText: "Manage Brands",
    buttonLink: "/manage-brands",
    buttonColor: "bg-teal-600"
  }
];

const App = () => {
  const randomIndex = Math.floor(Math.random() * messagesAndButtons.length);
  const { message, buttonText, buttonLink, buttonColor } = messagesAndButtons[randomIndex];
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      autoLogin(dispatch, navigate, setIsLoading);
    }
  }, [])
  return (
    <>
      <Navbar />
      {isLoading && <Loading />}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-4">
        <div className="text-center p-6 max-w-lg w-full bg-white shadow-md rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Welcome to Drink Bihar!</h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            {message}
          </p>
          <div className="mb-6">
            <NavLink
              to={buttonLink}
              className={`block px-4 py-2 sm:px-6 sm:py-3 text-white ${buttonColor} rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
            >
              {buttonText}
            </NavLink>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
