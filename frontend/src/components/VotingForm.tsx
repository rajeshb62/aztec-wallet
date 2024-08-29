import React, { useState } from 'react';
import { castVote } from '../utils/contractInteraction';

const VotingForm: React.FC = () => {
  const [candidate, setCandidate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Voting...');
    try {
      const success = await castVote(parseInt(candidate));
      setStatus(success ? 'Vote cast successfully!' : 'Vote failed');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
        placeholder="Enter candidate number"
      />
      <button type="submit">Vote</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default VotingForm;