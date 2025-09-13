import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../UserContext";

// This file is a self-contained React component that can be used within a larger application.
// For styling to work, a Tailwind CSS CDN link is required in the main HTML file.

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { setUserRole } = useUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (email.includes('@doctor')) {
            setUserRole("doctor"); 
            navigate("/doctor")
        } else {
            setUserRole("patient");
            navigate("/patient")
        } 
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-xl space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome to Acko Medical Consult</h1>
                    <p className="mt-2 text-sm text-gray-600">Please enter your email to log in.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
