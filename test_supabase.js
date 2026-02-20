const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './yca-next/.env' });

async function testConnection() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('Testing connection to:', supabaseUrl);

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing credentials');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: zones, error: zError } = await supabase.from('zones').select('name');
    if (zError) console.error('Zones error:', zError);
    else console.log('Zones found:', zones);

    const { data: branches, error: bError } = await supabase.from('branches').select('name');
    if (bError) console.error('Branches error:', bError);
    else console.log('Branches found:', branches);
}

testConnection();
