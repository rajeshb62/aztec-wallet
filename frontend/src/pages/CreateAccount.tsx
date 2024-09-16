import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

// Mock function for getSchnorrAccount
const getSchnorrAccount = async () => {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    address: '0x' + Math.random().toString(16).substr(2, 40),
    privateKey: Math.random().toString(16).substr(2, 64),
    transactionSigningKey: Math.random().toString(16).substr(2, 64),
  };
};

const CreateAccount: React.FC = () => {
  const [isCreating, setIsCreating] = useState(true);
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
        setIsCreating(false);
      }
    };

    createAccount();
  }, [setWalletInfo, navigate]);

  if (isCreating) {
    return <div data-testid="creating-account">Creating Account...</div>;
  }

  return <div data-testid="account-created">Account created! Redirecting to wallet...</div>;
};

export default CreateAccount;