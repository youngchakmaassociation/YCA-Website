'use client';

import { useState, useRef, useEffect } from 'react';

export default function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            const data = await response.json();

            if (data.choices && data.choices[0]) {
                setMessages(prev => [...prev, data.choices[0].message]);
            } else {
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMessage = error.message || 'Sorry, I encountered an error. Please try again later.';
            setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatMessage = (content) => {
        // Simple regex-based formatter for bold, lists, and links
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br />')
            .replace(/^- (.*)/gm, '• $1');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 transition-all duration-300 transform animate-in slide-in-from-bottom-4">
                    {/* Header */}
                    <div className="bg-[#1a4d2e] p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">smart_toy</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">YCA Assistant</h3>
                                <p className="text-[10px] text-green-200">Online | AI Hybrid</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/10 p-1 rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center py-10 px-4">
                                <span className="material-symbols-outlined text-4xl text-[#1a4d2e] mb-2 opacity-20">forum</span>
                                <p className="text-gray-500 text-sm italic">Hello! I'm your YCA AI Assistant. I use multiple fallback models to ensure I'm always online. How can I help?</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                                    ? 'bg-[#1a4d2e] text-white rounded-tr-none shadow-md'
                                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                                    }`}>
                                    <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-[#1a4d2e] text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-[#143d24] transition-colors shadow-lg shadow-green-900/20"
                        >
                            <span className="material-symbols-outlined text-base">send</span>
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#1a4d2e] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
                {isOpen ? (
                    <span className="material-symbols-outlined text-2xl">close</span>
                ) : (
                    <div className="relative">
                        <span className="material-symbols-outlined text-3xl">smart_toy</span>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#1a4d2e] animate-pulse"></div>
                    </div>
                )}

                {/* Always-visible Label */}
                {!isOpen && (
                    <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#1a4d2e] text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap shadow-xl flex items-center gap-2 hover:bg-[#1a4d2e]/90 transition-colors">
                        Need help? Ask AI
                        {/* Little triangle pointing to the button */}
                        <span className="w-3 h-3 absolute -right-1 bg-[#1a4d2e] rotate-45 top-1/2 -translate-y-1/2 rounded-sm -z-10 text-transparent"></span>
                    </div>
                )}
            </button>
        </div>
    );
}
