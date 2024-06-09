import React, { useState } from 'react';
import { ethers } from 'ethers';
import getBlockchain from './ethereum';
import abi from './CertificateManager.json';

function GenerateCertificate() {
  const [id, setId] = useState('');
  const [issuer, setIssuer] = useState('');
  const [recipient, setRecipient] = useState('');
  const [data, setData] = useState('');
  const contractAddress ="0x2A8c4587403e2a0c48D455DDeC0BE5a195C65885";
  const ContractABI = abi.abi;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { signer } = await getBlockchain();
    const contract = new ethers.Contract(contractAddress, ContractABI, signer);
    await contract.generateCertificate(id, issuer, recipient, data);
  };

  return (
    <div>
      <h2>Generate Certificate</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="Certificate ID" />
        <input type="text" value={issuer} onChange={e => setIssuer(e.target.value)} placeholder="Issuer" />
        <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Recipient Address" />
        <input type="text" value={data} onChange={e => setData(e.target.value)} placeholder="Data" />
        <button type="submit">Generate</button>
      </form>
    </div>
  );
}

export default GenerateCertificate;
