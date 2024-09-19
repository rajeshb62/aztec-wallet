import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const handleSignIn = () => {
    console.log('Sign in if you already have an account');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to Aztec Wallet</h1>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleCreateAccount}
      >
        Create an Account
      </button>
      <p 
        className="text-blue-500 hover:text-blue-700 cursor-pointer"
        onClick={handleSignIn}
      >
        Sign in if you already have an account
      </p>
    </div>
  );
};

export default Home;