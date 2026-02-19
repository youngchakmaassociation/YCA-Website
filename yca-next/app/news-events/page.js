'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { newsAPI } from '@/app/lib/api';

export default function NewsPage() {
    const [filter, setFilter] = useState('All');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Announcements', 'Meetings', 'Education', 'Circulars', 'General'];

    const FALLBACK_NEWS = [
        {
            _id: '1',
            title: 'Annual YCA Conference 2024: Shaping the Future',
            category: 'Meetings',
            createdAt: '2024-06-15',
            content: 'The 40th General Conference concluded with landmark resolutions for youth empowerment and community development across Mizoram. Representatives from over 120 branches attended to vote on the revised constitution and select the new executive body.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-HlR_NyOOcqYJi9EzyTYjSag0Fvt49N6cURYuM4MGqYu3ZS7fFEp9SDo6Sq2W0tLkvdKZPangCyYtENkSTpasZ3YMECjR-_GWHhj_AjdU0kYJG0Dw9Yo7DVO43VmMjvaufoq6fUTbazliCtviMRxz7QHFBW5Jbviu3snB9NxEj3_jXlTukxTuj9MqlbUrKH2v0pLMWk-y2exbIVLtFbVGIgN3PwLeYAFXr6sL7u--Bygg4NXMp37d-o8JZ-T3WhNlqk7KersSzlE6'
        },
        {
            _id: '2',
            title: 'Cultural Heritage Workshop Series Announced',
            category: 'Education',
            createdAt: '2024-05-28',
            content: 'Preserving our traditions through modern technology. Join our masterclass on Chakma linguistic history and the digitization of traditional scripts. This series aims to bridge the gap between elders and the digital-native generation.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBccf6hYftnTapwz4GUdr2OpXgMZ5vho_avdfYDzR9SLnFrklovyV_bWgsZZiS3dXCQBloAVnkKKWLFLnxekpAA2xaal7XKKBQu02kFLh_dTVQQN4VLNF5cGQx1bdkxh081KcBKcFdDmOWCeiyGGDeYuFBqlr86kJ8iVpNrsGxgoIbbHu5zrsN0wNbaozWdRX7n6A3fgHDeMQ8bOLh5wXcODL6bm4HS-p5zcYGC4aGR8poekFtkZkQrXjHxNsd__ELmHtLaKY0rEcdx'
        },
        {
            _id: '3',
            title: 'Official Circular on Zonal Headquarters Expansion',
            category: 'Circulars',
            createdAt: '2024-05-10',
            content: 'The Central Executive Committee has approved the establishment of three new Zonal Headquarters to better serve our growing membership in remote regions. This expansion will streamline communication and community service delivery.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-Ja8dqHjN1sv2F1b4O30gqmJ3oWE4YCthEMLxXpzPb3jEwhCGpUqnbo7zww6jqg2zEwis8kTdC8L1uixl3R5h8z8BvoSzbeaO_Cu9jMaWFxgibjcgDACuC0q4byAwq6CWxufGXUORpA8tiJGP7FmgUhVEzd1iUesxDNmrOb71yXbseXdvlYRzsF2wx0qaHPIo5mWeehKDP2kukPazb57I7b2HQHd-ZzJv9H_WodgssFfaAy8nj2ehXXL7y0obJtvbnf-zcLJYik3n'
        }
    ];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                let params = '?isPublished=true';
                if (filter !== 'All') params += `&category=${filter}`;
                if (searchQuery) params += `&search=${searchQuery}`;

                const response = await newsAPI.getAll(params);
                if (response.success && response.data?.length > 0) {
                    setArticles(response.data);
                } else {
                    setArticles(FALLBACK_NEWS);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
                setArticles(FALLBACK_NEWS);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchNews();
        }, 300); // Debounce search

        return () => clearTimeout(timer);
    }, [filter, searchQuery]);

    const upcomingEvents = [
        { month: 'OCT', day: '25', title: 'Community Blood Drive', loc: 'YCA Community Hall' },
        { month: 'NOV', day: '15', title: 'Cultural Heritage Workshop', loc: 'Online via Zoom' },
        { month: 'DEC', day: '05', title: 'Annual Sports Meet', loc: 'City Sports Complex' }
    ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Main Content */}
                <div className="flex-grow lg:w-2/3 space-y-16">
                    <div className="space-y-6 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight">
                            Latest News & <br /> <span className="text-accent">Official Updates</span>
                        </h1>
                        <p className="max-w-xl text-lg font-medium opacity-60">
                            Stay connected with the heartbeat of our community.
                            Find official notices, press releases, and circulars here.
                        </p>
                    </div>

                    {/* Search & Filter */}
                    <div className="space-y-8">
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                            <input
                                className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                placeholder="Search the newsroom..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === cat
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-primary'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feed */}
                    <div className="space-y-12 min-h-[400px]">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                                <span className="material-symbols-outlined text-6xl text-primary animate-spin mb-4">refresh</span>
                                <p className="font-black text-primary uppercase tracking-widest text-xs">Fetching Latest Updates...</p>
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/10">
                                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">newspaper</span>
                                <p className="text-xl font-black text-gray-400">No matching articles found</p>
                            </div>
                        ) : (
                            articles.map((article, i) => (
                                <div key={i} className="group flex flex-col md:flex-row gap-8 p-6 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-2xl transition-all animate-fade-in-up">
                                    <div className="w-full md:w-1/3 relative h-64 md:h-auto rounded-[1.5rem] overflow-hidden">
                                        <Image src={article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop'} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="flex-grow space-y-4 py-4">
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">{article.category}</span>
                                            <span className="text-sm font-bold text-gray-400">{new Date(article.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-primary leading-tight group-hover:text-accent transition-colors">{article.title}</h2>
                                        <p className="text-lg font-medium opacity-70 leading-relaxed line-clamp-3">
                                            {article.content.substring(0, 150)}...
                                        </p>
                                        <Link href={`/news-events/${article._id}`} className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest text-primary pt-2 group/link">
                                            Read Full Story
                                            <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <button className="w-full h-16 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-white/10 text-gray-400 font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                        Load More Archives
                    </button>
                </div>

                {/* Sidebar */}
                <aside className="lg:w-1/3 space-y-12">
                    <div className="p-10 rounded-[3rem] bg-primary/5 dark:bg-primary/10 border border-primary/10 space-y-10">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-primary dark:text-white">Upcoming Events</h3>
                            <div className="h-1 w-12 bg-accent rounded-full"></div>
                        </div>
                        <div className="space-y-8">
                            {upcomingEvents.map((event, i) => (
                                <div key={i} className="flex gap-6 group cursor-pointer">
                                    <div className="flex flex-col items-center justify-center size-16 rounded-2xl bg-accent text-white shadow-lg group-hover:scale-110 transition-transform">
                                        <span className="text-[10px] font-black tracking-widest">{event.month}</span>
                                        <span className="text-xl font-black">{event.day}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black leading-tight group-hover:text-accent transition-colors">{event.title}</h4>
                                        <p className="text-sm font-bold opacity-50 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">location_on</span>
                                            {event.loc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                            Calendar View
                        </button>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-accent text-white space-y-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 size-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="text-2xl font-black">Get Alerts</h3>
                        <p className="font-medium opacity-80 leading-relaxed">
                            Subscribe to our newsletter to receive official circulars and local event notifications
                            directly in your inbox.
                        </p>
                        <form className="space-y-4">
                            <input className="w-full h-14 rounded-xl bg-white/10 border border-white/20 px-6 outline-none focus:bg-white/20 transition-all font-bold placeholder:text-white/40" placeholder="Email address" />
                            <button className="w-full h-14 bg-white text-accent font-black rounded-xl hover:bg-primary hover:text-white transition-all">Subscribe Now</button>
                        </form>
                    </div>
                </aside>
            </div>
        </div>
    );
}
