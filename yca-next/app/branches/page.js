'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { branchesAPI, zonesAPI } from '@/app/lib/api';

export default function BranchesPage() {
    const [search, setSearch] = useState('');
    const [selectedZone, setSelectedZone] = useState('All');
    const [branches, setBranches] = useState([]);
    const [zones, setZones] = useState(['All']);
    const [loading, setLoading] = useState(true);
    const [hoveredBranch, setHoveredBranch] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [zonesRes, branchesRes] = await Promise.all([
                    zonesAPI.getAll(),
                    branchesAPI.getAll()
                ]);

                if (zonesRes.success && zonesRes.data) {
                    setZones(['All', 'Central Administration', ...zonesRes.data.map(z => z.name)]);
                }

                if (branchesRes.success && branchesRes.data) {
                    setBranches(branchesRes.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredBranches = branches.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
        if (selectedZone === 'All') return matchesSearch;
        if (selectedZone === 'Central Administration') return matchesSearch && !b.zones;
        return matchesSearch && b.zones?.name === selectedZone;
    });

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-col gap-6 mb-20 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight">
                    Find Your <br /> <span className="text-accent">Local Community</span>
                </h1>
                <p className="max-w-2xl text-xl font-medium opacity-60">
                    The YCA operates through hundreds of local branches. Find yours below to get active
                    in your immediate vicinity.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Left Column: List */}
                <div className="flex-grow lg:w-2/3 space-y-12">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-6 p-4 rounded-[2.5rem] bg-white dark:bg-white/5 shadow-2xl border border-gray-100 dark:border-white/10">
                        <div className="relative flex-grow">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                            <input
                                className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                placeholder="Search by branch name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <select
                            className="h-16 px-8 rounded-2xl bg-gray-50 dark:bg-black/20 outline-none focus:ring-4 focus:ring-primary/10 transition-all font-black text-sm uppercase tracking-widest cursor-pointer"
                            value={selectedZone}
                            onChange={(e) => setSelectedZone(e.target.value)}
                        >
                            {zones.map(z => <option key={z} value={z}>{z}</option>)}
                        </select>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]">
                        {loading ? (
                            [1, 2, 3, 4].map(i => (
                                <div key={i} className="h-64 rounded-[2.5rem] bg-white dark:bg-white/5 animate-pulse"></div>
                            ))
                        ) : filteredBranches.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <span className="material-symbols-outlined text-6xl text-gray-300">location_off</span>
                                <p className="text-xl font-black text-gray-400 mt-4">No branches match your selection</p>
                            </div>
                        ) : (
                            filteredBranches.map((branch, i) => (
                                <Link
                                    key={branch.id || branch._id || i}
                                    href={`/branches/${branch.slug || branch.id || branch._id}`}
                                    onMouseEnter={() => setHoveredBranch(branch)}
                                    className="group p-8 rounded-[2.5rem] bg-slate-50/50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 shadow-xl hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 transition-all animate-fade-in-up cursor-pointer"
                                >
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className={`size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/20`}>
                                            <span className="material-symbols-outlined text-3xl">location_city</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-black dark:text-white">{branch.name}</h3>
                                            <p className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 tracking-widest">{branch.zones?.name || 'Central Administration'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-white/10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-widest">Election Cycle</span>
                                            <span className="font-black text-slate-800 dark:text-slate-300">Next: 2026</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div
                                                className="size-12 rounded-xl bg-primary text-white flex items-center justify-center transition-all hover:bg-accent hover:rotate-6 shadow-lg shadow-primary/20"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.name + ' ' + (branch.landmark || '') + ' Mizoram India')}`, '_blank');
                                                }}
                                                title="Get Directions"
                                            >
                                                <span className="material-symbols-outlined text-2xl font-black">directions</span>
                                            </div>
                                            <div
                                                className="size-12 rounded-xl bg-white dark:bg-white/5 text-slate-600 hover:text-primary flex items-center justify-center transition-colors border border-slate-300 dark:border-transparent"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    window.open(`https://maps.google.com/maps?q=${encodeURIComponent(branch.name + ' ' + (branch.landmark || '') + ' Mizoram India')}&output=embed`, '_blank');
                                                }}
                                                title="View on Maps"
                                            >
                                                <span className="material-symbols-outlined text-2xl font-black">map</span>
                                            </div>
                                            <div className="flex items-center justify-center px-10 h-12 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-accent hover:rotate-2 transition-all shadow-xl shadow-primary/30 active:scale-95">
                                                Connect
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Mini Map */}
                <aside className="lg:w-1/3 space-y-8 sticky top-24 h-fit">
                    <div className="p-8 rounded-[3rem] bg-primary/5 dark:bg-primary/10 border border-primary/10 space-y-8 overflow-hidden relative">
                        <h3 className="text-2xl font-black text-primary dark:text-white flex items-center gap-3">
                            <span className="material-symbols-outlined">map</span>
                            Visual Directory
                        </h3>
                        <div className="relative rounded-[2.5rem] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] h-[500px] border-4 border-white dark:border-white/5">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(((hoveredBranch || filteredBranches[0])?.address || (hoveredBranch || filteredBranches[0])?.name || '') + ' Mizoram India')}&output=embed`}
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                            <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 rounded-[2rem]"></div>
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-2xl flex items-center justify-between shadow-xl">
                                <span className="font-black text-[10px] uppercase tracking-widest opacity-60">
                                    {(hoveredBranch || filteredBranches[0])?.name || 'Regional Overview'}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-black text-primary uppercase">Live Context</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm font-medium opacity-60 leading-relaxed text-center">
                            Click on the map or select a zone to see local branch coordinates
                            and administrative details.
                        </p>
                    </div>

                    <div className="p-10 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center text-center space-y-6">
                        <span className="material-symbols-outlined text-5xl text-gray-300">add_location_alt</span>
                        <h4 className="text-xl font-black">Branch not listed?</h4>
                        <p className="text-sm opacity-50 font-medium leading-relaxed">
                            If you are setting up a new YCA local unit, please contact the
                            Central Secretariat for official recognition.
                        </p>
                        <button className="px-10 py-4 bg-gray-100 dark:bg-white/10 font-black rounded-2xl hover:bg-primary hover:text-white transition-all">
                            Request Charter
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
