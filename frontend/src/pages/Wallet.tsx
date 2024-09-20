import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';

const Wallet: React.FC = () => {
  const { walletInfo } = useWallet();
  const navigate = useNavigate();
  const [showWalletHome, setShowWalletHome] = useState(false);

  if (!walletInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <p className="text-xl text-center mb-4">No wallet information available.</p>
          <button 
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            onClick={() => navigate('/create-account')}
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  if (showWalletHome) {
    return <WalletHome />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Wallet</h1>
        <div className="mb-4">
          <p className="font-bold mb-2">Address:</p>
          <div className="flex items-center">
            <code className="bg-gray-100 p-2 rounded break-all">{walletInfo.address}</code>
            <button 
              onClick={() => copyToClipboard(walletInfo.address)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-bold mb-2">Private Key:</p>
          <code className="bg-gray-100 p-2 rounded break-all block">{walletInfo.privateKey}</code>
        </div>
        <div className="mb-4">
          <p className="font-bold mb-2">Transaction Signing Key:</p>
          <code className="bg-gray-100 p-2 rounded break-all block">{walletInfo.transactionSigningKey}</code>
        </div>
        <p className="text-red-500 font-bold mb-4">Warning: Never share your private key or transaction signing key!</p>
        <button 
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          onClick={() => setShowWalletHome(true)}
        >
          Done
        </button>
      </div>
    </div>
  );
};

const WalletHome: React.FC = () => {
  const { walletInfo } = useWallet();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Wallet Home</h1>
        <div className="mb-4">
          <p className="font-bold mb-2">Address:</p>
          <code className="bg-gray-100 p-2 rounded break-all block">{walletInfo?.address}</code>
        </div>
        {/* Add more wallet functionality here */}
      </div>
    </div>
  );
};

export default Wallet;