'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { authAPI, membershipAPI } from '@/app/lib/api';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [membership, setMembership] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const meRes = await authAPI.getMe();
            if (meRes.success && meRes.data) {
                setUser(meRes.data);
                const memRes = await membershipAPI.getMyStatus();
                if (memRes.success) {
                    setMembership(memRes.data);
                }
            } else {
                window.location.href = '/login';
            }
            setLoading(false);
        };
        init();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* Header / Stats Section */}
            <div className="bg-slate-950 pt-32 pb-48 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-black text-white">
                                Welcome, <span className="text-primary">{user?.user_metadata?.name || 'Member'}</span>
                            </h1>
                            <p className="text-white/40 font-medium tracking-wide uppercase text-xs">
                                YCA Member Portal • Established 1974
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="/membership" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase hover:bg-white/10 transition-all">
                                Edit Profile
                            </Link>
                            <button onClick={() => { localStorage.clear(); window.location.href = '/'; }} className="px-8 py-4 bg-accent text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-accent/20 hover:scale-105 transition-all">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 -mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* ID CARD COLUMN */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex items-center gap-4 text-slate-900 mb-2">
                            <span className="material-symbols-outlined font-black">badge</span>
                            <h2 className="text-xl font-black uppercase tracking-tighter">Digital Identity Card</h2>
                        </div>

                        {/* THE ID CARD - FRONT */}
                        <div className="relative aspect-[1.58/1] w-full max-w-md mx-auto group perspective-1000">
                            <div className="relative w-full h-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 transition-all duration-700 group-hover:shadow-primary/20">
                                {/* Side Accent */}
                                <div className="absolute top-0 left-0 w-4 h-full bg-primary"></div>
                                <div className="absolute top-0 right-0 w-16 h-full bg-primary/5"></div>

                                {/* Background Watermark Logo */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 opacity-[0.03] pointer-events-none">
                                    <Image src="/assets/ycalogo.png" alt="" fill className="object-contain" />
                                </div>

                                {/* Top Header */}
                                <div className="p-8 pb-4 flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="size-14 relative bg-white rounded-xl p-1 shadow-sm border border-gray-50">
                                            <Image src="/assets/ycalogo.png" alt="Logo" fill className="object-contain p-1" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-primary leading-none uppercase tracking-tighter">Young Chakma</h3>
                                            <p className="text-[10px] font-black text-accent tracking-[0.2em] leading-none mt-1">ASSOCIATION</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="px-3 py-1 bg-primary/10 text-primary text-[8px] font-black rounded-lg uppercase tracking-widest border border-primary/10">
                                            {membership?.status || 'Active Member'}
                                        </div>
                                    </div>
                                </div>

                                {/* Body Section */}
                                <div className="px-8 py-4 flex gap-8">
                                    {/* Profile Photo Placeholder */}
                                    <div className="size-28 rounded-2xl bg-gray-100 border-2 border-primary/10 overflow-hidden relative shadow-inner">
                                        {user?.user_metadata?.avatar_url ? (
                                            <Image src={user.user_metadata.avatar_url} alt="Profile" fill className="object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                                                <span className="material-symbols-outlined text-5xl">person</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                                            <p className="text-lg font-black text-slate-900 uppercase leading-none">{user?.user_metadata?.name || 'N/A'}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Member ID</p>
                                                <p className="text-xs font-bold text-slate-700">#YCA-{user?.id?.slice(0, 5).toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Valid Till</p>
                                                <p className="text-xs font-bold text-slate-700">Dec 2026</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-50 border-t border-gray-100 flex items-center justify-between px-8">
                                    <div className="flex flex-col">
                                        <p className="text-[7px] font-black text-gray-400 uppercase tracking-[0.2em]">Official Member</p>
                                        <p className="text-[10px] font-black text-slate-900 uppercase">Young Chakma Association</p>
                                    </div>
                                    <div className="size-10 bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm">
                                        {/* Mock QR Code */}
                                        <div className="w-full h-full bg-slate-900/5 grid grid-cols-3 gap-0.5">
                                            {[...Array(9)].map((_, i) => (
                                                <div key={i} className={`rounded-[1px] ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Print Instructions */}
                        <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex items-start gap-4">
                            <span className="material-symbols-outlined text-blue-500">info</span>
                            <p className="text-xs text-blue-700 font-medium leading-relaxed">
                                This is your official digital identity card. You can use this for entry into YCA meetings
                                and to verify your identity during official elections. For physical copy, click "Download for Print".
                            </p>
                        </div>
                    </div>

                    {/* MENU / ACTIVITIES COLUMN */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="flex items-center gap-4 text-slate-900 mb-2">
                            <span className="material-symbols-outlined font-black">dashboard_customize</span>
                            <h2 className="text-xl font-black uppercase tracking-tighter">Member Services</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'Voting History', icon: 'how_to_vote', color: 'bg-primary/10 text-primary', link: '/election' },
                                { title: 'Membership Status', icon: 'verified', color: 'bg-accent/10 text-accent', link: '/membership' },
                                { title: 'Dues & Donations', icon: 'payments', color: 'bg-amber-500/10 text-amber-500', link: '#' },
                                { title: 'By-Laws Library', icon: 'menu_book', color: 'bg-blue-500/10 text-blue-500', link: '/bylaw' },
                            ].map((item, i) => (
                                <Link
                                    key={i}
                                    href={item.link}
                                    className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex items-center gap-6"
                                >
                                    <div className={`size-16 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{item.title}</h3>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Access Portal</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Recent Activity Card */}
                        <div className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black text-slate-900">Recent Notifications</h3>
                                <button className="text-xs font-black text-primary uppercase tracking-widest hover:underline text-left">View All</button>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { date: '19 Feb', msg: 'System update: WhatsApp OTP authentication enabled for all members.', type: 'System' },
                                    { date: '14 Feb', msg: 'General Election scheduled for March 14, 2026. Nomination phase open.', type: 'Election' }
                                ].map((n, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="text-center shrink-0">
                                            <p className="text-lg font-black text-slate-950 leading-none">{n.date.split(' ')[0]}</p>
                                            <p className="text-[8px] font-black text-gray-400 uppercase">{n.date.split(' ')[1]}</p>
                                        </div>
                                        <div className="flex-1 pb-6 border-b border-gray-50 text-left">
                                            <p className="text-xs font-black text-primary px-2 py-0.5 bg-primary/5 rounded-md w-fit mb-2">{n.type}</p>
                                            <p className="text-sm font-medium text-slate-600 leading-relaxed">{n.msg}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
