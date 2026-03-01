import React from 'react';
import { User, Mail, Lock, UserPlus, Chrome } from 'lucide-react';

const SignUpForm = ({ onToggle }) => {
    return (
        <div className="w-full h-full p-8 rounded-3xl glass flex flex-col justify-center">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-brand-light">Join us to experience the best.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="email"
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="password"
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Password"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="password"
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-2.5 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>

                <button className="w-full mt-2 bg-gradient-to-r from-brand-muted to-brand-light hover:opacity-90 text-brand-dark font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(148,180,193,0.3)]">
                    <UserPlus className="h-5 w-5" />
                    Create Account
                </button>

                <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-muted/50 to-transparent"></div>
                    <span className="relative bg-brand-dark/50 px-4 text-sm text-brand-light backdrop-blur-md rounded-full">Or continue with</span>
                </div>

                <button type="button" className="w-full bg-white/5 hover:bg-white/10 border border-brand-muted/30 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                    <Chrome className="h-5 w-5 text-brand-light" />
                    Sign up with Google
                </button>
            </form>

            <p className="mt-6 text-center text-brand-light text-sm">
                Already have an account?{' '}
                <button onClick={onToggle} className="font-semibold text-white hover:underline transition-all">
                    Sign in
                </button>
            </p>
        </div>
    );
};

export default SignUpForm;
