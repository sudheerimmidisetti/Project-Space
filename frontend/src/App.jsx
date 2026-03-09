import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthContainer from './components/AuthContainer';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [isBootLoading, setIsBootLoading] = useState(true);

  useEffect(() => {
    // Keep a short branded splash while the app initializes.
    const timer = setTimeout(() => {
      setIsBootLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  if (isBootLoading) {
    return (
      <div className="min-h-screen bg-brand-dark relative overflow-hidden flex items-center justify-center">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-brand-violet/35 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-light/30 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-brand-light/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-light border-r-brand-violet animate-spin" />
            <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-brand-pale border-l-brand-orchid animate-spin [animation-direction:reverse] [animation-duration:1.2s]" />
            <div className="absolute inset-7 rounded-full bg-brand-pale/70 blur-[1px] animate-pulse" />
          </div>

          <p className="text-brand-pale font-semibold tracking-wider">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/Project-Space">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthContainer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes - User must be logged in */}
        <Route element={<ProtectedRoute element={<MainLayout />} />}>
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
