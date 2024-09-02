import { createPXEClient, Fr, Fq } from '@aztec/aztec.js';
import { getSchnorrAccount } from '@aztec/accounts/schnorr';

export async function createSchnorrAccount(): Promise<{ address: string }> {
  try {
    const pxe = createPXEClient('http://localhost:8080');
    
    // Generate random keys
    const encryptionSecretKey = Fr.random();
    const signingSecretKey = Fq.random();
    console.log(signingSecretKey);
    
    // Create a new account
    const account = await getSchnorrAccount(pxe, encryptionSecretKey, signingSecretKey);
    console.log(account.getWallet());

    return { address: (await account.getWallet()).getAddress().toString() };
  } catch (error) {
    console.error('Error creating account:', error);
    throw new Error('Failed to create account');
  }
}