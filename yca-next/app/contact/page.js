'use client';

import Image from 'next/image';

export default function ContactPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent successfully! (Demo only)');
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-col gap-6 p-4 mb-12 animate-fade-in-up">
                <div className="flex flex-col gap-6 text-center lg:text-left">
                    <h1 className="text-primary text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                        Get in Touch <br className="hidden lg:block" /> with YCA
                    </h1>
                    <p className="text-text-light/80 dark:text-text-dark/80 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 border-l-4 border-accent pl-6 py-2">
                        We'd love to hear from you. Reach out with questions, suggestions, or for collaboration.
                        Please fill out the form below and we will get back to you as soon as possible.
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 p-4">
                {/* Left Column: Form */}
                <div className="w-full lg:w-3/5">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-white dark:bg-white/5 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <label className="flex flex-col gap-3 group">
                                <span className="text-primary text-sm font-black uppercase tracking-widest pl-1">Full Name</span>
                                <input
                                    className="w-full rounded-2xl text-text-light dark:text-text-dark border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:ring-4 focus:ring-primary/20 focus:border-primary h-14 px-6 text-base font-medium transition-all outline-none"
                                    placeholder="Your Full Name"
                                    required
                                />
                            </label>
                            <label className="flex flex-col gap-3 group">
                                <span className="text-primary text-sm font-black uppercase tracking-widest pl-1">Email Address</span>
                                <input
                                    className="w-full rounded-2xl text-text-light dark:text-text-dark border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:ring-4 focus:ring-primary/20 focus:border-primary h-14 px-6 text-base font-medium transition-all outline-none"
                                    placeholder="contact@yca.org"
                                    type="email"
                                    required
                                />
                            </label>
                        </div>
                        <label className="flex flex-col gap-3 group">
                            <span className="text-primary text-sm font-black uppercase tracking-widest pl-1">Subject</span>
                            <input
                                className="w-full rounded-2xl text-text-light dark:text-text-dark border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:ring-4 focus:ring-primary/20 focus:border-primary h-14 px-6 text-base font-medium transition-all outline-none"
                                placeholder="Membership Inquiry"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-3 group">
                            <span className="text-primary text-sm font-black uppercase tracking-widest pl-1">Your Message</span>
                            <textarea
                                className="w-full rounded-2xl text-text-light dark:text-text-dark border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 focus:ring-4 focus:ring-primary/20 focus:border-primary min-h-[200px] p-6 text-base font-medium transition-all outline-none resize-none"
                                placeholder="How can we help you?"
                                required
                            ></textarea>
                        </label>
                        <button
                            type="submit"
                            className="group flex items-center justify-center gap-3 w-full md:w-fit px-12 h-16 bg-primary text-white text-lg font-black rounded-2xl hover:bg-accent transition-all shadow-lg hover:shadow-primary/40 active:scale-95"
                        >
                            <span>Send Message</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                        </button>
                    </form>
                </div>

                {/* Right Column: Contact info & Map */}
                <div className="w-full lg:w-2/5 flex flex-col gap-12 animate-fade-in-up md:delay-200">
                    <div className="space-y-10">
                        <h3 className="text-3xl font-black text-primary mb-8 underline underline-offset-8 decoration-accent">Contact Details</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                    <span className="material-symbols-outlined text-3xl">mail</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Support</p>
                                    <a className="text-xl font-bold hover:text-accent transition-colors" href="mailto:contact@yca.org">contact@yca.org</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-inner">
                                    <span className="material-symbols-outlined text-3xl">location_on</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Headquarters</p>
                                    <p className="text-xl font-bold leading-relaxed">
                                        Kamalanagar, <br />
                                        Mizoram, India <br />
                                        <span className="text-sm font-mono opacity-40">22.619400, 92.642174</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://www.google.com/maps/search/?api=1&query=22.619400,92.642174"
                        target="_blank"
                        className="relative h-[300px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 group"
                    >
                        <iframe
                            src="https://maps.google.com/maps?q=22.619400,92.642174&t=&z=18&ie=UTF8&iwloc=&output=embed"
                            className="absolute inset-0 w-full h-full opacity-90 contrast-125 grayscale-[0.2] invert-[0.9] dark:invert-0 pointer-events-none"
                            style={{ border: 0 }}
                        ></iframe>
                        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg transform translate-y-20 group-hover:translate-y-0 transition-transform">
                            <p className="text-sm font-black text-primary text-center">Open in Google Maps →</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
