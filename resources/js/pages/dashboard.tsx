import { Head } from '@inertiajs/react';

export default function Dashboard({ data = [] }: { data: any[] }) {
    // Computations
    const omzetKotor = data.reduce((sum, item) => sum + (Number(item.price_before) || 0), 0);
    const totalCost = data.reduce((sum, item) => sum + (Number(item.admin_fee) || 0) + (Number(item.service_fee) || 0) + (Number(item.transaction_fee) || 0) + (Number(item.campaign_fee) || 0), 0);
    const profitKotor = data.reduce((sum, item) => sum + (Number(item.price_after) || 0), 0);
    const totalOrders = data.length;

    // Platform analysis
    const platforms: Record<string, { revenue: number, transactions: number }> = {};
    data.forEach(item => {
        const plat = item.platform || 'Unknown';
        if (!platforms[plat]) platforms[plat] = { revenue: 0, transactions: 0 };
        platforms[plat].revenue += (Number(item.price_after) || 0);
        platforms[plat].transactions += 1;
    });
    
    // Sort platforms by revenue DESC
    const platformData = Object.entries(platforms)
        .map(([name, stats]) => ({ name, ...stats }))
        .sort((a, b) => b.revenue - a.revenue);

    // Courier analysis
    const couriers: Record<string, number> = {};
    data.forEach(item => {
        const c = item.courier || 'Unknown';
        couriers[c] = (couriers[c] || 0) + 1;
    });
    const courierData = Object.entries(couriers).map(([name, orders]) => ({ name, orders })).sort((a, b) => b.orders - a.orders);
    const topCourier = courierData[0];
    const topCourierPercentage = totalOrders > 0 && topCourier ? Math.round((topCourier.orders / totalOrders) * 100) : 0;
    const topCourierName = topCourier ? topCourier.name : 'Unknown';

    // Refund analysis
    const refunds = data.filter(item => Boolean(item.is_refund)).length;
    const normals = data.filter(item => !Boolean(item.is_refund)).length;
    const normalRate = totalOrders > 0 ? Math.round((normals / totalOrders) * 100) : 0;

    return (
        <>
            <Head title="Dashboard" />
            
            {/* Metric Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Omzet Kotor */}
                <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-on-surface-variant">Omzet Kotor</span>
                        <span className="material-symbols-outlined text-primary">payments</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">Rp {omzetKotor.toLocaleString('id-ID')}</h2>
                        <div className="mt-2 flex items-center gap-1">
                            <span className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold px-1.5 py-0.5 rounded-full">+12.5%</span>
                            <span className="text-[10px] text-on-surface-variant">vs last month</span>
                        </div>
                    </div>
                </div>

                {/* Total Cost */}
                <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-on-surface-variant">Total Cost</span>
                        <span className="material-symbols-outlined text-tertiary">shopping_bag</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">Rp {totalCost.toLocaleString('id-ID')}</h2>
                        <div className="mt-2 flex items-center gap-1">
                            <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold px-1.5 py-0.5 rounded-full">-3.2%</span>
                            <span className="text-[10px] text-on-surface-variant">optimization focus</span>
                        </div>
                    </div>
                </div>

                {/* Profit Kotor */}
                <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-on-surface-variant">Profit Kotor</span>
                        <span className="material-symbols-outlined text-primary">trending_up</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">Rp {profitKotor.toLocaleString('id-ID')}</h2>
                        <div className="mt-2 flex items-center gap-1">
                            <span className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold px-1.5 py-0.5 rounded-full">+8.4%</span>
                            <span className="text-[10px] text-on-surface-variant">yield growth</span>
                        </div>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-on-surface-variant">Total Orders</span>
                        <span className="material-symbols-outlined text-secondary">package_2</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">{totalOrders}</h2>
                        <div className="mt-2 flex items-center gap-1">
                            <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold px-1.5 py-0.5 rounded-full">+42</span>
                            <span className="text-[10px] text-on-surface-variant">units today</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Middle Row: Performance & Analysis */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Platform's Performance Table */}
                <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-on-surface">Platform's Performance</h3>
                        <button className="text-xs font-bold text-primary uppercase tracking-widest">View Full List</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                                    <th className="pb-4 font-bold">Platform</th>
                                    <th className="pb-4 font-bold text-right">Revenue</th>
                                    <th className="pb-4 font-bold text-right">Transaction</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                {platformData.length > 0 ? platformData.map((plat, idx) => (
                                    <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                                        <td className="py-4 flex items-center gap-3 capitalize">
                                            <div className={`w-8 h-8 rounded bg-surface-container-high flex items-center justify-center font-bold text-xs ${idx === 0 ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-on-surface'}`}>
                                                {plat.name.substring(0, 1).toUpperCase()}
                                            </div>
                                            {plat.name}
                                        </td>
                                        <td className="py-4 text-right">Rp {plat.revenue.toLocaleString('id-ID')}</td>
                                        <td className="py-4 text-right">{plat.transactions}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={3} className="py-4 text-center text-on-surface-variant italic">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Courier & Refund Split */}
                <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Courier Analysis Placeholder */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col">
                        <h3 className="text-lg font-bold text-on-surface mb-6">Courier Analysis</h3>
                        <div className="flex-1 flex items-center justify-center relative">
                            {/* Simulated Chart */}
                            <div className="relative w-32 h-32 shrink-0 rounded-full border-[12px] border-primary-container flex items-center justify-center">
                                <div className="absolute inset-0 border-[12px] border-secondary border-t-transparent border-r-transparent rounded-full rotate-45"></div>
                                <div className="text-center">
                                    <p className="text-xl font-extrabold text-on-surface leading-tight">{topCourierPercentage}%</p>
                                    <p className="text-[8px] text-on-surface-variant font-bold uppercase tracking-tighter max-w-[60px] truncate">{topCourierName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            {courierData.slice(0, 2).map((c, i) => (
                                <div key={i} className="flex justify-between items-center text-xs">
                                    <span className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary-container' : 'bg-secondary'}`}></span> 
                                        {c.name}
                                    </span>
                                    <span className="font-bold">{c.orders} orders</span>
                                </div>
                            ))}
                            {courierData.length === 0 && (
                                <div className="text-center text-xs text-on-surface-variant italic">No data available</div>
                            )}
                        </div>
                    </div>

                    {/* Refunds Total Split Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between">
                        <h3 className="text-lg font-bold text-on-surface mb-6">Refunds Total</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-tertiary">assignment_return</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Refund</p>
                                        <h4 className="text-2xl font-black text-tertiary">{refunds}</h4>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-tertiary">+0 today</span>
                            </div>
                            <div className="h-px bg-surface-container-high w-full"></div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">check_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Normal</p>
                                        <h4 className="text-2xl font-black text-primary">{normals}</h4>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-primary">{normalRate}% rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Row: Data Analytics Chart */}
            <section className="bg-surface-container-lowest rounded-xl p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h3 className="text-xl font-bold text-on-surface">Data Analytics Trends</h3>
                        <p className="text-sm text-on-surface-variant mt-1">Platform performance comparison over the last 30 days</p>
                    </div>
                    <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-full">
                        <button className="px-4 py-1.5 text-xs font-bold bg-white text-on-surface rounded-full shadow-sm">Revenue</button>
                        <button className="px-4 py-1.5 text-xs font-bold text-on-surface-variant hover:text-on-surface">Orders</button>
                        <button className="px-4 py-1.5 text-xs font-bold text-on-surface-variant hover:text-on-surface">Cancellations</button>
                    </div>
                </div>

                {/* Chart Visualization Component (Stylized Bento/Grid) */}
                <div className="h-80 w-full relative flex items-end gap-2 group">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="border-b border-on-surface-variant"></div>
                        <div className="border-b border-on-surface-variant"></div>
                        <div className="border-b border-on-surface-variant"></div>
                        <div className="border-b border-on-surface-variant"></div>
                        <div className="border-b border-on-surface-variant"></div>
                    </div>

                    {/* Abstract Bars / Trend Visualization */}
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[40%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[60%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[55%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[40%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[75%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[80%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[60%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[30%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[90%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[70%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[45%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[90%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[65%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[50%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[30%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[40%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[85%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[60%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[55%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[80%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[70%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[40%]"></div>
                    </div>
                    <div className="flex-1 bg-primary/10 hover:bg-primary/20 transition-colors rounded-t-lg h-[95%] relative">
                        <div className="absolute bottom-0 inset-x-0 bg-primary/40 rounded-t-lg h-[85%]"></div>
                    </div>
                </div>

                {/* Chart Legend */}
                <div className="mt-8 flex items-center justify-center gap-10">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Shopee</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary/10"></div>
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tokopedia</span>
                    </div>
                </div>
            </section>
        </>
    );
}
