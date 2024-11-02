import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccount } from '../aztec';
import { useWallet } from '../context/WalletContext';
import { createHash } from 'crypto';

// Function to hash a string
const stringToHash = (inputString: string): string => {
  // Hash the input string using SHA-256
  return createHash('sha256').update(inputString).digest('hex');
};

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setWalletInfo } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailDerivedEncryptionKey = stringToHash(email);
    const passwordDerivedSigningKey = stringToHash(password);

    console.log('Email-derived encryption key:', emailDerivedEncryptionKey);
    console.log('Password-derived signing key:', passwordDerivedSigningKey);

    try {
      const accountInfo = await fetchAccount(emailDerivedEncryptionKey, passwordDerivedSigningKey);
      console.log('Account fetched:', accountInfo);

      // Update the wallet context with the new account info
      setWalletInfo({
        address: accountInfo.address,
        balance: '0', // You might want to fetch the actual balance here
        transactions: [],
        encryptionSecretKey: emailDerivedEncryptionKey,
        signingSecretKey: passwordDerivedSigningKey,
      });

      // Navigate to the wallet page
      navigate('/wallet');
    } catch (error) {
      console.error('Error fetching account:', error);
      setError('Failed to fetch account. Please check your email and password and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign In to Your Wallet
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Enter email ID
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => console.log('Email entered:', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Enter your Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
