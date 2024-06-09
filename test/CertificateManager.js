const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateManager", function () {
  let CertificateManager;
  let certManager;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploying the contract before each test
    CertificateManager = await ethers.getContractFactory("CertificateManager");
    [owner, addr1, addr2] = await ethers.getSigners();
    certManager = await CertificateManager.deploy();
  });

  describe("Ownership and Access Control", function () {
    it("Should only allow the owner to generate certificates", async function () {
      // Owner generating a certificate should succeed
      await expect(certManager.generateCertificate("001", "University", addr1.address, "Certificate of Completion")).to.not.be.reverted;

      // Another user trying to generate a certificate should fail
      await expect(certManager.connect(addr2).generateCertificate("002", "University", addr1.address, "Certificate of Completion")).to.be.revertedWith("Only the owner can perform this action");
    });
  });

  describe("Certificate Generation and Verification", function () {
    it("Should correctly generate and verify a certificate", async function () {
      await certManager.generateCertificate("004", "University", addr1.address, "Course in Mathematics");
      const result = await certManager.verifyCertificate("004");
      expect(result.isValid).to.be.true;
      expect(result.issuer).to.equal("University");
      expect(result.data).to.equal("Course in Mathematics");
    });
  
    it("Should report a certificate as invalid if it does not exist", async function () {
      const result = await certManager.verifyCertificate("999");  // Assuming '999' has not been used
      expect(result.isValid).to.be.false;
    });
  });

    it("Should report a certificate as invalid if it does not exist", async function () {
      const result = await certManager.verifyCertificate("999");  // Assuming '999' has not been used
      expect(result.isValid).to.be.false;
    });
    describe("Certificate Generation and Verification", function () {
      it("Should correctly generate and verify a certificate", async function () {
        await certManager.generateCertificate("004", "University", addr1.address, "Course in Mathematics");
        const result = await certManager.verifyCertificate("004");
        expect(result.isValid).to.be.true;
        expect(result.issuer).to.equal("University");
        expect(result.data).to.equal("Course in Mathematics");
      });
    
      it("Should report a certificate as invalid if it does not exist", async function () {
        const result = await certManager.verifyCertificate("999");  // Assuming '999' has not been used
        expect(result.isValid).to.be.false;
      });
  });

  
  });
  
