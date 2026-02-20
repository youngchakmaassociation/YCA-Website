'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { committeeAPI } from '@/app/lib/api';
import IDCardPreview from '@/app/components/IDCardPreview';


export default function CYCAPage() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showIDCard, setShowIDCard] = useState(false);


    const FALLBACK_LEADERS = [
        { designation: 'President', name: 'Dr. Jyoti Bikash Chakma', photo_url: '/assets/president.jpg' },
        { designation: 'Vice-President', name: 'Sujoy Chakma', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA693k8IbeJX_1gAgNMXDqSZm2NVsiuJIS7udWaL1mSk6CHOFYOc-AFXIUSkT_shd3h-npl6MwAR-ykuMn1pkgMnuarV42W5lb5zZypuDgUnKQCuxs3NnnSlI18nVs70obr04R9UDloXMIID62GBOa_6h53JJD9ZNOFk3vz7KN6KWJ8VeMEe3Z-idMxkEfoR4rc26O9BOJeKZbTEZOJyPStxvm-vI_ElDLvJNjFou4sF4123xWakYLta3yJVWsxIqY1nFyfVSMn2JXN' },
        { designation: 'General Secretary', name: 'Macmillan Chakma', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbzrEqK9WUdFhuj-UUuo4m7cZgp-F9UtD5TgO877f1kXMs8JtStQP353Qa3_Su0JOiJTlI_euJN7_vpp7W5A5jGegvM1SLhZLu_F0281WmjTGYLxLyr0a7Vjc13OalIi6cPBH3REs5bazlTTu50Ai2Oo3xBoQ3mXWAsn-QCTes8A9_pMLDwnDRisYn69KvOIxl2zghjdPW4ASwx9ZUTXp2SfbGpTDH7axHbyfqLLveh4VZimz-Zee1iwpQ54TyjV0PFEpWB8aZbzaN' },
        { designation: 'Office Secretary', name: 'Sonali Chakma', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhVwgbrGTMgDT1gFiKXijKzC5AsgKd9w7p4kF1Bvej61_FcrRoZw4ESHkA5X6cfumf_XEim6DD_ekpX8tzSMNuq-Sqho9mjptpi3L3fERCxKQZYo3xPjVA_0h-lBS60bTpNbNUsyNVDkUMlmA-VcGGjSqOTKdFAVhhbnSp4I9dJiZh_Y1Gww1M5fJeii0Qi4uk4FDdHDki19vsKw1gbCQwVgDV71GktUKJir80LFDNCTOyWdJO5BJjyQ-utH4LAsUgHaCKy3_TbUAK' },
        { designation: 'Org. Secretary', name: 'Bijoy Talukdar', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOaMq7RCqY-HsEvZ5vUQh5KFPqlZJ4JRY9tWZ_H4ilXUp_wmpJRzcED21Uk_eFYjqlEDXqVM8TawMH_STugVvbKMJ04l0WifmeVEizZK2EAjxvNWO-QzGcnY5rv7GKM3RedcQvlb0MvBHVlMrhdBq3PkQHpL5puDdnKqFeUvljGr_xuUgoVgN-9sJP04JMIkopAUuHb5x2tmY4J63piNy7d8D7q4sWoS-egYtxSoIyQH1riPDs1YYebvfUFD1DMVD_oVB95bEPpVbu' },
        { designation: 'Cultural Secretary', name: 'Rina Dewan', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxjCSecHRDpT7zvbwiyiFiOLJ3Ye2iJYcOgE_lHOz6YD3HkIsiWVuwX86DweerR_CPposR1XQ9Dr23sOiJKqweeDTi1h9cTwXd6ExCvwuvE2mF3yBSQ1pHlYRu1hDeqUrccFncowX7f-8HPPutgztsAg5Rh15mNh6gkKMEZQ1EvJV_Xj7HI0ofm2RW2PHO1YHVWLSWhcmOoTfO_swDCHDvFV3kqLfpHEcPviKMTSsKytWSr9Wy-LviL8i3hSOrOKuOWJ__tFB_U1YU' },
        { designation: 'Religious Secretary', name: 'Promit Chakma', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO-qnquTQVINYgBUwxKw7oWp4NtZdZzmQ7Iz-Kwk9Lzfwyt_nYvI0b9VTUzc1WI5DubEZiLpTtbPx97meWb1O93AYXfkClPwvtYg7gC3Z_jMrMdoDg-NYGyXXdJsAFNani9tjoV1b3b62lDGSsBI2bSeOnN4HaKkuWBdTm_AMHTANjyIrc6MmfO6KTEtcnkUWKUaJVrKmt2PT5yhWouDiRaR5CtomFpAm2PUOikWM7fxxZ56EDDSqZfeb-07KXyxl5TWwQSDYXw3Lr' },
        { designation: 'Game & Sport Secy.', name: 'Nayan Chakma', photo_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrqpxy-vRS5AmM7bc_QAiwQU5L2Km5P5ryvP12zYcDpD-REXPDiZvbgbifVfUWhbU0gIEoXQLQH2Tbn89vJsgy7bz5R64sLihy-Eq24JqEeiR8HbfCgjpLTd8Rtv10wvENI3Zq8F6r3LtTe-cuSvrUscpMX46HqrlxDoShCPFWnqAo3S8k-dSomcg5RIE2xu7TgcPPcYxbtppivD2m8TCMe8QbWKq10CM29Yw9xhn4FeemfTXQ0b_6gcIMph5NhWc5Yb2Z8lAsJBbc' }
    ];

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await committeeAPI.getAll('central');
                if (response.success && response.data?.length > 0) {
                    setLeaders(response.data);
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
        fetchLeaders();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            {/* Deluxe Contact Popup */}
            {selectedMember && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-primary/40 backdrop-blur-xl animate-fade-in"
                        onClick={() => setSelectedMember(null)}
                    ></div>
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-zoom-in">
                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-primary dark:text-white hover:bg-accent hover:text-white transition-all z-10"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <div className="relative h-48 bg-primary overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                        </div>

                        <div className="px-10 pb-12 -mt-24 relative z-10 text-center">
                            <div className="relative size-40 mx-auto mb-6">
                                <Image
                                    src={selectedMember.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                    alt={selectedMember.name}
                                    fill
                                    className="object-cover rounded-[2.5rem] border-8 border-white dark:border-slate-900 shadow-2xl"
                                />
                            </div>
                            <h2 className="text-3xl font-black text-primary dark:text-white mb-2">{selectedMember.name}</h2>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-8">{selectedMember.designation || 'CEC Member'}</p>

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
                                    <div className="col-span-2 p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10">
                                        <p className="font-black text-gray-400 uppercase text-xs tracking-widest">Contact not shared</p>
                                    </div>
                                )}
                            </div>

                            {selectedMember.photo_url && (
                                <button
                                    onClick={() => setShowIDCard(true)}
                                    className="w-full mt-6 h-16 rounded-3xl border-2 border-primary/20 text-primary font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-all group"
                                >
                                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">badge</span>
                                    Generate CEC ID Card
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showIDCard && (
                <IDCardPreview
                    member={{ ...selectedMember, level: 'central' }}
                    onClose={() => setShowIDCard(false)}
                />
            )}
            {/* Hero */}
            <div className="text-center space-y-6 mb-24 animate-fade-in-up">
                <div className="inline-block p-2 rounded-2xl bg-primary/10 mb-4">
                    <span className="px-6 py-2 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-[0.2em]">Apex Body</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-primary leading-tight tracking-tighter">
                    Central YCA <br /> <span className="text-accent">(CYCA)</span>
                </h1>
                <p className="max-w-3xl mx-auto text-xl font-medium text-text-light/80 dark:text-text-dark/80 leading-relaxed">
                    The Central Young Chakma Association (CYCA) serves as the apex governing body,
                    providing leadership, direction, and oversight to the entire organization.
                </p>
            </div>

            {/* Governance Model */}
            <section className="py-20 bg-background-light dark:bg-white/5 rounded-[3rem] border border-gray-100 dark:border-white/10 shadow-2xl px-8 md:px-20 mb-32 overflow-hidden relative">
                <div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black text-primary">Governance & Oversight</h2>
                        <div className="space-y-6 text-lg font-medium opacity-80 leading-relaxed">
                            <p>
                                The CYCA is responsible for supervising all Zonal Committees,
                                which in turn oversee the Branch Committees within their respective regions.
                            </p>
                            <p className="border-l-4 border-accent pl-6 py-2">
                                A select number of Branch Committees are directly affiliated with
                                and managed by the Central YCA to ensure streamlined communication.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { label: 'Zonal Branches', desc: 'Regional bodies under CYCA', icon: 'public', color: 'bg-primary' },
                            { label: 'Direct Links', desc: 'Managed directly by CYCA', icon: 'lan', color: 'bg-accent' }
                        ].map((box, i) => (
                            <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-black/20 shadow-xl border border-gray-50 dark:border-white/5 text-center space-y-4">
                                <div className={`size-16 mx-auto rounded-2xl ${box.color}/10 flex items-center justify-center text-${box.color === 'bg-primary' ? 'primary' : 'accent'}`}>
                                    <span className="material-symbols-outlined text-4xl">{box.icon}</span>
                                </div>
                                <h3 className="font-bold text-xl">{box.label}</h3>
                                <p className="text-sm opacity-60">{box.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CEC Section */}
            <section className="space-y-20">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-primary">Central Executive Committee</h2>
                    <p className="text-lg font-medium opacity-60">Meet the dedicated leaders at the helm of the YCA.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {loading ? (
                        [1, 2, 3, 4].map(i => <div key={i} className="h-64 rounded-[2rem] bg-gray-100 dark:bg-white/5 animate-pulse"></div>)
                    ) : (
                        leaders.map((leader, i) => (
                            <div
                                key={i}
                                className="group flex flex-col items-center text-center p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl hover:-translate-y-2 transition-all cursor-pointer"
                                onClick={() => setSelectedMember(leader)}
                            >
                                <div className="relative size-32 mb-6 rounded-full p-1 bg-gradient-to-tr from-primary to-accent transition-transform duration-500 group-hover:rotate-12">
                                    <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-white dark:border-background-dark">
                                        <Image
                                            src={leader.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                            alt={leader.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-125"
                                        />
                                    </div>
                                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/40 rounded-full backdrop-blur-sm border-2 border-white/50">
                                        <span className="material-symbols-outlined text-white text-3xl">contact_page</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-black text-primary group-hover:text-accent transition-colors">{leader.designation}</h3>
                                <p className="text-sm font-bold text-gray-400 opacity-80">{leader.name}</p>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Office Location Section */}
            <section className="mt-32 space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-primary">Central Headquarters</h2>
                    <p className="text-lg font-medium opacity-60">Visit us at our main administrative hub in Kamalanagar.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 dark:bg-white/5 rounded-[4rem] p-8 md:p-16 border border-gray-100 dark:border-white/10 shadow-xl overflow-hidden relative">
                    <div className="space-y-8 relative z-10">
                        <div className="space-y-6">
                            <div className="flex items-start gap-6">
                                <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-primary">Office Address</h3>
                                    <p className="text-lg font-medium opacity-70">
                                        YCA Central Headquarters <br />
                                        Kamalanagar, Mizoram, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="size-14 rounded-2xl bg-accent text-white flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">explore</span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-primary">Coordinates</h3>
                                    <p className="text-lg font-mono font-bold opacity-70">
                                        22.619400, 92.642174
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="https://www.google.com/maps/search/?api=1&query=22.619400,92.642174"
                            target="_blank"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white font-black rounded-2xl hover:bg-accent transition-all shadow-xl group"
                        >
                            Open in Google Maps
                            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">map</span>
                        </Link>
                    </div>

                    <div className="relative h-96 lg:h-full min-h-[400px] rounded-[3rem] overflow-hidden border-4 border-white dark:border-background-dark shadow-2xl">
                        {/* Placeholder for an actual map embed if preferred, otherwise a premium stylistic representation */}
                        <iframe
                            src="https://maps.google.com/maps?q=22.619400,92.642174&t=&z=18&ie=UTF8&iwloc=&output=embed"
                            className="absolute inset-0 w-full h-full opacity-90 contrast-125 grayscale-[0.2] invert-[0.9] dark:invert-0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="mt-32 p-12 md:p-20 rounded-[4rem] bg-accent text-white text-center space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative z-10 space-y-6">
                    <h3 className="text-4xl md:text-5xl font-black">Join our governing network</h3>
                    <p className="max-w-2xl mx-auto text-xl font-medium opacity-90">
                        Are you interested in representing your region? Learn how to start a branch or join a zonal committee.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 pt-4">
                        <button className="px-10 py-4 bg-white text-accent font-black rounded-2xl hover:scale-105 transition-transform shadow-xl">Start a Branch</button>
                        <button className="px-10 py-4 bg-black/20 backdrop-blur-md text-white border border-white/20 font-black rounded-2xl hover:bg-black/30 transition-all">View Directory</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
