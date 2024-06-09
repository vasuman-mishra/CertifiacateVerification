import { ethers } from 'ethers';

export async function getBlockchain() {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { signer };
  }
  return { signer: undefined };
}
export default getBlockchain;