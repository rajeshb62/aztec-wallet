import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

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

describe('App Component', () => {
  test('renders initial layout correctly', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Aztec Wallet')).toBeInTheDocument();
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByText('Sign in if you already have an account')).toBeInTheDocument();
  });

  test('clicking Create an Account button starts deployment process', async () => {
    render(<App />);
    const createAccountButton = screen.getByText('Create an Account');
    
    fireEvent.click(createAccountButton);
    
    await waitFor(() => {
      expect(screen.getByText('Deploying account...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Account created successfully!')).toBeInTheDocument();
    });
  });

  test('clicking Sign in text logs to console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<App />);
    const signInText = screen.getByText('Sign in if you already have an account');
    fireEvent.click(signInText);
    expect(consoleSpy).toHaveBeenCalledWith('Sign In clicked');
    consoleSpy.mockRestore();
  });

  test('clicking Create an Account button displays account information', async () => {
    render(<App />);
    const createAccountButton = screen.getByText('Create an Account');
    
    fireEvent.click(createAccountButton);
    
    await waitFor(() => {
      expect(screen.getByText('Account Creation')).toBeInTheDocument();
      expect(screen.getByText(/Address:/)).toBeInTheDocument();
      expect(screen.getByText(/Private Key:/)).toBeInTheDocument();
      expect(screen.getByText(/Transaction Signing Key:/)).toBeInTheDocument();
      expect(screen.getByText('mocked-address')).toBeInTheDocument();
      expect(screen.getByText('mocked-private-key')).toBeInTheDocument();
      expect(screen.getByText('mocked-signing-key')).toBeInTheDocument();
    });
  });
});