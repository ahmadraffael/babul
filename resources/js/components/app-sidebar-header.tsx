import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Settings, User } from 'lucide-react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const title = 'Dashboard';

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 bg-[#f4f4f5] px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
                    <Settings className="h-5 w-5 text-gray-600" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a5f3fc]">
                    <User className="h-5 w-5 text-[#0891b2]" />
                </button>
            </div>
        </header>
    );
}
