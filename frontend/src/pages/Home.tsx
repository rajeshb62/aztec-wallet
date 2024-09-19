import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const handleSignIn = () => {
    console.log('Already have an account? Sign in');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-gray-800 leading-tight">
          Welcome to Aztec Wallet
        </h1>
        <button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mb-6"
          onClick={handleCreateAccount}
        >
          Create an Account
        </button>
        <p 
          className="text-center text-blue-500 hover:text-blue-700 cursor-pointer transition duration-300 ease-in-out"
          onClick={handleSignIn}
        >
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
};

export default Home;