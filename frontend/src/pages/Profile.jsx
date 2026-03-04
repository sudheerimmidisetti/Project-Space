import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { User, Mail, Calendar, Edit3, Settings, Shield, Check, X, Lock, Key } from 'lucide-react';

const Profile = () => {
    const containerRef = useRef(null);
    const [user, setUser] = useState({ fullName: 'Guest User', email: 'guest@example.com' });

    // Edit Profile State
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [editForm, setEditForm] = useState({ fullName: '', email: '' });

    // Security State
    const [showSecurity, setShowSecurity] = useState(false);
    const [securityForm, setSecurityForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUser(parsed);
                setEditForm({ fullName: parsed.fullName || '', email: parsed.email || '' });
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        } else {
            setEditForm({ fullName: user.fullName, email: user.email });
        }
    }, [user.fullName, user.email]);

    const handleSaveProfile = async (field) => {
        try {
            const token = localStorage.getItem('token');
            const updatedValue = editForm[field];

            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ [field]: updatedValue })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update profile');
            }

            const data = await response.json();

            // Update local state and storage
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));

            if (field === 'fullName') setIsEditingName(false);
            if (field === 'email') setIsEditingEmail(false);

            // Update edit form to match saved data
            setEditForm(prev => ({ ...prev, [field]: data.user[field] }));

        } catch (error) {
            console.error('Error updating profile:', error);
            alert(error.message);
        }
    };

    const handleCancelEdit = (field) => {
        setEditForm(prev => ({ ...prev, [field]: user[field] }));
        if (field === 'fullName') setIsEditingName(false);
        if (field === 'email') setIsEditingEmail(false);
    };

    const handleSecurityUpdate = async (e) => {
        e.preventDefault();
        if (securityForm.newPassword !== securityForm.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: securityForm.currentPassword,
                    newPassword: securityForm.newPassword
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update password');
            }

            alert("Password updated successfully!");
            setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setShowSecurity(false);
        } catch (error) {
            console.error('Error updating password:', error);
            alert(error.message);
        }
    };

    const handleToggle2FA = async () => {
        try {
            const token = localStorage.getItem('token');
            const newStatus = !twoFactorEnabled;

            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ twoFactorEnabled: newStatus })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update 2FA status');
            }

            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            setTwoFactorEnabled(data.user.twoFactorEnabled);
            alert(`Two-Factor Authentication ${newStatus ? 'enabled' : 'disabled'} successfully.`);

        } catch (error) {
            console.error('Error updating 2FA:', error);
            alert(error.message);
        }
    };

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
                        <div onClick={() => alert("Avatar upload to be implemented")} className="absolute bottom-0 right-0 p-2 bg-brand-dark rounded-full border border-brand-muted cursor-pointer hover:bg-brand-muted/50 transition-colors">
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
                                {isEditingName ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <input
                                            type="text"
                                            value={editForm.fullName}
                                            onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                            className="flex-grow bg-brand-dark/50 border border-brand-muted/30 text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-brand-pale transition-colors"
                                        />
                                        <button onClick={() => handleSaveProfile('fullName')} className="p-1.5 bg-brand-pale/20 text-brand-pale rounded-lg hover:bg-brand-pale hover:text-brand-dark transition-colors"><Check className="w-4 h-4" /></button>
                                        <button onClick={() => handleCancelEdit('fullName')} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                                    </div>
                                ) : (
                                    <div className="text-white font-medium flex items-center justify-between py-2 border-b border-white/5 group-hover:border-brand-pale/30 transition-colors">
                                        <span>{user.fullName}</span>
                                        <Edit3 onClick={() => setIsEditingName(true)} className="w-4 h-4 text-brand-light/30 group-hover:text-brand-pale cursor-pointer transition-colors" />
                                    </div>
                                )}
                            </div>

                            <div className="group">
                                <label className="text-xs text-brand-light/70 uppercase tracking-wider font-semibold">Email Address</label>
                                {isEditingEmail ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="flex-grow bg-brand-dark/50 border border-brand-muted/30 text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-brand-pale transition-colors"
                                        />
                                        <button onClick={() => handleSaveProfile('email')} className="p-1.5 bg-brand-pale/20 text-brand-pale rounded-lg hover:bg-brand-pale hover:text-brand-dark transition-colors"><Check className="w-4 h-4" /></button>
                                        <button onClick={() => handleCancelEdit('email')} className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
                                    </div>
                                ) : (
                                    <div className="text-white font-medium flex items-center justify-between py-2 border-b border-white/5 group-hover:border-brand-pale/30 transition-colors">
                                        <span>{user.email}</span>
                                        <Edit3 onClick={() => setIsEditingEmail(true)} className="w-4 h-4 text-brand-light/30 group-hover:text-brand-pale cursor-pointer transition-colors" />
                                    </div>
                                )}
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
                            <div onClick={() => setShowSecurity(!showSecurity)} className="p-4 rounded-xl bg-brand-dark/30 border border-brand-muted/20 flex items-center justify-between hover:bg-brand-muted/20 cursor-pointer transition-colors">
                                <div>
                                    <h4 className="text-white font-medium text-sm">Password & Security</h4>
                                    <p className="text-brand-light/60 text-xs">Update your password and 2FA</p>
                                </div>
                                <Settings className="w-5 h-5 text-brand-light" />
                            </div>

                            {/* Security Expansion */}
                            {showSecurity && (
                                <div className="p-4 rounded-xl bg-brand-dark/50 border border-brand-pale/30 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <h4 className="text-white font-medium flex items-center gap-2 border-b border-brand-muted/30 pb-2"><Shield className="w-4 h-4 text-brand-pale" /> Privacy & Security</h4>

                                    <form onSubmit={handleSecurityUpdate} className="space-y-3">
                                        <div>
                                            <label className="text-xs text-brand-light/70 uppercase tracking-wider font-semibold block mb-1">Current Password</label>
                                            <div className="relative">
                                                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-light/50" />
                                                <input type="password" value={securityForm.currentPassword} onChange={e => setSecurityForm({ ...securityForm, currentPassword: e.target.value })} className="w-full bg-brand-dark/50 border border-brand-muted/30 text-white pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-brand-pale text-sm" placeholder="••••••••" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-brand-light/70 uppercase tracking-wider font-semibold block mb-1">New Password</label>
                                            <div className="relative">
                                                <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-light/50" />
                                                <input type="password" value={securityForm.newPassword} onChange={e => setSecurityForm({ ...securityForm, newPassword: e.target.value })} className="w-full bg-brand-dark/50 border border-brand-muted/30 text-white pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-brand-pale text-sm" placeholder="New Password" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-brand-light/70 uppercase tracking-wider font-semibold block mb-1">Confirm New Password</label>
                                            <div className="relative">
                                                <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-light/50" />
                                                <input type="password" value={securityForm.confirmPassword} onChange={e => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })} className="w-full bg-brand-dark/50 border border-brand-muted/30 text-white pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-brand-pale text-sm" placeholder="Confirm Password" required />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <div>
                                                <p className="text-white text-sm font-medium">Two-Step Authentication</p>
                                                <p className="text-brand-light/60 text-xs">Add an extra layer of security</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleToggle2FA}
                                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-brand-pale' : 'bg-brand-muted/50'}`}
                                            >
                                                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
                                            </button>
                                        </div>

                                        <button type="submit" className="w-full mt-4 py-2 bg-brand-pale text-brand-dark font-semibold rounded-lg hover:bg-white transition-colors text-sm">Save Security Settings</button>
                                    </form>
                                </div>
                            )}

                            {[
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
