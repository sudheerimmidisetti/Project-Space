import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Home = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo('.home-element',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center p-8">
            <div className="max-w-4xl w-full mx-auto text-center space-y-8">
                <div className="home-element mx-auto w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-brand-pale to-brand-light flex items-center justify-center shadow-[0_0_30px_rgba(255,141,242,0.4)]">
                    <span className="text-4xl font-bold text-brand-dark">🚀</span>
                </div>

                <h1 className="home-element text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-pale to-brand-light">
                    Welcome to the Future
                </h1>

                <p className="home-element text-lg md:text-xl text-brand-light max-w-2xl mx-auto leading-relaxed">
                    You've successfully logged in. Explore our beautifully designed, high-performance platform built with modern web technologies. Experience the seamless fusion of design and function.
                </p>

                <div className="home-element grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[
                        { title: 'Intuitive Design', desc: 'Crafted with premium aesthetics and smooth animations.', icon: '✨' },
                        { title: 'Lightning Fast', desc: 'Optimized for speed and flawless interactions.', icon: '⚡' },
                        { title: 'Secure & Reliable', desc: 'Your data is protected with industry-standard security.', icon: '🛡️' }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-white/5 border border-brand-muted/20 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default group">
                            <div className="text-3xl mb-4 transform transition-transform group-hover:scale-110">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-brand-light/80 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
