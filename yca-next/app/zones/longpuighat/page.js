'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { branchesAPI, committeeAPI } from '@/app/lib/api';

export default function LongpuighatZonePage() {
    const [branches, setBranches] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    const FALLBACK_LEADERS = [
        { name: 'District President', designation: 'Zonal President', photo_url: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop' },
        { name: 'District Secretary', designation: 'Zonal Secretary', photo_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop' },
    ];

    const FALLBACK_BRANCHES = [
        { name: 'Longpuighat Branch', description: 'Primary hub for riverine environmental initiatives and border trade coordination.', slug: 'longpuighat' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bRes = await branchesAPI.getAll();
                if (bRes.success && bRes.data?.length > 0) {
                    const filtered = bRes.data.filter(b =>
                        b.zone?.name.toLowerCase().includes('longpuighat')
                    );
                    setBranches(filtered.length > 0 ? filtered : FALLBACK_BRANCHES);
                } else {
                    setBranches(FALLBACK_BRANCHES);
                }

                const cRes = await committeeAPI.getAll('zonal');
                if (cRes.success && cRes.data?.length > 0) {
                    const zonalLeaders = cRes.data.filter(l => l.zone?.name.toLowerCase().includes('longpuighat'));
                    setLeaders(zonalLeaders.length > 0 ? zonalLeaders : FALLBACK_LEADERS);
                } else {
                    setLeaders(FALLBACK_LEADERS);
                }
            } catch (err) {
                console.error(err);
                setBranches(FALLBACK_BRANCHES);
                setLeaders(FALLBACK_LEADERS);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-col items-center text-center gap-6 mb-24 animate-fade-in-up">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Strategic Frontier HQ</span>
                <h1 className="text-5xl md:text-8xl font-black text-primary leading-tight">
                    Longpuighat <br /> <span className="text-accent underline decoration-primary decoration-8 underline-offset-12">Zone</span>
                </h1>
                <p className="max-w-3xl text-xl font-medium opacity-60 leading-relaxed mt-4">
                    The riverine gateway of the YCA. Longpuighat Zone coordinates our efforts along the
                    international borders, focusing on community resilience and heritage preservation.
                </p>
            </div>

            {/* Leadership Grid */}
            <section className="mb-32">
                <div className="flex items-center gap-6 mb-16">
                    <h2 className="text-3xl font-black text-primary whitespace-nowrap">Zone Leadership</h2>
                    <div className="h-px bg-gray-100 dark:bg-white/10 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    {loading ? (
                        [1, 2].map(i => <div key={i} className="h-48 rounded-[3rem] bg-gray-100 dark:bg-white/5 animate-pulse"></div>)
                    ) : (
                        leaders.map((leader, i) => (
                            <div key={i} className="group flex flex-col items-center text-center p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl hover:-translate-y-2 transition-all">
                                <div className="relative size-40 mb-8 rounded-full p-1 bg-gradient-to-tr from-primary to-accent transition-transform duration-500 group-hover:rotate-12">
                                    <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-white dark:border-background-dark">
                                        <Image
                                            src={leader.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                            alt={leader.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-125"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-primary mb-2">{leader.name}</h3>
                                <p className="text-sm font-black uppercase tracking-widest text-accent">{leader.designation}</p>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Branch List */}
            <section className="mb-32">
                <div className="p-12 md:p-20 rounded-[4rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                        <h2 className="text-4xl font-black text-primary italic">Frontier Branches</h2>
                        <Link href="/branches" className="px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-accent transition-all">Connect Now</Link>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {loading ? (
                            <div className="col-span-full py-10 text-center animate-pulse font-black text-primary uppercase tracking-widest">Loading Registry...</div>
                        ) : branches.map((branch, i) => (
                            <Link key={i} href={`/branches/${branch.slug || branch._id}`} className="group p-10 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 border border-transparent hover:border-accent hover:bg-white dark:hover:bg-white/10 transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="space-y-2 text-center md:text-left">
                                    <h3 className="text-3xl font-black text-primary group-hover:text-accent transition-colors">{branch.name}</h3>
                                    <p className="font-medium opacity-60 text-lg leading-relaxed max-w-2xl">{branch.description || 'Regional administrative unit overseeing specialized frontier initiatives.'}</p>
                                </div>
                                <span className="material-symbols-outlined text-5xl text-primary group-hover:translate-x-4 transition-transform">trending_flat</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
