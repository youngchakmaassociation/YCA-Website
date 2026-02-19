import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-primary text-white pattern-bg mt-auto overflow-hidden text-sm">
            <div className="container mx-auto px-4 py-10 relative z-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="md:col-span-2 lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3 group">
                            <div className="relative size-12 transition-all">
                                <Image src="/assets/ycalogo.png" alt="Logo" width={48} height={48} className="object-contain logo-3d-pop" />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">Young Chakma Association</h3>
                        </div>
                        <p className="text-gray-100 leading-relaxed text-sm max-w-sm">
                            Working towards the unity, empowerment, and progress of Chakma youth worldwide through education, culture, and community.
                        </p>
                        <div className="flex gap-3">
                            {['facebook', 'x', 'instagram', 'youtube'].map(social => (
                                <div key={social} className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all">
                                    <span className="text-[10px] font-bold uppercase">{social[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black tracking-widest uppercase text-[10px] mb-4 opacity-70">Resources</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm font-medium">
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/zones">Zonal HQs</Link>
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/branches">Branch Finder</Link>
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/news-events">Latest News</Link>
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/election">Election Archive</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black tracking-widest uppercase text-[10px] mb-4 opacity-70">Navigation</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm font-medium">
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/about">About Us</Link>
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/bylaw">By-Laws</Link>
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/membership">Join YCA</Link>
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/gallery">Gallery</Link>
                            <Link className="text-gray-100/80 hover:text-white transition-colors" href="/contact">Contact</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black tracking-widest uppercase text-[10px] mb-4 opacity-70">Quick Contact</h4>
                        <ul className="space-y-4 text-gray-100/80">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-lg text-accent">location_on</span>
                                <span className="text-xs leading-relaxed">
                                    Young Chakma Association<br />
                                    General Hqrs. Kamalanagar,<br />
                                    P.O: Kamalanagar,<br />
                                    Lawngtlai District, Mizoram<br />
                                    PIN- 796772
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-lg text-accent">mail</span>
                                <span className="text-xs">contact@youngchakma.org</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black tracking-widest uppercase text-[10px] mb-4 opacity-70">Newsletter</h4>
                        <p className="text-[10px] text-gray-100/80 mb-3 font-bold uppercase tracking-wider">Stay updated with our latest news.</p>
                        <div className="flex gap-2">
                            <input className="bg-white/10 border-0 rounded-lg px-3 py-2 text-xs w-full placeholder:text-white/40 focus:ring-2 focus:ring-accent outline-none" placeholder="Email Address" />
                            <button className="bg-accent px-3 py-2 rounded-lg text-white font-bold text-xs hover:shadow-lg active:scale-95 transition-all">Join</button>
                        </div>
                    </div>
                </div>
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-[11px] text-gray-200/60 font-medium italic">© 2025 Young Chakma Association. All Rights Reserved.</p>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <p className="text-xs font-black flex items-center gap-2">
                            Official Website of <span className="bg-white text-primary px-2 py-0.5 rounded shadow-inner text-[10px]">Young Chakma Association</span>
                        </p>
                        <span className="hidden md:inline text-white/20">|</span>
                        <p className="text-sm font-bold text-white tracking-wide">
                            Made with <span className="text-accent animate-pulse text-lg">❤</span> by <a href="https://www.facebook.com/MacmillanChakma/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent underline decoration-accent decoration-2 underline-offset-4 transition-all uppercase tracking-widest text-[11px] border border-white/20 px-3 py-1 rounded-full hover:bg-white/10 ml-2">Angu Macmillan Chakma</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none translate-x-1/4 translate-y-1/4">
                <Image src="/assets/ycalogo.png" width={300} height={300} alt="" />
            </div>
        </footer>
    );
}
