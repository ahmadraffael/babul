import { Form, Head, Link } from '@inertiajs/react';
import React from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8faf9] relative overflow-hidden font-sans">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            
            <Head title="Register" />
            
            <div className="w-full max-w-[480px] relative z-10 p-6">
                <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/50 flex flex-col gap-10">
                    <div className="flex flex-col items-center text-center gap-6">
                        <div className="w-14 h-14 bg-primary rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform duration-500">
                             <AppLogoIcon className="w-8 h-8 fill-white" />
                        </div>
                        <div className="space-y-1.5 px-4">
                            <h1 className="text-3xl font-black text-on-surface tracking-tighter leading-none">Join the Studio</h1>
                            <p className="text-sm text-on-surface-variant/80 font-medium tracking-tight">Create your personal Curator account</p>
                        </div>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-2">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Alex Curator"
                                                className="h-14 px-6 rounded-2xl bg-surface-container-lowest border-surface-container-high focus:ring-primary/20 focus:border-primary transition-all text-sm font-semibold shadow-sm"
                                            />
                                            <InputError message={errors.name} className="ml-2" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-2">Email address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                placeholder="name@studio.com"
                                                className="h-14 px-6 rounded-2xl bg-surface-container-lowest border-surface-container-high focus:ring-primary/20 focus:border-primary transition-all text-sm font-semibold shadow-sm"
                                            />
                                            <InputError message={errors.email} className="ml-2" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-2">Password</Label>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                required
                                                tabIndex={3}
                                                autoComplete="new-password"
                                                placeholder="••••••••"
                                                className="h-14 px-6 rounded-2xl bg-surface-container-lowest border-surface-container-high focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
                                            />
                                            <InputError message={errors.password} className="ml-2" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-2">Confirm</Label>
                                            <PasswordInput
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                required
                                                tabIndex={4}
                                                autoComplete="new-password"
                                                placeholder="••••••••"
                                                className="h-14 px-6 rounded-2xl bg-surface-container-lowest border-surface-container-high focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
                                            />
                                            <InputError message={errors.password_confirmation} className="ml-2" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-4">
                                    <Button
                                        type="submit"
                                        className="h-16 w-full rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-[0.25em] shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-3 group"
                                        tabIndex={5}
                                        disabled={processing}
                                    >
                                        {processing ? <Spinner className="w-5 h-5" /> : (
                                            <>
                                                <span>Register Account</span>
                                                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">how_to_reg</span>
                                            </>
                                        )}
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant/50">
                                            Already a member?{' '}
                                            <Link href={login()} className="text-primary hover:text-primary/70 transition-colors ml-1 uppercase">Log in</Link>
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
                
                 <p className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 select-none">
                    © 2026 Curator | Powered by Advanced Analytics
                </p>
            </div>
        </div>
    );
}
