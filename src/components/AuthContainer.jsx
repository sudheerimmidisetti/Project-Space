import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import DottedBackground from './DottedBackground';

const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true);
    const containerRef = useRef(null);
    const boxRef = useRef(null);

    const toggleForm = () => {
        const tl = gsap.timeline();
        
        // Hide current form quickly
        tl.to(boxRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                setIsLogin(!isLogin);
            }
        })
        
        // Show new form
        .to(boxRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.2)'
        });
    };

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );

        gsap.to('.animated-bg', {
            scale: 1.1,
            opacity: 0.8,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 2
        });
    }, { scope: containerRef });

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 overflow-hidden relative" ref={containerRef}>
            <DottedBackground />

            <div className="animated-bg absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-light/20 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="animated-bg absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-muted/20 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Main Centered Container without Side Panel */}
            <div 
                ref={boxRef}
                className="relative w-full max-w-md h-[650px] z-10" 
            >
                {isLogin ? (
                    <div className="absolute inset-0 w-full h-full">
                        <LoginForm onToggle={toggleForm} isActive={isLogin} />
                    </div>
                ) : (
                    <div className="absolute inset-0 w-full h-full">
                        <SignUpForm onToggle={toggleForm} isActive={!isLogin} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthContainer;