import React from 'react';
import AztecIntegration from './utils/AztecIntegration';
import { createSchnorrAccount } from './aztec'; // Import the function to create Schnorr account

const App: React.FC = () => {

  const handleCreateAccount = async () => {
    try {
      const account = await createSchnorrAccount();
      console.log('Account created:', account);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Aztec Wallet</h1>
      <button onClick={handleCreateAccount}>Create Account</button>
      <AztecIntegration />
    </div>
  );
};

export default App;