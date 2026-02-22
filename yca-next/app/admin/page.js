'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [activeTab, setActiveTab] = useState('announcements');
    const [notes, setNotes] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [tone, setTone] = useState('professional');

    useEffect(() => {
        // Check if user is logged in
        const savedUser = localStorage.getItem('user');
        if (!savedUser) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
            setIsLoadingAuth(false);
        }
    }, [router]);

    const generateAnnouncement = async () => {
        if (!notes.trim()) return;
        setIsGenerating(true);

        try {
            const prompt = `Convert these rough notes into a ${tone} announcement for the Young Chakma Association (YCA). 
      The announcement should be clear, inspiring, and formal. 
      Use proper headings and bullet points if necessary.
      
      Notes: ${notes}
      
      YCA Motto: Unity, Empowerment, Progress.`;

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: prompt }]
                }),
            });

            const data = await response.json();
            if (data.choices?.[0]?.message?.content) {
                setGeneratedContent(data.choices[0].message.content);
            }
        } catch (error) {
            console.error('Generation Error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (isLoadingAuth) {
        return (
            <div className="min-h-screen bg-[#1a4d2e] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1a4d2e] text-white hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold tracking-tight text-green-100 flex items-center gap-2">
                        <span className="material-symbols-outlined">admin_panel_settings</span>
                        YCA Admin
                    </h1>
                    <p className="text-xs text-green-300/60 mt-1 uppercase tracking-widest font-semibold">Management Console</p>
                </div>

                <nav className="flex-grow mt-6 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('announcements')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'announcements' ? 'bg-white/10 text-white' : 'text-green-100/60 hover:text-white hover:bg-white/5'}`}
                    >
                        <span className="material-symbols-outlined text-xl">campaign</span>
                        <span className="font-medium text-sm">Announcements</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'members' ? 'bg-white/10 text-white' : 'text-green-100/60 hover:text-white hover:bg-white/5'}`}
                    >
                        <span className="material-symbols-outlined text-xl">group</span>
                        <span className="font-medium text-sm">Members</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('bylaws')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bylaws' ? 'bg-white/10 text-white' : 'text-green-100/60 hover:text-white hover:bg-white/5'}`}
                    >
                        <span className="material-symbols-outlined text-xl">gavel</span>
                        <span className="font-medium text-sm">Bylaws Logic</span>
                    </button>
                </nav>

                <div className="p-6 mt-auto border-t border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-xs font-bold ring-2 ring-green-400/20">AD</div>
                        <div>
                            <p className="text-xs font-bold text-white">Super Admin</p>
                            <p className="text-[10px] text-green-300/40">YCA HQ</p>
                        </div>
                    </div>
                    <button className="w-full text-[10px] uppercase font-bold tracking-tighter py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Sign Out</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 md:p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900">Announcement Drafter</h2>
                        <p className="text-sm text-gray-500">Draft professional YCA notices with AI assistance</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-xs font-medium text-gray-400 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">cloud_done</span>
                            Autosave active
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Panel */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Rough Notes / Points</label>
                                <div className="flex gap-2">
                                    <select
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                        className="text-[10px] px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#1a4d2e]"
                                    >
                                        <option value="professional">Professional</option>
                                        <option value="inspirational">Inspirational</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="welcoming">Welcoming</option>
                                    </select>
                                </div>
                            </div>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Example: Notice for meeting on Friday, 10am at Kamalanagar Club. Topic: Annual Fundraiser plans. All branch reps must attend."
                                className="w-full h-48 bg-gray-50/50 rounded-2xl p-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/20 transition-all border border-gray-100 resize-none"
                            ></textarea>

                            <button
                                onClick={generateAnnouncement}
                                disabled={isGenerating || !notes.trim()}
                                className="mt-6 w-full bg-[#1a4d2e] text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#143d24] disabled:opacity-50 transition-all shadow-xl shadow-green-900/10 active:scale-95"
                            >
                                {isGenerating ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">magic_button</span>
                                        Generate with AI
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-green-50/50 border border-green-100 p-6 rounded-3xl">
                            <h4 className="text-xs font-black text-green-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">tips_and_updates</span>
                                AI Content Tips
                            </h4>
                            <ul className="text-xs text-green-700/80 space-y-2 leading-relaxed">
                                <li className="flex gap-2"><span>•</span> Include specific dates, times, and locations.</li>
                                <li className="flex gap-2"><span>•</span> Specify who should attend (Members, Reps, Public).</li>
                                <li className="flex gap-2"><span>•</span> Mention if there's an RSVP or contact person.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[600px] lg:h-auto overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Live Preview</h3>
                            {generatedContent && (
                                <button
                                    onClick={() => navigator.clipboard.writeText(generatedContent)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors group flex items-center gap-2"
                                >
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600">Copy to Clipboard</span>
                                    <span className="material-symbols-outlined text-gray-400 text-sm group-hover:text-gray-600">content_copy</span>
                                </button>
                            )}
                        </div>

                        <div className="flex-grow p-8 overflow-y-auto whitespace-pre-wrap font-sans text-gray-700 leading-relaxed bg-[#fffcf9]">
                            {!generatedContent && !isGenerating && (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                                    <span className="material-symbols-outlined text-6xl mb-4">description</span>
                                    <p className="font-bold">Your generated announcement will appear here.</p>
                                </div>
                            )}
                            {isGenerating && (
                                <div className="h-full flex flex-col items-center justify-center gap-4">
                                    <div className="w-12 h-12 border-4 border-gray-100 border-t-[#1a4d2e] rounded-full animate-spin"></div>
                                    <p className="text-xs font-bold text-gray-400 animate-pulse capitalize">AI is drafting your notice in {tone} tone...</p>
                                </div>
                            )}
                            {generatedContent && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    {generatedContent}
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-gray-50/30 border-t border-gray-50 flex gap-4">
                            <button className="flex-grow bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-2xl hover:bg-gray-100 transition-all text-sm">Save to Drafts</button>
                            <button disabled={!generatedContent} className="flex-grow bg-[#1a4d2e] text-white font-bold py-3 rounded-2xl hover:bg-[#143d24] transition-all disabled:opacity-20 shadow-lg shadow-green-900/10 text-sm">Post to News Feed</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
