/* Autogenerated file, do not edit! */
/* eslint-disable */
import { Contract, ContractBase, DeployMethod, Fr, loadContractArtifact, } from '@aztec/aztec.js';
import EasyPrivateVotingContractArtifactJson from '../../target/easy_private_voting_contract-EasyPrivateVoting.json' assert { type: 'json' };
export const EasyPrivateVotingContractArtifact = loadContractArtifact(EasyPrivateVotingContractArtifactJson);
/**
 * Type-safe interface for contract EasyPrivateVoting;
 */
export class EasyPrivateVotingContract extends ContractBase {
    constructor(instance, wallet) {
        super(instance, EasyPrivateVotingContractArtifact, wallet);
    }
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static async at(address, wallet) {
        return Contract.at(address, EasyPrivateVotingContract.artifact, wallet);
    }
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet, admin) {
        return new DeployMethod(Fr.ZERO, wallet, EasyPrivateVotingContractArtifact, EasyPrivateVotingContract.at, Array.from(arguments).slice(1));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash, wallet, admin) {
        return new DeployMethod(publicKeysHash, wallet, EasyPrivateVotingContractArtifact, EasyPrivateVotingContract.at, Array.from(arguments).slice(2));
    }
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts(opts, ...args) {
        return new DeployMethod(opts.publicKeysHash ?? Fr.ZERO, opts.wallet, EasyPrivateVotingContractArtifact, EasyPrivateVotingContract.at, Array.from(arguments).slice(1), opts.method ?? 'constructor');
    }
    /**
     * Returns this contract's artifact.
     */
    static get artifact() {
        return EasyPrivateVotingContractArtifact;
    }
    static get storage() {
        return {
            admin: {
                slot: new Fr(1n),
            },
            tally: {
                slot: new Fr(2n),
            },
            vote_ended: {
                slot: new Fr(3n),
            },
            active_at_block: {
                slot: new Fr(4n),
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWFzeVByaXZhdGVWb3RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXJ0aWZhY3RzL0Vhc3lQcml2YXRlVm90aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLHNDQUFzQztBQUV0QyxvQkFBb0I7QUFDcEIsT0FBTyxFQUlMLFFBQVEsRUFFUixZQUFZLEVBTVosWUFBWSxFQUtaLEVBQUUsRUFHRixvQkFBb0IsR0FPckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLHFDQUFxQyxNQUFNLGtFQUFrRSxDQUFDLFNBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQzdJLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFHLG9CQUFvQixDQUFDLHFDQUE2RCxDQUFDLENBQUM7QUFJckk7O0dBRUc7QUFDSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsWUFBWTtJQUV6RCxZQUNFLFFBQXFDLEVBQ3JDLE1BQWM7UUFFZCxLQUFLLENBQUMsUUFBUSxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFJRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUNwQixPQUFxQixFQUNyQixNQUFjO1FBRWQsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUF1QyxDQUFDO0lBQ2hILENBQUM7SUFHRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBYyxFQUFFLEtBQXVCO1FBQzFELE9BQU8sSUFBSSxZQUFZLENBQTRCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGlDQUFpQyxFQUFFLHlCQUF5QixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZLLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxjQUFrQixFQUFFLE1BQWMsRUFBRSxLQUF1QjtRQUNoRyxPQUFPLElBQUksWUFBWSxDQUE0QixjQUFjLEVBQUUsTUFBTSxFQUFFLGlDQUFpQyxFQUFFLHlCQUF5QixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlLLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxjQUFjLENBQzFCLElBQXlELEVBQ3pELEdBQUcsSUFBeUQ7UUFFNUQsT0FBTyxJQUFJLFlBQVksQ0FDckIsSUFBSSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUM5QixJQUFJLENBQUMsTUFBTSxFQUNYLGlDQUFpQyxFQUNqQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUM5QixJQUFJLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FDN0IsQ0FBQztJQUNKLENBQUM7SUFJRDs7T0FFRztJQUNJLE1BQU0sS0FBSyxRQUFRO1FBQ3hCLE9BQU8saUNBQWlDLENBQUM7SUFDM0MsQ0FBQztJQUdNLE1BQU0sS0FBSyxPQUFPO1FBQ3JCLE9BQU87WUFDTCxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNqQjtZQUNMLEtBQUssRUFBRTtnQkFDRCxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2pCO1lBQ0wsVUFBVSxFQUFFO2dCQUNOLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDakI7WUFDTCxlQUFlLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNqQjtTQUNpRixDQUFDO0lBQ25GLENBQUM7Q0F5QkoifQ==