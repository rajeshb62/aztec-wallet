import React, { useEffect } from 'react';
import VotingForm from './components/VotingForm';
import VoteResults from './components/VoteResults';
import { initializeContract } from './utils/contractInteraction';

const App: React.FC = () => {
  useEffect(() => {
    initializeContract().catch(console.error);
  }, []);

  return (
    <div>
      <h1>Easy Private Voting</h1>
      <VotingForm />
      <VoteResults />
    </div>
  );
};

export default App;