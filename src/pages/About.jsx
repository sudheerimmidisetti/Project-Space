import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Globe, Shield, Zap } from 'lucide-react';

const About = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo('.about-element',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto space-y-12 py-8">
            <div className="text-center about-element">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
                <p className="text-brand-light text-lg max-w-2xl mx-auto">
                    We are dedicated to building intuitive, beautiful, and highly functional digital experiences that empower our users to achieve more.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 about-element">
                {[
                    { icon: Globe, title: 'Global Reach', desc: 'Connecting users from all around the world with our reliable infrastructure.' },
                    { icon: Shield, title: 'Uncompromised Security', desc: 'Your data privacy is our top priority, secured with advanced encryption.' },
                    { icon: Zap, title: 'High Performance', desc: 'Optimized for speed to ensure you never miss a beat.' }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 bg-white/5 border border-brand-muted/20 rounded-3xl backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-2xl bg-brand-muted/30 flex items-center justify-center mb-6 text-brand-pale">
                            <item.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                        <p className="text-brand-light/80 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-gradient-to-br from-brand-muted/20 to-brand-dark/50 border border-brand-muted/30 rounded-3xl p-8 md:p-12 about-element flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-brand-light max-w-3xl leading-relaxed text-lg">
                    To revolutionize the way you manage and interact with your applications. We strive to provide a platform that is not just a tool, but a seamless extension of your workflow, combining breathtaking aesthetics with uncompromising utility.
                </p>
            </div>
        </div>
    );
};

export default About;
