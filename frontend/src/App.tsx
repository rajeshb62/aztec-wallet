import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import Wallet from './pages/Wallet';
import styles from './styles/Common.module.css';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
