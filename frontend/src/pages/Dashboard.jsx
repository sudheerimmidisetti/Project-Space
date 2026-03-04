import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Activity, Users, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo('.dash-element',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }
        );
    }, { scope: containerRef });

    const stats = [
        { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign },
        { label: 'Subscriptions', value: '+2350', change: '+180.1%', icon: Users },
        { label: 'Active Now', value: '+12,234', change: '+19%', icon: Activity },
        { label: 'Growth', value: '89.2%', change: '+7.4%', icon: TrendingUp },
    ];

    return (
        <div ref={containerRef} className="w-full space-y-8">
            <div className="dash-element">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-brand-light">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="dash-element p-6 rounded-3xl bg-white/5 border border-brand-muted/20 backdrop-blur-sm relative overflow-hidden group hover:border-brand-light/40 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 transform">
                            <stat.icon className="w-16 h-16 text-brand-pale" />
                        </div>
                        <h3 className="text-brand-light font-medium">{stat.label}</h3>
                        <div className="text-3xl font-bold text-white mt-2 mb-1">{stat.value}</div>
                        <div className="text-green-400 text-sm flex items-center gap-1 font-medium">
                            <TrendingUp className="w-4 h-4" />
                            {stat.change} since last month
                        </div>
                    </div>
                ))}
            </div>

            <div className="dash-element w-full h-96 rounded-3xl bg-white/5 border border-brand-muted/20 backdrop-blur-sm p-6 flex items-center justify-center">
                <p className="text-brand-light/50 font-medium">Interactive Chart Placeholder</p>
            </div>
        </div>
    );
};

export default Dashboard;
