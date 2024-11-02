import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccount } from '../aztec';
import { useWallet } from '../context/WalletContext';
import { createHash } from 'crypto';

// Function to hash a string
const stringToHash = (inputString: string): string => {
  return createHash('sha256').update(inputString).digest('hex');
};

// Function to generate random alphanumeric string
const generateVerificationCode = (length: number = 6): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Function to extract email from .eml content
const extractEmailFromEml = (emlContent: string): { fromEmail: string; subject: string } | null => {
  try {
    // Look for 'from:' line specifically
    const fromLine = emlContent.split('\n').find(line => line.toLowerCase().startsWith('from:'));
    const subjectLine = emlContent.split('\n').find(line => line.toLowerCase().startsWith('subject:'));

    if (!fromLine) {
      throw new Error("Could not find 'From' field in email");
    }
    if (!subjectLine) {
      throw new Error("Could not find 'Subject' field in email");
    }

    // Extract email from the 'from:' line
    const fromEmail = fromLine.split(':')[1].trim();
    // Extract subject from the 'subject:' line
    const subject = subjectLine.split(':')[1].trim();

    console.log('Extracted From email:', fromEmail);
    console.log('Extracted Subject:', subject);

    return {
      fromEmail,
      subject
    };
  } catch (error) {
    console.error('Error parsing .eml content:', error);
    return null;
  }
};

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emlContent, setEmlContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const navigate = useNavigate();
  const { setWalletInfo } = useWallet();

  // Generate verification code when email and password are entered
  useEffect(() => {
    if (email && password) {
      setVerificationCode(generateVerificationCode());
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!emlContent) {
      setError('Please provide the email verification content.');
      return;
    }

    const emailData = extractEmailFromEml(emlContent);
    if (!emailData) {
      setError('Could not parse email content. Please ensure you provided a valid .eml file content.');
      return;
    }

    // Verify email ownership
    if (emailData.fromEmail.toLowerCase() !== email.toLowerCase()) {
      setError('The email address in the verification email does not match the entered email.');
      return;
    }

    // Verify verification code
    if (!emailData.subject.includes(verificationCode)) {
      setError('Could not find verification code in email subject.');
      return;
    }

    const emailDerivedEncryptionKey = stringToHash(email + password);
    const passwordDerivedSigningKey = stringToHash(password);

    try {
      const accountInfo = await fetchAccount(emailDerivedEncryptionKey, passwordDerivedSigningKey);
      console.log('Account fetched:', accountInfo);

      setWalletInfo({
        address: accountInfo.address,
        balance: '0',
        transactions: [],
        encryptionSecretKey: emailDerivedEncryptionKey,
        signingSecretKey: passwordDerivedSigningKey,
      });

      navigate('/wallet');
    } catch (error) {
      console.error('Error fetching account:', error);
      setError('Failed to fetch account. Please check your email and password and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign In to Your Wallet
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Enter email ID
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Enter your Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your password"
              required
            />
          </div>

          {email && password && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                To verify your email ownership, please:
              </p>
              <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                <li>Send an email to rajesh@ragya.com</li>
                <li>Include this code in the subject: <span className="font-mono font-bold">{verificationCode}</span></li>
                <li>Download the sent email as .eml file</li>
                <li>Paste the contents below</li>
              </ol>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="emlContent" className="block text-gray-700 text-sm font-bold mb-2">
              Email Verification Content (.eml)
            </label>
            <textarea
              id="emlContent"
              value={emlContent}
              onChange={(e) => setEmlContent(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Paste the contents of your .eml file here"
              rows={4}
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
