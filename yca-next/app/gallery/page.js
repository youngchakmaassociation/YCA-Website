'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GalleryPage() {
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Cultural Festivals', 'Youth Programs', 'Annual Meetings', 'Community Service'];

    const photos = [
        { title: 'Bizu Festival 2023', category: 'Cultural Festivals', count: 42, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtN6U9DMUtpWYT-3cWap6azuEygstEbUxFW9OX7--8x2YjKIstSOOU45gtpjFO8FIdPQhfKuYZVoUpCMaGvQ5aH6kV4CkUs_6ktQQ2BR2hQLdMbXVGBcSYsJbV2_oNpXmwCT4CDTb4UjcooxbZjEwZ97fP_Fj-5o1iptMRwhdfPjyFQdvVN4gHUfysb0HHSXL9eHF20b1SbyAcpdmSGXN1aSWOe0twcaaM1q-0yqD640Mg6TNRcY2zqwdklqIUoTUfhAnr16rgcoOE' },
        { title: 'Annual Youth Summit 2022', category: 'Youth Programs', count: 28, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5kAT9ZXxhHqf88EgmvTcwtGGSqBH3uFHyVeLCnNAxQGqxcqhXtdUmOTuKgDwUtnXzCxcvyDgbFWbNMS5Zjb2stLTjNCW7FzXBNFr0oV-sm5Ek-I61r5NYRF6iDuNWSksCa0bVgrGzJEXZtuDstsCJPQrB0CZXnDZv4q2c5W3o-kpjO4XFeIdrrAd_e96H7lpVdOBfbZU9h6yy7aVB6R_29afMa2e5X9nRZDO34yRDx6UxIQCYuB5mbAnbm-4pFBK5OXzomd7TShGi' },
        { title: 'Community Tree Planting', category: 'Community Service', count: 15, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT2KuK6oj_3nYDdiGAuDkuWJKj1bN1Mso3KL2cBqh8u6yWzZvlLhOJNxt4SCtZlfvuqbP7lqbfoLIHAQt9QxbWCkdubE5cq_UgO_OzyBIHb9mVIquMJVYC65EV8JWVivAadBrc5O0dtHo6g_43lEVkuIYtHnuFX5pFDiLEc7r5npDAXe0sQ0zVTYMvOzB6MklZxK1HmuephrVu-EoEOjDUXtcIDAn2ksV_zMRxdKPTiuJIrljb3YcSeb5nHqH5tXrZKDO_0Zr83NCu' },
        { title: 'Leadership Workshop', category: 'Youth Programs', count: 21, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAsviJlQc8k7Rlk7Bn1Nqsvi8cP3hcaPNeYMTEOZ_kzptHYxnfJDPQefZGXwILaGNc8x77CYyiKRDMHs8ay8LiukCwJ3sdnCORKvco-m8L_KtOO7WboqP6txPQjP_esZ_fZQHnyVlu-gInPsh0KOAtrPqVbh-mv9B8EkG32Wf_tvjZv36gfWecu2c5i_ogA8NI9pO6ddkdeVdWOZOLHnEE_fm4LmeYmsWcl0v6UXbKn4UNkdtsH6FPwrnQ7-HAGejAEN33TFHd8my_' },
        { title: 'General Meeting 2023', category: 'Annual Meetings', count: 35, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdUcypZkbkgv5a1nPYYlF2viw2EmDwpqSzg_0_DtnwjyEXBliSxgQqy5AJ0cxc8BYzGIiyJ4sN18LH5J-mR_yA00YBMS57lhmLeACXZpKd5tQZLbfT1L9f6pw9DVk-laZCycnqP72z5KOpFGSWjp_b06Okr47Zfvm6WlFuFaxKSJcffLqPnWpzRdMmJVD3pOJwkfeVUzW9ndS2L2ciPwEzJVLZSpxd-vtfwI7gThixmDK4W3yeR-bj-gG5sN9dxbKvXwc8eLVBjnTv' },
        { title: 'Cultural Dance Practice', category: 'Cultural Festivals', count: 18, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu4jiyObGpJtmPwGaEC1HG09Ia6q58-wvYbp4scVWpXOQj2T2UvrbRknPW3AlLoXuEPEN8dIA7pPdVCInJB3xtyogqRKLc7KAKXH6_Kbsix9g7wZmBXx12MSKKZiLEd7-EPfKQOQIcNCVGgNCBP7X8_XQZQp7nk8dP-OdX2fF0sh3PHMoImokiLWQdZz31ziVRau6mf5EykrfPiqmukGoemiF7Ogp-BiaQHY5nKvia3yBb9joy8og3ayIzVsPt4-GiyImSaqabHgRJ' },
        { title: 'Charity Drive', category: 'Community Service', count: 25, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIntLShoAjkZ6RRMxjJNdKnkI3vooaVMmPFpgxCXQA0HZsgg2soV5C0IWYoXbOJrfWOxhT9VXg-kIDLBm4jFiJPf0CmPZ9Z6d4QhnR0fwLad743V9FAbcid6CMp58CubyjS6iV8-AJBlWmbldfVLnFx0rUTiZUGDwtvhO7UQj8x5Xm7ABT7mPV8FytmDnsXOnytxCutNfawUC1mlA4zjo_4M7Oqpjyzl_tzE9uGoaMWYiPInjCJDNGsSxTsI20P81VZCtWKxoM3kBH' },
        { title: 'Traditional Music Night', category: 'Cultural Festivals', count: 31, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiS5NllYmm69ECdjUOz05VKamJWgNeT9xU2AiiQ1bLVCa7avWorssQcG0QLo9cqcSCcKs_sHvyk4oADCDiS_XYVXYLW4shX-bmwiGiPsZtYTw9bi2eZsP4ixUXP1XJtijdY5NtToa4xgCYv-t7IuwfwW2XbgsCtTwBZNb0Di3SAIm7ll6ZbpoUm0iBHKlXn9KO7EmpsMu4dTI7NbvU40dQhfiEmOA_lmcjXJaWU4ZaoCyZAyg7-F2s17mLdOMdYw2AChwRQFCbVGq2' },
    ];

    const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-16 animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight">
                    Capturing Our <br /> <span className="text-accent text-5xl md:text-7xl underline decoration-primary decoration-4 underline-offset-8">Journey</span>
                </h1>
                <p className="max-w-xl text-lg font-medium opacity-60 leading-relaxed">
                    Explore a visual history of our cultural heritage, community projects, and leadership initiatives.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-16">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filter === cat
                                ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105'
                                : 'bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:border-primary/50 hover:text-primary'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredPhotos.map((photo, i) => (
                    <div
                        key={i}
                        className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <Image
                            src={photo.img}
                            alt={photo.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-primary/90 transition-all duration-500"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="text-xs font-black uppercase tracking-widest text-accent mb-2">{photo.category}</span>
                            <h3 className="text-2xl font-black text-white leading-tight mb-4">{photo.title}</h3>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="material-symbols-outlined text-white text-sm">photo_library</span>
                                <span className="text-sm font-bold text-white/80">{photo.count} Photos</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-32 p-12 md:p-24 rounded-[4rem] bg-accent text-white text-center space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 size-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                <h3 className="text-4xl md:text-5xl font-black">Missing a piece of history?</h3>
                <p className="max-w-2xl mx-auto text-xl font-medium opacity-90 leading-relaxed">
                    If you have photos from past YCA events that you'd like to share with the community,
                    please submit them to our archive.
                </p>
                <button className="px-12 py-5 bg-white text-accent font-black rounded-2xl hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-2xl">
                    Upload Memories
                </button>
            </div>
        </div>
    );
}
