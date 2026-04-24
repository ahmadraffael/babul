export function TheCuratorHeader() {
    return (
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-surface/80 backdrop-blur-lg flex justify-between items-center px-8 h-20">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
                    <input className="w-full bg-surface-container-high border-none outline-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Search analytics or orders..." type="text" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="hover:bg-surface-container-highest rounded-full p-2 text-on-surface-variant transition-colors border-none outline-none bg-transparent">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="hover:bg-surface-container-highest rounded-full p-2 text-on-surface-variant transition-colors border-none outline-none bg-transparent">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                
                <div className="h-8 w-px bg-surface-container-highest mx-2"></div>
                
                <div className="text-right">
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest leading-none">Status</p>
                    <p className="text-sm font-bold text-primary">Live Data</p>
                </div>
            </div>
        </header>
    );
}
