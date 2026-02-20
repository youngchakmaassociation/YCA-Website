const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from yca-next/.env
const envPath = path.join(__dirname, 'yca-next', '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

async function seedData() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing credentials');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('--- Cleaning & Seeding Data ---');

    // Delete existing Chawngte if any
    await supabase.from('zones').delete().ilike('name', '%chawngte%');

    // 1. Create Zones
    const zonesToCreate = [
        { name: 'Bageisury Zone', slug: 'bageisury', description: 'Bageisury region, officially known as Sakeilui.' },
        { name: 'Longpuighat Zone', slug: 'longpuighat', description: 'Strategic frontier and riverine gateway.' },
        { name: 'Borapansury Zone', slug: 'borapansury', description: 'Northern regional coordination hub.' }
    ];

    for (const zone of zonesToCreate) {
        await supabase.from('zones').upsert(zone, { onConflict: 'name' });
    }

    // 2. Fetch created zones to get IDs
    const { data: allZones } = await supabase.from('zones').select('id, name');
    const zoneMap = {};
    allZones.forEach(z => zoneMap[z.name] = z.id);

    // 3. Create Branches
    // Branches falling directly under CYCA (zone_id = null)
    const directBranches = [
        { name: 'Kamalanagar-I Branch', slug: 'kamalanagar-1', description: 'Directly under CYCA administration.', zone_id: null },
        { name: 'Kamalanagar-II Branch', slug: 'kamalanagar-2', description: 'Directly under CYCA administration.', zone_id: null },
        { name: 'Kamalanagar-III Branch', slug: 'kamalanagar-3', description: 'Directly under CYCA administration.', zone_id: null },
        { name: 'Kamalanagar-IV Branch', slug: 'kamalanagar-4', description: 'Directly under CYCA administration.', zone_id: null }
    ];

    const regionalBranches = [
        { name: 'Sumsilui Branch', slug: 'sumsilui', zone_id: zoneMap['Bageisury Zone'] },
        { name: 'Longpuighat Branch', slug: 'longpuighat', zone_id: zoneMap['Longpuighat Zone'] }
    ];

    const allBranches = [...directBranches, ...regionalBranches];

    for (const branch of allBranches) {
        const { error } = await supabase
            .from('branches')
            .upsert(branch, { onConflict: 'name' });
        if (error) console.error(`Error: ${error.message}`);
    }

    console.log('--- Seeding Complete ---');
}

seedData();
