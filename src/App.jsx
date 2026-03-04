import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthContainer from './components/AuthContainer';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter basename="/Project-Space">
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<AuthContainer />} />

        {/* Protected Routes directly mapped for now, ideally an AuthGuard would be here */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
