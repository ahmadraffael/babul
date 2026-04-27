import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Login({ title, description }: { title?: string; description?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Studio Access" />

            <form onSubmit={submit} className="space-y-8">
                <div className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Studio Email</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-on-surface-variant/40 group-focus-within:text-primary transition-colors">alternate_email</span>
                            </div>
                            <input 
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`w-full bg-surface-container-low border-0 border-b-2 border-surface-container-high focus:border-primary focus:bg-primary/5 focus:ring-0 rounded-2xl py-4 pl-12 pr-4 font-bold text-on-surface transition-all placeholder:text-on-surface-variant/20 ${errors.email ? 'border-error bg-error/5' : ''}`}
                                placeholder="Enter access email"
                                required
                                autoFocus
                            />
                        </div>
                        {errors.email && <p className="text-[10px] font-bold text-error ml-1 uppercase tracking-wider">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Security Key</label>
                            <button type="button" className="text-[10px] font-bold text-primary hover:tracking-widest transition-all uppercase tracking-widest opacity-60">Forgot?</button>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-on-surface-variant/40 group-focus-within:text-primary transition-colors">lock</span>
                            </div>
                            <input 
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`w-full bg-surface-container-low border-0 border-b-2 border-surface-container-high focus:border-primary focus:bg-primary/5 focus:ring-0 rounded-2xl py-4 pl-12 pr-4 font-bold text-on-surface transition-all placeholder:text-on-surface-variant/20 ${errors.password ? 'border-error bg-error/5' : ''}`}
                                placeholder="Enter secure key"
                                required
                            />
                        </div>
                        {errors.password && <p className="text-[10px] font-bold text-error ml-1 uppercase tracking-wider">{errors.password}</p>}
                    </div>

                    {/* Remember me */}
                    <label className="flex items-center gap-3 cursor-pointer group w-fit ml-1">
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="peer appearance-none w-5 h-5 rounded-lg border-2 border-surface-container-high checked:bg-primary checked:border-primary transition-all cursor-pointer"
                            />
                            <span className="material-symbols-outlined text-white text-sm absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant opacity-60 group-hover:opacity-100 transition-opacity">Keep studio session active</span>
                    </label>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-on-surface text-surface py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        {processing ? (
                            <span className="animate-spin material-symbols-outlined">sync</span>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-xl">token</span>
                                Authorize Access
                            </>
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
