import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import JoinRoom from './components/JoinRoom';

function App() {
  return <div className="">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinRoom />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;
