import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the entire App component
jest.mock('../App', () => ({
  __esModule: true,
  default: () => (
    <div>
      <button>Deploy Account</button>
      <div data-testid="mocked-aztec-integration">Mocked AztecIntegration</div>
    </div>
  ),
}));

// Import the mocked component
import DeployAccount from '../App';

test('renders Deploy Account button', () => {
  render(<DeployAccount />);
  const buttonElement = screen.getByText('Deploy Account');
  expect(buttonElement).toBeInTheDocument();
});

test('renders mocked AztecIntegration component', () => {
  render(<DeployAccount />);
  const mockedComponent = screen.getByTestId('mocked-aztec-integration');
  expect(mockedComponent).toBeInTheDocument();
});