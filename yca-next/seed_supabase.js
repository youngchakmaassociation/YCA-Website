const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

async function seedData() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing credentials');
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('--- Full Cleanup & Re-Seeding ---');

    // 1. Delete Chawngte Zone
    await supabase.from('zones').delete().ilike('name', '%chawngte%');

    // 2. Setup Zones
    const zonesToCreate = [
        { name: 'Bageisury Zone', slug: 'bageisury', description: 'Bageisury region, officially known as Sakeilui.' },
        { name: 'Longpuighat Zone', slug: 'longpuighat', description: 'Strategic frontier and riverine gateway.' },
        { name: 'Borapansury Zone', slug: 'borapansury', description: 'Northern regional coordination hub.' }
    ];

    for (const zone of zonesToCreate) {
        await supabase.from('zones').upsert(zone, { onConflict: 'slug' });
    }

    const { data: allZones } = await supabase.from('zones').select('id, name');
    const zoneMap = {};
    allZones.forEach(z => zoneMap[z.name] = z.id);

    // 3. Setup Branches
    const branchesToCreate = [
        { name: 'Kamalanagar-I Branch', slug: 'kamalanagar-1', description: 'Directly under CYCA administration.', zone_id: null },
        { name: 'Kamalanagar-II Branch', slug: 'kamalanagar-2', description: 'Directly under CYCA administration.', zone_id: null },
        { name: 'Kamalanagar-III Branch', slug: 'kamalanagar-3', description: 'Directly under CYCA administration.', zone_id: null },
        { name: 'Kamalanagar-IV Branch', slug: 'kamalanagar-4', description: 'Directly under CYCA administration.', zone_id: null },
        { name: 'Sumsilui Branch', slug: 'sumsilui', zone_id: zoneMap['Bageisury Zone'] },
        { name: 'Longpuighat Branch', slug: 'longpuighat', zone_id: zoneMap['Longpuighat Zone'] },
        { name: 'Borapansury-I Branch', slug: 'borapansury-1', zone_id: zoneMap['Borapansury Zone'] }
    ];

    for (const b of branchesToCreate) {
        const { error } = await supabase
            .from('branches')
            .upsert(b, { onConflict: 'slug' });
        if (error) console.error(`Error for ${b.name}: ${error.message}`);
        else console.log(`Branch ${b.name} ready.`);
    }

    console.log('--- Seeding Complete ---');
    process.exit(0);
}

seedData();
