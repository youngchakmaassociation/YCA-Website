const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');

// Try to load env from yca-next/.env
if (fs.existsSync('./yca-next/.env')) {
    const envConfig = dotenv.parse(fs.readFileSync('./yca-next/.env'));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

async function listAll() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing credentials');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('--- ZONES ---');
    const { data: zones } = await supabase.from('zones').select('id, name, slug');
    console.log(JSON.stringify(zones, null, 2));

    console.log('--- BRANCHES ---');
    const { data: branches } = await supabase.from('branches').select('id, name, slug, zone_id');
    console.log(JSON.stringify(branches, null, 2));
}

listAll();
