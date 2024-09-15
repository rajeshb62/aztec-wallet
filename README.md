# Aztec Wallet

## Overview
This is a wallet prototype for the Aztec Protocol. It provides a user-friendly interface for creating and managing Aztec accounts, enabling private transactions on the Ethereum network. At present basic features are enabled, namely, creation of an account and reading token balance.

## Features
- Create new Aztec accounts
- View account details (address, private key, transaction signing key)
- Secure wallet functionality
- Integration with Aztec Protocol for privacy-preserving transactions

## Prerequisites
- Node.js (v14 or later)
- Yarn package manager

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/rajeshb62/aztec-wallet.git
   cd aztec-wallet
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   yarn install
   ```

## Running the Application
1. Start the development server:
   ```
   cd frontend
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Running Tests
Run tests from project root. To run the test suite:
```
yarn test
```
For frontend-specific tests:
```
yarn test:frontend
```
## Building for Production
To create a production build:
```
cd frontend
yarn build
```
## Features yet to be built
This is the beginning. Key features of the wallet will be built going forward:
- Good UI
- Transfer of tokens, connecting, signing and sending transaction from an account
- Account abstraction features like conditional approvals (auto approval of transactions below user configured value), session level approvals
- Easy fee features like being able to pay using a stablecoin like USDC

## Project Structure
- `/frontend`: Contains the React frontend application
- `/src`: Contains the main source code
- `/test`: Contains test files

## Technologies Used
- React
- TypeScript
- Vite
- Aztec Protocol (@aztec/aztec.js)
- Jest for testing

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.

## Acknowledgements
- Aztec Protocol team for their excellent documentation and tools
- React and Vite communities for their robust frameworks
