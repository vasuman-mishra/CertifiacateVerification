import React from 'react';
import GenerateCertificate from './components/GenerateCertificate';
import VerifyCertificate from './components/VerifyCertificate';
import "./App.css";

function App() {
  return (
    <div>
      <h1>Certificate Manager</h1>
      <GenerateCertificate />
      <VerifyCertificate />
    </div>
  );
}

export default App;
