import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate , Route, Routes } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './stateProvider';
import Chat from './Chat';
import Sidebar from './Sidebar';


function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
          <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </Router>
    </div>
      )}

    </div>
  );
}

export default App;
