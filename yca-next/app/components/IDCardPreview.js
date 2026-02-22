'use client';

import Image from 'next/image';
import { generateIDNumber, committeeAPI } from '@/app/lib/api';
import { useState, useEffect } from 'react';

export default function IDCardPreview({ member, onClose }) {
    if (!member) return null;

    const [cardSize, setCardSize] = useState('CR80'); // CR80 or CR100
    const [allRoles, setAllRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log('IDCardPreview Build V2.1 Load - Size:', cardSize);

    useEffect(() => {
        const fetchAllRoles = async () => {
            if (member.name) {
                const res = await committeeAPI.getByName(member.name);
                if (res.success && res.data) {
                    setAllRoles(res.data);
                }
            }
            setLoading(false);
        };
        fetchAllRoles();
    }, [member.name]);

    const idNumber = generateIDNumber(member);

    // Sort roles by priority (central > zonal > branch)
    const sortedRoles = [...allRoles].sort((a, b) => {
        const levels = { central: 1, zonal: 2, branch: 3 };
        return levels[a.level] - levels[b.level];
    });

    const primaryRole = sortedRoles[0] || member;
    const level = primaryRole.level || 'branch';

    // Design Tokens based on Level
    const themes = {
        central: {
            bg: 'bg-slate-950',
            accent: 'bg-amber-500',
            text: 'text-amber-500',
            border: 'border-amber-500/30',
            label: 'CENTRAL EXECUTIVE COMMITTEE',
            ring: 'ring-amber-500/50'
        },
        zonal: {
            bg: 'bg-primary',
            accent: 'bg-slate-300',
            text: 'text-slate-300',
            border: 'border-white/20',
            label: 'ZONAL EXECUTIVE COMMITTEE',
            ring: 'ring-white/50'
        },
        branch: {
            bg: 'bg-primary-dark', // Custom deep blue
            accent: 'bg-accent',
            text: 'text-accent',
            border: 'border-accent/30',
            label: 'BRANCH EXECUTIVE COMMITTEE',
            ring: 'ring-accent/50'
        }
    };

    const theme = themes[level] || themes.branch;

    const finalPrintCSS = `
        @media print {
            .no-print { display: none !important; }
            .register-ignore { display: none !important; }
            body { background: white !important; padding: 0 !important; margin: 0 !important; }
            .fixed { position: relative !important; inset: 0 !important; padding: 0 !important; }
            #id-card-printable {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
                ${cardSize === 'CR80' ? 'width: 53.98mm !important; height: 85.6mm !important;' : 'width: 67mm !important; height: 98.4mm !important;'}
                margin: 0 auto !important;
                border-radius: 2rem !important;
            }
        }
    `;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            ></div>

            <div className="relative animate-zoom-in space-y-8 max-w-sm w-full print:m-0 print:p-0">
                {/* Size Selector */}
                <div className="flex justify-center gap-4 no-print register-ignore">
                    {['CR80', 'CR100'].map(sz => (
                        <button
                            key={sz}
                            onClick={() => setCardSize(sz)}
                            className={`px-6 py-2 rounded-full font-black text-xs transition-all ${cardSize === sz
                                ? 'bg-white text-primary shadow-xl scale-110'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            {sz} {sz === 'CR80' ? '(Standard)' : '(Extended)'}
                        </button>
                    ))}
                </div>

                {/* ID Card Front */}
                <div
                    id="id-card-printable"
                    className={`relative mx-auto rounded-[2.5rem] ${theme.bg} overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border ${theme.border} flex flex-col transition-all duration-500 ${cardSize === 'CR80' ? 'w-[350px] h-[550px]' : 'w-[400px] h-[584px]'
                        }`}
                >
                    {/* Header Design */}
                    <div className="pt-10 px-8 text-center space-y-4">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase mb-4">Official Identity Card</span>
                            <div className="relative size-20 mb-2">
                                <Image
                                    src="/assets/ycalogo.png"
                                    alt="YCA Logo"
                                    fill
                                    className="object-contain logo-3d-pop shadow-2xl"
                                />
                            </div>
                            <h4 className="text-white font-black text-lg tracking-tighter uppercase leading-tight">Young Chakma Association</h4>
                        </div>
                    </div>

                    {/* Member Info Section */}
                    <div className="flex-grow flex flex-col items-center pt-8 px-8 text-center">
                        {/* Member Photo */}
                        <div className="relative size-40 mb-8">
                            <div className={`absolute inset-0 rounded-3xl ${theme.accent} scale-105 blur-lg opacity-30`}></div>
                            <Image
                                src={member.photo_url}
                                alt={member.name}
                                fill
                                className={`object-cover rounded-3xl border-4 border-white ${theme.ring} ring-8 ring-offset-0`}
                            />
                        </div>

                        {/* Text Info */}
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-white leading-tight">{member.name}</h2>
                            <div className="flex flex-wrap justify-center gap-1 mt-2">
                                {sortedRoles.map((role, idx) => (
                                    <span key={idx} className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${theme.accent} text-white`}>
                                        {role.designation} ({role.level === 'central' ? 'CYCA' : role.level === 'zonal' ? 'Zone' : 'Branch'})
                                    </span>
                                ))}
                                {sortedRoles.length === 0 && (
                                    <p className={`text-xs font-black uppercase tracking-widest ${theme.text}`}>{member.designation || member.role}</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/10 my-8"></div>

                        <div className="grid grid-cols-2 gap-8 w-full text-left">
                            <div>
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block mb-1">ID Number</span>
                                <span className="text-xs font-mono font-bold text-white tracking-widest">{idNumber}</span>
                            </div>
                            <div>
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block mb-1">Validity</span>
                                <span className="text-xs font-bold text-white tracking-widest">2024 - 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Band */}
                    <div className={`mt-auto h-20 ${theme.accent} flex items-center justify-center px-8 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] relative z-10">
                            {theme.label}
                        </span>
                    </div>

                    {/* Watermark Logo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 opacity-[0.03] pointer-events-none grayscale">
                        <Image src="/assets/ycalogo.png" alt="" fill className="object-contain" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 max-w-[350px] mx-auto">
                    <button
                        onClick={() => window.print()}
                        className="w-full h-16 bg-white text-primary font-black rounded-2xl hover:bg-accent hover:text-white transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                        <span className="material-symbols-outlined">print</span>
                        Print Membership Card
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full h-12 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-md"
                    >
                        Close Preview
                    </button>
                </div>
            </div>
            {/* Version 2.1: CSS Sanitized for Turbopack */}
            <style dangerouslySetInnerHTML={{ __html: finalPrintCSS }} />
        </div>
    );
}
