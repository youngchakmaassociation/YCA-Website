import { NextResponse } from 'next/server';

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
        throw new Error("All models failed to respond.");
    }

    const model = MODEL_PRIORITY_LIST[modelIndex];
    console.log(`Attempting AI request with model: ${model}`);

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": `${process.env.FRONTEND_URL || 'http://localhost:3000'}`,
                "X-Title": "YCA AI Assistant",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [
                    {
                        "role": "system",
                        "content": "You are the YCA AI Assistant, a helpful guide for the Young Chakma Association (YCA). Your mission is 'Unity, Empowerment, Progress'. Answer questions about YCA bylaws, membership, and events. Be respectful and use simple, clear language."
                    },
                    ...messages
                ],
                "route": "fallback" // Tell OpenRouter to use its own fallback if needed
            }),
            // Short timeout for fallback logic to kick in quickly
            signal: AbortSignal.timeout(15000)
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            console.warn(`Model ${model} failed:`, data.error || response.statusText);
            // Try the next model in the list
            return tryFetchChat(messages, modelIndex + 1);
        }

        return data;
    } catch (error) {
        console.error(`Error with model ${model}:`, error.message);
        // Recursive call to next model on network error or timeout
        return tryFetchChat(messages, modelIndex + 1);
    }
}

export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENROUTER_API_KEY) {
            return NextResponse.json({ error: "AI configuration missing" }, { status: 500 });
        }

        const data = await tryFetchChat(messages);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Chat API Final Error:", error);
        return NextResponse.json({
            error: "The AI service is currently unavailable. Please try again in a moment."
        }, { status: 503 });
    }
}
