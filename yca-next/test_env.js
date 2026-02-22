console.log('--- Environment Check ---');
console.log('OPENROUTER_API_KEY exists:', !!process.env.OPENROUTER_API_KEY);
if (process.env.OPENROUTER_API_KEY) {
    console.log('Key starts with:', process.env.OPENROUTER_API_KEY.substring(0, 10));
}
console.log('NEXT_PUBLIC_AI_MODEL:', process.env.NEXT_PUBLIC_AI_MODEL);
console.log('-------------------------');
