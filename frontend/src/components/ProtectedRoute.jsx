import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    // Check if user has a token (is logged in)
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // If no token or user, redirect to login
    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    // If logged in, show the protected page
    return element;
};

export default ProtectedRoute;
