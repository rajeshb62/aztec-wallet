import { getDeployedTestAccountsWallets } from '@aztec/accounts/testing';
import { AztecAddress, createDebugLogger, createPXEClient, waitForPXE, } from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js/Token';
import { format } from 'node:util';
import { interactWithToken } from './interactWithToken.js';
const PXE_URL = process.env.PXE_URL || 'http://localhost:8080';
async function main() {
    const logger = createDebugLogger('token');
    try {
        // Connect to PXE
        logger.info('Creating PXE client...');
        const pxe = createPXEClient(PXE_URL);
        await waitForPXE(pxe, logger);
        const nodeInfo = await pxe.getNodeInfo();
        logger.info(format('Aztec Sandbox Info ', nodeInfo));
        // Get Alice's account
        const accounts = await getDeployedTestAccountsWallets(pxe);
        const aliceWallet = accounts[0];
        const alice = aliceWallet.getAddress();
        logger.info(`Loaded alice's account at ${alice.toShortString()}`);
        // Get action from command line arguments
        if (process.argv.length < 3) {
            throw new Error("Not enough arguments. Usage: yarn start <action> [<args>]");
        }
        const action = process.argv[2];
        if (action === 'deploy') {
            if (process.argv.length < 6) {
                throw new Error("Not enough arguments. Usage: yarn start deploy <tokenName> <tokenSymbol> <initialSupply>");
            }
            const tokenName = process.argv[3];
            const tokenSymbol = process.argv[4];
            const initialSupply = BigInt(process.argv[5]);
            // Deploy the token contract
            logger.info(`Deploying token contract: ${tokenName} (${tokenSymbol}) with initial supply of ${initialSupply}`);
            const deployTx = await TokenContract.deploy(aliceWallet, alice, tokenName, tokenSymbol, 18).send();
            const token = await deployTx.deployed();
            logger.info(`Token contract deployed at ${token.address.toString()}`);
            // Mint initial supply to Alice (publicly)
            logger.info(`Minting ${initialSupply} tokens to Alice's public balance`);
            const mintTx = await token.methods.mint_public(alice, initialSupply).send();
            await mintTx.wait();
            // Check Alice's balance
            const aliceBalance = await token.methods.balance_of_public(alice).simulate();
            logger.info(`Alice's public balance: ${aliceBalance.toString()}`);
            // Return the contract address
            return token.address.toString();
        }
        else if (action === 'interact') {
            if (process.argv.length < 6) {
                throw new Error("Not enough arguments. Usage: yarn send-tokens <tokenAddress> <destinationAddress> <amount>");
            }
            const tokenAddress = AztecAddress.fromString(process.argv[3]);
            const destinationAddress = AztecAddress.fromString(process.argv[4]);
            const amount = BigInt(process.argv[5]);
            // Interact with the token (transfer and show balances)
            await interactWithToken(pxe, aliceWallet, tokenAddress, destinationAddress, amount);
            // Return the contract address
            return tokenAddress.toString();
        }
        else {
            throw new Error("Invalid action. Use 'deploy' to deploy a new token or 'interact' to interact with an existing token.");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            logger.error(`An error occurred: ${error.message}`);
            if (error.stack) {
                logger.error(`Stack trace: ${error.stack}`);
            }
        }
        else {
            logger.error('An unknown error occurred');
        }
    }
}
main().then((contractAddress) => {
    if (contractAddress) {
        console.log(`Token contract address: ${contractAddress}`);
    }
    process.exit(0);
}).catch(error => {
    console.error('An unhandled error occurred:', error);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsVUFBVSxHQUNYLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDbkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFM0QsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksdUJBQXVCLENBQUM7QUFFL0QsS0FBSyxVQUFVLElBQUk7SUFDakIsTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsaUJBQWlCO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsTUFBTSxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFckQsc0JBQXNCO1FBQ3RCLE1BQU0sUUFBUSxHQUFHLE1BQU0sOEJBQThCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FB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