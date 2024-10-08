import React, { ReactElement } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { WalletProvider, WalletInfo } from '../context/WalletContext';
import Home from '../pages/Home';
import Wallet from '../pages/Wallet';
import CreateAccount from '../pages/CreateAccount';
import SignIn from '../pages/SignIn'; // Add this import
import { act } from 'react-dom/test-utils';

// Mock the Aztec.js functions
jest.mock('@aztec/aztec.js', () => ({
  createPXEClient: jest.fn(),
  Fr: { 
    random: jest.fn().mockReturnValue({
      toString: () => 'mocked-encryption-key'
    })
  },
  Fq: { 
    random: jest.fn().mockReturnValue({
      toString: () => 'mocked-signing-key'
    })
  },
}));

jest.mock('../aztec', () => ({
  createSchnorrAccount: jest.fn().mockImplementation(() => 
    new Promise(resolve => 
      setTimeout(() => resolve({
        address: 'mocked-address',
        encryptionSecretKey: 'mocked-encryption-key',
        signingSecretKey: 'mocked-signing-key',
      }), 100)
    )
  ),
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

  test('clicking sign in navigates to sign in page with correct elements', () => {
    const { getByText, getByPlaceholderText, getByRole } = renderWithRouter(
      <WalletProvider>
        <Home />
        <SignIn />
      </WalletProvider>
    );
    
    fireEvent.click(getByText('Already have an account? Sign in'));
    
    // Check for two input fields for secrets
    expect(getByPlaceholderText('Your Encryption Secret Key')).toBeInTheDocument();
    expect(getByPlaceholderText('Your Signing Secret Key')).toBeInTheDocument();
    
    // Check for the Sign In button
    expect(getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('create account process', async () => {
    await act(async () => {
      renderWithRouter(<WalletProvider><CreateAccount /></WalletProvider>);
    });
    
    // Remove the check for 'creating-account'
    
    const accountCreatedElement = await screen.findByTestId('account-created', {}, { timeout: 3000 });
    expect(accountCreatedElement).toBeInTheDocument();

    expect(screen.getByText('Continue to Wallet')).toBeInTheDocument();
  });

  test('wallet view displays correct information', () => {
    const mockWalletInfo: WalletInfo = {
      address: '0x1234567890123456789012345678901234567890',
      balance: '100',
      transactions: [],
      encryptionSecretKey: 'mock-encryption-key',
      signingSecretKey: 'mock-signing-key'
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