import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import DottedBackground from './DottedBackground';

const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true);
    const containerRef = useRef(null);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    useGSAP(() => {
        // Entrance animation
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );

        // Background pulsing elements
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

            {/* Animated Background Elements */}
            <div className="animated-bg absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-light/20 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="animated-bg absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-muted/20 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Main Container */}
            <div className="relative w-full max-w-md h-[650px] z-10" style={{ perspective: '1000px' }}>
                {/* Flip Container */}
                <div
                    className="w-full h-full relative"
                    style={{
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: !isLogin ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                >
                    {/* Front (Login) */}
                    <div className="absolute inset-0 w-full h-full p-2" style={{ backfaceVisibility: 'hidden' }}>
                        <LoginForm onToggle={toggleForm} isActive={isLogin} />
                    </div>

                    {/* Back (Sign Up) */}
                    <div className="absolute inset-0 w-full h-full p-2" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <SignUpForm onToggle={toggleForm} isActive={!isLogin} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthContainer;