'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        // Auth detection
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };


    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'CYCA', href: '/cyca' },
        { name: 'Zones', href: '/zones' },
        { name: 'Branches', href: '/branches' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'News & Events', href: '/news-events' },
        { name: 'Election', href: '/election' },
        { name: 'By-Law', href: '/bylaw' },
        { name: 'Membership', href: '/membership' },
        { name: 'Admin', href: '/admin' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="w-full transition-all duration-300 overflow-x-hidden">
            {/* Top Branding Bar - Moving Flag Background */}
            <div className="yca-flag-bg py-8 md:py-12 overflow-hidden flex items-center justify-center">

                <div className="container mx-auto px-6 flex flex-col xl:flex-row items-center justify-between gap-8 relative z-10">
                    <Link href="/" className="flex items-center gap-4 md:gap-8 group transform -translate-y-[2.5%]">
                        <div className="relative size-16 md:size-24 transition-all duration-500">
                            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
                            <Image
                                src="/assets/ycalogo.png"
                                alt="YCA Logo"
                                width={96}
                                height={96}
                                className="relative z-10 object-contain logo-3d-pop"
                                priority
                            />
                        </div>
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="flex flex-col w-fit">
                                <h1 className="text-xl md:text-3xl lg:text-5xl font-black text-white leading-[0.85] tracking-tighter uppercase whitespace-nowrap text-shadow-heavy">
                                    Young Chakma
                                </h1>
                                <div className="flex justify-between w-full mt-1">
                                    {"ASSOCIATION".split('').map((char, i) => (
                                        <span
                                            key={i}
                                            className="text-xs md:text-xl lg:text-2xl font-black text-[#007A33] leading-none uppercase text-shadow-heavy"
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 md:gap-4 self-stretch border-l-2 md:border-l-4 border-[#B91C1C] pl-2 md:pl-4">
                                <div className="flex items-center h-full">
                                    <span className="text-[#B91C1C] text-[2.2rem] md:text-[3.45rem] lg:text-[5.25rem] font-black uppercase tracking-tighter whitespace-nowrap leading-none transform -translate-y-1 text-shadow-heavy">
                                        DO HELP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                <Link href="/dashboard" className="flex items-center gap-3">
                                    <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20 text-shadow-heavy">
                                        {user.name.charAt(0)}
                                    </div>
                                </Link>
                                <button onClick={logout} className="size-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                    <span className="material-symbols-outlined">logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="hidden sm:block text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors text-shadow-heavy">
                                    Member Login
                                </Link>
                                <Link href="/membership" className="px-8 py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-accent transition-all shadow-xl shadow-primary/20 text-shadow-heavy">
                                    Join YCA
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Bottom Navigation Bar - Sticky */}
            <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0c111d] backdrop-blur-xl transition-colors">
                <div className="container mx-auto px-6 flex items-center justify-between gap-8 h-20">
                    {/* Placeholder for left balance */}
                    <div className="hidden xl:block w-32"></div>

                    {/* Centered Links */}
                    <div className="flex-1 flex items-center justify-start md:justify-center overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth w-full">
                        <div className="flex items-center min-w-max px-2 md:px-0">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        className={`text-[11px] font-black uppercase tracking-widest px-5 py-2 transition-all relative group ${isActive
                                            ? 'text-primary'
                                            : 'text-white/60 hover:text-white'
                                            }`}
                                        href={link.href}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute bottom-[-14px] left-5 right-5 h-1 bg-primary rounded-full"></span>
                                        )}
                                        {!isActive && (
                                            <span className="absolute bottom-[-14px] left-1/2 right-1/2 h-1 bg-primary rounded-full transition-all group-hover:left-5 group-hover:right-5"></span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sticky Branding - Visible on scroll/always in this bar */}

                </div>
            </nav>
        </header>
    );
}

