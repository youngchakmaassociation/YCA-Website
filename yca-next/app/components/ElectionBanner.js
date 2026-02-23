'use client';

import { useState } from 'react';

export default function ElectionBanner() {
    const [expandedZone, setExpandedZone] = useState(null);

    const zonesData = [
        {
            name: 'Kamalanagar (CYCA HQ)',
            totalCast: 7,
            totalEligible: 12,
            branches: [
                { name: 'Kamalanagar-I Branch', cast: 4, eligible: 4 },
                { name: 'Kamalanagar-II Branch', cast: 2, eligible: 4 },
                { name: 'Kamalanagar-III Branch', cast: 1, eligible: 4 }
            ]
        },
        {
            name: 'Longpuighat Zone',
            totalCast: 6,
            totalEligible: 12,
            branches: [
                { name: 'Longpuighat Branch', cast: 3, eligible: 4 },
                { name: 'Gursury Branch', cast: 1, eligible: 4 },
                { name: 'Jarulsury Branch', cast: 2, eligible: 4 }
            ]
        },
        {
            name: 'Bageisury Zone',
            totalCast: 8,
            totalEligible: 12,
            branches: [
                { name: 'Bageisury-I Branch', cast: 4, eligible: 4 },
                { name: 'Bageisury-II Branch', cast: 3, eligible: 4 },
                { name: 'Sumsilui Branch', cast: 1, eligible: 4 }
            ]
        }
    ];

    const grandTotalCast = zonesData.reduce((acc, curr) => acc + curr.totalCast, 0);
    const grandTotalEligible = zonesData.reduce((acc, curr) => acc + curr.totalEligible, 0);

    return (
        <div className="w-full bg-[#050a14] py-12 px-4 border-b border-white/5 font-display">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Status Dashboard */}
                <div className="flex flex-wrap items-center gap-4 animate-fade-in">
                    <div className="flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full border border-white/10">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-700"></span>
                        </span>
                        <span className="text-sm font-black text-[#005d32] uppercase tracking-[0.3em]">
                            Live & Upcoming
                        </span>
                    </div>

                    <div className="px-5 py-2 bg-red-500/10 rounded-full border border-red-500/20 flex items-center gap-3">
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                            Live Recording In Progress
                        </span>
                    </div>

                    <div className="ml-auto hidden md:flex items-center gap-4 text-white/40">
                        <span className="material-symbols-outlined text-sm">gavel</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            Rule: Max 4 Voters per Branch (Office Bearers Only)
                        </span>
                    </div>
                </div>

                {/* Main Election Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: General Info Card (7 Cols) */}
                    <div className="lg:col-span-12 xl:col-span-7 relative overflow-hidden rounded-[3.5rem] bg-[#005d32] p-8 md:p-14 shadow-2xl border border-white/10 group h-full">
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                                    CENTRAL COMMITTEE GENERAL ELECTION 2025
                                </h2>
                                <div className="flex flex-wrap gap-4">
                                    <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                                        CENTRAL HQ
                                    </span>
                                    <span className="px-6 py-2 rounded-full bg-black/20 backdrop-blur-md border border-red-900/30 text-red-500 text-[10px] font-black uppercase tracking-widest">
                                        ACTIVE
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-10 border-t border-white/10">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Election Date</span>
                                <p className="text-2xl md:text-5xl font-black text-white tracking-tight">
                                    18 February 2026
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Live Votes Dashboard (5 Cols) */}
                    <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4 h-full">
                        <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/10 flex-grow shadow-2xl">
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-3">
                                    Live Casting Votes
                                    <span className="text-[10px] text-white/30">(By Zone)</span>
                                </h3>
                                <div className="flex flex-col items-end">
                                    <span className="text-xl font-black text-white leading-none">{grandTotalCast} <span className="text-white/30 truncate text-xs">/ {grandTotalEligible}</span></span>
                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest mt-1">Total Cast</span>
                                </div>
                            </div>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {zonesData.map((zone, i) => (
                                    <div key={i} className="space-y-2">
                                        <button
                                            onClick={() => setExpandedZone(expandedZone === i ? null : i)}
                                            className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${expandedZone === i ? 'bg-[#005d32] text-white' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="material-symbols-outlined text-lg">
                                                    {expandedZone === i ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
                                                </span>
                                                <span className="text-sm font-black uppercase tracking-tight">{zone.name}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm font-black">{zone.totalCast} <span className="text-[10px] opacity-40">/ {zone.totalEligible}</span></span>
                                            </div>
                                        </button>

                                        {expandedZone === i && (
                                            <div className="grid grid-cols-1 gap-2 px-6 animate-fade-in-down">
                                                {zone.branches.map((br, bi) => (
                                                    <div key={bi} className="flex items-center justify-between p-3 border-l-2 border-white/10 hover:border-[#005d32] transition-colors">
                                                        <span className="text-xs font-bold text-white/60">{br.name}</span>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex gap-1">
                                                                {[...Array(4)].map((_, dotI) => (
                                                                    <div key={dotI} className={`size-1.5 rounded-full ${dotI < br.cast ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-white/10'}`}></div>
                                                                ))}
                                                            </div>
                                                            <span className="text-xs font-black text-white w-8 text-right font-mono">{br.cast} <span className="text-white/20 text-[10px]">/ 4</span></span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                                <div className="flex justify-between text-[8px] font-black uppercase text-white/40 tracking-widest">
                                    <span>Emmited: 74%</span>
                                    <span>Verified: 100%</span>
                                </div>
                                <div className="h-1 shadow-inner bg-black/40 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-white/60 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Constitutional Reminder Box */}
                        <div className="p-6 bg-red-950/20 rounded-3xl border border-red-900/20 flex gap-4 items-start">
                            <span className="material-symbols-outlined text-red-500 bg-red-500/10 p-2 rounded-xl">shield</span>
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest">Voter Integrity Unit</h4>
                                <p className="text-[10px] font-bold text-white/60 leading-relaxed uppercase">
                                    Per Article 32: One Member = One vote. If you hold positions in multiple branches or committees,
                                    you may still only cast one ballot per position.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
