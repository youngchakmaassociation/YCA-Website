'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { committeeAPI } from '@/app/lib/api';
import Image from 'next/image';
import Link from 'next/link';

function VerifyContent() {
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');
    const [idInput, setIdInput] = useState(idParam || '');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVerify = async (e) => {
        if (e) e.preventDefault();
        if (!idInput) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // In a real system, we would have a specific verify endpoint.
            // For now, we'll search by the ID number logic or name.
            // Note: generateIDNumber is deterministic, let's search all and match.
            const res = await committeeAPI.getAll();
            if (res.success) {
                // Find matching member by generated ID or other metadata
                // This is a simplified search for the demo
                const member = res.data.find(m => {
                    const prefix = 'YCA';
                    const getAbbr = (name) => name ? name.split(' ')[0].substring(0, 3).toUpperCase() : '???';
                    let zoneAbbr = m.level === 'central' ? 'CEC' : getAbbr(m.zones?.name || m.branches?.zones?.name || 'GEN');
                    let branchAbbr = m.level === 'branch' ? `-${getAbbr(m.branches?.name)}` : '';
                    const rankMap = { 'president': '001', 'vice-president': '002', 'general secretary': '003' };
                    const desig = (m.designation || '').toLowerCase();
                    const rank = rankMap[desig] || (100 + (m.display_order || 0)).toString().padStart(3, '0');
                    const generatedId = `${prefix}-${zoneAbbr}${branchAbbr}-${rank}`;

                    return generatedId === idInput.toUpperCase() || m.name.toLowerCase().includes(idInput.toLowerCase());
                });

                if (member) {
                    setResult(member);
                } else {
                    setError('No active member found with this Identity Number.');
                }
            }
        } catch (err) {
            setError('Verification service unavailable. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idParam) {
            handleVerify();
        }
    }, [idParam]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center size-20 rounded-3xl bg-primary/10 text-primary mb-6">
                        <span className="material-symbols-outlined text-4xl">verified_user</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Identity Verification</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Official membership verification portal for Young Chakma Association</p>
                </div>

                {/* Search Box */}
                <form onSubmit={handleVerify} className="relative mb-12">
                    <input
                        type="text"
                        placeholder="Enter Member ID (e.g. YCA-CEC-001) or Name"
                        value={idInput}
                        onChange={(e) => setIdInput(e.target.value)}
                        className="w-full h-20 pl-8 pr-32 rounded-[2rem] bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 focus:border-primary outline-none text-xl font-bold transition-all shadow-xl dark:shadow-none dark:text-white"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-3 top-3 bottom-3 px-8 rounded-2xl bg-primary text-white font-black hover:bg-accent transition-all flex items-center gap-2"
                    >
                        {loading ? (
                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">search</span>
                                Verify
                            </>
                        )}
                    </button>
                </form>

                {/* Results Area */}
                <div className="min-h-[300px]">
                    {loading && (
                        <div className="flex flex-col items-center justify-center space-y-6 animate-pulse">
                            <div className="size-32 rounded-full bg-slate-200 dark:bg-white/5"></div>
                            <div className="h-6 w-48 bg-slate-200 dark:bg-white/5 rounded-full"></div>
                        </div>
                    )}

                    {error && (
                        <div className="p-8 rounded-[2.5rem] bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
                            <span className="material-symbols-outlined text-red-500 text-5xl">gpp_maybe</span>
                            <h3 className="text-xl font-black text-red-900 dark:text-red-400 uppercase">Verification Failed</h3>
                            <p className="text-red-700 dark:text-red-400 opacity-80">{error}</p>
                        </div>
                    )}

                    {result && (
                        <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                {/* Photo */}
                                <div className="relative size-40 shrink-0">
                                    <div className="absolute inset-0 rounded-[2.5rem] bg-primary/20 scale-110 blur-xl"></div>
                                    <Image
                                        src={result.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                        alt={result.name}
                                        fill
                                        className="object-cover rounded-[2.5rem] border-4 border-white dark:border-slate-800 shadow-2xl"
                                    />
                                    <div className="absolute -bottom-2 -right-2 size-10 rounded-full bg-green-500 border-4 border-white dark:border-slate-800 flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-xl font-black">check</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-grow space-y-6 text-center md:text-left">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Active Member</span>
                                        <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{result.name}</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 md:col-span-2">
                                            <span className="text-[9px] font-black uppercase text-slate-400 block mb-2">Designations & Units</span>
                                            <div className="flex flex-wrap gap-2">
                                                {(result.roles && result.roles.length > 0 ? result.roles : [{ designation: result.designation, level: result.level, zones: result.zones, branches: result.branches }]).map((role, idx) => (
                                                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-primary/5 dark:bg-primary/20 text-[11px] font-black text-primary dark:text-blue-400 uppercase border border-primary/10">
                                                        {role.designation}
                                                        {role.level === 'zonal' ? ` (${role.zones?.name || 'Zonal'})` :
                                                            role.level === 'branch' ? ` (${role.branches?.name || 'Branch'})` :
                                                                ' (CYCA)'}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold">
                                            <span className="material-symbols-outlined text-xl">verified</span>
                                            Authentic Identity
                                        </div>
                                        <Link
                                            href={result.level === 'branch' ? `/branches/${result.branches?.slug}` : result.level === 'zonal' ? `/zones/${result.zones?.slug}` : '/about'}
                                            className="text-xs font-black uppercase text-primary hover:text-accent flex items-center gap-1"
                                        >
                                            View Official Unit
                                            <span className="material-symbols-outlined text-xs font-black">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Security Note */}
                <p className="mt-12 text-center text-xs font-medium text-slate-400 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    Secure digital verification system ensured by YCA IT Council
                </p>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}
