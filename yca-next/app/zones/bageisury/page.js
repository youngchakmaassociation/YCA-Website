'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { branchesAPI, zonesAPI, committeeAPI } from '@/app/lib/api';

export default function BageisuryZonePage() {
    const [branches, setBranches] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    const FALLBACK_LEADERS = [
        { name: 'Mr. Bageisury President', designation: 'President', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCG-0zhTlsBim89w7wgunF5cbzUzkruaXWK-o0B6gwK4o6IqnJdu2QpFumGraV5yzxVTK0gNOwz2TF5w8dHyJN0sFaILq1gqmtE4uKlbElw10AmnMeII3jUfQKsKqeg5XkksB6Ov7dQkM6HxO4O16dwu1XzlddK10_Y_Htn5ZHHizivJ21vN-UzkruaXWK-o0B6gwK4o6IqnJdu2QpFumGraV5yzxVTK0gNOwz2TF5w8dHyJN0sFaILq1gqmtE4uKlbElw10AmnMeII3jUfQKsKqeg5XkksB6Ov7dQkM6HxO4O16dwu1XzlddK10_Y_Htn5ZHHizivJ21vN-UuZttm6ytEm3p1MkKSYYfPE_6_xcN_eYp8ttT9M9IO5ZZMXwFMAUCO8ugfsYuYPOSuM9dJIKObXNGkYjMx5mgROxc' },
        { name: 'Ms. Vice President', designation: 'Vice-President', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA693k8IbeJX_1gAgNMXDqSZm2NVsiuJIS7udWaL1mSk6CHOFYOc-AFXIUSkT_shd3h-npl6MwAR-ykuMn1pkgMnuarV42W5lb5zZypuDgUnKQCuxs3NnnSlI18nVs70obr04R9UDloXMIID62GBOa_6h53JJD9ZNOFk3vz7KN6KWJ8VeMEe3Z-idMxkEfoR4rc26O9BOJeKZbTEZOJyPStxvm-vI_ElDLvJNjFou4sF4123xWakYLta3yJVWsxIqY1nFyfVSMn2JXN' },
        { name: 'Mr. General Secretary', designation: 'General Secretary', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbzrEqK9WUdFhuj-UUuo4m7cZgp-F9UtD5TgO877f1kXMs8JtStQP353Qa3_Su0JOiJTlI_euJN7_vpp7W5A5jGegvM1SLhZLu_F0281WmjTGYLxLyr0a7Vjc13OalIi6cPBH3REs5bazlTTu50Ai2Oo3xBoQ3mXWAsn-QCTes8A9_pMLDwnDRisYn69KvOIxl2zghjdPW4ASwx9ZUTXp2SfbGpTDH7axHbyfqLLveh4VZimz-Zee1iwpQ54TyjV0PFEpWB8aZbzaN' },
        { name: 'Ms. Office Secretary', designation: 'Office Secretary', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhVwgbrGTMgDT1gFiKXijKzC5AsgKd9w7p4kF1Bvej61_FcrRoZw4ESHkA5X6cfumf_XEim6DD_ekpX8tzSMNuq-Sqho9mjptpi3L3fERCxKQZYo3xPjVA_0h-lBS60bTpNbNUsyNVDkUMlmA-VcGGjSqOTKdFAVhhbnSp4I9dJiZh_Y1Gww1M5fJeii0Qi4uk4FDdHDki19vsKw1gbCQwVgDV71GktUKJir80LFDNCTOyWdJO5BJjyQ-utH4LAsUgHaCKy3_TbUAK' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Branches
                const bRes = await branchesAPI.getAll();
                if (bRes.success && bRes.data) {
                    const filtered = bRes.data.filter(b =>
                        b.zone?.name.toLowerCase().includes('bageisury') ||
                        b.zone?.name.toLowerCase().includes('bagaeisury') ||
                        b.zone?.name.toLowerCase().includes('sakeilui')
                    );
                    setBranches(filtered);
                }

                // Fetch Zonal Leaders
                const cRes = await committeeAPI.getAll('zonal');
                if (cRes.success && cRes.data) {
                    // Filter leaders for Bageisury (ID: add6da44-5077-48b2-8cbe-52c5322ad2dc)
                    const zonalLeaders = cRes.data.filter(l =>
                        l.level === 'zonal' &&
                        (l.zone_id === 'add6da44-5077-48b2-8cbe-52c5322ad2dc' || !l.zone_id)
                    );
                    if (zonalLeaders.length > 0) {
                        setLeaders(zonalLeaders);
                    } else {
                        setLeaders(FALLBACK_LEADERS);
                    }
                } else {
                    setLeaders(FALLBACK_LEADERS);
                }
            } catch (err) {
                console.error(err);
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
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Zonal Headquarters</span>
                <h1 className="text-5xl md:text-8xl font-black text-primary leading-tight">
                    Bageisury <br /> <span className="text-accent underline decoration-primary decoration-8 underline-offset-12">Zone</span>
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <p className="max-w-2xl text-xl font-medium opacity-80 leading-relaxed italic text-primary">
                        "The name Given by the People"
                    </p>
                    <p className="max-w-2xl text-sm font-bold opacity-40 uppercase tracking-widest">
                        Official Recognition: Sakeilui
                    </p>
                </div>
                <p className="max-w-2xl text-xl font-medium opacity-60 leading-relaxed mt-4">
                    The administrative heart of Chakma youth operations across the Bageisury region.
                    As the community choice for identity, Bageisury represents our local heritage
                    and coordination for national impact.
                </p>
            </div>

            {/* Leadership Grid */}
            <section className="mb-32">
                <div className="flex items-center gap-6 mb-16">
                    <h2 className="text-3xl font-black text-primary whitespace-nowrap">Zone Leadership</h2>
                    <div className="h-px bg-gray-100 dark:bg-white/10 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {loading ? (
                        [1, 2, 3, 4].map(i => <div key={i} className="h-48 rounded-full bg-gray-100 dark:bg-white/5 animate-pulse mx-auto"></div>)
                    ) : (
                        leaders.map((leader, i) => (
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
                        <h2 className="text-3xl font-black text-primary">Regional Branches</h2>
                        <button className="px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-accent transition-all">Connect All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loading ? (
                            <div className="col-span-full py-10 text-center animate-pulse font-black text-primary uppercase tracking-widest">Loading Branches...</div>
                        ) : branches.length === 0 ? (
                            <p className="col-span-full py-10 text-center font-medium opacity-60 italic">No live branches found for this zone.</p>
                        ) : (
                            branches.map((branch, i) => (
                                <Link key={i} href={`/branches/${branch.slug || branch._id}`} className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-transparent hover:border-accent hover:bg-white dark:hover:bg-white/10 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-black text-primary group-hover:text-accent transition-colors">{branch.name}</h3>
                                        <span className="material-symbols-outlined text-primary group-hover:rotate-45 transition-transform">arrow_outward</span>
                                    </div>
                                    <p className="font-medium opacity-60 leading-relaxed">{branch.description || 'Administrative unit under Zonal HQ.'}</p>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                {[
                    { val: '1,250', label: 'Active Members' },
                    { val: '15', label: 'Local Branches' },
                    { val: '50+', label: 'Annual Events' },
                    { val: '5', label: 'Years Active' }
                ].map((stat, i) => (
                    <div key={i} className="text-center space-y-2 py-12 rounded-[2.5rem] bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-transparent group hover:bg-accent hover:text-white transition-all">
                        <div className="text-5xl font-black text-accent group-hover:text-white transition-colors">{stat.val}</div>
                        <div className="text-xs font-black uppercase tracking-widest opacity-40">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
