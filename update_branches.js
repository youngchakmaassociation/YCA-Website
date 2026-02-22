const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, 'yca-next', '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

async function run() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const branchesToAdd = [
        { name: 'Kamalanagar-I Branch', slug: 'kamalanagar-1', zone_id: null },
        { name: 'Kamalanagar-II Branch', slug: 'kamalanagar-2', zone_id: null },
        { name: 'Kamalanagar-III Branch', slug: 'kamalanagar-3', zone_id: null },
        { name: 'Kamalanagar-IV Branch', slug: 'kamalanagar-4', zone_id: null },
        { name: 'Kamalanagar-V Branch', slug: 'kamalanagar-5', zone_id: null },
        { name: 'Kamalanagar-VI Branch', slug: 'kamalanagar-6', zone_id: null },
        { name: 'Bajeisora Branch', slug: 'bajeisora', zone_id: null },
        { name: 'Baganpara Branch', slug: 'baganpara', zone_id: null },
        { name: 'Old Bajeisora Branch', slug: 'old-bajeisora', zone_id: null },
        { name: 'Udaltana-I Branch', slug: 'udaltana-1', zone_id: null },
        { name: 'Udaltana-II Branch', slug: 'udaltana-2', zone_id: null },
        { name: 'Nalbanye Branch', slug: 'nalbanye', zone_id: null },
        { name: 'Rajmondal Branch', slug: 'rajmondal', zone_id: null },
        { name: 'Ugodosury North Branch', slug: 'ugodosury-north', zone_id: null },
        { name: 'Tanzamasora Branch', slug: 'tanzamasora', zone_id: null }
    ];

    for (const b of branchesToAdd) {
        let { data } = await supabase.from('branches').select('*').eq('name', b.name);
        if (!data || data.length === 0) {
            await supabase.from('branches').insert([b]);
            console.log('Inserted: ' + b.name);
        } else {
            console.log('Skipped (already exists): ' + b.name);
        }
    }

    // Update Sumsilui Branch location
    const { error } = await supabase.from('branches').update({ address: '22.591808, 92.641769' }).eq('slug', 'sumsilui');
    if (error) console.error(error);
    else console.log('Sumsilui updated with location');
}
run();
