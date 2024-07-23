import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { handleSendEmail, handleSignup } from '../utils/handleAuth';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux'

const Signup = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        name: '',
        city: ''
    });
    const [section, setSection] = useState('form');
    const [isLoading, setIsLoading] = useState(false);
    const otpRef = useRef('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const sendOtp = async (e) => {
        e.preventDefault();
        const { email, name, password, city } = formState;
        if (!name) {
            alert('Name is required.');
            return;
        }
        if (!email) {
            alert('Email is required.');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Invalid email format.');
            return;
        }
        if (!password) {
            alert('Password is required.');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        if (!city) {
            alert('City is required.');
            return;
        }
        otpRef.current = Math.floor(Math.random() * 1000000).toString();
        const subject = 'Drink Bihar Verification';
        const msg = `
            <h1>Hey, ${name}</h1>
            <h2>Your verification code is: <strong>${otpRef.current}</strong>.</h2>
        `;
        handleSendEmail(email, subject, msg, 'signup', true, setIsLoading, setSection)
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        const enteredOtp = e.target.otp.value;
        if (enteredOtp === otpRef.current) {
            const { email, name, password, city } = formState;
            handleSignup(name, email, password, city, setIsLoading, setSection, dispatch);
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                    <div className="flex items-center justify-between">
                        <FaArrowLeft
                            className="h-6 w-6 text-gray-700 cursor-pointer"
                            onClick={() => navigate('/login')}
                        />
                        <h1 className="text-2xl font-bold text-center flex-1">Signup</h1>
                    </div>
                    {section === 'form' && (
                        <form className="space-y-4" onSubmit={sendOtp}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    readOnly={isLoading}
                                    onChange={handleInputChange}

                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    readOnly={isLoading}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    readOnly={isLoading}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    readOnly={isLoading}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Send OTP
                            </button>
                        </form>
                    )}
                    {section === 'otp' && (
                        <form className="space-y-4" onSubmit={verifyOtp}>
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    readOnly={isLoading}
                                    className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Verify OTP
                            </button>
                        </form>
                    )}
                    {section === 'success' && (
                        <div className="text-center">
                            <p className="text-green-600">Email verified successfully!</p>
                            <p className="text-sm text-gray-600">You can now proceed with your account creation.</p>
                            <NavLink
                                to="/"
                                className="inline-block px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Go to Home
                            </NavLink>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Signup;
