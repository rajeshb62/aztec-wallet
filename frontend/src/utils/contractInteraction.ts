import { EasyPrivateVotingContract } from '../EasyPrivateVoting';
import { createPXEClient, PXE, Fr, AztecAddress, TxStatus } from '@aztec/aztec.js';

let pxe: PXE;
let contract: EasyPrivateVotingContract;

export async function initializeContract() {
  const PXE_URL = 'http://localhost:8080'; // Replace with your actual PXE URL if different
  pxe = createPXEClient(PXE_URL);
  // TODO: Replace with actual contract address
  const contractAddress = AztecAddress.fromString('0x0d5950d5b8aa0e87d407cd71a2d548dc6b419578ca3922fb7d53e54aa5889293'); 
  contract = await EasyPrivateVotingContract.at(contractAddress, pxe);
}

export async function castVote(candidate: number) {
  if (!contract) throw new Error('Contract not initialized');
  const tx = await contract.methods.cast_vote(new Fr(candidate)).send();
  await tx.wait();
  return tx.status === TxStatus.MINED;
}

export async function getVotes(candidate: number) {
  if (!contract) throw new Error('Contract not initialized');
  return await contract.methods.get_vote(new Fr(candidate)).simulate();
}