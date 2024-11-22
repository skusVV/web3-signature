import { ethers } from "ethers";

export async function verifyUser(message: string, signature: string, expectedAddress: string) {
    const recoveredAddress = await ethers.verifyMessage(message, signature);
    return recoveredAddress === expectedAddress; // Returns true if the user is real
}
  
export  const signIn = async (message: string) => {
    try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const signature = await signer.signMessage(message);

        return signature;
    } catch(e) {
        console.log(e)
        return '';
    }
}
  
export const connectWallet = async () => {
    if (!(window as any).ethereum) {
        alert("MetaMask is not installed!");
        return '';
    }

    try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        return address;
    } catch(e) {
        console.log(e)
        return '';
    }
}
  
export const getNetwork = async () => {
    try {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const network = await provider.getNetwork();

        return network;
    } catch(e) {
        console.log(e)
        return { name: 'unknown' };
    }
}