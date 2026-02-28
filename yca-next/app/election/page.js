'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { electionsAPI } from '@/app/lib/api';
import ElectionBanner from '@/app/components/ElectionBanner';

export default function ElectionPage() {
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeYear, setActiveYear] = useState(new Date().getFullYear());

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'TBA';
        return date.toLocaleDateString(undefined, { dateStyle: 'long' });
    };

    const FALLBACK_ELECTIONS = [
        {
            _id: '1',
            title: 'General Election 2024',
            status: 'active',
            type: 'Central Committee',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            totalVotes: 0,
            zone: { name: 'Main HQ' }
        },
        {
            _id: '2',
            title: 'Regional Committee Election 2023',
            status: 'completed',
            type: 'Regional',
            startDate: '2023-01-01',
            endDate: '2023-11-20',
            totalVotes: 4250,
            zone: { name: 'Kamalanagar' },
            results: [
                { position: 'President', winner: { name: 'Jyoti Chakma' }, votes: 2100 },
                { position: 'General Secretary', winner: { name: 'Sagar Chakma' }, votes: 1950 }
            ]
        }
    ];

    useEffect(() => {
        const fetchElections = async () => {
            setLoading(true);
            try {
                const response = await electionsAPI.getAll();
                if (response.success && response.data?.length > 0) {
                    setElections(response.data);
                } else {
                    console.log('Using fallback election data');
                    setElections(FALLBACK_ELECTIONS);
                }
            } catch (error) {
                console.error('Error fetching elections:', error);
                setElections(FALLBACK_ELECTIONS);
            } finally {
                setLoading(false);
            }
        };
        fetchElections();
    }, []);

    const activeElections = elections.filter(e => e.status === 'active' || e.status === 'upcoming' || e.status === 'ongoing');
    const completedElections = elections.filter(e => e.status === 'completed');

    const years = [...new Set(
        completedElections
            .map(e => e.endDate ? new Date(e.endDate).getFullYear() : null)
            .filter(year => year !== null && !isNaN(year))
    )].sort((a, b) => b - a);

    if (years.length === 0 && !loading) years.push(new Date().getFullYear());

    const stats = [
        { label: 'Total Votes Cast', value: completedElections.reduce((acc, curr) => acc + (curr.totalVotes || 0), 0).toLocaleString(), icon: 'how_to_reg' },
        { label: 'Live/Upcoming', value: activeElections.length.toString(), icon: 'analytics' },
        { label: 'Historical Data', value: completedElections.length.toString(), icon: 'groups' },
    ];

    return (
        <div className="flex flex-col">
            <ElectionBanner />
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="flex flex-col gap-6 mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight">
                        Democratic <br /> <span className="text-accent underline decoration-primary decoration-4 underline-offset-8">Legacy</span>
                    </h1>
                    <p className="max-w-2xl text-xl font-medium opacity-60">
                        Explore the official archive of the Young Chakma Association elections.
                        Transparency and accountability for our future leaders.
                    </p>

                    {/* General Election Info Section */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 rounded-[3.5rem] bg-gray-50 border border-gray-100 shadow-sm transition-all">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-primary">Election Protocol & Rules</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                The General Election is the most significant event in the YCA calendar, governed by strict constitutional protocols.
                                Understanding these rules is essential for every candidate and voter.
                            </p>

                            <Link href="/election/protocol" className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-accent transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                <span className="material-symbols-outlined text-lg">gavel</span>
                                Read Official Protocol
                            </Link>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase text-primary opacity-40">Directly Elected Posts (Central General Election)</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                        <span className="size-1.5 bg-accent rounded-full"></span> President (1)
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                        <span className="size-1.5 bg-accent rounded-full"></span> Vice-President (2)
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                        <span className="size-1.5 bg-accent rounded-full"></span> General Secretary (1)
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                        <span className="size-1.5 bg-accent rounded-full"></span> Treasurer (1)
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-tight pt-2 border-t border-gray-100 mt-2">
                                    * Other portfolios (Secretaries) and Executive Members are selected by the elected panel post-election.
                                </p>
                            </div>
                        </div>

                        {/* Voter Eligibility Card */}
                        <div className="md:col-span-2 p-8 md:p-12 rounded-[3rem] bg-indigo-50 border border-indigo-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 size-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-colors"></div>
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-1 space-y-4">
                                    <h3 className="text-2xl font-black text-indigo-900">Voter Eligibility</h3>
                                    <p className="text-sm text-indigo-900/60 leading-relaxed font-medium">
                                        Only members enrolled in the <strong>Official Electoral Roll</strong> and meeting specific constitutional criteria can vote in the Central General Election (U/S 34).
                                    </p>
                                    <div className="flex items-center gap-2 p-3 bg-white/60 rounded-xl border border-indigo-100">
                                        <span className="material-symbols-outlined text-indigo-600">stars</span>
                                        <span className="text-xs font-black text-indigo-900 uppercase tracking-widest leading-none">Special Focus: Donor members</span>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none">Eligible Electors</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2 text-xs font-bold text-indigo-900">
                                                <span className="material-symbols-outlined text-sm mt-0.5 text-indigo-500">check_circle</span>
                                                Existing Central Executive Committee members
                                            </li>
                                            <li className="flex items-start gap-2 text-xs font-bold text-indigo-900">
                                                <span className="material-symbols-outlined text-sm mt-0.5 text-indigo-500">check_circle</span>
                                                Office Bearers of Regional & District HQs
                                            </li>
                                            <li className="flex items-start gap-2 text-xs font-bold text-indigo-900">
                                                <span className="material-symbols-outlined text-sm mt-0.5 text-indigo-500">check_circle</span>
                                                Office Bearers of Zonal Executive Committees
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none">Branch & Donor Reps</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2 text-xs font-bold text-indigo-900">
                                                <span className="material-symbols-outlined text-sm mt-0.5 text-indigo-500">check_circle</span>
                                                Branch Pres, VP, Gen. Sec, & Treasurer
                                            </li>
                                            <li className="flex items-start gap-2 text-xs font-bold text-indigo-900 font-black decoration-indigo-200">
                                                <span className="material-symbols-outlined text-sm mt-0.5 text-indigo-500">verified</span>
                                                ALL CURRENT DONOR MEMBERS
                                            </li>
                                            <li className="group/item flex items-start gap-2 text-xs font-bold text-indigo-900 bg-white/40 p-2 rounded-lg border border-indigo-100/50">
                                                <span className="material-symbols-outlined text-sm mt-0.5 text-indigo-500">info</span>
                                                <div className="space-y-1">
                                                    <p className="font-black">Electoral Roll (ANNEXURE-V)</p>
                                                    <p className="opacity-70 font-medium leading-relaxed">
                                                        Official list prepared by the Election Committee.
                                                        Contains: Serial No., Name, Father's Name, Age, & Sex of every eligible voter.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Electoral Roll Access Card */}
                        <div className="md:col-span-2 p-8 md:p-12 rounded-[3rem] bg-amber-50 border border-amber-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 size-64 bg-amber-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-400/10 transition-colors"></div>
                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                                <div className="space-y-4 flex-grow">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                        Draft Release
                                    </div>
                                    <h3 className="text-3xl font-black text-amber-900">Digital Electoral Roll 2026</h3>
                                    <p className="text-sm text-amber-900/60 leading-relaxed font-medium max-w-xl">
                                        The draft electoral roll is now available for public viewing. This list contains all eligible voters for the upcoming General Election.
                                    </p>
                                    <div className="flex items-center gap-3 p-4 bg-white/60 rounded-2xl border border-amber-200/50">
                                        <span className="material-symbols-outlined text-amber-600 animate-pulse">info</span>
                                        <p className="text-xs font-black text-amber-900 uppercase tracking-widest leading-none">
                                            Note: After claim and objection, the full final electoral roll will be updated again.
                                        </p>
                                    </div>
                                </div>
                                <Link href="/electoral-roll" className="shrink-0 px-10 py-5 bg-amber-600 text-white font-black rounded-2xl hover:bg-amber-700 transition-all shadow-xl shadow-amber-600/20 flex items-center gap-4 group/btn">
                                    Access Digital Roll
                                    <span className="material-symbols-outlined transform group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active / Upcoming Elections Section */}
                {activeElections.length > 0 && (
                    <div className="mb-20 animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="relative flex h-5 w-5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white shadow-sm"></span>
                            </span>
                            <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">Live & Upcoming Elections</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {activeElections.map((election) => (
                                <Link href={`/election/${election.id || election._id}`} key={election.id || election._id} className="block group">
                                    <div className="p-8 rounded-[2.5rem] bg-white border border-red-100 shadow-xl hover:-translate-y-2 transition-all relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-100 transition-colors"></div>
                                        <div className="relative z-10 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <span className="px-4 py-1.5 bg-red-100 text-red-700 font-extrabold text-xs uppercase tracking-widest rounded-full">
                                                    {election.status === 'active' ? 'Live Voting' : election.status}
                                                </span>
                                            </div>
                                            <h4 className="text-2xl font-black text-primary">{election.title}</h4>
                                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                                    <span className="material-symbols-outlined text-lg">category</span>
                                                    {election.type} {election.zone?.name ? `(${election.zone.name})` : ''}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                                                    {formatDate(election.startDate)} - {formatDate(election.endDate)}
                                                </div>
                                            </div>
                                            <div className="pt-4 flex items-center justify-between text-primary font-black group-hover:text-red-600 transition-colors">
                                                <span>Enter Election Hub</span>
                                                <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div className="space-y-12 mb-20 animate-fade-in-up">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">Election Results Archive</h3>
                        <div className="flex gap-3 bg-gray-100 dark:bg-white/5 p-2 rounded-[1.5rem] overflow-x-auto max-w-full">
                            {years.map(y => (
                                <button
                                    key={y}
                                    onClick={() => setActiveYear(y)}
                                    className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${activeYear === y ? 'bg-primary text-white shadow-xl scale-105' : 'text-gray-400 hover:text-primary'}`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((s, i) => (
                            <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl flex items-center gap-6 group hover:-translate-y-2 transition-all">
                                <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-3xl">{s.icon}</span>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white">{s.value}</p>
                                    <p className="text-sm font-bold opacity-50 uppercase tracking-widest">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Historical Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in-up">
                    {completedElections.filter(e => new Date(e.endDate).getFullYear() === activeYear).map((election, idx) => (
                        <div key={election._id || idx} className="space-y-8">
                            <h3 className="text-2xl font-black text-primary flex items-center gap-4">
                                <span className="size-3 bg-primary rounded-full"></span>
                                {election.title}
                            </h3>
                            <div className="bg-white dark:bg-white/5 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-white/10">
                                        <tr>
                                            <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-widest opacity-40">Position</th>
                                            <th className="px-8 py-6 text-left text-xs font-black uppercase tracking-widest opacity-40">Elected</th>
                                            <th className="px-8 py-6 text-right text-xs font-black uppercase tracking-widest opacity-40">Votes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                        {election.results?.length > 0 ? election.results.map((r, i) => (
                                            <tr key={i} className="group hover:bg-primary/5 transition-colors">
                                                <td className="px-8 py-6 font-black text-primary">{r.position}</td>
                                                <td className="px-8 py-6 font-bold text-gray-600 dark:text-gray-300">
                                                    {r.winner?.name || 'Unknown'}
                                                </td>
                                                <td className="px-8 py-6 text-right font-black text-lg">{r.votes.toLocaleString()}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-10 text-center opacity-40 italic">Results not yet finalized for this election.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Card */}
                <div className="mt-32 p-12 md:p-20 rounded-[4rem] bg-primary text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 flex-grow space-y-4">
                        <h4 className="text-3xl font-black">Election Information?</h4>
                        <p className="text-lg opacity-80 font-medium max-w-xl leading-relaxed">
                            General elections are the cornerstone of the YCA democratic process.
                            Learn about eligibility criteria and nomination procedures in our By-Laws.
                        </p>
                    </div>
                    <Link href="/bylaw" className="relative z-10 px-10 py-5 bg-white text-primary font-black rounded-2xl hover:bg-accent hover:text-white transition-all shadow-xl whitespace-nowrap">
                        View By-Laws
                    </Link>
                </div>
            </div>
        </div>
    );
}
