import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { usePage } from '@inertiajs/react';

export default function AuthLayout({
    title,
    description,
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    const { props } = usePage();
    
    // Prioritize passed props, then page props, then empty string
    const displayTitle = title || (props as any).title || '';
    const displayDescription = description || (props as any).description || '';

    return (
        <AuthLayoutTemplate title={displayTitle} description={displayDescription}>
            {children}
        </AuthLayoutTemplate>
    );
}
