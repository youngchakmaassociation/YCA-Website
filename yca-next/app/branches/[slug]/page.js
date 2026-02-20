'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { branchesAPI, committeeAPI } from '@/app/lib/api';
import IDCardPreview from '@/app/components/IDCardPreview';


export default function DynamicBranchPage() {
    const { slug } = useParams();
    const [branch, setBranch] = useState(null);
    const [committee, setCommittee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showIDCard, setShowIDCard] = useState(false);



    useEffect(() => {
        const fetchBranch = async () => {
            setLoading(true);
            try {
                const response = await branchesAPI.getOne(slug);
                if (response.success && response.data) {
                    setBranch(response.data);

                    // Fetch committee members for this branch
                    const branchId = response.data.id || response.data._id;
                    const commResponse = await committeeAPI.getAll('branch', null, branchId);

                    if (commResponse.success && commResponse.data?.length > 0) {
                        setCommittee(commResponse.data);
                    } else {
                        // Smart fallback: Fetch all branch leaders and filter by branch name if ID lookup was fuzzy
                        const allBranchComm = await committeeAPI.getAll('branch');
                        if (allBranchComm.success && allBranchComm.data) {
                            const filtered = allBranchComm.data.filter(m =>
                                m.branch_id === branchId ||
                                (m.branch && m.branch.name === response.data.name)
                            );
                            if (filtered.length > 0) setCommittee(filtered);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching branch:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBranch();
    }, [slug]);

    if (loading) return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center animate-pulse">
            <div className="size-20 bg-primary/20 rounded-full animate-spin border-4 border-primary border-t-transparent mb-8"></div>
            <p className="font-black text-primary uppercase tracking-[0.3em]">Loading Branch Details...</p>
        </div>
    );

    if (!branch) return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-black text-primary mb-4">Branch Not Found</h1>
            <Link href="/branches" className="text-accent font-bold hover:underline">Back to directory</Link>
        </div>
    );

    const initiatives = [
        { title: 'Youth Development', desc: 'Comprehensive skill development and leadership training.', icon: 'school' },
        { title: 'Cultural Preservation', desc: 'Promoting language, traditions, and heritage.', icon: 'museum' },
        { title: 'Community Service', desc: 'Outreach and social welfare initiatives.', icon: 'volunteer_activism' },
        { title: 'Education Support', desc: 'Scholarships and assistance for students.', icon: 'auto_stories' },
    ];

    const executive = committee.length > 0 ? committee : [
        { name: branch?.president || 'TBD', designation: 'President', photo_url: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop' },
        { name: branch?.secretary || 'TBD', designation: 'General Secretary', photo_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            {/* Contact Popup Modal */}
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
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-8">{selectedMember.designation || selectedMember.role}</p>

                            <div className="grid grid-cols-2 gap-4">
                                {selectedMember.phone ? (
                                    <>
                                        <a
                                            href={`tel:${selectedMember.phone}`}
                                            className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-primary text-white hover:bg-accent transition-all group scale-100 active:scale-95"
                                        >
                                            <span className="material-symbols-outlined text-3xl">call</span>
                                            <span className="text-xs font-black uppercase tracking-widest">Call Now</span>
                                        </a>
                                        <a
                                            href={`https://wa.me/${selectedMember.phone.replace(/[^0-9]/g, '')}`}
                                            className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-green-500 text-white hover:bg-green-600 transition-all scale-100 active:scale-95"
                                        >
                                            <span className="material-symbols-outlined text-3xl">chat</span>
                                            <span className="text-xs font-black uppercase tracking-widest">WhatsApp</span>
                                        </a>
                                    </>
                                ) : (
                                    <div className="col-span-2 p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10">
                                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">contact_support</span>
                                        <p className="font-black text-gray-400 uppercase text-xs tracking-widest leading-relaxed">
                                            Contact details not shared publicly.<br />Please use official channels.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* ID Card Tool */}
                            {selectedMember.photo_url && (
                                <button
                                    onClick={() => setShowIDCard(true)}
                                    className="w-full mt-6 h-16 rounded-3xl border-2 border-primary/20 text-primary font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-all group"
                                >
                                    <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">badge</span>
                                    Generate Official ID Card
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showIDCard && (
                <IDCardPreview
                    member={selectedMember}
                    onClose={() => setShowIDCard(false)}
                />
            )}

            <div className="flex flex-col gap-6 mb-20 animate-fade-in-up">
                <Link href={branch.zones ? `/zones/${branch.zones.slug || branch.zones._id}` : '/zones/kamalanagar'} className="flex items-center gap-2 text-sm font-black text-accent uppercase tracking-widest hover:translate-x-1 transition-transform">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    {branch.zones ? branch.zones.name : 'Central Headquarters'}
                </Link>
                <h1 className="text-4xl md:text-7xl font-black text-primary leading-tight">
                    {branch.name.split(' ')[0]} <br /> <span className="text-accent underline decoration-primary decoration-4 underline-offset-8">Branch</span>
                </h1>
                <p className="max-w-3xl text-xl font-medium opacity-60 leading-relaxed">
                    {branch.description || 'A vibrant community hub dedicated to local empowerment and youth-led progress.'}
                </p>
            </div>

            {/* Branch Leadership Section */}
            <section className="mb-32">
                <div className="flex items-center gap-6 mb-16">
                    <h2 className="text-3xl font-black text-primary whitespace-nowrap">Branch Executive</h2>
                    <div className="h-px bg-gray-100 dark:bg-white/10 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {executive.map((member, i) => (
                        <div
                            key={i}
                            className="group text-center animate-fade-in-up cursor-pointer"
                            style={{ animationDelay: `${i * 100}ms` }}
                            onClick={() => setSelectedMember(member)}
                        >
                            <div className="relative size-48 mx-auto mb-8">
                                <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 blur-xl group-hover:bg-accent/20 transition-all duration-700"></div>
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/40 rounded-full backdrop-blur-sm border-2 border-white/50">
                                    <span className="material-symbols-outlined text-white text-4xl">contact_page</span>
                                </div>
                                <Image
                                    src={member.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                    alt={member.name}
                                    fill
                                    className="object-cover rounded-full border-4 border-white dark:border-white/10 relative z-10 transition-transform duration-700 group-hover:scale-110 shadow-2xl"
                                />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{member.name}</h3>
                            <p className="text-sm font-black uppercase tracking-widest text-accent">{member.designation || member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-20">
                    <section className="space-y-12">
                        <h2 className="text-3xl font-black text-primary border-l-8 border-accent pl-6">Active Initiatives</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {initiatives.map((item, i) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl group hover:bg-primary transition-all duration-500">
                                    <span className="material-symbols-outlined text-4xl text-accent group-hover:text-white transition-colors mb-4">{item.icon}</span>
                                    <h3 className="text-xl font-black text-primary group-hover:text-white transition-colors mb-2">{item.title}</h3>
                                    <p className="font-medium opacity-60 group-hover:text-white group-hover:opacity-80 transition-all">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* New Map Section */}
                    <section className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-black text-primary border-l-8 border-accent pl-6">Geographical Context</h2>
                            <div className="flex items-center gap-6">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.coordinates || (branch.name + ' ' + (branch.landmark || '') + ' Mizoram India'))}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-accent transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">directions</span>
                                    Navigate Now
                                </a>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.name + ' ' + (branch.landmark || '') + ' Mizoram India')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs font-black uppercase text-primary hover:text-accent transition-colors hidden sm:flex"
                                >
                                    Open in Google Maps
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                </a>
                            </div>
                        </div>
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-white/5 h-[450px]">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.coordinates || (branch.name + ' ' + (branch.landmark || '') + ' Mizoram India'))}&output=embed`}
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </div>
                    </section>

                    <section className="space-y-12">
                        <h2 className="text-3xl font-black text-primary border-l-8 border-accent pl-6">Latest Updates</h2>
                        <div className="p-10 rounded-[3rem] bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 text-center">
                            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">history</span>
                            <p className="text-xl font-black text-gray-400">No recent activities logged for this branch.</p>
                        </div>
                    </section>
                </div>

                {/* Sidebar - Quick Info */}
                <aside className="space-y-12">
                    <div className="p-10 rounded-[3.5rem] bg-primary text-white shadow-2xl space-y-10 sticky top-24">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-black underline decoration-accent underline-offset-8">Branch Contact</h2>
                            <p className="text-sm font-medium opacity-80 leading-relaxed pt-2">
                                For official correspondence or local unit support, please reach out to the executive committee.
                            </p>
                        </div>
                        <button className="w-full h-16 bg-white text-primary font-black rounded-2xl hover:bg-accent hover:text-white transition-all shadow-xl">Contact Secretary</button>
                    </div>

                    <div className="p-10 rounded-[3.5rem] bg-accent text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 size-32 bg-white/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                        <h3 className="text-2xl font-black mb-4">Join This Branch</h3>
                        <p className="font-medium opacity-80 mb-8 leading-relaxed">Living in this area? Join our local unit to start making an impact.</p>
                        <Link href="/membership" className="block text-center w-full py-4 bg-white text-accent font-black rounded-xl hover:bg-primary hover:text-white transition-all">Submit Application</Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}
