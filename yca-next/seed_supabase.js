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
        {
            name: 'Bageisury Zone',
            slug: 'bageisury',
            description: 'Strategic coordination hub for the Bageisury region, officially known as Sakeilui.'
        },
        {
            name: 'Longpuighat Zone',
            slug: 'longpuighat',
            description: 'Strategic frontier and riverine gateway coordinating branches along the western borders.'
        },
        {
            name: 'Borapansury Zone',
            slug: 'borapansury',
            description: 'Consists of two constituencies (I & II) within the Chakma Autonomous District Council (CADC) in South-Western Mizoram.'
        },
        {
            name: 'Damdep Zone',
            slug: 'damdep',
            description: 'A village located in the southern part of the Chakma Autonomous District Council (CADC).'
        },
        {
            name: 'Tiperagath Zone',
            slug: 'tiperagath',
            description: 'Historically significant to the CADC, recognized as the site where Chakma leaders held the first meeting to demand autonomy in 1972.'
        },
        {
            name: 'Nunsury Zone',
            slug: 'nunsury',
            description: 'A village in the Lungsen block of Lunglei district, Mizoram, serving as a key regional link.'
        },
        {
            name: 'Tuichawng Zone',
            slug: 'tuichawng',
            description: 'Often referenced near Tlabung, this is a village and locality in the Lungsen Block of Lunglei district, Mizoram.'
        },
        {
            name: 'Marpara Zone',
            slug: 'marpara',
            description: 'A village in the Lunglei district of Mizoram, with Marpara South located in the Laisawral area of the district.'
        },
        {
            name: 'Rajiv Nagar Zone',
            slug: 'rajiv-nagar',
            description: 'Also known as Tuipuibari II, located in the Mamit District of Mizoram.'
        }
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
