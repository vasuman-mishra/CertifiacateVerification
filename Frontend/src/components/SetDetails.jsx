import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getBlockchain } from './ethereum';
import abi from './CertificateManager.json';

function SetDetails() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const contractAddress ="0x2A8c4587403e2a0c48D455DDeC0BE5a195C65885";
    const ContractABI = abi.abi;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { signer } = await getBlockchain();
        const contract = new ethers.Contract(contractAddress, ContractABI, signer);
        await contract.setRecipientDetails(name, phoneNumber);
    };

    return (
        <div>
            <h2>Set My Details</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
                <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Your Phone Number" />
                <button type="submit">Update Details</button>
            </form>
        </div>
    );
}

export default SetDetails;
