import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

// Mock function for getSchnorrAccount
const getSchnorrAccount = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    address: '0x' + Math.random().toString(16).substr(2, 40),
    privateKey: Math.random().toString(16).substr(2, 64),
    transactionSigningKey: Math.random().toString(16).substr(2, 64),
  };
};

const CreateAccount: React.FC = () => {
  const [isCreating, setIsCreating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setWalletInfo } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    const createAccount = async () => {
      try {
        const newAccount = await getSchnorrAccount();
        const newWalletInfo = {
          address: newAccount.address,
          privateKey: newAccount.privateKey,
          transactionSigningKey: newAccount.transactionSigningKey,
          balance: '0',
          transactions: [],
        };
        setWalletInfo(newWalletInfo);
        setIsCreating(false);
        setTimeout(() => navigate('/wallet'), 2000);
      } catch (error) {
        console.error('Error creating account:', error);
        setError('An error occurred while creating your account. Please try again.');
        setIsCreating(false);
      }
    };

    createAccount();
  }, [setWalletInfo, navigate]);

  const handleCancel = () => {
    navigate('/');
  };

  const handleRetry = () => {
    setIsCreating(true);
    setError(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Creating Your Aztec Wallet
        </h1>
        {isCreating ? (
          <div data-testid="creating-account" className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-xl mb-4">Creating Account...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full w-1/2"></div>
            </div>
            <button 
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        ) : error ? (
          <div data-testid="account-error" className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={handleRetry}
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Retry
            </button>
          </div>
        ) : (
          <div data-testid="account-created" className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <p className="text-xl mb-4">Account created successfully!</p>
            <p>Redirecting to wallet...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;