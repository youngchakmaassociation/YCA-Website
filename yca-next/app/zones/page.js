'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { zonesAPI } from '@/app/lib/api';

export default function ZonesPage() {
    const [search, setSearch] = useState('');
    const [zones, setZones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredZone, setHoveredZone] = useState(null);

    useEffect(() => {
        const fetchZones = async () => {
            setLoading(true);
            try {
                const response = await zonesAPI.getAll();
                if (response.success && response.data) {
                    setZones(response.data);
                }
            } catch (error) {
                console.error('Error fetching zones:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchZones();
    }, []);

    const displayedZones = zones.filter(z =>
        z.name.toLowerCase().includes(search.toLowerCase()) ||
        z.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-col items-center text-center gap-6 mb-20 animate-fade-in-up">
                <h1 className="text-4xl md:text-7xl font-black text-primary leading-tight">
                    Our Zonal <br /> <span className="text-accent underline decoration-primary decoration-4 underline-offset-8">HQ Network</span>
                </h1>
                <p className="max-w-2xl text-xl font-medium opacity-60 leading-relaxed">
                    The YCA is organized into strategic zonal headquarters that coordinate our local branches
                    and empower communities across borders.
                </p>
            </div>

            <div className="max-w-3xl mx-auto mb-20 relative animate-fade-in-up">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary text-3xl opacity-50">explore</span>
                <input
                    type="text"
                    placeholder="Search zones by region or name..."
                    className="w-full h-20 pl-16 pr-8 rounded-[2rem] bg-white dark:bg-white/5 border-2 border-primary/10 shadow-2xl outline-none focus:border-primary transition-all text-xl font-medium"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[400px]">
                    {loading ? (
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-80 rounded-[3rem] bg-gray-100 dark:bg-white/5 animate-pulse"></div>
                        ))
                    ) : displayedZones.length === 0 ? (
                        <div className="col-span-full text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-gray-300">location_off</span>
                            <p className="text-xl font-black text-gray-400 mt-4">No zones match your search</p>
                        </div>
                    ) : (
                        displayedZones.map((zone, i) => (
                            <div
                                key={zone._id}
                                onClick={() => window.location.href = `/zones/${zone.slug || zone._id}`}
                                onMouseEnter={() => setHoveredZone(zone)}
                                className="group p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 animate-fade-in-up flex flex-col cursor-pointer"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-4xl">location_on</span>
                                </div>
                                <h3 className="text-2xl font-black text-primary mb-4 group-hover:text-accent transition-colors">{zone.name}</h3>
                                <p className="text-lg font-medium opacity-60 leading-relaxed mb-8 flex-grow line-clamp-3">{zone.description}</p>

                                <div className="pt-8 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-3xl font-black text-gray-900 dark:text-white">{zone.branches?.length || 0}</span>
                                            <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Active Branches</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(zone.name + ' ' + (zone.landmark || '') + ' Mizoram India')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="size-12 rounded-xl bg-primary text-white flex items-center justify-center transition-all hover:bg-accent hover:rotate-6 shadow-lg shadow-primary/20"
                                                onClick={(e) => e.stopPropagation()}
                                                title="Get Directions"
                                            >
                                                <span className="material-symbols-outlined text-2xl">directions</span>
                                            </a>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(zone.name + ' ' + (zone.landmark || '') + ' Mizoram India')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="size-12 rounded-xl bg-primary/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all group/map"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                title="Search on Maps"
                                            >
                                                <span className="material-symbols-outlined text-2xl">map</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="size-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Interactive Map Side */}
                <aside className="lg:w-1/3 sticky top-24 h-fit space-y-8">
                    <div className="relative rounded-[3.5rem] overflow-hidden bg-primary p-2 shadow-3xl">
                        <div className="relative h-[600px] rounded-[3rem] overflow-hidden border-4 border-white/20">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(((hoveredZone || displayedZones[0])?.name || '') + ' Mizoram India')}&output=embed`}
                                className="grayscale hover:grayscale-0 transition-all duration-1000 contrast-125"
                            ></iframe>
                            <div className="absolute inset-x-6 bottom-6 p-6 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Headquarters Focus</p>
                                        <h4 className="text-lg font-black text-primary">{(hoveredZone || displayedZones[0])?.name || 'District Command'}</h4>
                                    </div>
                                    <span className="material-symbols-outlined text-primary text-3xl animate-bounce">location_on</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Stats Section */}
            <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { val: '25+', label: 'Countries Reach' },
                    { val: '120+', label: 'Global Branches' },
                    { val: '8', label: 'Zonal Commands' },
                    { val: '50k+', label: 'Active Members' }
                ].map((stat, i) => (
                    <div key={i} className="text-center space-y-2 p-12 rounded-[2.5rem] bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-transparent hover:bg-primary hover:text-white transition-all group">
                        <div className="text-5xl font-black text-primary group-hover:text-white transition-colors">{stat.val}</div>
                        <div className="text-xs font-black uppercase tracking-widest opacity-40">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div >
    );
}
