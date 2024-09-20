import { createPXEClient, waitForPXE,Fr, Fq, PXE } from '@aztec/aztec.js';
import { getSchnorrAccount } from '@aztec/accounts/schnorr';

let pxeInstance: PXE | null = null;

export async function getPXEClient(): Promise<PXE> {
  if (!pxeInstance) {
    pxeInstance = createPXEClient('http://localhost:8080');
    
    // Initialize the PXE client and wait for it to be ready
    try {
      // Wait for the PXE client to connect and initialize
      await waitForPXE(pxeInstance);
      console.log('PXE client initialized successfully');
    } catch (error) {
      console.error('Error initializing PXE client:', error);
      throw new Error('Failed to initialize PXE client');
    }
  }
  return pxeInstance;
}

export async function createSchnorrAccount(): Promise<{ 
  address: string;
  encryptionSecretKey: string;
  signingSecretKey: string;
}> {
  try {
    const pxe = await getPXEClient();
    
    // Generate random keys
    const encryptionSecretKey = Fr.random();
    const signingSecretKey = Fq.random();
    
    // Create a new account
    const account = await getSchnorrAccount(pxe, encryptionSecretKey, signingSecretKey);
    const wallet = await account.getWallet();
    console.log(wallet);

    return { 
      address: wallet.getAddress().toString(),
      encryptionSecretKey: encryptionSecretKey.toString(),
      signingSecretKey: signingSecretKey.toString()
    };
  } catch (error) {
    console.error('Error creating account:', error);
    throw new Error('Failed to create account');
  }
}