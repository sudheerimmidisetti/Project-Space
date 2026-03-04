import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Info, Mail, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const navItems = [
        { path: '/home', label: 'Home', icon: Home },
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/about', label: 'About', icon: Info },
        { path: '/contact', label: 'Contact', icon: Mail },
        { path: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-brand-muted/30 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <span className="text-xl font-bold bg-gradient-to-r from-brand-pale via-white to-brand-light bg-clip-text text-transparent">
                            AppManager
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'bg-brand-muted/40 text-white shadow-inner'
                                            : 'text-brand-light hover:bg-brand-muted/20 hover:text-white'
                                        }`
                                    }
                                >
                                    <item.icon className="h-4 w-4 mr-2" />
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 rounded-xl text-sm font-medium text-brand-dark bg-gradient-to-r from-brand-pale to-brand-light hover:opacity-90 transition-all shadow-[0_0_15px_rgba(236,239,202,0.3)] hover:scale-105 active:scale-95"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
