import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AttemptPoll from './components/AttempPoll';
import CreatePoll from './components/CreatePoll';
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/attempt-poll" element={<AttemptPoll />} />
      <Route path="/create-poll" element={<CreatePoll />} />
    </Routes>
  </BrowserRouter>
);
