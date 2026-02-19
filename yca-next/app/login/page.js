'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/app/lib/api';

export default function LoginPage() {
    const [authMethod, setAuthMethod] = useState('password'); // 'password' or 'whatsapp'
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const router = useRouter();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (authMethod === 'password') {
                let response;
                if (isLogin) {
                    response = await authAPI.login({ email, password });
                } else {
                    response = await authAPI.register({ name, email, password });
                }

                if (response.success) {
                    router.push('/');
                } else {
                    setError(response.error || 'Authentication failed');
                }
            } else {
                // WhatsApp OTP Flow
                if (!otpSent) {
                    // Step 1: Request OTP
                    const response = await authAPI.requestWhatsAppOtp(phone);
                    if (response.success) {
                        setOtpSent(true);
                        setSuccessMsg('OTP sent successfully to your WhatsApp!');
                    } else {
                        setError(response.error || 'Failed to send OTP. Please check your number.');
                    }
                } else {
                    // Step 2: Verify OTP
                    const response = await authAPI.verifyWhatsAppOtp(phone, otp);
                    if (response.success) {
                        router.push('/');
                    } else {
                        setError(response.error || 'Invalid OTP. Please try again.');
                    }
                }
            }
        } catch (err) {
            setError('Could not connect to the server. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-6 bg-background-light dark:bg-background-dark overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-1/4 size-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 size-96 bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse delay-1000"></div>

            <div className="w-full max-w-xl animate-fade-in-up">
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/10 space-y-8">
                    <div className="text-center space-y-3">
                        <div className="inline-flex items-center gap-3 text-primary mb-2 group">
                            <Image src="/assets/ycalogo.png" alt="Logo" width={40} height={40} className="logo-3d-pop" />
                            <span className="text-xl font-black tracking-tighter uppercase">Young Chakma Association</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-primary">
                            {authMethod === 'password' ? (isLogin ? 'Welcome Back' : 'Join YCA') : 'Secure Login'}
                        </h1>
                        <p className="text-gray-400 font-medium">
                            {authMethod === 'password'
                                ? (isLogin ? 'Sign in to access your dashboard' : 'Create an account to join us')
                                : 'Fast & Easy Login via WhatsApp OTP'}
                        </p>
                    </div>

                    {/* Auth Method Toggle */}
                    <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 dark:bg-black/40 rounded-2xl">
                        <button
                            onClick={() => { setAuthMethod('password'); setOtpSent(false); setError(''); }}
                            className={`py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${authMethod === 'password' ? 'bg-white dark:bg-white/10 text-primary shadow-sm' : 'text-gray-400'}`}
                        >
                            Password
                        </button>
                        <button
                            onClick={() => { setAuthMethod('whatsapp'); setOtpSent(false); setError(''); }}
                            className={`py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${authMethod === 'whatsapp' ? 'bg-primary text-white shadow-lg' : 'text-gray-400'}`}
                        >
                            <span className="material-symbols-outlined text-sm">chat</span>
                            WhatsApp
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 bg-accent/10 border border-accent/20 rounded-2xl text-accent text-sm font-bold text-center animate-shake">
                            {error}
                        </div>
                    )}

                    {successMsg && (
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 text-sm font-bold text-center">
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-6">
                        {authMethod === 'password' ? (
                            <>
                                {!isLogin && (
                                    <label className="flex flex-col gap-2">
                                        <span className="text-xs font-black uppercase text-primary/60 pl-1">Full Name</span>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full h-14 pl-6 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent focus:border-primary outline-none font-medium"
                                        />
                                    </label>
                                )}
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-black uppercase text-primary/60 pl-1">Email Address</span>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="contact@yca.org"
                                        className="w-full h-14 pl-6 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent focus:border-primary outline-none font-medium"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-black uppercase text-primary/60 pl-1">Password</span>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full h-14 pl-6 pr-12 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent focus:border-primary outline-none font-medium"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </button>
                                    </div>
                                </label>
                            </>
                        ) : (
                            <>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-black uppercase text-primary/60 pl-1">WhatsApp Phone Number</span>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-gray-400">+91</span>
                                        <input
                                            type="tel"
                                            required
                                            disabled={otpSent}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="9876543210"
                                            className={`w-full h-16 pl-16 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent focus:border-primary outline-none font-bold text-lg ${otpSent ? 'opacity-50' : ''}`}
                                        />
                                    </div>
                                </label>

                                {otpSent && (
                                    <div className="space-y-4 animate-fade-in-up">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-xs font-black uppercase text-primary/60 pl-1">Enter 6-digit OTP</span>
                                            <input
                                                type="text"
                                                maxLength={6}
                                                required
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                placeholder="000000"
                                                className="w-full h-16 text-center text-3xl tracking-[0.5em] font-black rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-primary outline-none"
                                            />
                                        </label>
                                        <button type="button" onClick={() => setOtpSent(false)} className="text-xs font-bold text-primary hover:underline">Change phone number?</button>
                                    </div>
                                )}
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-16 ${authMethod === 'whatsapp' ? 'bg-primary' : 'bg-primary'} text-white text-lg font-black rounded-2xl hover:bg-accent transition-all shadow-xl flex items-center justify-center gap-3 mt-4 ${loading ? 'opacity-70' : ''}`}
                        >
                            {loading ? (
                                <span className="material-symbols-outlined animate-spin">refresh</span>
                            ) : (
                                <>
                                    <span>
                                        {authMethod === 'password'
                                            ? (isLogin ? 'Sign In' : 'Create Account')
                                            : (otpSent ? 'Verify & Login' : 'Send WhatsApp OTP')}
                                    </span>
                                    <span className="material-symbols-outlined">arrow_right_alt</span>
                                </>
                            )}
                        </button>
                    </form>

                    {authMethod === 'password' && (
                        <div className="text-center pt-4">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-sm font-bold text-primary hover:underline"
                            >
                                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
