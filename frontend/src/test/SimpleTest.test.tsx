import React, { ReactElement } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { WalletProvider, WalletInfo } from '../context/WalletContext';
import Home from '../pages/Home';
import Wallet from '../pages/Wallet';
import CreateAccount from '../pages/CreateAccount';
import { act } from 'react-dom/test-utils';

// Mock the Aztec.js functions
jest.mock('@aztec/aztec.js', () => ({
  createPXEClient: jest.fn(),
  Fr: { 
    random: jest.fn().mockReturnValue({
      toString: () => 'mocked-private-key'
    })
  },
  GrumpkinScalar: { 
    random: jest.fn().mockReturnValue({
      toString: () => 'mocked-signing-key'
    })
  },
}));

jest.mock('@aztec/accounts/schnorr', () => ({
  getSchnorrAccount: jest.fn().mockReturnValue({
    getWallet: jest.fn().mockResolvedValue({
      getAddress: jest.fn().mockReturnValue({
        toString: jest.fn().mockReturnValue('mocked-address'),
      }),
    }),
  }),
}));

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('Aztec Wallet App', () => {
  test('renders home page with create account and sign in options', () => {
    renderWithRouter(<WalletProvider><Home /></WalletProvider>);
    expect(screen.getByText('Welcome to Aztec Wallet')).toBeInTheDocument();
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByText('Already have an account? Sign in')).toBeInTheDocument();
  });

  test('clicking sign in logs to console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    renderWithRouter(<WalletProvider><Home /></WalletProvider>);
    fireEvent.click(screen.getByText('Already have an account? Sign in'));
    expect(consoleSpy).toHaveBeenCalledWith('Already have an account? Sign in');
    consoleSpy.mockRestore();
  });

  test('create account process', async () => {
    await act(async () => {
      renderWithRouter(<WalletProvider><CreateAccount /></WalletProvider>);
    });
    
    expect(screen.getByTestId('creating-account')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByTestId('account-created')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('Continue to Wallet')).toBeInTheDocument();
  });

  test('wallet view displays correct information', () => {
    const mockWalletInfo: WalletInfo = {
      address: '0x1234567890123456789012345678901234567890',
      balance: '100',
      transactions: [],
      privateKey: 'mock-private-key',
      transactionSigningKey: 'mock-transaction-signing-key'
    };

    render(
      <MemoryRouter>
        <WalletProvider initialWalletInfo={mockWalletInfo}>
          <Wallet />
        </WalletProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Your Wallet')).toBeInTheDocument();
    expect(screen.getByText(/Address:/)).toBeInTheDocument();
    expect(screen.getByText('100 ETH')).toBeInTheDocument();
    expect(screen.getByText('No transactions yet.')).toBeInTheDocument();
  });
});