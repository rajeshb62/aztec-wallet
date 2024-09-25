import { createDebugLogger } from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js/Token';
export async function interactWithToken(pxe, aliceWallet, tokenAddress, destinationAddress, amount) {
    const logger = createDebugLogger('token');
    try {
        const alice = aliceWallet.getAddress();
        // Connect to the existing token contract
        logger.info(`Connecting to existing token contract at ${tokenAddress.toString()}`);
        const token = await TokenContract.at(tokenAddress, aliceWallet);
        logger.info(`Destination address: ${destinationAddress.toString()}`);
        // Check initial balances
        const aliceInitialBalance = await token.methods.balance_of_public(alice).simulate();
        const destinationInitialBalance = await token.methods.balance_of_public(destinationAddress).simulate();
        logger.info(`Alice's initial public balance: ${aliceInitialBalance.toString()}`);
        logger.info(`Destination's initial public balance: ${destinationInitialBalance.toString()}`);
        // Transfer the specified amount of tokens from Alice to the destination address
        logger.info(`Attempting to transfer ${amount} tokens from Alice to ${destinationAddress.toString()}...`);
        const transferTx = await token.methods.transfer_public(alice, destinationAddress, amount, 0n).send();
        await transferTx.wait();
        logger.info(`Transferred ${amount} tokens from Alice to ${destinationAddress.toString()}`);
        // Check final balances
        const aliceFinalBalance = await token.methods.balance_of_public(alice).simulate();
        const destinationFinalBalance = await token.methods.balance_of_public(destinationAddress).simulate();
        logger.info(`Alice's final public balance: ${aliceFinalBalance.toString()}`);
        logger.info(`Destination's final public balance: ${destinationFinalBalance.toString()}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RXaXRoVG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbnRlcmFjdFdpdGhUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsaUJBQWlCLEVBR2xCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxLQUFLLFVBQVUsaUJBQWlCLENBQUMsR0FBUSxFQUFFLFdBQTBCLEVBQUUsWUFBMEIsRUFBRSxrQkFBZ0MsRUFBRSxNQUFjO0lBQ3hKLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV2Qyx5Q0FBeUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRixNQUFNLEtBQUssR0FBRyxNQUFNLGFBQWEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVyRSx5QkFBeUI7UUFDekIsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEYsTUFBTSx5QkFBeUIsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2RyxNQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakYsTUFBTSxDQUFDLElBQUksQ0FBQyx5Q0FBeUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTdGLGdGQUFnRjtRQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixNQUFNLHlCQUF5QixrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekcsTUFBTSxVQUFVLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JHLE1BQU0sVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxNQUFNLHlCQUF5QixrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFM0YsdUJBQXVCO1FBQ3ZCLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xGLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckcsTUFBTSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUNBQXVDLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUUzRixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRSxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM5QyxDQUFDO1FBQ0gsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIn0=