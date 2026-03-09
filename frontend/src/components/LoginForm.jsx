// LoginForm.jsx
import React, { useRef, useState } from 'react';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { apiFetch } from '../utils/api';

const LoginForm = ({ onToggle, isActive }) => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setIsLoading(true);
            const data = await apiFetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to home page
            navigate('/home');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useGSAP(() => {
        if (isActive) {
            gsap.fromTo('.login-element',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)', delay: 0.2, overwrite: true }
            );
        } else {
            gsap.set('.login-element', { opacity: 0, y: 30 });
        }
    }, { dependencies: [isActive], scope: formRef });

    return (
        <div ref={formRef} className="w-full h-full p-8 rounded-3xl glass flex flex-col justify-center">
            <div className="text-center mb-8 login-element">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-brand-light">Please enter your details to sign in.</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm login-element">{error}</div>}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="relative group login-element">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div className="relative group login-element">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Password"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm login-element">
                    <label className="flex items-center cursor-pointer text-brand-light hover:text-white transition-colors">
                        <input type="checkbox" className="mr-2 rounded border-brand-muted/30 bg-brand-dark/30 text-brand-light focus:ring-brand-light/20" />
                        Remember me
                    </label>
                    <Link to="/forgot-password" className="font-medium text-brand-light hover:text-white transition-colors">Forgot password?</Link>
                </div>

                <button
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-brand-muted to-brand-light hover:opacity-90 text-brand-dark font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(76,195,255,0.3)] login-element interactive-btn disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                    <LogIn className="h-5 w-5" />
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="relative flex items-center justify-center my-6 login-element">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-muted/50 to-transparent"></div>
                    <span className="relative bg-brand-dark/50 px-4 text-sm text-brand-light backdrop-blur-md rounded-full">Or continue with</span>
                </div>

                <button type="button" className="w-full bg-white/5 hover:bg-white/10 border border-brand-muted/30 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] login-element interactive-btn">
                    <Chrome className="h-5 w-5 text-brand-light" />
                    Sign in with Google
                </button>
            </form>

            <p className="mt-8 text-center text-brand-light text-sm login-element">
                Don't have an account?{' '}
                <button onClick={onToggle} className="font-semibold text-white hover:underline transition-all">
                    Sign up now
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
