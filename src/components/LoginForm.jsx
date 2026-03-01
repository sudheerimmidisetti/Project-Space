import React, { useRef } from 'react';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const LoginForm = ({ onToggle, isActive }) => {
    const formRef = useRef(null);

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

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                    <div className="relative group login-element">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="email"
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="relative group login-element">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-brand-light group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="password"
                            className="w-full bg-brand-dark/30 border border-brand-muted/30 focus:border-brand-light/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-brand-light/50 outline-none transition-all shadow-inner backdrop-blur-sm focus:ring-2 focus:ring-brand-light/20"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm login-element">
                    <label className="flex items-center cursor-pointer text-brand-light hover:text-white transition-colors">
                        <input type="checkbox" className="mr-2 rounded border-brand-muted/30 bg-brand-dark/30 text-brand-light focus:ring-brand-light/20" />
                        Remember me
                    </label>
                    <a href="#" className="font-medium text-brand-light hover:text-white transition-colors">Forgot password?</a>
                </div>

                <button className="w-full bg-gradient-to-r from-brand-muted to-brand-light hover:opacity-90 text-brand-dark font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(148,180,193,0.3)] login-element interactive-btn">
                    <LogIn className="h-5 w-5" />
                    Sign In
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
