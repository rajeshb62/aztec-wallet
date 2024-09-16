import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Common.module.css';

const Wallet: React.FC = () => {
  const { walletInfo } = useWallet();
  const navigate = useNavigate();
  const [showWalletHome, setShowWalletHome] = useState(false);

  if (!walletInfo) {
    return (
      <div className={styles.container}>
        <p>No wallet information available.</p>
        <button className={styles.button} onClick={() => navigate('/create-account')}>Create Account</button>
      </div>
    );
  }

  if (showWalletHome) {
    return <WalletHome />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wallet</h1>
      <div className={styles.infoBox}>
        <p><strong>Address:</strong> {walletInfo.address}</p>
        <p><strong>Private Key:</strong> {walletInfo.privateKey}</p>
        <p><strong>Transaction Signing Key:</strong> {walletInfo.transactionSigningKey}</p>
      </div>
      <p className={styles.warning}>Warning: Never share your private key or transaction signing key!</p>
      <button className={styles.button} onClick={() => setShowWalletHome(true)}>Done</button>
    </div>
  );
};

const WalletHome: React.FC = () => {
  const { walletInfo } = useWallet();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wallet Home</h1>
      <div className={styles.infoBox}>
        <p><strong>Address:</strong> {walletInfo?.address}</p>
      </div>
      {/* Add more wallet functionality here */}
    </div>
  );
};

export default Wallet;