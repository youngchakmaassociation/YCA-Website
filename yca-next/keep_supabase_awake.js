const { createClient } = require('@supabase/supabase-js');

// These will be provided by GitHub Secrets for security
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAwake() {
    console.log('Sending heartbeat to Supabase...');
    const { data, error } = await supabase.from('elections').select('id').limit(1);

    if (error) {
        console.error('Heartbeat failed:', error.message);
        process.exit(1);
    } else {
        console.log('Heartbeat successful! Supabase is active.');
    }
}

keepAwake();
