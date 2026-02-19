'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { newsAPI } from '@/app/lib/api';

export default function NewsDetailPage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

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
        const fetchDetail = async () => {
            // Early exit if it's a fallback ID to avoid Supabase errors
            const fallbackArticle = FALLBACK_NEWS.find(a => a._id === id);
            if (fallbackArticle) {
                setArticle(fallbackArticle);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const [newsRes, commentsRes] = await Promise.all([
                    newsAPI.getOne(id),
                    newsAPI.getComments(id)
                ]);

                if (newsRes.success) {
                    setArticle(newsRes.data);
                }
                if (commentsRes.success) {
                    setComments(commentsRes.data);
                }
            } catch (error) {
                console.error('Error fetching detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await newsAPI.addComment(id, { content: newComment });
            if (response.success) {
                setComments([...comments, response.data]);
                setNewComment('');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (loading) return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center animate-pulse">
            <div className="size-20 bg-primary/20 rounded-full animate-spin border-4 border-primary border-t-transparent mb-8"></div>
            <p className="font-black text-primary uppercase tracking-[0.3em]">Loading Story...</p>
        </div>
    );

    if (!article) return (
        <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-4xl font-black text-primary mb-4">Story Not Found</h1>
            <Link href="/news-events" className="text-accent font-bold hover:underline">Back to newsroom</Link>
        </div>
    );

    return (
        <div className="pb-32">
            {/* Hero Header */}
            <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
                <Image
                    src={article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200'}
                    alt={article.title}
                    fill
                    className="object-cover animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl space-y-6 animate-fade-in-up">
                            <span className="px-6 py-2 bg-accent text-white text-xs font-black uppercase tracking-[0.3em] rounded-full inline-block">
                                {article.category}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-black text-primary dark:text-white leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex items-center gap-6 pt-4 border-t border-gray-200/20">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-accent">schedule</span>
                                    <span className="font-bold opacity-70">{new Date(article.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-accent">visibility</span>
                                    <span className="font-bold opacity-70">{article.views || 0} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    {/* Article Content */}
                    <article className="lg:col-span-2 space-y-12 animate-fade-in-up">
                        <div className="prose prose-xl prose-primary dark:prose-invert max-w-none font-medium leading-relaxed opacity-80 whitespace-pre-wrap">
                            {article.content}
                        </div>

                        {/* Author Card */}
                        <div className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center gap-8 group">
                            <div className="relative size-20 flex-shrink-0">
                                <Image src={article.author?.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop'} alt="Author" fill className="object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-accent mb-1">Published By</p>
                                <h3 className="text-2xl font-black text-primary">{article.author?.name || 'YCA Editorial'}</h3>
                                <p className="font-medium opacity-60">Verified Official Representative</p>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-12">
                        <div className="p-10 rounded-[3.5rem] bg-primary text-white space-y-8 sticky top-32">
                            <h3 className="text-2xl font-black">Join the Discussion</h3>
                            <div className="space-y-6">
                                {comments.map((comment, i) => (
                                    <div key={i} className="space-y-2 pb-6 border-b border-white/10 last:border-0">
                                        <div className="flex justify-between items-center">
                                            <span className="font-black text-sm">{comment.user?.name || 'Community Member'}</span>
                                            <span className="text-[10px] opacity-60">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm opacity-80 leading-relaxed">{comment.content}</p>
                                    </div>
                                ))}
                                {comments.length === 0 && (
                                    <p className="text-sm opacity-60 italic py-4">No comments yet. Be the first to start the conversation!</p>
                                )}
                            </div>
                            <form onSubmit={handleComment} className="pt-6">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Share your thoughts..."
                                    className="w-full p-6 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none transition-all resize-none mb-4"
                                    rows={4}
                                />
                                <button className="w-full py-4 bg-accent text-white font-black rounded-xl hover:bg-white hover:text-accent transition-all shadow-xl">Post Comment</button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
