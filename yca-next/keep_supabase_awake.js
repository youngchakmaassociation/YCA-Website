const { createClient } = require('@supabase/supabase-js');

// These will be provided by GitHub Secrets for security
async function keepAwake() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('❌ ERROR: Missing Supabase credentials!');
        console.error('Please add your Supabase URL and Key (Service Role or Anon) to your GitHub Repository Secrets.');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('📡 Sending heartbeat to Supabase...');

    // Using 'news' table which is confirmed in your schema
    const { data, error } = await supabase.from('news').select('id').limit(1);

    if (error) {
        console.error('❌ Heartbeat failed:', error.message);
        // We only exit(1) if it's a real connection error
        if (error.message.includes('fetch') || error.message.includes('API key')) {
            process.exit(1);
        }
        console.log('⚠️ Note: Request reached Supabase, but query failed. This still keeps the DB awake!');
    } else {
        console.log('✅ Heartbeat successful! Supabase is active.');
    }
}

keepAwake();
