import { AztecAddress, type AztecAddressLike, type ContractArtifact, ContractBase, ContractFunctionInteraction, type ContractMethod, type ContractStorageLayout, DeployMethod, type FieldLike, Fr, type Wallet } from '@aztec/aztec.js';
export declare const EasyPrivateVotingContractArtifact: ContractArtifact;
/**
 * Type-safe interface for contract EasyPrivateVoting;
 */
export declare class EasyPrivateVotingContract extends ContractBase {
    private constructor();
    /**
     * Creates a contract instance.
     * @param address - The deployed contract's address.
     * @param wallet - The wallet to use when interacting with the contract.
     * @returns A promise that resolves to a new Contract instance.
     */
    static at(address: AztecAddress, wallet: Wallet): Promise<EasyPrivateVotingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract.
     */
    static deploy(wallet: Wallet, admin: AztecAddressLike): DeployMethod<EasyPrivateVotingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified public keys hash to derive the address.
     */
    static deployWithPublicKeysHash(publicKeysHash: Fr, wallet: Wallet, admin: AztecAddressLike): DeployMethod<EasyPrivateVotingContract>;
    /**
     * Creates a tx to deploy a new instance of this contract using the specified constructor method.
     */
    static deployWithOpts<M extends keyof EasyPrivateVotingContract['methods']>(opts: {
        publicKeysHash?: Fr;
        method?: M;
        wallet: Wallet;
    }, ...args: Parameters<EasyPrivateVotingContract['methods'][M]>): DeployMethod<EasyPrivateVotingContract>;
    /**
     * Returns this contract's artifact.
     */
    static get artifact(): ContractArtifact;
    static get storage(): ContractStorageLayout<'admin' | 'tally' | 'vote_ended' | 'active_at_block'>;
    /** Type-safe wrappers for the public methods exposed by the contract. */
    methods: {
        /** cast_vote(candidate: field) */
        cast_vote: ((candidate: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** compute_note_hash_and_optionally_a_nullifier(contract_address: struct, nonce: field, storage_slot: field, note_type_id: field, compute_nullifier: boolean, serialized_note: array) */
        compute_note_hash_and_optionally_a_nullifier: ((contract_address: AztecAddressLike, nonce: FieldLike, storage_slot: FieldLike, note_type_id: FieldLike, compute_nullifier: boolean, serialized_note: FieldLike[]) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** constructor(admin: struct) */
        constructor: ((admin: AztecAddressLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** end_vote() */
        end_vote: (() => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
        /** get_vote(candidate: field) */
        get_vote: ((candidate: FieldLike) => ContractFunctionInteraction) & Pick<ContractMethod, 'selector'>;
    };
}
//# sourceMappingURL=EasyPrivateVoting.d.ts.map