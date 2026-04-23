import { Link, usePage, router } from '@inertiajs/react';

export function TheCuratorSidebar() {
    const { url, props } = usePage<any>();
    const user = props.auth?.user;

    const isActive = (path: string) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/logout');
    };

    const activeClass = "bg-primary text-white rounded-full px-4 py-2 flex items-center gap-3 transition-all scale-95 active:scale-90 shadow-lg shadow-primary/20";
    const inactiveClass = "text-secondary hover:bg-surface-container-highest rounded-full px-4 py-2 flex items-center gap-3 transition-all scale-95 active:scale-90 hover:pl-6";

    return (
        <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-surface-container-low z-50 flex flex-col p-6 gap-8 border-r border-surface-container-high">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold tracking-tight text-primary">The Curator</h1>
                <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest">Financial Studio</p>
            </div>
            
            <nav className="flex flex-col gap-2">
                <Link href="/" className={isActive('/') ? activeClass : inactiveClass}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="font-medium">Dashboard</span>
                </Link>
                <Link href="/transactions" className={isActive('/transactions') ? activeClass : inactiveClass}>
                    <span className="material-symbols-outlined">receipt_long</span>
                    <span className="font-medium">Transactions</span>
                </Link>
                <Link href="/analytics" className={isActive('/analytics') ? activeClass : inactiveClass}>
                    <span className="material-symbols-outlined">analytics</span>
                    <span className="font-medium">Analytics</span>
                </Link>
                <Link href="/import-data" className={isActive('/import-data') ? activeClass : inactiveClass}>
                    <span className="material-symbols-outlined">file_upload</span>
                    <span className="font-medium">Import Data</span>
                </Link>
            </nav>
            
            <div className="mt-auto pt-6 flex flex-col gap-6">
                <button className="w-full bg-primary text-white rounded-full py-3 font-bold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                    Generate Report
                </button>
                
                <div className="flex items-center justify-between gap-3 px-2">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary">person</span>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-bold text-on-surface truncate">{user?.name || 'Guest'}</span>
                            <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter truncate">Studio Member</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-10 h-10 rounded-full hover:bg-error-container/20 group transition-all flex items-center justify-center shrink-0"
                        title="Logout"
                    >
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-error transition-colors">logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
