import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/carteira" element={<Wallet />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
