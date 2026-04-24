import { Link, router } from '@inertiajs/react';
import { Home, FileText, LayoutGrid, LogOut, Plus, ShoppingBasket } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import { Button } from '@/components/ui/button';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: Home,
    },
    {
        title: 'Transactions',
        href: '/transactions',
        icon: ShoppingBasket,
    },
    {
        title: 'Analytics',
        href: '/analytics',
        icon: FileText,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-[#fcfcfd]">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <div className="px-4 mt-2">
                    <Button className="w-full justify-start bg-[#009b7c] hover:bg-[#008168] text-white rounded-md font-semibold font-medium h-10 shadow-sm" onClick={() => alert('Import Data Clicked')}>
                        <Plus className="mr-2 h-5 w-5" />
                        Import Data
                    </Button>
                </div>
            </SidebarContent>

            <SidebarFooter>
                <div className="px-4 pb-4">
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start bg-red-100/50 hover:bg-red-100 text-red-500 font-medium h-10 rounded-md"
                        onClick={() => router.post('/logout')}
                    >
                        <LogOut className="mr-2 h-5 w-5" />
                        Leave
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
