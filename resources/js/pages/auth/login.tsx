import { Form, Head, Link } from '@inertiajs/react';
import React from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import AppLogoIcon from '@/components/app-logo-icon';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <div className="bg-white/90 backdrop-blur-2xl p-10 md:p-14 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col gap-10">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            
            <Head title="Log in" />

            <div className="w-full max-w-[440px] relative z-10 p-6">
                <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/50 flex flex-col gap-10">
                    <div className="flex flex-col items-center text-center gap-6">
                        <div className="w-16 h-16 bg-primary rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
                             <AppLogoIcon className="w-10 h-10 fill-white" />
                        </div>
                        <div className="space-y-1.5 px-4">
                            <h1 className="text-3xl font-black text-on-surface tracking-tighter leading-none">The Curator</h1>
                            <p className="text-sm text-on-surface-variant/80 font-medium tracking-tight">Enter your credentials to access the studio</p>
                        </div>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-8"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-6">
                                    <div className="space-y-2.5">
                                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-2">Email Address</Label>
                                        <div className="relative group">
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="name@studio.com"
                                                className="h-14 px-6 rounded-2xl bg-surface-container-lowest border-surface-container-high focus:ring-primary/20 focus:border-primary transition-all text-sm font-semibold shadow-sm group-hover:border-primary/40"
                                            />
                                        </div>
                                        <InputError message={errors.email} className="ml-2" />
                                    </div>

                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between ml-2 pr-2">
                                            <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">Password</Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:tracking-[0.1em] transition-all opacity-80 hover:opacity-100"
                                                    tabIndex={5}
                                                >
                                                    Forgot?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="group">
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className="h-14 px-6 rounded-2xl bg-surface-container-lowest border-surface-container-high focus:ring-primary/20 focus:border-primary transition-all text-sm group-hover:border-primary/40 shadow-sm"
                                            />
                                        </div>
                                        <InputError message={errors.password} className="ml-2" />
                                    </div>

                                    <div className="flex items-center gap-3 ml-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="w-5 h-5 rounded-lg border-surface-container-high data-[state=checked]:bg-primary data-[state=checked]:border-primary shadow-sm"
                                        />
                                        <Label htmlFor="remember" className="text-xs font-bold text-on-surface-variant/80 cursor-pointer select-none">Remember this session</Label>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <Button
                                        type="submit"
                                        className="h-16 w-full rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-[0.25em] shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-3 group"
                                        tabIndex={4}
                                        disabled={processing}
                                    >
                                        {processing ? <Spinner className="w-5 h-5" /> : (
                                            <>
                                                <span>Launch Studio</span>
                                                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                            </>
                                        )}
                                    </Button>

                                    {canRegister && (
                                        <div className="text-center">
                                            <p className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant/50">
                                                New to the studio?{' '}
                                                <Link href={register()} className="text-primary hover:text-primary/70 transition-colors ml-1">Join Now</Link>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="p-4 rounded-2xl bg-green-50/50 border border-green-100 text-center text-[11px] font-black uppercase tracking-widest text-green-700">
                            {status}
                        </div>
                    )}
                </div>
                
                <p className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 select-none">
                    © 2026 Curator | Powered by Advanced Analytics
                </p>
            </div>
        </div>
    );
}
