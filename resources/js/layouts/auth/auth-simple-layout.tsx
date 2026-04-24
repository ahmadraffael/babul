import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { dashboard } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black relative overflow-hidden font-sans p-6">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
            
            <div className="w-full max-w-[560px] relative z-10">
                {children}
            </div>
        </div>
    );
}
