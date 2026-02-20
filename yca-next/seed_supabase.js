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

    console.log('--- Database Reset Start ---');

    // 1. Clear Committee Members first (fk dependencies)
    await supabase.from('committee_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. Clear Branches
    await supabase.from('branches').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 3. Clear Zones
    await supabase.from('zones').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('--- Tables Cleared ---');

    // 4. Create Zones
    const zonesToCreate = [
        { name: 'Bageisury Zone', slug: 'bageisury', description: 'Bageisury region, officially known as Sakeilui.' },
        { name: 'Longpuighat Zone', slug: 'longpuighat', description: 'Strategic frontier and riverine gateway.' },
        { name: 'Borapansury Zone', slug: 'borapansury', description: 'Northern regional coordination hub.' }
    ];

    await supabase.from('zones').insert(zonesToCreate);
    console.log('Zones recreated.');

    // 5. Create Kamalanagar Branches under CYCA (zone_id = null)
    const branchesToCreate = [
        { name: 'Kamalanagar-I Branch', slug: 'kamalanagar-1', description: 'Directly under Central YCA (CYCA) administration.', zone_id: null },
        { name: 'Kamalanagar-II Branch', slug: 'kamalanagar-2', description: 'Directly under Central YCA (CYCA) administration.', zone_id: null },
        { name: 'Kamalanagar-III Branch', slug: 'kamalanagar-3', description: 'Directly under Central YCA (CYCA) administration.', zone_id: null },
        { name: 'Kamalanagar-IV Branch', slug: 'kamalanagar-4', description: 'Directly under Central YCA (CYCA) administration.', zone_id: null }
    ];

    const { error: bError } = await supabase.from('branches').insert(branchesToCreate);
    if (bError) console.error('Insert branches error:', bError.message);
    else console.log('Kamalanagar branches added under CYCA.');

    console.log('--- Database Synced Successfully ---');
    process.exit(0);
}

seedData();
