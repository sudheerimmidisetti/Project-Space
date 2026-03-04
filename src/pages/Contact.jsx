import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo('.contact-element',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
        gsap.fromTo('.form-element',
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="max-w-6xl mx-auto py-8">
            <div className="text-center contact-element mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
                <p className="text-brand-light text-lg">We'd love to hear from you. Please fill out the form below or contact us directly.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    {[
                        { icon: Mail, title: 'Email', details: 'hello@appmanager.com', desc: 'Send us an email anytime!' },
                        { icon: MapPin, title: 'Office', details: '123 Innovation Drive, Tech City', desc: 'Come say hello at our HQ.' },
                        { icon: Phone, title: 'Phone', details: '+1 (555) 123-4567', desc: 'Mon-Fri from 9am to 6pm.' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start p-6 bg-white/5 border border-brand-muted/20 rounded-3xl backdrop-blur-sm contact-element">
                            <div className="p-4 bg-brand-muted/30 rounded-2xl mr-6 text-brand-pale">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                                <p className="text-brand-light/90 font-medium mb-1">{item.details}</p>
                                <p className="text-brand-light/60 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <form className="bg-white/5 border border-brand-muted/20 rounded-3xl p-8 backdrop-blur-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 form-element">
                            <label className="text-sm font-medium text-brand-light">First Name</label>
                            <input type="text" className="w-full bg-brand-dark/50 border border-brand-muted/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pale/50 transition-colors" placeholder="John" />
                        </div>
                        <div className="space-y-2 form-element">
                            <label className="text-sm font-medium text-brand-light">Last Name</label>
                            <input type="text" className="w-full bg-brand-dark/50 border border-brand-muted/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pale/50 transition-colors" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-2 form-element">
                        <label className="text-sm font-medium text-brand-light">Email</label>
                        <input type="email" className="w-full bg-brand-dark/50 border border-brand-muted/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pale/50 transition-colors" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2 form-element">
                        <label className="text-sm font-medium text-brand-light">Message</label>
                        <textarea rows="4" className="w-full bg-brand-dark/50 border border-brand-muted/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pale/50 transition-colors resize-none" placeholder="How can we help you?"></textarea>
                    </div>

                    <button type="button" className="w-full form-element bg-gradient-to-r from-brand-muted to-brand-light text-brand-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity transform hover:scale-[1.01] active:scale-[0.99]">
                        <Send className="w-5 h-5" />
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
