import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Common.module.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const handleSignIn = () => {
    console.log('Sign in if you already have an account');
    // You can add sign-in logic here in the future
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Aztec Wallet</h1>
      <button className={styles.button} onClick={handleCreateAccount}>Create an Account</button>
      <p className={styles.link} onClick={handleSignIn} style={{cursor: 'pointer', marginTop: '20px'}}>
        Sign in if you already have an account
      </p>
    </div>
  );
};

export default Home;