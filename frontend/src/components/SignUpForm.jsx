import React, { useRef, useState } from 'react';
import { User, Mail, Lock, UserPlus, Chrome } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SignUpForm = ({ onToggle, isActive }) => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setIsLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setSuccess('Registration successful! Please sign in.');
            setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });

            // Optionally auto-toggle to login after a delay
            setTimeout(() => {
                onToggle();
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useGSAP(() => {
        if (isActive) {
            gsap.fromTo('.signup-element',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.5)', delay: 0.2, overwrite: true }
            );
        } else {
            gsap.set('.signup-element', { opacity: 0, y: 30 });
        }
    }, { dependencies: [isActive], scope: formRef });

    return (
        <div ref={formRef} className="w-full h-full p-8 rounded-3xl glass flex flex-col justify-center">
            <div className="text-center mb-6 signup-element">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-brand-light">Join us to experience the best.</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm signup-element">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm signup-element">{success}</div>}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="relative group signup-element">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Full Name"
                            required
                        />
                    </div>

                    <div className="relative group signup-element">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div className="relative group signup-element">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="relative group signup-element">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                </div>

                <button
                    disabled={isLoading}
                    className="w-full mt-2 bg-gradient-to-r from-brand-muted to-brand-light hover:opacity-90 text-brand-dark font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(148,180,193,0.3)] signup-element disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                    <UserPlus className="h-5 w-5" />
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="relative flex items-center justify-center my-4 signup-element">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-muted/50 to-transparent"></div>
                    <span className="relative bg-brand-dark/50 px-4 text-sm text-brand-light backdrop-blur-md rounded-full">Or continue with</span>
                </div>

                <button type="button" className="w-full bg-white/5 hover:bg-white/10 border border-brand-muted/30 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] signup-element">
                    <Chrome className="h-5 w-5 text-brand-light" />
                    Sign up with Google
                </button>
            </form>

            <p className="mt-6 text-center text-brand-light text-sm signup-element">
                Already have an account?{' '}
                <button onClick={onToggle} className="font-semibold text-white hover:underline transition-all">
                    Sign in
                </button>
            </p>
        </div>
    );
};

export default SignUpForm;
