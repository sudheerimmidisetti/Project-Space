import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import DottedBackground from './DottedBackground';

const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true);
    const containerRef = useRef(null);
    const isAnimatingParams = useRef(false);

    const toggleForm = () => {
        if (isAnimatingParams.current) return;
        isAnimatingParams.current = true;

        const nextState = !isLogin;

        // Physical flip logic: 
        // nextState=false (0->180deg) -> Push Right edge.
        // nextState=true (180->0deg) -> Push Left edge.
        const pushRight = !nextState;

        const targetX = pushRight ? 210 : -210;
        const pushX = pushRight ? 160 : -160;
        const faceDirection = pushRight ? 1 : -1;
        const rotateAngle = pushRight ? 35 : -35;

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimatingParams.current = false;
            }
        });

        tl.to('.human-character', {
            x: targetX,
            y: 160,
            scaleX: faceDirection,
            scaleY: 1.1,
            rotation: rotateAngle,
            duration: 0.35,
            ease: 'power2.out'
        })
            .to('.human-character', {
                x: pushX,
                scaleX: faceDirection * 0.85,
                scaleY: 0.9,
                rotation: -rotateAngle * 0.3,
                duration: 0.15,
                ease: 'power2.in',
                onComplete: () => {
                    // Trigger the CSS form rotation exactly on impact
                    setIsLogin(nextState);
                }
            })
            .to('.human-character', {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                rotation: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
    };

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );

        gsap.to('.human-character', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'easeInOut'
        });

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

            {/* Main Container */}
            <div className="relative w-full max-w-md h-[650px] z-10" style={{ perspective: '1000px' }}>

                {/* Character SVG */}
                <div className="absolute -top-[120px] left-1/2 w-48 h-48 z-20 pointer-events-none" style={{ marginLeft: '-6rem' }}>
                    <img
                        className="human-character w-full h-full object-contain filter drop-shadow-[0_15px_15px_rgba(236,239,202,0.3)] origin-bottom"
                        src="https://api.dicebear.com/7.x/micah/svg?seed=Christian&flip=false&backgroundColor=transparent"
                        alt="Character Avatar"
                    />
                </div>

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
