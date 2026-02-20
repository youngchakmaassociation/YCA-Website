'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { newsAPI } from '@/app/lib/api';

export default function Home() {
  const [latestNews, setLatestNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsAPI.getAll('?isPublished=true&limit=3');
        if (response.success && response.data.length > 0) {
          setLatestNews(response.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  const stats = [
    { label: 'Active Members', value: '4,500+', icon: 'group' },
    { label: 'Local Branches', value: '7', icon: 'account_tree' },
    { label: 'Zonal HQs', value: '3', icon: 'hub' },
    { label: 'Years of Service', value: '45+', icon: 'history_edu' }
  ];

  return (
    <div className="flex flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary/95">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/20 mix-blend-multiply opacity-90"></div>
          <div className="absolute top-0 left-0 w-full h-full pattern-bg opacity-10 animate-slow-scroll"></div>
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-blob inter-active"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-primary/40 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-widest animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Estd 1978 • Young Chakma Association
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
                Unity. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Empowerment.</span> <br />
                Progress.
              </h1>

              <p className="max-w-2xl text-xl text-white/80 leading-relaxed font-medium">
                We are the collective pulse of the Chakma youth, dedicated to fostering a legacy of cultural pride,
                educational excellence, and community resilience.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <Link href="/membership" className="px-10 py-5 bg-white text-primary font-black rounded-2xl hover:bg-accent hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-black/20">
                  Become a Member
                </Link>
                <Link href="/about" className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white font-black rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                  Our Mission
                </Link>
              </div>
            </div>

            {/* Hero Card/Visual */}
            <div className="lg:w-2/5 flex justify-center animate-float">
              <div className="relative p-2 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-3xl">
                <div className="absolute -top-10 -right-10 size-32 bg-accent rounded-full blur-3xl opacity-40"></div>
                <div className="relative overflow-hidden rounded-[2.5rem] bg-background-dark/50 p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-[1.2rem] bg-primary flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-3xl text-white">campaign</span>
                    </div>
                    <div>
                      <h4 className="text-white font-black">Live Update</h4>
                      <p className="text-white/60 text-xs font-bold font-mono">SC-040-2024</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    Official General Conference Results Now Available
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-white/70 font-medium">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Published 2 hours ago
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-accent rounded-full"></div>
                    </div>
                  </div>
                  <Link href="/news-events" className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white font-bold group">
                    View Circular
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2 group">
                <div className="size-16 mx-auto rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-transparent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-black text-primary dark:text-white tracking-tighter">{stat.value}</h3>
                <p className="text-xs font-black uppercase tracking-widest text-text-light/40 dark:text-text-dark/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Structure Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-6">
                <span className="text-accent font-black tracking-[0.2em] uppercase text-sm">Our Network</span>
                <h2 className="text-5xl lg:text-6xl font-black text-primary leading-none">
                  Unified at Every <br /> <span className="text-accent">Level.</span>
                </h2>
                <p className="text-xl text-text-light dark:text-text-dark opacity-70 leading-relaxed font-medium">
                  The YCA maintains a robust organizational matrix from central governance to village-level branches,
                  ensuring every member has a voice and every initiative has a home.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  { title: 'Central YCA', count: '1 Governing Body', icon: 'corporate_fare', href: '/cyca' },
                  { title: 'Zonal Committees', count: '12 Districts', icon: 'hub', href: '/zones' },
                  { title: 'Branch Networks', count: '120+ Communities', icon: 'groups', href: '/branches' }
                ].map((item, id) => (
                  <Link key={id} href={item.href} className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="size-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-primary dark:text-white">{item.title}</h3>
                        <p className="text-sm font-bold opacity-40">{item.count}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-primary group-hover:translate-x-2 transition-all">chevron_right</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-gray-200">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-HlR_NyOOcqYJi9EzyTYjSag0Fvt49N6cURYuM4MGqYu3ZS7fFEp9SDo6Sq2W0tLkvdKZPangCyYtENkSTpasZ3YMECjR-_GWHhj_AjdU0kYJG0Dw9Yo7DVO43VmMjvaufoq6fUTbazliCtviMRxz7QHFBW5Jbviu3snB9NxEj3_jXlTukxTuj9MqlbUrKH2v0pLMWk-y2exbIVLtFbVGIgN3PwLeYAFXr6sL7u--Bygg4NXMp37d-o8JZ-T3WhNlqk7KersSzlE6" width={400} height={600} alt="YCA Activity" className="h-full object-cover" />
                </div>
                <div className="h-48 rounded-3xl overflow-hidden bg-accent/10 flex items-center justify-center p-8 text-center text-accent">
                  <h4 className="text-2xl font-black italic">"Doing Help Since 1978"</h4>
                </div>
              </div>
              <div className="space-y-4 -translate-y-8">
                <div className="h-48 rounded-3xl overflow-hidden bg-primary/10 flex items-center justify-center p-8 text-center text-primary">
                  <h4 className="text-2xl font-black">40th General Conference</h4>
                </div>
                <div className="h-64 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-gray-200">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBccf6hYftnTapwz4GUdr2OpXgMZ5vho_avdfYDzR9SLnFrklovyV_bWgsZZiS3dXCQBloAVnkKKWLFLnxekpAA2xaal7XKKBQu02kFLh_dTVQQN4VLNF5cGQx1bdkxh081KcBKcFdDmOWCeiyGGDeYuFBqlr86kJ8iVpNrsGxgoIbbHu5zrsN0wNbaozWdRX7n6A3fgHDeMQ8bOLh5wXcODL6bm4HS-p5zcYGC4aGR8poekFtkZkQrXjHxNsd__ELmHtLaKY0rEcdx" width={400} height={600} alt="YCA Meeting" className="h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-black/10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="space-y-4">
              <span className="text-primary font-black tracking-widest uppercase text-xs">Stay Informed</span>
              <h2 className="text-5xl font-black text-primary italic leading-none tracking-tighter">Latest News & <br /> <span className="text-accent underline decoration-4 underline-offset-8 not-italic">Reflections.</span></h2>
            </div>
            <Link href="/news-events" className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-accent transition-all">View Browser Feed</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {loadingNews ? (
              [1, 2, 3].map(i => <div key={i} className="h-96 rounded-[3rem] bg-gray-200 dark:bg-white/5 animate-pulse"></div>)
            ) : (
              latestNews.map((news) => (
                <div key={news._id} className="group relative h-96 rounded-[3rem] overflow-hidden bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute top-6 left-6 z-20 px-3 py-1 rounded-lg bg-accent text-white text-[10px] font-black uppercase tracking-widest">
                    {news.category}
                  </div>
                  {/* Image logic here if available */}
                  <div className="absolute inset-x-0 bottom-0 p-10 z-20 space-y-4">
                    <p className="text-xs font-bold text-white/60 tracking-wider">
                      {new Date(news.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-2xl font-black text-white leading-tight group-hover:text-accent transition-colors">
                      {news.title}
                    </h3>
                    <Link href={`/news-events/${news._id}`} className="inline-flex items-center gap-2 text-white font-bold group/link relative pt-2">
                      Read More
                      <span className="material-symbols-outlined text-sm group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="relative p-12 md:p-24 rounded-[4rem] bg-accent overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 size-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 size-96 bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h2 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tighter">
                Building the Legacy <br /> <span className="text-white/40">Together.</span>
              </h2>
              <p className="text-xl text-white/70 font-medium leading-relaxed">
                Join our global community of young leaders, educators, and visionaries.
                Apply for membership today and be the change.
              </p>
            </div>
            <div className="lg:w-1/3 w-full flex flex-col gap-4">
              <Link href="/membership" className="w-full h-16 bg-white text-accent rounded-2xl flex items-center justify-center font-black text-xl hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/10">
                Apply for Membership
              </Link>
              <Link href="/contact" className="w-full h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-white border border-white/20 hover:bg-white/20 transition-all">
                Inquiry for Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
                @keyframes blob {
                    0% { transform: scale(1); }
                    33% { transform: scale(1.1); }
                    66% { transform: scale(0.9); }
                    100% { transform: scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes slow-scroll {
                    from { background-position: 0 0; }
                    to { background-position: 100% 100%; }
                }
                .animate-slow-scroll {
                    animation: slow-scroll 60s linear infinite;
                }
                .shadow-3xl {
                    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
                }
            `}</style>
    </div>
  );
}
