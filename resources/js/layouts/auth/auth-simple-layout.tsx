import { Link } from '@inertiajs/react';
import React from 'react';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    title?: string;
    description?: string;
}) {
    return (
        <div className="min-h-svh w-full bg-surface flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background Elements - adjusted for theme */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none"></div>
            
            <div className="w-full max-w-[440px] relative z-10 flex flex-col gap-8 md:gap-12 py-10">
                {/* Brand Header */}
                <Link href="/" className="flex flex-col items-center gap-4 group transition-transform hover:scale-105 active:scale-95">
                    <div className="w-20 h-20 rounded-[2rem] bg-surface-container-lowest shadow-2xl shadow-black/[0.05] flex items-center justify-center border border-surface-container-high transition-all group-hover:rotate-6">
                        <span className="material-symbols-outlined text-primary text-4xl font-black">draw</span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-black text-on-surface tracking-tighter leading-none">Dashboard</h1>
                        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-[0.2em] mt-1.5">
                            Babul Syifa
                        </p>
                    </div>
                </Link>

                {/* Auth Card */}
                <div className="bg-surface-container-lowest rounded-[3.5rem] p-8 md:p-12 shadow-2xl shadow-black/[0.08] border border-surface-container-high relative overflow-hidden transition-all">
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                    
                    <div className="space-y-3 mb-10 text-center">
                        <h2 className="text-3xl font-black text-on-surface tracking-tight leading-tight">{title}</h2>
                        {description && (
                            <p className="text-sm font-bold text-on-surface-variant leading-relaxed px-2 opacity-50">
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col items-center gap-4">
                    <div className="h-px w-12 bg-on-surface/10"></div>
                    <p className="text-center text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Dashboard Babul Syifa • Secure Access
                    </p>
                </div>
            </div>
        </div>
    );
}
