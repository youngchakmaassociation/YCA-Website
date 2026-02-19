'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { membershipAPI, zonesAPI, branchesAPI } from '@/app/lib/api';

export default function MembershipPage() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [zones, setZones] = useState([]);
    const [branches, setBranches] = useState([]);

    // Form States
    const [formData, setFormData] = useState({
        personalDetails: { fullName: '', dateOfBirth: '', gender: 'male', phone: '', address: '' },
        education: { qualification: '', institution: '', yearOfPassing: '' },
        organization: { zone: '', branch: '', membershipType: 'student' }
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            fetchStatus();
        } else {
            setLoading(false);
        }
        fetchOrgData();
    }, []);

    const fetchOrgData = async () => {
        try {
            const [zRes, bRes] = await Promise.all([zonesAPI.getAll(), branchesAPI.getAll()]);

            if (zRes.success) {
                setZones(zRes.data || []);
            }
            if (bRes.success) {
                setBranches(bRes.data || []);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await membershipAPI.getMyStatus();
            if (response.success) setStatus(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await membershipAPI.apply(formData);
            if (response.success) {
                setStatus(response.data);
                alert('Application submitted successfully!');
            } else {
                alert(response.error || 'Failed to submit application');
            }
        } catch (error) {
            alert('Error submitting application');
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
            <div className="flex flex-col items-center gap-6 animate-pulse">
                <div className="size-24 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <div className="text-xl font-black text-primary uppercase tracking-[0.3em]">Loading Portal...</div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
            {/* Hero Section */}
            <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-primary/90 mix-blend-multiply z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20"></div>
                <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkUWAOZ0aNUlBDxUvvG94si63VX331XqxFnBNtKrk0Kx2xf1pIFFmAnzqmF8Htz5cxi80Z1R6EDjkGSGVdAP6hYXW2HB86ZGtIepPJ4lKnH4zL-JDotP4L19ChataB5ElydnQdRatUNqAphNLOn7r5HetRy1-v5L3Dxq8G-Sg7JwbcbQr3n8tNVK2-wNSNOJHj1-MjxOcb1M0MIERAEaRu3_RUXA3nlAGpq_dPm1M_ftiAxyDfVjMrf2iMAQU3eIMGoak0kq4u6cP7"
                    alt="Membership Background"
                    fill
                    className="object-cover animate-slow-scroll"
                />

                {/* Subtle Watermark Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] opacity-10 pointer-events-none z-20">
                    <Image src="/assets/ycalogo.png" alt="" fill className="object-contain" />
                </div>
                <div className="absolute inset-0 z-30 container mx-auto px-4 flex flex-col justify-center items-center text-center space-y-6">
                    <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] animate-fade-in">
                        Official Portal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter drop-shadow-2xl animate-fade-in-up">
                        Membership Application
                    </h1>
                    <p className="max-w-2xl text-lg md:text-xl text-white/80 font-medium leading-relaxed animate-fade-in-up delay-100">
                        Join the legacy. Become a verified member of the Young Chakma Association to access exclusive resources, voting rights, and leadership opportunities.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 -mt-32 relative z-40">
                {!user ? (
                    <div className="max-w-md mx-auto bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] p-10 shadow-2xl text-center space-y-8 animate-fade-in-up">
                        <div className="relative size-24 mx-auto mb-4">
                            <Image src="/assets/ycalogo.png" alt="Logo" fill className="object-contain logo-3d-pop" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-primary">Authentication Required</h3>
                            <p className="text-gray-500 font-medium">You must sign in seamlessly to proceed with your official membership application.</p>
                        </div>
                        <Link href="/login" className="flex items-center justify-center w-full h-16 bg-primary text-white text-lg font-black rounded-2xl hover:bg-accent hover:scale-105 transition-all shadow-xl shadow-primary/20">
                            Sign In to Apply
                        </Link>
                    </div>
                ) : status ? (
                    <div className="max-w-3xl mx-auto bg-white dark:bg-[#1a1a1a] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 animate-fade-in-up">
                        <div className={`p-12 text-center space-y-6 ${status.status === 'approved' ? 'bg-green-500/10' :
                            status.status === 'pending' ? 'bg-amber-500/10' : 'bg-red-500/10'
                            }`}>
                            <div className={`size-24 mx-auto rounded-full flex items-center justify-center text-4xl shadow-xl ${status.status === 'approved' ? 'bg-green-500 text-white' :
                                status.status === 'pending' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                                }`}>
                                <span className="material-symbols-outlined text-5xl">
                                    {status.status === 'approved' ? 'verified' :
                                        status.status === 'pending' ? 'hourglass_top' : 'block'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white capitalize">
                                    Application {status.status}
                                </h2>
                                <p className="opacity-60 font-medium mt-2">
                                    Applied on {new Date(status.appliedAt || Date.now()).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                </p>
                            </div>
                        </div>

                        <div className="p-12 space-y-8">
                            <div className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <span className="material-symbols-outlined text-primary mt-1">info</span>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white">Status Information</h4>
                                    <p className="text-sm opacity-70 leading-relaxed">
                                        {status.status === 'pending'
                                            ? "Your application has been received and is currently under review by the Central Executive Committee. Please allow 3-5 business days for processing."
                                            : status.status === 'approved'
                                                ? "Congratulations! You are now an official member. You can access your digital ID card in your user dashboard."
                                                : "Your application appears to have issues. Please contact your local branch secretary for more details."}
                                    </p>
                                </div>
                            </div>

                            {status.reviewNote && (
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-accent">Admin Note</label>
                                    <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 text-accent font-medium italic">
                                        "{status.reviewNote}"
                                    </div>
                                </div>
                            )}

                            <Link href="/dashboard" className="flex items-center justify-center w-full h-16 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-lg font-black rounded-2xl hover:opacity-90 transition-all">
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#1a1a1a] shadow-xl border border-gray-100 dark:border-white/5 space-y-6">
                                    <h3 className="text-2xl font-black text-primary">Why Join?</h3>
                                    <ul className="space-y-4">
                                        {[
                                            { t: 'Voting Rights', d: 'Participate in branch & central elections.' },
                                            { t: 'Digital ID Card', d: 'Official verified identity proof.' },
                                            { t: 'Community Access', d: 'Join exclusive events & meetings.' },
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4">
                                                <div className="size-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                                                    <div className="size-2 rounded-full bg-accent"></div>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white">{item.t}</h4>
                                                    <p className="text-xs opacity-60 font-medium">{item.d}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute -right-6 -top-6 size-32 bg-white/10 rounded-full blur-2xl"></div>
                                    <div className="relative z-10 space-y-4 text-center">
                                        <div className="size-16 mx-auto bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl">verified_user</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black">Secure Data</h3>
                                            <p className="text-sm opacity-80 mt-2 font-medium">Your information is encrypted and stored according to the YCA Data Protection Policy 2024.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-8">
                            <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a1a1a] rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-white/5 space-y-12">
                                {/* Section 1 */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
                                        <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl">person</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Personal Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-primary transition-colors">Full Legal Name</label>
                                            <input
                                                required
                                                value={formData.personalDetails.fullName}
                                                onChange={(e) => handleInputChange('personalDetails', 'fullName', e.target.value)}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-black/40 outline-none transition-all font-bold"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-primary transition-colors">Date of Birth</label>
                                            <input
                                                required
                                                type="date"
                                                value={formData.personalDetails.dateOfBirth}
                                                onChange={(e) => handleInputChange('personalDetails', 'dateOfBirth', e.target.value)}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-primary/50 outline-none transition-all font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-primary transition-colors">Gender</label>
                                            <select
                                                value={formData.personalDetails.gender}
                                                onChange={(e) => handleInputChange('personalDetails', 'gender', e.target.value)}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-primary/50 outline-none transition-all font-bold cursor-pointer"
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-primary transition-colors">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.personalDetails.phone}
                                                onChange={(e) => handleInputChange('personalDetails', 'phone', e.target.value)}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-primary/50 outline-none transition-all font-bold"
                                                placeholder="+91"
                                            />
                                        </div>
                                        <div className="col-span-full space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-primary transition-colors">Permanent Address</label>
                                            <textarea
                                                required
                                                rows={3}
                                                value={formData.personalDetails.address}
                                                onChange={(e) => handleInputChange('personalDetails', 'address', e.target.value)}
                                                className="w-full p-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-primary/50 outline-none transition-all font-bold resize-none"
                                                placeholder="Village, Post Office, District..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2 */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
                                        <div className="size-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl">school</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Educational Background</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-accent transition-colors">Highest Qualification</label>
                                            <input
                                                required
                                                value={formData.education.qualification}
                                                onChange={(e) => handleInputChange('education', 'qualification', e.target.value)}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-accent/50 outline-none transition-all font-bold"
                                                placeholder="e.g. Bachelor of Arts"
                                            />
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-accent transition-colors">Institution / University</label>
                                            <input
                                                required
                                                value={formData.education.institution}
                                                onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-accent/50 outline-none transition-all font-bold"
                                                placeholder="e.g. Mizoram University"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3 */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
                                        <div className="size-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl">flag</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Unit Allocation</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-green-500 transition-colors">Zonal Headquarters</label>
                                            <select
                                                required
                                                value={formData.organization.zone}
                                                onChange={(e) => handleInputChange('organization', 'zone', e.target.value)}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-green-500/50 outline-none transition-all font-bold cursor-pointer"
                                            >
                                                <option value="">Select Zone</option>
                                                {zones.map(z => (
                                                    <option key={z._id} value={z._id}>{z.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-green-500 transition-colors">Local Branch</label>
                                            <select
                                                required
                                                value={formData.organization.branch}
                                                onChange={(e) => handleInputChange('organization', 'branch', e.target.value)}
                                                className="w-full h-14 px-6 rounded-2xl bg-gray-50 dark:bg-black/20 border-2 border-transparent focus:border-green-500/50 outline-none transition-all font-bold cursor-pointer"
                                            >
                                                <option value="">Select Branch</option>
                                                {branches
                                                    .filter(b => !formData.organization.zone || b.zone_id === formData.organization.zone || (b.zone && b.zone.id === formData.organization.zone))
                                                    .map(b => (
                                                        <option key={b._id} value={b._id}>{b.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 space-y-4">
                                    <label className="flex items-start gap-4 cursor-pointer group">
                                        <input type="checkbox" required className="size-6 rounded-lg border-2 border-gray-300 dark:border-white/20 text-primary focus:ring-primary/50 mt-1 cursor-pointer" />
                                        <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                                            I hereby declare that the information provided above is true to the best of my knowledge.
                                            I agree to abide by the Constitution of the Young Chakma Association.
                                        </span>
                                    </label>

                                    <button
                                        disabled={submitting}
                                        type="submit"
                                        className="w-full h-20 bg-primary text-white text-xl font-black rounded-2xl hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <span className="material-symbols-outlined animate-spin">refresh</span>
                                        ) : (
                                            <>
                                                <span>Submit Application</span>
                                                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .animate-slow-scroll {
                    animation: scroll 40s linear infinite alternate;
                }
                @keyframes scroll {
                    from { transform: scale(1); }
                    to { transform: scale(1.15); }
                }
            `}</style>
        </div>
    );
}
