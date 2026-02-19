const { createClient } = require('@supabase/supabase-js');

// These will be provided by GitHub Secrets for security
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAwake() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('Error: Missing Supabase credentials in environment variables!');
        process.exit(1);
    }

    console.log('Sending heartbeat to Supabase...');
    // Using 'news' table which is confirmed in your schema
    const { data, error } = await supabase.from('news').select('id').limit(1);

    if (error) {
        console.error('Heartbeat failed:', error.message);
        // We only exit(1) if it's a connection error, not a "table not found" error
        if (error.message.includes('fetch')) process.exit(1);
        console.log('Note: Table check failed, but the request reached Supabase successfully.');
    } else {
        console.log('Heartbeat successful! Supabase is active.');
    }
}

keepAwake();
