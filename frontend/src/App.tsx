import React, { useState } from 'react';
import { createPXEClient } from '@aztec/aztec.js';
import { getSchnorrAccount } from '@aztec/accounts/schnorr';
import { Fr, GrumpkinScalar } from '@aztec/aztec.js';
import AztecIntegration from './utils/AztecIntegration';

const DeployAccount = () => {
    const [status, setStatus] = useState('');

    const deployAccount = async () => {
        setStatus('Deploying account...');

        try {
            const PXE_URL = 'http://localhost:8080'; // Ensure your sandbox is running on this URL
            const pxe = createPXEClient(PXE_URL);
            const secretKey = Fr.random();
            const signingPrivateKey = GrumpkinScalar.random();
            const wallet = await getSchnorrAccount(pxe, secretKey, signingPrivateKey).waitSetup();
             // Add logging to check if the wallet object is serialized correctly
            console.log(`Account contract deployed with address: ${wallet.getCompleteAddress().address}`);
            console.log(`Serialized wallet object: ${JSON.stringify(wallet)}`);
            setStatus(`Account contract deployed with address: ${wallet.getCompleteAddress().address}`);
        } catch (err) {
            console.error(`Error in deployment script: ${err}`);
            setStatus('Deployment failed. Check console for details.');
        }
    };

    return (
        <div>
            <button onClick={deployAccount}>Deploy Account</button>
            <p>{status}</p>
            <AztecIntegration />
        </div>
    );
};

export default DeployAccount;
