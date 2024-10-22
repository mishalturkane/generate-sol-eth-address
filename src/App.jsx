import { generateMnemonic } from "bip39";
import React, { useState } from "react";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <div className="flex flex-row justify-between items-center gap-4">
      <button 
        onClick={async function () {
          const mn = await generateMnemonic();

          return setMnemonic(mn);
          
        }}
      >
        Generate mnemonic
      </button>
     <p>{mnemonic}</p>
     <SolanaWallet></SolanaWallet>
     <EthWallet></EthWallet>
     
    </div>
  );
}

export default App;
