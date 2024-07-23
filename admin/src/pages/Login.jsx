import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleLogin } from '../utils/handleAuth';
import { useDispatch } from 'react-redux'
import Loading from '../components/Loading'

const Login = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginSeller = e => {
        e.preventDefault();
        handleLogin(formState.email, formState.password, setIsLoading, dispatch, navigate);

    }

    const handleChange = e => setFormState({ ...formState, [e.target.name]: e.target.value });


    return (
        <>
            {isLoading && <Loading />}
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <form className="space-y-4" onSubmit={loginSeller}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={handleChange}
                                readOnly={isLoading}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                                readOnly={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-gray-600">Don't have an account?</p>
                        <button onClick={() => navigate('/signup')}
                            className="w-full px-4 py-2 mt-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Sign Up
                        </button>
                        <p className="text-gray-600 mt-4">Forgot your password?</p>
                        <button onClick={() => navigate('/reset-password')}
                            className="w-full px-4 py-2 mt-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login
