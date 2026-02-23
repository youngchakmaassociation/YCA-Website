'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { electionsAPI, votesAPI, authAPI } from '@/app/lib/api';

export default function ElectionDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [election, setElection] = useState(null);
    const [user, setUser] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [votingInProgress, setVotingInProgress] = useState(false);
    const [error, setError] = useState(null);
    const [showNominate, setShowNominate] = useState(false);
    const [nominateForm, setNominateForm] = useState({ position: '', manifesto: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (!id) return;
            setLoading(true);
            try {
                // 1. Fetch Election Details
                const electionRes = await electionsAPI.getOne(id);
                if (electionRes.success) {
                    setElection(electionRes.data);
                } else {
                    setError('Election not found');
                }

                // 2. Fetch User & Vote Status
                const meRes = await authAPI.getMe();
                if (meRes.success && meRes.data) {
                    setUser(meRes.data);
                    const voteRes = await votesAPI.getMyVotes(id);
                    if (voteRes.success && voteRes.data?.length > 0) {
                        setHasVoted(true);
                    }
                }
            } catch (err) {
                console.error('Error initializing:', err);
                setError('Failed to load page');
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [id]);

    const handleVote = async (candidateId) => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (confirm('Are you sure you want to cast your vote for this candidate? This action cannot be undone.')) {
            setVotingInProgress(true);
            try {
                const res = await votesAPI.cast({
                    election_id: id,
                    candidate_id: candidateId,
                    user_id: user.id
                });

                if (res.success) {
                    setHasVoted(true);
                    alert('Your vote has been cast successfully! Thank you for participating.');
                } else {
                    alert(res.error || 'Failed to cast vote. Please try again.');
                }
            } catch (err) {
                alert('An error occurred. Please check your connection.');
            } finally {
                setVotingInProgress(false);
            }
        }
    };

    const handleNominateSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            router.push('/login');
            return;
        }
        if (!nominateForm.position.trim()) {
            alert('Please specify the position you are nominating for.');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await electionsAPI.nominate(id, {
                position: nominateForm.position,
                manifesto: nominateForm.manifesto
            });
            if (res.success) {
                alert('Nomination submitted successfully! It is now pending admin approval.');
                setShowNominate(false);
                setNominateForm({ position: '', manifesto: '' });
            } else {
                alert(res.error || 'Failed to submit nomination.');
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'TBA';
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !election) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-black text-primary mb-4">404</h1>
                <p className="text-xl opacity-60 mb-8">{error || 'Election not found'}</p>
                <Link href="/election" className="px-8 py-4 bg-primary text-white rounded-2xl font-black">
                    Back to Elections
                </Link>
            </div>
        );
    }

    const isUpcoming = election.status === 'upcoming';
    const isActive = election.status === 'active' || election.status === 'ongoing';
    const isCompleted = election.status === 'completed';

    return (
        <>
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="space-y-6 text-left">
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isActive ? 'bg-accent/10 text-accent border-accent/20' :
                                    isUpcoming ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                        'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                    }`}>
                                    {election.status}
                                </span>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{election.type || 'General Election'}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight uppercase">
                                {election.title}
                            </h1>
                            <p className="text-xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                                {election.description || 'No description available for this election.'}
                            </p>
                        </div>

                        {/* Election Details Card */}
                        <div className="p-8 md:p-12 rounded-[3rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2 text-left">
                                <span className="text-[10px] font-black uppercase text-primary opacity-40 tracking-widest">Start Time</span>
                                <div className="flex items-center gap-3 text-lg font-bold">
                                    <span className="material-symbols-outlined text-primary">event</span>
                                    {formatDate(election.start_date)}
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <span className="text-[10px] font-black uppercase text-primary opacity-40 tracking-widest">End Time</span>
                                <div className="flex items-center gap-3 text-lg font-bold">
                                    <span className="material-symbols-outlined text-accent">alarm</span>
                                    {formatDate(election.end_date)}
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <span className="text-[10px] font-black uppercase text-primary opacity-40 tracking-widest">Location</span>
                                <div className="flex items-center gap-3 text-lg font-bold">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                    {election.location || 'Central HQ'}
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <span className="text-[10px] font-black uppercase text-primary opacity-40 tracking-widest">Status</span>
                                <div className="flex items-center gap-3 text-lg font-bold">
                                    <span className={`size-3 rounded-full ${isActive ? 'bg-accent animate-pulse' : 'bg-gray-400'}`}></span>
                                    {isActive ? 'Voting in Progress' : 'Closed'}
                                </div>
                            </div>
                        </div>

                        {/* Candidates Section */}
                        <div className="space-y-8 pt-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-primary uppercase tracking-widest">Nominated Candidates</h2>
                                {hasVoted && (
                                    <span className="px-4 py-2 bg-green-500 text-white text-xs font-black rounded-full shadow-lg flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                        VOTE RECORDED
                                    </span>
                                )}
                            </div>

                            {election.candidates && election.candidates.filter(c => c.is_approved).length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {election.candidates.filter(c => c.is_approved).map((candidate, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl space-y-6 group hover:border-primary transition-all">
                                            <div className="flex justify-between items-start">
                                                <div className="text-left">
                                                    <h3 className="text-xl font-black text-primary">{candidate.position}</h3>
                                                    <p className="text-sm font-bold opacity-60">Candidate Profile</p>
                                                </div>
                                                <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                                    <span className="material-symbols-outlined text-3xl">person</span>
                                                </div>
                                            </div>
                                            <div className="p-5 bg-gray-50 dark:bg-black/20 rounded-2xl italic text-sm text-gray-500 border-l-4 border-primary/20 text-left leading-relaxed">
                                                "{candidate.manifesto || 'No manifesto provided.'}"
                                            </div>

                                            {isActive && !hasVoted && (
                                                <button
                                                    onClick={() => handleVote(candidate.id)}
                                                    disabled={votingInProgress}
                                                    className="w-full py-4 bg-primary text-white font-black rounded-2xl hover:bg-accent transition-all shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                                                >
                                                    {votingInProgress ? (
                                                        <span className="material-symbols-outlined animate-spin">refresh</span>
                                                    ) : (
                                                        <>
                                                            <span>Cast Vote</span>
                                                            <span className="material-symbols-outlined">how_to_vote</span>
                                                        </>
                                                    )}
                                                </button>
                                            )}

                                            {hasVoted && (
                                                <div className="w-full py-4 bg-gray-100 text-gray-400 font-black rounded-2xl flex items-center justify-center gap-3 cursor-not-allowed">
                                                    <span>Voting Completed</span>
                                                    <span className="material-symbols-outlined">check</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
                                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">person_off</span>
                                    <p className="text-gray-400 font-medium">No candidates nominated yet for this election.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="p-10 rounded-[3rem] bg-primary text-white space-y-6 sticky top-24 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 size-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-2xl font-black relative z-10 text-left">Your Status</h3>

                            <div className="space-y-6 relative z-10">
                                {!user ? (
                                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10 text-left">
                                        <p className="text-sm font-medium opacity-80 mb-4">You must be logged in to participate in the democratic process.</p>
                                        <Link href="/login" className="block w-full text-center py-4 bg-white text-primary font-black rounded-xl hover:bg-accent hover:text-white transition-all shadow-lg">
                                            Login to Vote
                                        </Link>
                                    </div>
                                ) : hasVoted ? (
                                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10 text-left">
                                        <div className="flex items-center gap-3 mb-4 text-accent font-black">
                                            <span className="material-symbols-outlined">verified</span>
                                            SUCCESS
                                        </div>
                                        <p className="text-sm font-medium opacity-80">You have successfully cast your vote for this election. Duplicate voting is restricted to ensure transparency.</p>
                                    </div>
                                ) : isActive ? (
                                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10 text-left">
                                        <p className="text-sm font-medium opacity-80 mb-2 underline decoration-accent decoration-2 underline-offset-4 font-bold">VOTING IS OPEN</p>
                                        <p className="text-xs opacity-60">Please review the candidates carefully before casting your final vote.</p>
                                    </div>
                                ) : (
                                    <div className="p-6 bg-white/10 rounded-2xl border border-white/10 text-left">
                                        <p className="text-sm font-medium opacity-80">The polling window is currently closed. Keep an eye on our News section for result announcements.</p>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-white/10">
                                    <h4 className="text-sm font-black uppercase tracking-widest mb-4 opacity-60 text-left">Election Integrity</h4>
                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center gap-3 text-xs opacity-80 font-medium">
                                            <span className="material-symbols-outlined text-sm text-accent">security</span>
                                            One Member, One Vote
                                        </div>
                                        <div className="flex items-center gap-3 text-xs opacity-80 font-medium">
                                            <span className="material-symbols-outlined text-sm text-accent">fingerprint</span>
                                            Encrypted Ballots
                                        </div>
                                        <div className="flex items-center gap-3 text-xs opacity-80 font-medium">
                                            <span className="material-symbols-outlined text-sm text-accent">visibility</span>
                                            Public Results Audit
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nomination Action */}
                    {user && (isUpcoming || isActive) && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setShowNominate(true)}
                                className="w-full py-4 border-2 border-primary text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all shadow-lg"
                            >
                                Submit Nomination
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Nomination Modal */}
            {
                showNominate && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
                            <button onClick={() => setShowNominate(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                            <h2 className="text-2xl font-black text-primary mb-6">File Nomination</h2>
                            <form onSubmit={handleNominateSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Position *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. President, Treasurer"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={nominateForm.position}
                                        onChange={(e) => setNominateForm({ ...nominateForm, position: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Manifesto / Vision</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Briefly describe your goals if elected..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-gray-800"
                                        value={nominateForm.manifesto}
                                        onChange={(e) => setNominateForm({ ...nominateForm, manifesto: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 mt-4 bg-primary text-white font-black rounded-xl hover:bg-accent transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit to Election Panel'}
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
}
