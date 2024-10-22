// import { useState } from "react";
// import { mnemonicToSeed } from "bip39";
// import { derivePath } from "ed25519-hd-key";
// import { Keypair } from "@solana/web3.js";
// import nacl from "tweetnacl";

// export function SolanaWallet({ mnemonic }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [publicKeys, setPublicKeys] = useState([]);
 

//   return (
//     <div>
//       <button
//         onClick={function () {
//           const seed = mnemonicToSeed(mnemonic);
//           const path = `m/44'/501'/${currentIndex}'/0'`;
//           const derivedSeed = derivePath(path, seed.toString("hex")).key;
//           const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
//           const keypair = Keypair.fromSecretKey(secret);
//           setCurrentIndex(currentIndex + 1);
//           setPublicKeys([...publicKeys, keypair.publicKey]);
//         }}
//       >
//         SOL Wallet
//       </button>{" "}
     
      
//       <br />
//       {publicKeys.map((p) => (
//         <div>Sol - publicKey - {p.toBase58()}</div>
//       ))}
     
//     </div>
//   );
// }
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]); // Store both public and private keys

  const generateKeys = () => {
    const seed = mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    // Convert private key to a hex string format
    const privateKeyHex = Array.from(secret)
      .map((byte) => byte.toString(16).padStart(2, "0")) // Convert each byte to a two-digit hex string
      .join(""); // Join all hex strings together

    // Store the public and private keys
    setWallets([...wallets, {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: privateKeyHex // Use the hex string format for the private key
    }]);

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      <button onClick={generateKeys}>Generate SOL Wallet</button>
      <br />
      {wallets.map((wallet, index) => (
        <div key={index}>
          <div>Sol - Public Key: {wallet.publicKey}</div>
          <div>Sol - Private Key (Hex): {wallet.privateKey}</div>
        </div>
      ))}
    </div>
  );
}
