import React, { useState } from 'react';
import { ethers } from 'ethers';
import getBlockchain from './ethereum';
import abi from './CertificateManager.json';

function VerifyCertificate() {
  const [id, setId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const contractAddress ="0x2A8c4587403e2a0c48D455DDeC0BE5a195C65885";
  const ContractABI = abi.abi;


  const handleVerify = async () => {
    const { signer } = await getBlockchain();
    const contract = new ethers.Contract(contractAddress, ContractABI, signer);
    const result = await contract.verifyCertificate(id);
    setVerificationResult(result);
  };

  return (
    <div>
      <h2>Verify Certificate</h2>
      <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="Certificate ID" />
      <button onClick={handleVerify}>Verify</button>
      {verificationResult && <div>
        <p>Validity: {verificationResult.isValid ? 'Valid' : 'Invalid'}</p>
        <p>Issuer: {verificationResult.issuer}</p>
        <p>Data: {verificationResult.data}</p>
      </div>}
    </div>
  );
}

export default VerifyCertificate;
