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
            bg: 'bg-white',
            accent: 'bg-slate-950',
            text: 'text-slate-950',
            memberText: 'text-slate-900',
            subText: 'text-slate-500',
            border: 'border-slate-200',
            label: 'CENTRAL EXECUTIVE COMMITTEE',
            labelBg: 'bg-slate-900',
            ring: 'ring-slate-200',
            watermark: 'opacity-[0.05]'
        },
        zonal: {
            bg: 'bg-[#007A33]', // YCA Heritage Green
            accent: 'bg-white/20',
            text: 'text-white',
            memberText: 'text-white',
            subText: 'text-white/60',
            border: 'border-white/20',
            label: 'ZONAL EXECUTIVE COMMITTEE',
            labelBg: 'bg-black/20',
            ring: 'ring-white/30',
            watermark: 'opacity-[0.03]'
        },
        branch: {
            bg: 'bg-[#C8102E]', // Deep Crimson
            accent: 'bg-white/20',
            text: 'text-white',
            memberText: 'text-white',
            subText: 'text-white/60',
            border: 'border-white/20',
            label: 'BRANCH EXECUTIVE COMMITTEE',
            labelBg: 'bg-black/20',
            ring: 'ring-white/30',
            watermark: 'opacity-[0.03]'
        }
    };

    const theme = themes[level] || themes.branch;

    const finalPrintCSS = `
        @media print {
            .no-print { display: none !important; }
            .register-ignore { display: none !important; }
            body { background: white !important; padding: 0 !important; margin: 0 !important; }
            .fixed { position: relative !important; inset: 0 !important; padding: 0 !important; overflow: visible !important; }
            #id-card-wrap {
                display: flex !important;
                flex-direction: column !important;
                gap: 5mm !important;
                align-items: center !important;
                justify-content: center !important;
                width: 210mm !important; /* A4 Width */
                min-height: 297mm !important; /* A4 Height */
                margin: 0 auto !important;
            }
            .id-card-face {
                box-shadow: none !important;
                border: 0.1mm solid rgba(0,0,0,0.1) !important;
                ${cardSize === 'CR80' ? 'width: 53.98mm !important; height: 85.6mm !important;' : 'width: 67mm !important; height: 98.4mm !important;'}
                margin: 0 !important;
                border-radius: 3mm !important;
                page-break-inside: avoid !important;
                background-color: ${level === 'central' ? 'white' : level === 'zonal' ? '#007A33' : '#C8102E'} !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                display: flex !important;
                flex-direction: column !important;
                transform: rotate(0deg) !important;
                position: relative !important;
            }
            /* Add cut marks at corners */
            .id-card-face::before {
                content: '';
                position: absolute;
                top: -2mm; left: -2mm; right: -2mm; bottom: -2mm;
                border: 0.1mm dashed #ddd;
                pointer-events: none;
                z-index: 0;
            }
        }
    `;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            ></div>

            <div className="relative animate-zoom-in space-y-8 print:m-0 print:p-0 flex flex-col items-center">
                {/* Size Selector */}
                <div className="flex justify-center gap-4 no-print register-ignore w-full max-w-sm">
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

                <div
                    id="id-card-wrap"
                    className="flex flex-col lg:flex-row gap-8 items-center justify-center print:gap-[10mm]"
                >
                    {/* ID Card Front */}
                    <div
                        id="id-card-printable"
                        className={`id-card-face relative rounded-[2.5rem] ${theme.bg} overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border ${theme.border} flex flex-col transition-all duration-500 ${cardSize === 'CR80' ? 'w-[350px] h-[550px]' : 'w-[400px] h-[584px]'
                            }`}
                    >
                        {/* Header Design */}
                        <div className="pt-10 px-8 text-center space-y-4">
                            <div className="flex flex-col items-center">
                                <span className={`text-[10px] font-black tracking-[0.4em] ${level === 'central' ? 'text-slate-400' : 'text-white/40'} uppercase mb-4`}>Official Identity Card</span>
                                <div className="relative size-20 mb-2">
                                    <Image
                                        src="/assets/ycalogo.png"
                                        alt="YCA Logo"
                                        fill
                                        className="object-contain logo-3d-pop shadow-2xl"
                                    />
                                </div>
                                <h4 className={`${level === 'central' ? 'text-slate-900' : 'text-white'} font-black text-lg tracking-tighter uppercase leading-tight`}>Young Chakma Association</h4>
                            </div>
                        </div>

                        {/* Member Info Section */}
                        <div className="flex-grow flex flex-col items-center pt-6 px-8 text-center gap-6">
                            {/* Member Photo */}
                            <div className="relative size-36 shrink-0">
                                <div className={`absolute inset-0 rounded-3xl ${theme.accent} scale-105 blur-lg opacity-30`}></div>
                                <Image
                                    src={member.photo_url || 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=200&h=200&auto=format&fit=crop'}
                                    alt={member.name}
                                    fill
                                    className={`object-cover rounded-3xl border-4 ${level === 'central' ? 'border-slate-100' : 'border-white'} ${theme.ring} ring-8 ring-offset-0`}
                                />
                            </div>

                            {/* Text Info */}
                            <div className="space-y-3">
                                <h2 className={`text-2xl font-black ${theme.memberText} leading-tight`}>{member.name}</h2>
                                <div className="flex flex-wrap justify-center gap-1.5 max-h-20 overflow-y-auto no-scrollbar py-1">
                                    {sortedRoles.map((role, idx) => (
                                        <span key={idx} className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${theme.accent} ${theme.text} border ${theme.border}`}>
                                            {role.designation}
                                        </span>
                                    ))}
                                    {sortedRoles.length === 0 && (
                                        <p className={`text-xs font-black uppercase tracking-widest ${theme.text}`}>{member.designation || member.role}</p>
                                    )}
                                </div>
                            </div>

                            <div className={`w-full h-px ${level === 'central' ? 'bg-slate-100' : 'bg-white/10'}`}></div>

                            <div className="grid grid-cols-2 gap-8 w-full text-center">
                                <div className="flex flex-col items-center">
                                    <span className={`text-[8px] font-black ${theme.subText} uppercase tracking-widest block mb-1`}>ID Number</span>
                                    <span className={`text-xs font-mono font-bold ${theme.memberText} tracking-widest`}>{idNumber}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className={`text-[8px] font-black ${theme.subText} uppercase tracking-widest block mb-1`}>Validity</span>
                                    <span className={`text-xs font-bold ${theme.memberText} tracking-widest`}>2024 - 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Band */}
                        <div className={`mt-auto h-20 ${theme.labelBg} flex items-center justify-center px-8 relative overflow-hidden`}>
                            {level !== 'central' && <div className="absolute inset-0 bg-black/10"></div>}
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] relative z-10 text-center px-2">
                                {theme.label}
                            </span>
                        </div>

                        {/* Watermark Logo */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 ${theme.watermark} pointer-events-none grayscale`}>
                            <Image src="/assets/ycalogo.png" alt="" fill className="object-contain" />
                        </div>
                    </div>

                    {/* ID Card Back */}
                    <div
                        className={`id-card-face relative rounded-[2.5rem] ${theme.bg} overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border ${theme.border} flex flex-col transition-all duration-500 ${cardSize === 'CR80' ? 'w-[350px] h-[550px]' : 'w-[400px] h-[584px]'
                            }`}
                    >
                        <div className="p-10 flex flex-col items-center justify-between h-full relative z-10">
                            {/* Terms/Instructions */}
                            <div className="space-y-6 text-center">
                                <h3 className={`text-xs font-black uppercase tracking-widest ${theme.text}`}>Instructions</h3>
                                <ul className={`text-[10px] font-medium leading-relaxed space-y-3 ${theme.subText}`}>
                                    <li>1. This card is non-transferable and must be produced upon request.</li>
                                    <li>2. In case of loss, please report to your nearest YCA unit immediately.</li>
                                    <li>3. Found cards should be returned to the YCA Zonal Headquarters.</li>
                                    <li>4. Verify authenticity at yca-website.vercel.app/verify</li>
                                </ul>
                            </div>

                            {/* Signature Section */}
                            <div className="w-full flex justify-between items-end px-4">
                                <div className="text-center space-y-2">
                                    <div className={`w-24 h-px ${level === 'central' ? 'bg-slate-900' : 'bg-white'}`}></div>
                                    <span className={`text-[8px] font-bold uppercase tracking-widest ${theme.subText}`}>President</span>
                                </div>
                                <div className="text-center space-y-2">
                                    <div className={`w-24 h-px ${level === 'central' ? 'bg-slate-900' : 'bg-white'}`}></div>
                                    <span className={`text-[8px] font-bold uppercase tracking-widest ${theme.subText}`}>Secretary</span>
                                </div>
                            </div>

                            {/* Logo/QR Watermark Area */}
                            <div className="flex flex-col items-center gap-4 pt-10 border-t border-white/10 w-full">
                                <div className={`relative ${cardSize === 'CR80' ? 'size-24' : 'size-32'} opacity-60 grayscale brightness-200`}>
                                    <Image src="/assets/ycalogo.png" alt="" fill className="object-contain" />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.subText}`}>Unity • Culture • Progress</span>
                            </div>
                        </div>

                        {/* Custom Watermark for Back */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none grayscale">
                            <div className="grid grid-cols-4 gap-4 p-4">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="size-12 relative">
                                        <Image src="/assets/ycalogo.png" alt="" fill className="object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
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
