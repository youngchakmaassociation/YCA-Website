'use client';

import { useState, useEffect } from 'react';
import { committeeAPI, zonesAPI, branchesAPI } from '@/app/lib/api';

export default function ElectoralRollPage() {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, central: 0, zonal: 0, branch: 0 });

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await committeeAPI.getAll();
            if (res.success) {
                setMembers(res.data);
                setFilteredMembers(res.data);

                const s = { total: res.data.length, central: 0, zonal: 0, branch: 0 };
                res.data.forEach(m => s[m.level]++);
                setStats(s);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = members.filter(m =>
            m.name.toLowerCase().includes(lowerSearch) ||
            m.designation.toLowerCase().includes(lowerSearch) ||
            m.zones?.name?.toLowerCase().includes(lowerSearch) ||
            m.branches?.name?.toLowerCase().includes(lowerSearch) ||
            m.level?.toLowerCase().includes(lowerSearch)
        );
        setFilteredMembers(filtered);
    }, [search, members]);

    if (loading) return (
        <div className="container mx-auto px-4 py-20 text-center animate-pulse">
            <h1 className="text-4xl font-black text-primary mb-8">Loading Electoral Roll...</h1>
            <div className="w-full max-w-4xl mx-auto h-96 bg-gray-100 rounded-3xl"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-16 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-100 text-amber-700 rounded-full mb-6">
                    <span className="material-symbols-outlined text-sm animate-pulse">info</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Draft Release: 2026 CYCA Election</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-primary mt-4 mb-4">
                    Digital <span className="text-accent underline decoration-primary decoration-8 underline-offset-8">Electoral Roll</span>
                </h1>
                <p className="max-w-2xl mx-auto text-sm font-medium text-primary/60 italic mb-8">
                    Note: This is a draft version. After the claim and objection period, the full final electoral roll will be updated again.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                    {[
                        { label: 'Total Members', val: stats.total },
                        { label: 'Central Committee', val: stats.central },
                        { label: 'Zonal Units', val: stats.zonal },
                        { label: 'Branch Units', val: stats.branch }
                    ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-secondary/5 border border-primary/10 text-center">
                            <div className="text-3xl font-black text-primary">{stat.val}</div>
                            <div className="text-xs font-black uppercase text-accent/60 tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="relative max-w-2xl mx-auto">
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-primary/40">search</span>
                    <input
                        type="text"
                        placeholder="Search by name, zone, branch, or designation..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-16 pr-8 py-6 rounded-[2.5rem] bg-white dark:bg-white/5 border-2 border-primary/10 focus:border-accent outline-none text-lg font-medium shadow-xl transition-all"
                    />
                </div>
            </header>

            <div className="bg-white dark:bg-white/5 rounded-[3rem] border border-primary/10 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-primary text-secondary">
                                <th className="px-8 py-6 font-black uppercase text-xs tracking-widest">Sl. No</th>
                                <th className="px-8 py-6 font-black uppercase text-xs tracking-widest">Name</th>
                                <th className="px-8 py-6 font-black uppercase text-xs tracking-widest">Designation</th>
                                <th className="px-8 py-6 font-black uppercase text-xs tracking-widest">Level</th>
                                <th className="px-8 py-6 font-black uppercase text-xs tracking-widest">Location</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {filteredMembers.map((member, i) => (
                                <tr key={member.id} className="hover:bg-accent/5 transition-colors group">
                                    <td className="px-8 py-6 text-sm font-black text-primary/40">{member.display_order || i + 1}</td>
                                    <td className="px-8 py-6">
                                        <div className="font-black text-primary text-lg group-hover:text-accent transition-colors">{member.name}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-primary/40">ID: {member.id.substring(0, 8)}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                                            {member.designation}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${member.level === 'central' ? 'text-accent' :
                                            member.level === 'zonal' ? 'text-primary' : 'text-gray-500'
                                            }`}>
                                            {member.level}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-bold text-primary">
                                            {member.level === 'central' ? 'Central HQ' :
                                                member.level === 'zonal' ? member.zones?.name :
                                                    member.branches?.name}
                                        </div>
                                        <div className="text-[10px] font-bold text-accent/60 uppercase">
                                            {member.level === 'central' ? 'Main HQ' :
                                                member.level === 'zonal' ? 'Regional HQ' :
                                                    (member.branches?.zones?.name || 'Central Administration')}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredMembers.length === 0 && (
                        <div className="py-32 text-center">
                            <span className="material-symbols-outlined text-6xl text-primary/10 mb-4 font-thin italic">search_off</span>
                            <p className="text-xl font-bold text-primary/40">No matching records found.</p>
                        </div>
                    )}
                </div>
            </div>

            <footer className="mt-12 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-primary/20">
                    © 2026 Young Chakma Association • Official Draft Electoral Roll
                </p>
            </footer>
        </div>
    );
}
