import { NextResponse } from 'next/server';
import { committeeAPI, branchesAPI, zonesAPI, bylawsAPI, newsAPI, electionsAPI } from '../../lib/api';

// List of free/efficient models to rotate through as fallbacks
const MODEL_PRIORITY_LIST = [
    "google/gemma-3-27b:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "qwen/qwen-2.5-72b-instruct:free",
    "mistralai/mistral-small-24b-instruct-2501:free",
    "google/gemma-2-9b-it:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "openrouter/auto" // Last resort: OpenRouter's auto-selector
];

async function tryFetchChat(messages, modelIndex = 0) {
    if (modelIndex >= MODEL_PRIORITY_LIST.length) {
        console.error("All models in the priority list failed.");
        throw new Error("All models failed to respond.");
    }

    const model = MODEL_PRIORITY_LIST[modelIndex];
    console.log(`[AI Attempt ${modelIndex + 1}] Model: ${model}`);

    if (!process.env.OPENROUTER_API_KEY) {
        console.error("CRITICAL: OPENROUTER_API_KEY is missing from environment variables.");
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": `http://localhost:3001`,
                "X-Title": "YCA AI Assistant",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [
                    {
                        "role": "system",
                        "content": `You are the YCA AI Assistant, a helpful guide for the Young Chakma Association (YCA). Your mission is 'Unity, Empowerment, Progress'. Answer questions about YCA bylaws, membership, events, branch/zone details, and current news. Be respectful, highly informative, and use simple, clear language.\n\nSPECIAL INSTRUCTION: If a user asks about the "whole body", "full body", or "executive body", they are asking for the full list of committee members. If they do not specify which body, list the CYCA Members (Central Committee). If they ask for a specific branch or zone's body, list all members of that specific area.\n\nHere is the COMPREHENSIVE CURRENT YCA KNOWLEDGE BASE to help you answer questions:\n\n${messages.contextData || 'Data unavailable.'}`
                    },
                    ...messages.originalMessages
                ],
                "route": "fallback"
            }),
            signal: AbortSignal.timeout(20000)
        });

        const data = await response.json();

        if (!response.ok) {
            console.warn(`[AI Error] Model ${model} returned ${response.status}:`, JSON.stringify(data));
            return tryFetchChat(messages, modelIndex + 1);
        }

        console.log(`[AI Success] Model ${model} responded successfully.`);
        return data;
    } catch (error) {
        console.error(`[AI Exception] Model ${model} threw error:`, error.message);
        if (error.name === 'TimeoutError') {
            console.warn(`[AI Timeout] Model ${model} timed out after 20 seconds.`);
        }
        return tryFetchChat(messages, modelIndex + 1);
    }
}

