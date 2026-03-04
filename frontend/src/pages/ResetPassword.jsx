import React, { useState } from 'react';
import { Key, Eye, EyeOff, Lock } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import DottedBackground from '../components/DottedBackground';
import { apiFetch } from '../utils/api';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setMessage('');
        setError('');

        try {
            await apiFetch(`/api/auth/resetpassword/${token}`, {
                method: 'PUT',
                body: JSON.stringify({ password })
            });

            setMessage('Password reset successful. Redirecting to login...');

            setTimeout(() => {
                navigate('/');
            }, 3000);

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
                    <div className="mx-auto w-12 h-12 bg-brand-pale/20 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-brand-pale" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-brand-pale to-white bg-clip-text text-transparent mb-2">
                        Set New Password
                    </h2>
                    <p className="text-brand-light/80 text-sm">
                        Please enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {message && <div className="p-3 bg-brand-pale/20 border border-brand-pale text-brand-pale rounded-xl text-sm text-center">{message}</div>}
                    {error && <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-xl text-sm text-center">{error}</div>}

                    <div>
                        <label className="block text-brand-light/90 text-sm font-medium mb-2">New Password</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-light/50 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-brand-dark/50 border border-brand-muted/30 text-white pl-11 pr-11 py-3 rounded-xl focus:outline-none focus:border-brand-pale transition-colors"
                                placeholder="••••••••"
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 group cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="w-5 h-5 text-brand-light/50 group-hover:text-brand-pale transition-colors" /> : <Eye className="w-5 h-5 text-brand-light/50 group-hover:text-brand-pale transition-colors" />}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-brand-light/90 text-sm font-medium mb-2">Confirm New Password</label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-light/50 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-brand-dark/50 border border-brand-muted/30 text-white pl-11 pr-11 py-3 rounded-xl focus:outline-none focus:border-brand-pale transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-pale text-brand-dark font-bold py-3 rounded-xl hover:bg-white transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
