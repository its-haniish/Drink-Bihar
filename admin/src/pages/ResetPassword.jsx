import React, { useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [error, setError] = useState('');
    const otpRef = useRef('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const sendOtp = (e) => {
        e.preventDefault();
        // Logic to send OTP to the user's email
        // For simplicity, we'll use a static OTP here
        otpRef.current = '123456'; // In a real-world application, generate a random OTP
        setIsOtpSent(true);
        console.log('OTP sent to:', email);
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        const enteredOtp = e.target.otp.value;
        if (enteredOtp === otpRef.current) {
            setIsVerified(true);
            setError('');
        } else {
            setError('Invalid OTP. Please try again.');
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Logic to handle password reset
        // Simulating a successful reset
        if (e.target.password.value === "newpassword") {
            setIsPasswordChanged(true);
            setError('');
        } else {
            setError('Password reset failed. Please try again.');
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg">
                <div className="flex items-center justify-between">
                    <FaArrowLeft
                        className="h-6 w-6 text-gray-700 cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="text-2xl font-bold text-center flex-1">Reset Password</h1>
                </div>
                {!isOtpSent ? (
                    <form className="space-y-4" onSubmit={sendOtp}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                                onChange={handleEmailChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Send OTP
                        </button>
                    </form>
                ) : !isVerified ? (
                    <form className="space-y-4" onSubmit={verifyOtp}>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Verify OTP
                        </button>
                    </form>
                ) : (
                    <>
                        {!isPasswordChanged ? (
                            <form className="space-y-4" onSubmit={handleResetPassword}>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Reset Password
                                </button>
                            </form>
                        ) : (
                            <div className="text-center">
                                <p className="text-green-600">Password changed successfully!</p>
                                <NavLink
                                    to="/login"
                                    className="inline-block px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Go to Login
                                </NavLink>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default ResetPassword;
