import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-brand-dark relative overflow-hidden flex flex-col font-sans">
            {/* Background elements similar to auth page */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-muted/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-light/10 blur-[150px] rounded-full pointer-events-none"></div>

            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10 relative">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
