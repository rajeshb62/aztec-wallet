import React, { useState, useEffect } from 'react';
import { CompleteAddress, PXE, createPXEClient, waitForPXE } from "@aztec/aztec.js";

const AztecIntegration: React.FC = () => {
  const [pxe, setPxe] = useState<PXE | null>(null);
  const [accounts, setAccounts] = useState<CompleteAddress[]>([]);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setupSandbox = async () => {
      try {
        const PXE_URL = 'http://localhost:8080';
        const pxeClient = createPXEClient(PXE_URL);
        await waitForPXE(pxeClient);
        setPxe(pxeClient);

        const fetchedAccounts = await pxeClient.getRegisteredAccounts();
        setAccounts(fetchedAccounts);

        const currentBlockNumber = await pxeClient.getBlockNumber();
        setBlockNumber(currentBlockNumber);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      }
    };

    setupSandbox();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pxe) {
    return <div>Loading Aztec environment...</div>;
  }

  return (
    <div>
      <h2>Aztec Integration</h2>
      <h3>Accounts:</h3>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>{account.address.toString()}</li>
        ))}
      </ul>
      <h3>Current Block Number: {blockNumber}</h3>
    </div>
  );
};

export default AztecIntegration;