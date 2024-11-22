'use client'
import { useState, useEffect } from "react";
import { connectWallet, signIn, verifyUser, getNetwork } from "./helper";

const MESSAGE = `I visited Vitalii's portfolio on ${new Date().toLocaleString()}`


export default function Home() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const network = async () => {
    const network = await getNetwork();
    console.log("Network:", network.name)
  }

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");
    if (savedAddress) {
      setAddress(savedAddress)
    };
    network();
  }, []);

  const onConnect = async () => {
    const address = await connectWallet();
    localStorage.setItem("address", address);
    setAddress(address);
  }

  const onSignIn = async () => {
    setIsLoading(true);
    try {
      const signature = await signIn(MESSAGE);
      if (!signature) {
        console.log("Signature not provided or signing was cancelled.");
        return;
      }
  
      const isVerified = await verifyUser(MESSAGE, signature, address);
      setIsVerified(isVerified);
    } catch(e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  if(isLoading) {
    return <p>Loading...</p> 
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={onConnect}>Connect</button>
      {
        !!address &&
          <>
            <button onClick={onSignIn}>Sign In</button>
          </>
      }
      {
        isVerified && <p>✅ ✅ ✅ ✅ ✅ Verified!✅ ✅ ✅ ✅ ✅ </p>
      }
    </div>
  );
}