export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENROUTER_API_KEY) {
            console.error("CRITICAL: OPENROUTER_API_KEY is missing from environment variables.");
            return NextResponse.json({
                error: "AI Config missing: OPENROUTER_API_KEY is not defined. Please restart your dev server."
            }, { status: 500 });
        }

        // Fetch ALL organizational data to provide ultimate context to the AI
        let contextDataText = "";
        try {
            // Fetch everything in parallel to save time
            const [
                membersRes, bylawsRes, zonesRes, branchesRes, newsRes, electionsRes
            ] = await Promise.allSettled([
                committeeAPI.getAll(),
                bylawsAPI.getAll(),
                zonesAPI.getAll(),
                branchesAPI.getAll(),
                newsAPI.getAll(),
                electionsAPI.getAll()
            ]);

            // 1. ZONES & BRANCHES
            if (zonesRes.status === 'fulfilled' && zonesRes.value.success && branchesRes.status === 'fulfilled' && branchesRes.value.success) {
                contextDataText += `--- YCA ZONES & BRANCHES ---\n`;
                const zones = zonesRes.value.data || [];
                const branches = branchesRes.value.data || [];

                zones.forEach(z => {
                    contextDataText += `ZONE: ${z.name} (Slug: ${z.slug})\n`;
                    const zBranches = branches.filter(b => b.zone_id === z.id);
                    if (zBranches.length > 0) {
                        contextDataText += `  Branches in this Zone: ${zBranches.map(b => b.name).join(', ')}\n`;
                    }
                });
                contextDataText += `\n`;
            }

            // 2. COMMITTEE MEMBERS & EMERGENCY CONTACTS
            if (membersRes.status === 'fulfilled' && membersRes.value.success) {
                const members = membersRes.value.data || [];
                const grouped = { cyca: [], zonal: [], branch: [] };

                members.forEach(m => {
                    const group = grouped[m.level] || grouped.branch;
                    let locationInfo = "";
                    if (m.level === 'cyca') locationInfo = "CYCA HQ";
                    else if (m.level === 'zonal') locationInfo = `Zone: ${m.zones?.name || 'Unknown'}`;
                    else if (m.level === 'branch') locationInfo = `Branch: ${m.branches?.name || 'Unknown'}`;

                    let contactInfo = "";
                    if (m.phone || m.email) {
                        contactInfo = ` [Contact: ${m.phone || ''} ${m.email || ''}]`.trim();
                    }

                    group.push(`- ${m.name} (${m.designation}) | ${locationInfo} | Term: ${m.term_start_year || ''}-${m.term_end_year || 'Present'}${contactInfo}`);
                });

                // Emergency Contacts block
                contextDataText += `--- EMERGENCY & OFFICIAL CONTACTS ---\n`;
                contextDataText += `HQ Location: Kamalanagar (General Headquarters)\n`;
                contextDataText += `Official Email: contact@youngchakmaassociation.org (Fallback)\n`;
                contextDataText += `Key CYCA Leaders (Contact them for severe emergencies):\n`;
                const topLeaders = members.filter(m => m.level === 'cyca' || m.level === 'central');
                if (topLeaders.length > 0) {
                    topLeaders.forEach(m => {
                        let contact = (m.phone || m.email) ? `(Contact: ${m.phone || ''} ${m.email || ''})` : "(Contact HQ)";
                        contextDataText += `- ${m.name}, ${m.designation} ${contact}\n`;
                    });
                } else {
                    contextDataText += `- Dr. Jyoti Bikash Chakma, President (Contact HQ)\n`;
                    contextDataText += `- Sujoy Chakma, Vice-President (Contact HQ)\n`;
                    contextDataText += `- General Secretary (Contact HQ)\n`;
                }
                contextDataText += `\n`;

                contextDataText += `--- YCA COMMITTEE MEMBERS ---\nCYCA Members:\n${grouped.cyca.join('\n')}\nZonal Leaders:\n${grouped.zonal.join('\n')}\nBranch Leaders:\n${grouped.branch.join('\n')}\n\n`;
            }

            // 3. NEWS & EVENTS
            if (newsRes.status === 'fulfilled' && newsRes.value.success) {
                const news = newsRes.value.data || [];
                if (news.length > 0) {
                    contextDataText += `--- RECENT YCA NEWS & EVENTS ---\n`;
                    news.slice(0, 5).forEach(n => { // Only feed top 5 to save tokens
                        contextDataText += `Title: ${n.title}\nDate: ${new Date(n.created_at).toLocaleDateString()}\nSummary: ${n.content?.substring(0, 150)}...\n\n`;
                    });
                }
            }

            // 4. ELECTIONS
            if (electionsRes.status === 'fulfilled' && electionsRes.value.success) {
                const elections = electionsRes.value.data || [];
                if (elections.length > 0) {
                    contextDataText += `--- UPCOMING/ACTIVE ELECTIONS ---\n`;
                    elections.forEach(e => {
                        contextDataText += `${e.title} - Status: ${e.status} (Starts: ${new Date(e.start_date).toLocaleDateString()})\n`;
                    });
                    contextDataText += `\n`;
                }
            }

            // 5. BYLAWS (Put last as it is the longest text)
            if (bylawsRes.status === 'fulfilled' && bylawsRes.value.success) {
                const bylaws = bylawsRes.value.data || [];
                contextDataText += `--- YCA OFFICIAL BYLAWS ---\n`;
                bylaws.forEach(article => {
                    contextDataText += `\nArticle ${article.article_number}: ${article.title}\n`;
                    if (article.sections && article.sections.length > 0) {
                        article.sections.forEach(section => {
                            contextDataText += `  Sec ${section.section_number} (${section.label || ''}): ${section.content}\n`;
                        });
                    }
                });
            }

        } catch (e) {
            console.warn("Failed to fetch context info for AI", e);
        }

        const data = await tryFetchChat({ originalMessages: messages, contextData: contextDataText });
        return NextResponse.json(data);
    } catch (error) {
        console.error("Chat API Final Error:", error);
        return NextResponse.json({
            error: "The AI service is currently unavailable. Please try again in a moment."
        }, { status: 503 });
    }
}
