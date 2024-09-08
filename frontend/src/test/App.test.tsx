import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeployAccount from '../App';

// Mock the AztecIntegration component
jest.mock('../utils/AztecIntegration', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mocked-aztec-integration">Mocked AztecIntegration</div>
  };
});

describe('DeployAccount Component', () => {
  test('renders Deploy Account button', () => {
    render(<DeployAccount />);
    const buttonElement = screen.getByText(/Deploy Account/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders mocked AztecIntegration component', () => {
    render(<DeployAccount />);
    const mockedComponent = screen.getByTestId('mocked-aztec-integration');
    expect(mockedComponent).toBeInTheDocument();
  });
});