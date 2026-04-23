import type { AppLayoutProps } from '@/types';
import { Head } from '@inertiajs/react';
import { TheCuratorSidebar } from '@/components/the-curator-sidebar';
import { TheCuratorHeader } from '@/components/the-curator-header';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background text-on-background antialiased font-bold font-body">
            <TheCuratorSidebar />
            <TheCuratorHeader />
            <main className="ml-64 pt-24 px-8 pb-12 space-y-10">
                {children}
            </main>
        </div>
    );
}
