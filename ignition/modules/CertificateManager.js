const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const CertificateModule = buildModule("CertificateModule", (m) => {
  const certificate = m.contract("CertificateManager");

  return { certificate };
});

module.exports = CertificateModule;
