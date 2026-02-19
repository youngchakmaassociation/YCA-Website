import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: "About Us - Young Chakma Association",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col bg-background-light dark:bg-background-dark">
            {/* Immersive Header */}
            <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-primary/95">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent/30 mix-blend-multiply opacity-90"></div>
                    <div className="absolute top-0 left-0 w-full h-full pattern-bg opacity-10 animate-slow-scroll"></div>
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpEWqVVOSVEne4ZRhU7RZu5Wr0LVa6FBh9OJyfLUMzP2of4GefY7_-ec-aSEz_Qyc-SzWr5YfEAMeD-hqJTfm1mgcdzs1ZCr02qDYIlR23VbESmFQSJuGzGxMEhiR4ji3JnzsRvg7ypAEPjpSguTj82lLDjg4SIpQss7jIz_Sevhsq4mOCApJstlb7HU6CrbHUBe220O1anFKlfDvt-YaMw3FUlKT9PVbk3DhszCMKzOuXL0b2ibqkvl3Ix1wKJgJsq-NyxYoN9DVY"
                        alt="YCA Heritage"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 -z-10 brightness-50"
                        priority
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-black uppercase tracking-[0.3em] animate-fade-in">
                        The Legacy of 1978
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                        Our Story.
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-white/80 font-medium leading-relaxed drop-shadow-md">
                        Uniting and empowering the Chakma youth since our historic registration in 1978.
                        A mission of service, culture, and progress.
                    </p>
                </div>
            </div>

            {/* President's Vision Section - Detailed Profile */}
            <section className="py-32 bg-gray-50 dark:bg-white/5 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Portrait Column */}
                        <div className="lg:col-span-5 relative group">
                            <div className="absolute -inset-8 bg-primary/20 rounded-[4rem] blur-[100px] opacity-30 group-hover:opacity-60 transition-all duration-1000"></div>
                            <div className="relative rounded-[4rem] overflow-hidden border-[12px] border-white dark:border-background-dark shadow-3xl transition-all duration-1000 group-hover:-translate-y-2">
                                <Image
                                    src="/assets/president.jpg"
                                    width={800}
                                    height={1000}
                                    alt="Dr. Jyoti Bikash Chakma - YCA President"
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-12 text-white">
                                    <h3 className="text-3xl font-black mb-1">Dr. Jyoti Bikash Chakma</h3>
                                    <p className="text-accent font-black uppercase tracking-[0.2em] text-xs">Ph.D. (Mizoram University)</p>
                                </div>
                            </div>
                        </div>

                        {/* Biography Column */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl text-primary text-xs font-black uppercase tracking-widest">
                                    <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                                    Current President
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-primary leading-none tracking-tighter">
                                    A Vision for <br />
                                    <span className="text-accent italic">Empowerment.</span>
                                </h2>
                                <p className="text-xl text-text-light dark:text-text-dark font-medium leading-relaxed opacity-80">
                                    Dr. Jyoti Bikash Chakma is a distinguished community leader and academic from Mizoram, serving as the President of the Central Young Chakma Association (CYCA).
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-accent">Academic Excellence</h4>
                                    <p className="text-base font-medium opacity-60 leading-relaxed">
                                        Holding an M.Com and a Ph.D. from Mizoram University, Dr. Chakma brings analytical depth and academic rigour to community leadership.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-accent">Advocacy & Rights</h4>
                                    <p className="text-base font-medium opacity-60 leading-relaxed">
                                        A fearless advocate for the Chakma Autonomous District Council (CADC), focusing on infrastructure improvements and professional rights.
                                    </p>
                                </div>
                            </div>

                            <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl space-y-6">
                                <p className="text-lg font-medium italic opacity-70 border-l-4 border-primary pl-6">
                                    "His leadership focuses on seeking critical infrastructure improvements, such as the Borapansury PHC, and addressing educational challenges to ensure the Chakma youth are equipped for the future."
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <span className="px-5 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-[10px] font-black uppercase tracking-widest">Community Work</span>
                                    <span className="px-5 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-[10px] font-black uppercase tracking-widest">Educational Reform</span>
                                    <span className="px-5 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-[10px] font-black uppercase tracking-widest">Infrastructure Advocacy</span>
                                </div>
                            </div>

                            <div className="pt-8">
                                <Link href="https://www.facebook.com/vikasjchakma/" target="_blank" className="inline-flex items-center gap-4 group/btn">
                                    <div className="size-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-all">
                                        <span className="material-symbols-outlined">social_leaderboard</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-primary dark:text-white uppercase leading-none">Connect on Facebook</p>
                                        <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-1">Official Leader Updates</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Foundational Mission - Redesigned High-Impact Section */}
            <section className="py-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/4 -right-20 size-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-1/4 -left-20 size-[500px] bg-accent/5 rounded-full blur-[120px] -z-10"></div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        {/* Text Content */}
                        <div className="lg:col-span-6 space-y-12">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-3">
                                    <div className="w-12 h-[2px] bg-accent"></div>
                                    <span className="text-accent font-black tracking-[0.3em] uppercase text-xs">Since 1978</span>
                                </div>
                                <h2 className="text-6xl md:text-8xl font-black text-primary leading-[0.85] tracking-tighter">
                                    Promoting <span className="text-primary/40 block">Unity,</span>
                                    Preserving <span className="text-accent relative inline-block">
                                        Identity.
                                        <span className="absolute bottom-4 left-0 w-full h-4 bg-accent/10 -z-10"></span>
                                    </span>
                                </h2>
                                <p className="text-2xl text-text-light dark:text-text-dark font-medium leading-relaxed opacity-70 max-w-xl">
                                    Guided by our 2018 Revised Constitution, we stand as a shield for the Chakma people—guarding our rights and fostering a spirit of selfless service.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-8">
                                <div className="group space-y-4 flex-1">
                                    <div className="size-16 rounded-[1.5rem] bg-white dark:bg-white/5 shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <span className="material-symbols-outlined text-3xl font-bold">volunteer_activism</span>
                                    </div>
                                    <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-tight">Voluntary <br />Service</h3>
                                    <p className="text-sm font-medium opacity-50 leading-relaxed">Selfless dedication to every member of the Chakma society.</p>
                                </div>

                                <div className="group space-y-4 flex-1">
                                    <div className="size-16 rounded-[1.5rem] bg-white dark:bg-white/5 shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                        <span className="material-symbols-outlined text-3xl font-bold">gavel</span>
                                    </div>
                                    <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-tight">Justice & <br />Equality</h3>
                                    <p className="text-sm font-medium opacity-50 leading-relaxed">Upholding law and order while protecting the vulnerable.</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Showcase - Dual Photo Grid */}
                        <div className="lg:col-span-6 relative">
                            <div className="grid grid-cols-2 gap-6 items-start">
                                {/* First Image - The Legacy */}
                                <div className="relative z-10 rounded-[3rem] overflow-hidden border-[10px] border-white dark:border-background-dark shadow-2xl transition-all duration-1000 transform hover:scale-105">
                                    <Image
                                        src="/assets/community_leadership.png"
                                        width={600}
                                        height={800}
                                        alt="Community Leadership"
                                        className="object-cover w-full h-[500px]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-6">
                                        <p className="text-white text-xs font-black uppercase tracking-widest">Community Leadership</p>
                                    </div>
                                </div>

                                {/* Second Image - The Empowerment (Staggered) */}
                                <div className="relative z-0 rounded-[3rem] overflow-hidden border-[10px] border-white dark:border-background-dark shadow-2xl transition-all duration-1000 transform translate-y-12 hover:scale-105 bg-primary">
                                    <Image
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpEWqVVOSVEne4ZRhU7RZu5Wr0LVa6FBh9OJyfLUMzP2of4GefY7_-ec-aSEz_Qyc-SzWr5YfEAMeD-hqJTfm1mgcdzs1ZCr02qDYIlR23VbESmFQSJuGzGxMEhiR4ji3JnzsRvg7ypAEPjpSguTj82lLDjg4SIpQss7jIz_Sevhsq4mOCApJstlb7HU6CrbHUBe220O1anFKlfDvt-YaMw3FUlKT9PVbk3DhszCMKzOuXL0b2ibqkvl3Ix1wKJgJsq-NyxYoN9DVY"
                                        width={600}
                                        height={800}
                                        alt="Cultural Heritage"
                                        className="object-cover w-full h-[500px] opacity-70 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-accent text-sm">verified</span>
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none">Safeguarding Heritage</p>
                                        </div>
                                        <p className="text-white/60 text-[9px] font-bold uppercase tracking-tight">Active in 500+ Communities</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Floating Element */}
                            <div className="absolute -top-6 -right-6 size-24 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Aims & Objectives Section */}
            <section className="py-24 bg-primary/5 dark:bg-white/5 border-y border-primary/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                        <span className="text-accent font-black tracking-widest uppercase text-sm">Strategic Goals</span>
                        <h2 className="text-5xl font-black text-primary leading-tight">Aims & Objectives</h2>
                        <p className="text-lg font-medium opacity-60">As defined in Section M3 of our Constitution, the YCA is driven by these core organizational goals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Column 1: Social & Unity */}
                        <div className="space-y-8 p-10 rounded-[3rem] bg-white dark:bg-background-dark shadow-xl">
                            <div className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">groups</span>
                            </div>
                            <h3 className="text-2xl font-black text-primary">Social Unity & Rights</h3>
                            <ul className="space-y-4 text-sm font-medium opacity-70">
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">01</span>
                                    <span>Promote unity, integrity, and friendly relations through peaceful co-existence.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">02</span>
                                    <span>Safeguard fundamental rights and eradicate injustice to the background people.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">03</span>
                                    <span>Preserve and reform social customs and heritage.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Education & Growth */}
                        <div className="space-y-8 p-10 rounded-[3rem] bg-white dark:bg-background-dark shadow-xl md:translate-y-4">
                            <div className="size-16 rounded-2xl bg-accent text-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">school</span>
                            </div>
                            <h3 className="text-2xl font-black text-primary">Education & Development</h3>
                            <ul className="space-y-4 text-sm font-medium opacity-70">
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">04</span>
                                    <span>Eradicate illiteracy and run educational institutions, libraries, and hostels.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">05</span>
                                    <span>Establish vocational training centers for job-oriented growth.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-primary font-bold">06</span>
                                    <span>Publish literary works and magazines to diffuse knowledge.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Welfare & Future */}
                        <div className="space-y-8 p-10 rounded-[3rem] bg-white dark:bg-background-dark shadow-xl">
                            <div className="size-16 rounded-2xl bg-primary text-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">health_and_safety</span>
                            </div>
                            <h3 className="text-2xl font-black text-primary">Community Welfare</h3>
                            <ul className="space-y-4 text-sm font-medium opacity-70">
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">07</span>
                                    <span>Free people from superstitious beliefs and social evils like intoxication.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">08</span>
                                    <span>Render relief to victims of natural calamities and accidents.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent font-bold">09</span>
                                    <span>Create environmental consciousness and promote cottage industries.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* History Timeline/Journey */}
            <section className="py-24 sm:py-32 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-full h-full pattern-bg opacity-5 pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-5xl md:text-6xl font-black italic">The Historical Journey</h2>
                            <p className="text-xl opacity-70 font-medium">From inception to the current dynamic structure</p>
                        </div>

                        <div className="space-y-20 relative">
                            <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10 hidden md:block"></div>

                            {[
                                {
                                    year: '1978',
                                    title: 'Official Inception',
                                    desc: 'Registered under Act XXI of the Societies Registration Act, 1860 on the 25th of October, 1978 (Reg No: SR.36 of 1978).',
                                    icon: 'app_registration'
                                },
                                {
                                    year: '2018',
                                    title: 'Constitutional Revision',
                                    desc: 'Adopted the Revised Constitution of 2018 to meet modern challenges and expand organizational breadth.',
                                    icon: 'history_edu'
                                },
                                {
                                    year: 'Today',
                                    title: 'Global Outreach',
                                    desc: 'Operating with Zonal HQs and hundreds of branches to serve the Chakma youth across regions.',
                                    icon: 'public'
                                }
                            ].map((milestone, i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-8 items-start relative">
                                    <div className="size-16 rounded-2xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xl z-20">
                                        <span className="material-symbols-outlined text-3xl font-black">{milestone.icon}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <span className="text-4xl font-black text-accent block">{milestone.year}</span>
                                        <h3 className="text-2xl font-black">{milestone.title}</h3>
                                        <p className="text-lg opacity-70 leading-relaxed max-w-2xl">{milestone.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 container mx-auto px-4">
                <div className="relative p-12 md:p-20 rounded-[4rem] bg-accent text-white overflow-hidden text-center shadow-3xl">
                    <div className="absolute top-0 right-0 size-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                        <h2 className="text-5xl font-black tracking-tighter">Become Part of the Movement.</h2>
                        <p className="text-xl font-medium opacity-80">
                            Join over 5,000 members dedicated to the cultural and social advancement of our youth.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link href="/membership" className="px-12 py-5 bg-white text-accent font-black rounded-2xl hover:bg-primary hover:text-white transition-all shadow-xl">
                                Join YCA Today
                            </Link>
                            <Link href="/contact" className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 font-black rounded-2xl hover:bg-white/20 transition-all">
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
