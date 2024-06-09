// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateManager {
    struct Certificate {
        string id;
        string issuer;
        address recipient;
        string data;
        bool isValid;
    }

    struct Recipient {
        string name;
        string phoneNumber;
        string[] certificates;  // List of certificate IDs
    }

    mapping(string => Certificate) private certificates;  // Maps certificate ID to Certificate struct
    mapping(address => Recipient) private recipients;  // Maps recipient address to Recipient struct
    address private owner;

    constructor() {
        owner = msg.sender;  // Assign contract creator as the owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    event CertificateCreated(string id, address recipient);
    event CertificateVerified(string id, bool isValid);

    // Function for the owner to create a certificate
    function generateCertificate(string memory _id, string memory _issuer, address _recipient, string memory _data) public onlyOwner {
        require(!certificates[_id].isValid, "Certificate ID already exists");
        Certificate memory newCertificate = Certificate({
            id: _id,
            issuer: _issuer,
            recipient: _recipient,
            data: _data,
            isValid: true
        });
        certificates[_id] = newCertificate;
        recipients[_recipient].certificates.push(_id);
        emit CertificateCreated(_id, _recipient);
    }
    
    

    // Function to verify a certificate by ID
    function verifyCertificate(string memory _id) public view returns (bool isValid, string memory issuer, string memory data) {
    Certificate memory cert = certificates[_id];
    if(cert.isValid) {
        return (cert.isValid, cert.issuer, cert.data);
    } else {
        return (false, "", "");  // Return false with empty details if the certificate is not valid or does not exist
    }
}

    // Function for a recipient to view their personal details and certificates
    function getMyCertificates() public view returns (string memory name, string memory phoneNumber, string[] memory certificateIDs) {
        Recipient storage recipient = recipients[msg.sender];
        return (recipient.name, recipient.phoneNumber, recipient.certificates);
    }

    // Optional: Function for recipients to set/update their personal details
    function setRecipientDetails(string memory _name, string memory _phoneNumber) public {
        recipients[msg.sender] = Recipient({
            name: _name,
            phoneNumber: _phoneNumber,
            certificates: new string[](0)
        });
    }
}
