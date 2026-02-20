'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { zonesAPI, committeeAPI } from '@/app/lib/api';
import IDCardPreview from '@/app/components/IDCardPreview';


export default function DynamicZonePage() {
    const { slug } = useParams();
    const [zone, setZone] = useState(null);
    const [loading, setLoading] = useState(true);
    const [committee, setCommittee] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showIDCard, setShowIDCard] = useState(false);

    useEffect(() => {
        const fetchZone = async () => {
            setLoading(true);
            try {
                const response = await zonesAPI.getOne(slug);
                if (response.success && response.data) {
                    setZone(response.data);

                    // Fetch zonal committee members
                    const commRes = await committeeAPI.getAll('zonal', response.data.id);
                    if (commRes.success && commRes.data?.length > 0) {
                        setCommittee(commRes.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching zone:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchZone();
    }, [slug]);

    if (loading) return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center animate-pulse">
            <div className="size-20 bg-primary/20 rounded-full animate-spin border-4 border-primary border-t-transparent mb-8"></div>
            <p className="font-black text-primary uppercase tracking-[0.3em]">Loading Zonal HQ...</p>
        </div>
    );

    if (!zone) return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-black text-primary mb-4">Zone Not Found</h1>
            <Link href="/zones" className="text-accent font-bold hover:underline">Back to all zones</Link>
        </div>
    );

    const leaders = committee.length > 0 ? committee : [
        { name: zone.president || 'TBD', designation: 'President', photo_url: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop' },
        { name: zone.secretary || 'TBD', designation: 'General Secretary', photo_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop' }
    ];

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
                                    src={selectedMember.photo_url || selectedMember.img || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                    alt={selectedMember.name}
                                    fill
                                    className="object-cover rounded-[2.5rem] border-8 border-white dark:border-slate-900 shadow-2xl"
                                />
                            </div>
                            <h2 className="text-3xl font-black text-primary dark:text-white mb-2">{selectedMember.name}</h2>
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-8">{selectedMember.designation || selectedMember.role || 'Zonal Member'}</p>

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

                            {(selectedMember.photo_url || selectedMember.img) && (
                                <button
                                    onClick={() => setShowIDCard(true)}
                                    className="w-full mt-6 h-16 rounded-3xl border-2 border-primary/20 text-primary font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-all group"
                                >
                                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">badge</span>
                                    Generate Zonal ID Card
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showIDCard && (
                <IDCardPreview
                    member={{ ...selectedMember, level: 'zonal', photo_url: selectedMember.photo_url || selectedMember.img }}
                    onClose={() => setShowIDCard(false)}
                />
            )}
            <div className="flex flex-col items-center text-center gap-6 mb-24 animate-fade-in-up">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">Zonal Headquarters</span>
                <h1 className="text-5xl md:text-8xl font-black text-primary leading-tight">
                    {zone.name.split(' ')[0]} <br /> <span className="text-accent underline decoration-primary decoration-8 underline-offset-12">Zone</span>
                </h1>
                <p className="max-w-2xl text-xl font-medium opacity-60 leading-relaxed">
                    {zone.description}
                </p>
            </div>

            {/* Leadership Grid */}
            <section className="mb-32">
                <div className="flex items-center gap-6 mb-16">
                    <h2 className="text-3xl font-black text-primary whitespace-nowrap">Zone Leadership</h2>
                    <div className="h-px bg-gray-100 dark:bg-white/10 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {leaders.map((leader, i) => (
                        <div
                            key={i}
                            className="group text-center animate-fade-in-up cursor-pointer"
                            style={{ animationDelay: `${i * 100}ms` }}
                            onClick={() => setSelectedMember(leader)}
                        >
                            <div className="relative size-48 mx-auto mb-8">
                                <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 blur-xl group-hover:bg-accent/20 transition-all duration-700"></div>
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/40 rounded-full backdrop-blur-sm border-2 border-white/50">
                                    <span className="material-symbols-outlined text-white text-4xl">contact_page</span>
                                </div>
                                <Image
                                    src={leader.photo_url || leader.img || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                    alt={leader.name}
                                    fill
                                    className="object-cover rounded-full border-4 border-white dark:border-white/10 relative z-10 transition-transform duration-700 group-hover:scale-110 shadow-2xl"
                                />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{leader.name}</h3>
                            <p className="text-sm font-black uppercase tracking-widest text-accent">{leader.designation || leader.role}</p>
                        </div>
                    ))}
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
                        {zone.branches?.map((branch, i) => (
                            <div
                                key={i}
                                onClick={() => window.location.href = `/branches/${branch.slug || branch._id}`}
                                className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-transparent hover:border-accent hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-black text-primary group-hover:text-accent transition-colors">{branch.name}</h3>
                                    <span className="material-symbols-outlined text-primary group-hover:rotate-45 transition-transform">arrow_outward</span>
                                </div>
                                <p className="font-medium opacity-60 leading-relaxed">{branch.description || 'Administrative unit under Zonal HQ.'}</p>
                            </div>
                        ))}
                        {(!zone.branches || zone.branches.length === 0) && (
                            <p className="text-center col-span-full py-10 opacity-60 font-medium italic">No branches registered in this zone yet.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* New Map Section */}
            <section className="mb-32">
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-3xl font-black text-primary border-l-8 border-accent pl-6">Zonal Command Center</h2>
                    <div className="flex items-center gap-6">
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(zone.name + ' ' + (zone.landmark || '') + ' Mizoram India')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">directions</span>
                            Direct Navigate
                        </a>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(zone.name + ' ' + (zone.landmark || '') + ' Mizoram India')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-black uppercase text-primary hover:text-accent transition-colors hidden sm:flex"
                        >
                            Detailed Command Map
                            <span className="material-symbols-outlined text-sm">map</span>
                        </a>
                    </div>
                </div>
                <div className="relative rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white dark:border-white/5 h-[500px]">
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(zone.name + ' ' + (zone.landmark || '') + ' Mizoram India')}&output=embed`}
                        className="grayscale hover:grayscale-0 transition-all duration-1000 contrast-110"
                    ></iframe>
                    <div className="absolute inset-x-10 bottom-10 p-8 bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/20 hidden md:flex items-center justify-between max-w-xl">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#007A33]">Active Jurisdiction</span>
                            <h4 className="text-xl font-black text-primary leading-tight">Headquarters of {zone.name}</h4>
                        </div>
                        <div className="size-14 rounded-2xl bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-3xl">location_on</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                {[
                    { val: zone.branches?.length || 0, label: 'Active Branches' },
                    { val: '24/7', label: 'Support Available' },
                    { val: 'Official', label: 'HQ Status' },
                    { val: new Date(zone.establishedDate).getFullYear() || 'N/A', label: 'Established' }
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
