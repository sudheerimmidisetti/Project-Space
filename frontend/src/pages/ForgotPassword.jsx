import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DottedBackground from '../components/DottedBackground'; // Assuming DottedBackground is in components
import { apiFetch } from '../utils/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');

        try {
            await apiFetch('/api/auth/forgotpassword', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            setMessage('Password reset email sent. Please check your inbox.');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
            <DottedBackground />

            <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 relative z-10 shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-pale to-white bg-clip-text text-transparent mb-2">
                        Reset Password
                    </h2>
                    <p className="text-brand-light/80 text-sm">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {message && <div className="p-3 bg-brand-pale/20 border border-brand-pale text-brand-pale rounded-xl text-sm text-center">{message}</div>}
                    {error && <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-xl text-sm text-center">{error}</div>}

                    <div>
                        <label className="block text-brand-light/90 text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-light/50 w-5 h-5" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-brand-dark/50 border border-brand-muted/30 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-pale transition-colors"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-pale text-brand-dark font-bold py-3 rounded-xl hover:bg-white transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <div className="text-center mt-6">
                        <Link to="/" className="text-brand-light/70 hover:text-brand-pale text-sm font-medium transition-colors flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
