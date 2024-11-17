import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import AccountPage from './pages/Account';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookDetailPage from './pages/BookDetailPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token, username) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/book-detail/:id" element={<BookDetailPage />} />
        <Route path="/account" element={isLoggedIn ? <AccountPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


export default App;
