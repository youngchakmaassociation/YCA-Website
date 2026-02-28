'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { branchesAPI, committeeAPI } from '@/app/lib/api';
import IDCardPreview from '@/app/components/IDCardPreview';

export default function CentralAdministrationPage() {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [committee, setCommittee] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showIDCard, setShowIDCard] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch branches and filter for those with no zone (Central Admin)
                const bRes = await branchesAPI.getAll();
                if (bRes.success && bRes.data) {
                    const central = bRes.data.filter(b => !b.zone_id && !b.zones);
                    setBranches(central);
                }

                // Fetch central committee members
                const cRes = await committeeAPI.getAll('central');
                if (cRes.success && cRes.data) {
                    setCommittee(cRes.data);
                }
            } catch (error) {
                console.error('Error fetching central data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center animate-pulse">
            <div className="size-20 bg-primary/20 rounded-full animate-spin border-4 border-primary border-t-transparent mb-8"></div>
            <p className="font-black text-primary uppercase tracking-[0.3em]">Opening Central Secretariat...</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            {selectedMember && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-primary/40 backdrop-blur-xl animate-fade-in" onClick={() => setSelectedMember(null)}></div>
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-zoom-in">
                        <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-primary dark:text-white hover:bg-accent hover:text-white transition-all z-10">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="relative h-48 bg-primary overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                        </div>
                        <div className="px-10 pb-12 -mt-24 relative z-10 text-center">
                            <div className="relative size-40 mx-auto mb-6">
                                <Image src={selectedMember.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'} alt={selectedMember.name} fill className="object-cover rounded-[2.5rem] border-8 border-white dark:border-slate-900 shadow-2xl" />
                            </div>
                            <h2 className="text-3xl font-black text-primary dark:text-white mb-2">{selectedMember.name}</h2>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-8">{selectedMember.designation}</p>
                            <div className="grid grid-cols-2 gap-4">
                                {selectedMember.phone ? (
                                    <>
                                        <a href={`tel:${selectedMember.phone}`} className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-primary text-white hover:bg-accent transition-all group active:scale-95">
                                            <span className="material-symbols-outlined text-3xl">call</span>
                                            <span className="text-xs font-black uppercase tracking-widest">Call Now</span>
                                        </a>
                                        <a href={`https://wa.me/${selectedMember.phone.replace(/[^0-9]/g, '')}`} className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-green-500 text-white hover:bg-green-600 transition-all active:scale-95">
                                            <span className="material-symbols-outlined text-3xl">chat</span>
                                            <span className="text-xs font-black uppercase tracking-widest">WhatsApp</span>
                                        </a>
                                    </>
                                ) : (
                                    <div className="col-span-2 p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 text-center">
                                        <p className="font-black text-gray-400 uppercase text-xs tracking-widest">Official Contact Protected</p>
                                    </div>
                                )}
                            </div>
                            {selectedMember.photo_url && (
                                <button onClick={() => setShowIDCard(true)} className="w-full mt-6 h-16 rounded-3xl border-2 border-primary/20 text-primary font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-all group">
                                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">badge</span>
                                    Verify Central Identity
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showIDCard && (
                <IDCardPreview member={{ ...selectedMember, level: 'central' }} onClose={() => setShowIDCard(false)} />
            )}

            <div className="flex flex-col items-center text-center gap-6 mb-24 animate-fade-in-up">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Supreme Command Center</span>
                <h1 className="text-5xl md:text-8xl font-black text-primary leading-tight">
                    Central <br /> <span className="text-accent underline decoration-primary decoration-8 underline-offset-12">Administration</span>
                </h1>
                <p className="max-w-2xl text-xl font-medium opacity-60 leading-relaxed">
                    The highest executive body of the YCA. Directly overseeing specialized units and
                    coordinating all 9 Zonal Commands across the region.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
                <div className="lg:col-span-2 space-y-32">
                    {/* Leadership Grid */}
                    <section>
                        <div className="flex items-center gap-6 mb-16">
                            <h2 className="text-3xl font-black text-primary whitespace-nowrap">Central Executive</h2>
                            <div className="h-px bg-gray-100 dark:bg-white/10 flex-grow"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            {committee.length > 0 ? committee.map((leader, i) => (
                                <div key={i} className="group text-center animate-fade-in-up cursor-pointer" style={{ animationDelay: `${i * 100}ms` }} onClick={() => setSelectedMember(leader)}>
                                    <div className="relative size-48 mx-auto mb-8">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 blur-xl group-hover:bg-accent/20 transition-all duration-700"></div>
                                        <Image src={leader.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'} alt={leader.name} fill className="object-cover rounded-full border-4 border-white dark:border-white/10 relative z-10 transition-transform duration-700 group-hover:scale-110 shadow-2xl" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{leader.name}</h3>
                                    <p className="text-sm font-black uppercase tracking-widest text-accent">{leader.designation}</p>
                                </div>
                            )) : (
                                <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-200">
                                    <p className="font-black text-gray-400 uppercase tracking-widest text-xs font-black">Official Leadership Registry Syncing...</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Branches Section */}
                    <section>
                        <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                                <h2 className="text-2xl font-black text-primary">Directly Administered Units</h2>
                                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                                    {branches.length} Registered Units
                                </span>
                            </div>
                            <div className="space-y-4">
                                {branches.length > 0 ? branches.map((branch, i) => (
                                    <div key={i} onClick={() => window.location.href = `/branches/${branch.slug || branch.id}`} className="group p-6 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent hover:border-accent hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-black text-primary group-hover:text-accent transition-colors">{branch.name}</h3>
                                            <p className="text-xs font-medium opacity-60">High-priority regional administrative unit.</p>
                                        </div>
                                        <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </div>
                                )) : (
                                    <div className="py-20 text-center text-gray-400 font-bold italic">
                                        No branches are currently directly under Central Administration.
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="space-y-12 h-fit lg:sticky lg:top-24">
                    <div className="p-10 rounded-[3.5rem] bg-primary text-white shadow-2xl space-y-8">
                        <h3 className="text-2xl font-black underline decoration-accent underline-offset-8">Central Directive</h3>
                        <p className="text-sm font-medium opacity-80 leading-relaxed">
                            All Zonal HQs must report directly to the Central Executive Committee for major
                            policy decisions and budgetary approvals.
                        </p>
                        <div className="pt-4 flex flex-col gap-4">
                            <Link href="/about/bylaws" className="w-full py-4 bg-white text-primary text-center font-black rounded-xl hover:bg-accent hover:text-white transition-all">View Constitution</Link>
                            <Link href="/governance" className="w-full py-4 border-2 border-white/20 text-center font-black rounded-xl hover:bg-white/10 transition-all">Governance Structure</Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
