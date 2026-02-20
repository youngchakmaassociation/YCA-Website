'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { branchesAPI, zonesAPI, committeeAPI } from '@/app/lib/api';

export default function KamalanagarZonePage() {
    const [branches, setBranches] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    const FALLBACK_LEADERS = [
        { name: 'Dr. Jyoti Bikash Chakma', designation: 'General Hqrs. President', photo_url: '/assets/president.jpg' },
        { name: 'Macmillan Chakma', designation: 'General Secretary', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbzrEqK9WUdFhuj-UUuo4m7cZgp-F9UtD5TgO877f1kXMs8JtStQP353Qa3_Su0JOiJTlI_euJN7_vpp7W5A5jGegvM1SLhZLu_F0281WmjTGYLxLyr0a7Vjc13OalIi6cPBH3REs5bazlTTu50Ai2Oo3xBoQ3mXWAsn-QCTes8A9_pMLDwnDRisYn69KvOIxl2zghjdPW4ASwx9ZUTXp2SfbGpTDH7axHbyfqLLveh4VZimz-Zee1iwpQ54TyjV0PFEpWB8aZbzaN' },
        { name: 'Sujoy Chakma', designation: 'Vice-President', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA693k8IbeJX_1gAgNMXDqSZm2NVsiuJIS7udWaL1mSk6CHOFYOc-AFXIUSkT_shd3h-npl6MwAR-ykuMn1pkgMnuarV42W5lb5zZypuDgUnKQCuxs3NnnSlI18nVs70obr04R9UDloXMIID62GBOa_6h53JJD9ZNOFk3vz7KN6KWJ8VeMEe3Z-idMxkEfoR4rc26O9BOJeKZbTEZOJyPStxvm-vI_ElDLvJNjFou4sF4123xWakYLta3yJVWsxIqY1nFyfVSMn2JXN' },
    ];

    const FALLBACK_BRANCHES = [
        { name: 'Kamalanagar-I Branch', description: 'Central administrative unit covering the heart of the capital.', slug: 'kamalanagar-1' },
        { name: 'Kamalanagar-II Branch', description: 'Coordinates activities in northern residential clusters.', slug: 'kamalanagar-2' },
        { name: 'Kamalanagar-III Branch', description: 'Focuses on educational outreach and student welfare.', slug: 'kamalanagar-3' },
        { name: 'Kamalanagar-IV Branch', description: 'Expanding operations to peripheral developing zones.', slug: 'kamalanagar-4' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Branches
                const bRes = await branchesAPI.getAll();
                if (bRes.success && bRes.data?.length > 0) {
                    const filtered = bRes.data.filter(b =>
                        !b.zones || // Central branches have no zone
                        b.zones.name.toLowerCase().includes('kamalanagar')
                    );
                    setBranches(filtered.length > 0 ? filtered : FALLBACK_BRANCHES);
                } else {
                    setBranches(FALLBACK_BRANCHES);
                }

                // Fetch Zonal Leaders (using central as Kamalanagar is the HQ)
                const cRes = await committeeAPI.getAll('central');
                if (cRes.success && cRes.data?.length > 0) {
                    setLeaders(cRes.data);
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
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">General Headquarters</span>
                <h1 className="text-5xl md:text-8xl font-black text-primary leading-tight">
                    Kamalanagar <br /> <span className="text-accent underline decoration-primary decoration-8 underline-offset-12">Zone</span>
                </h1>
                <p className="max-w-3xl text-xl font-medium opacity-60 leading-relaxed mt-4">
                    The heart of the Young Chakma Association. As our central coordination hub, Kamalanagar Zone
                    oversees the most critical administrative and strategic operations of the organization.
                </p>
            </div>

            {/* Leadership Grid */}
            <section className="mb-32">
                <div className="flex items-center gap-6 mb-16">
                    <h2 className="text-3xl font-black text-primary whitespace-nowrap">HQ Leadership</h2>
                    <div className="h-px bg-gray-100 dark:bg-white/10 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="h-48 rounded-[3rem] bg-gray-100 dark:bg-white/5 animate-pulse"></div>)
                    ) : (
                        leaders.slice(0, 3).map((leader, i) => (
                            <div key={i} className="group text-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="relative size-48 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 blur-xl group-hover:bg-accent/20 transition-all duration-700"></div>
                                    <Image
                                        src={leader.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                        alt={leader.name}
                                        fill
                                        className="object-cover rounded-full border-4 border-white dark:border-white/10 relative z-10 transition-transform duration-700 group-hover:scale-110 shadow-2xl"
                                    />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{leader.name}</h3>
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
                        <h2 className="text-4xl font-black text-primary italic">Capital Branches</h2>
                        <Link href="/branches" className="px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-accent transition-all">Directory View</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loading ? (
                            <div className="col-span-full py-10 text-center animate-pulse font-black text-primary uppercase tracking-widest">Scaling Network...</div>
                        ) : branches.map((branch, i) => (
                            <Link key={i} href={`/branches/${branch.slug || branch._id}`} className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-transparent hover:border-accent hover:bg-white dark:hover:bg-white/10 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-black text-primary group-hover:text-accent transition-colors">{branch.name}</h3>
                                    <span className="material-symbols-outlined text-primary group-hover:rotate-45 transition-transform">arrow_outward</span>
                                </div>
                                <p className="font-medium opacity-60 text-lg leading-relaxed">{branch.description || 'Primary administrative unit of the General Headquarters.'}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                {[
                    { val: '4,500+', label: 'Total Members in Zone', icon: 'groups' },
                    { val: '796772', label: 'Kamalanagar PIN Code', icon: 'location_on' },
                    { val: 'HQ Status', label: 'Strategic Command Level', icon: 'hub' }
                ].map((stat, i) => (
                    <div key={i} className="relative p-12 rounded-[3.5rem] bg-primary text-white overflow-hidden shadow-2xl group">
                        <div className="absolute top-0 right-0 size-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                        <span className="material-symbols-outlined text-4xl mb-6 text-accent">{stat.icon}</span>
                        <div className="text-4xl font-black mb-2">{stat.val}</div>
                        <div className="text-xs font-black uppercase tracking-widest opacity-60">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
