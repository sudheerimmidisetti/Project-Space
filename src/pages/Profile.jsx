import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { User, Mail, Calendar, Edit3, Settings, Shield } from 'lucide-react';

const Profile = () => {
    const containerRef = useRef(null);
    const [user, setUser] = useState({ fullName: 'Guest User', email: 'guest@example.com' });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
    }, []);

    useGSAP(() => {
        gsap.fromTo('.profile-element',
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto py-8">
            <div className="bg-white/5 border border-brand-muted/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden profile-element">
                {/* Decorative background for header */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-brand-muted/30 to-brand-dark/10"></div>

                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 mt-8">
                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-pale to-brand-light flex items-center justify-center border-4 border-brand-dark shadow-xl shrink-0 group profile-element">
                        <span className="text-4xl text-brand-dark font-bold group-hover:scale-110 transition-transform">
                            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                        </span>
                        <div className="absolute bottom-0 right-0 p-2 bg-brand-dark rounded-full border border-brand-muted cursor-pointer hover:bg-brand-muted/50 transition-colors">
                            <Edit3 className="w-4 h-4 text-brand-pale" />
                        </div>
                    </div>

                    <div className="flex-grow text-center md:text-left profile-element">
                        <h1 className="text-3xl font-bold text-white mb-2">{user.fullName}</h1>
                        <p className="text-brand-light flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Mail className="w-4 h-4" />
                            {user.email}
                        </p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <span className="px-3 py-1 bg-brand-muted/30 text-brand-pale text-xs rounded-full font-medium border border-brand-muted/50">Pro Member</span>
                            <span className="px-3 py-1 bg-brand-muted/30 text-brand-pale text-xs rounded-full font-medium border border-brand-muted/50 flex items-center gap-1"><Shield className="w-3 h-3" /> Verified</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {/* Personal Info */}
                    <div className="space-y-6 profile-element">
                        <h3 className="text-xl font-semibold text-white border-b border-brand-muted/30 pb-2">Personal Information</h3>

                        <div className="space-y-4">
                            <div className="group">
                                <label className="text-xs text-brand-light/70 uppercase tracking-wider font-semibold">Full Name</label>
                                <div className="text-white font-medium flex items-center justify-between py-2 border-b border-white/5 group-hover:border-brand-pale/30 transition-colors">
                                    <span>{user.fullName}</span>
                                    <Edit3 className="w-4 h-4 text-brand-light/30 group-hover:text-brand-pale cursor-pointer transition-colors" />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-xs text-brand-light/70 uppercase tracking-wider font-semibold">Email Address</label>
                                <div className="text-white font-medium flex items-center justify-between py-2 border-b border-white/5 group-hover:border-brand-pale/30 transition-colors">
                                    <span>{user.email}</span>
                                    <Edit3 className="w-4 h-4 text-brand-light/30 group-hover:text-brand-pale cursor-pointer transition-colors" />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-xs text-brand-light/70 uppercase tracking-wider font-semibold">Member Since</label>
                                <div className="text-brand-light font-medium flex items-center py-2">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    March 2026
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-6 profile-element">
                        <h3 className="text-xl font-semibold text-white border-b border-brand-muted/30 pb-2">Account Settings</h3>

                        <div className="space-y-3">
                            {[
                                { title: 'Password & Security', desc: 'Update your password and 2FA' },
                                { title: 'Notifications', desc: 'Manage your email alerts' },
                                { title: 'Connected Accounts', desc: 'Manage Google / GitHub login' }
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-xl bg-brand-dark/30 border border-brand-muted/20 flex items-center justify-between hover:bg-brand-muted/20 cursor-pointer transition-colors">
                                    <div>
                                        <h4 className="text-white font-medium text-sm">{item.title}</h4>
                                        <p className="text-brand-light/60 text-xs">{item.desc}</p>
                                    </div>
                                    <Settings className="w-5 h-5 text-brand-light" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
