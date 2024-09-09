import React, { useState } from 'react';
import { createPXEClient, Fr, GrumpkinScalar, AccountWallet } from '@aztec/aztec.js';
import { getSchnorrAccount } from '@aztec/accounts/schnorr';

const App: React.FC = () => {
    const [status, setStatus] = useState<string>('');
    const [showDeployAccount, setShowDeployAccount] = useState(false);
    const [walletInfo, setWalletInfo] = useState<{
        address: string;
        privateKey: string;
        transactionSigningKey: string;
    } | null>(null);

    const handleCreateAccount = async () => {
        setStatus('Deploying account...');
        setShowDeployAccount(true);

        try {
            // Simulate a delay to allow the "Deploying account..." status to be visible
            await new Promise(resolve => setTimeout(resolve, 100));

            const PXE_URL = 'http://localhost:8080';
            const pxe = createPXEClient(PXE_URL);
            const secretKey = Fr.random();
            const signingPrivateKey = GrumpkinScalar.random();
            
            // Create the account without waiting for setup
            const account = getSchnorrAccount(pxe, secretKey, signingPrivateKey);
            
            // Get the wallet
            const wallet: AccountWallet = await account.getWallet();
            
            // Get the address
            const address = wallet.getAddress();
            
            console.log(`Account created with address: ${address.toString()}`);
            setStatus(`Account created successfully!`);
            setWalletInfo({
                address: address.toString(),
                privateKey: secretKey.toString(),
                transactionSigningKey: signingPrivateKey.toString(),
            });
        } catch (err) {
            console.error(`Error in deployment script:`, err);
            setStatus('Deployment failed. Check console for details.');
        }
    };

    const handleSignIn = () => {
        console.log('Sign In clicked');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1>Welcome to Aztec Wallet</h1>
            {!showDeployAccount ? (
                <>
                    <button onClick={handleCreateAccount} style={{ margin: '10px', padding: '10px 20px' }}>
                        Create an Account
                    </button>
                    <p onClick={handleSignIn} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        Sign in if you already have an account
                    </p>
                </>
            ) : (
                <div>
                    <h2>Account Creation</h2>
                    <p>{status}</p>
                    {walletInfo && (
                        <div style={{ textAlign: 'left', marginTop: '20px' }}>
                            <h3>Account Information</h3>
                            <p><strong>Address:</strong> {walletInfo.address}</p>
                            <p><strong>Private Key:</strong> {walletInfo.privateKey}</p>
                            <p><strong>Transaction Signing Key:</strong> {walletInfo.transactionSigningKey}</p>
                            <p style={{ color: 'red' }}>
                                Please save your Private Key and Transaction Signing Key securely. 
                                They will not be shown again!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
