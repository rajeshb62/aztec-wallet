import React, { useState, useEffect } from 'react';
import { getVotes } from '../utils/contractInteraction';

const VoteResults: React.FC = () => {
  const [results, setResults] = useState<Record<string, bigint>>({});

  useEffect(() => {
    const fetchResults = async () => {
      const candidates = [1, 2, 3]; // Example candidate numbers
      const fetchedResults: Record<string, bigint> = {};
      for (const candidate of candidates) {
        fetchedResults[candidate] = await getVotes(candidate);
      }
      setResults(fetchedResults);
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Vote Results</h2>
      <ul>
        {Object.entries(results).map(([candidate, votes]) => (
          <li key={candidate}>Candidate {candidate}: {votes.toString()} votes</li>
        ))}
      </ul>
    </div>
  );
};

export default VoteResults;