import React, { useState } from 'react';
import { createPXEClient, Fr, GrumpkinScalar, AccountWallet } from '@aztec/aztec.js';
import { getSchnorrAccount } from '@aztec/accounts/schnorr';
import './App.css';

const App: React.FC = () => {
    const [status, setStatus] = useState<string>('');
    const [showDeployAccount, setShowDeployAccount] = useState(false);
    const [showWalletView, setShowWalletView] = useState(false);
    const [walletInfo, setWalletInfo] = useState<{
        address: string;
        privateKey: string;
        transactionSigningKey: string;
    } | null>(null);

    const handleCreateAccount = async () => {
        setStatus('Deploying account...');
        setShowDeployAccount(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 100));

            const PXE_URL = 'http://localhost:8080';
            const pxe = createPXEClient(PXE_URL);
            const secretKey = Fr.random();
            const signingPrivateKey = GrumpkinScalar.random();
            
            const account = getSchnorrAccount(pxe, secretKey, signingPrivateKey);
            const wallet: AccountWallet = await account.getWallet();
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

    const handleDone = () => {
        setShowWalletView(true);
    };

    if (showWalletView && walletInfo) {
        return (
            <div className="wallet-view">
                <div className="address-bar">
                    <strong>Address:</strong> {walletInfo.address}
                </div>
                <h1>Wallet Home</h1>
                {/* Add more wallet functionality here */}
            </div>
        );
    }

    return (
        <div className="app-container">
            <h1>Welcome to Aztec Wallet</h1>
            {!showDeployAccount ? (
                <>
                    <button onClick={handleCreateAccount} className="create-account-button">
                        Create an Account
                    </button>
                    <p onClick={handleSignIn} className="sign-in-text">
                        Sign in if you already have an account
                    </p>
                </>
            ) : (
                <div className="account-creation">
                    <h2>Account Creation</h2>
                    <p>{status}</p>
                    {walletInfo && (
                        <div className="account-info">
                            <h3>Account Information</h3>
                            <p><strong>Address:</strong> {walletInfo.address}</p>
                            <p><strong>Private Key:</strong> {walletInfo.privateKey}</p>
                            <p><strong>Transaction Signing Key:</strong> {walletInfo.transactionSigningKey}</p>
                            <p className="warning-text">
                                Please save your Private Key and Transaction Signing Key securely. 
                                They will not be shown again!
                            </p>
                            <button onClick={handleDone} className="done-button">
                                Done
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
