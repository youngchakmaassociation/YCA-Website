const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'yca-next/.env' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seedCommittee() {
    console.log('--- Seeding Committee Members ---');

    // IDs from database
    const ZONES = {
        'Bageisury Zone': '04663017-aa04-497f-848e-cffce3237324',
        'Longpuighat Zone': '0fd33c9e-2ad3-4a22-b224-0f10479c5a55'
    };

    const BRANCHES = {
        'Sumsilui Branch': '8a03bc4f-485f-4a60-bece-3948f31de762',
        'Longpuighat Branch': '7b2e8fda-efd8-4da0-90e0-f53b4138f497'
    };

    const members = [
        // 1. CENTRAL COMMITTEE (CYCA)
        {
            name: 'Dr. Jyoti Bikash Chakma',
            designation: 'President',
            level: 'central',
            display_order: 1
        },
        {
            name: 'Macmillan Chakma',
            designation: 'General Secretary',
            level: 'central',
            display_order: 3,
            phone: '+917003069633'
        },
        {
            name: 'Sujoy Chakma',
            designation: 'Vice-President',
            level: 'central',
            display_order: 2
        },

        // 2. ZONAL COMMITTEE (Bageisury Zone)
        {
            name: 'Sneha Kumar Chakma',
            designation: 'Zonal President',
            level: 'zonal',
            zone_id: ZONES['Bageisury Zone'],
            display_order: 1
        },
        {
            name: 'Kripasaran Chakma',
            designation: 'Zonal Secretary',
            level: 'zonal',
            zone_id: ZONES['Bageisury Zone'],
            display_order: 2
        },

        // 3. BRANCH COMMITTEE (Sumsilui Branch)
        {
            name: 'Priti Chakma',
            designation: 'Branch President',
            level: 'branch',
            branch_id: BRANCHES['Sumsilui Branch'],
            display_order: 1
        },
        {
            name: 'Uttam Chakma',
            designation: 'Branch Secretary',
            level: 'branch',
            branch_id: BRANCHES['Sumsilui Branch'],
            display_order: 2
        }
    ];

    // Clear existing to avoid duplicates if re-run
    await supabase.from('committee_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    for (const m of members) {
        const { error } = await supabase.from('committee_members').insert([m]);
        if (error) {
            console.error(`Error inserting ${m.name}:`, error.message);
        } else {
            console.log(`Success: Added ${m.name} to ${m.level} committee.`);
        }
    }

    console.log('--- Seeding Complete ---');
}

seedCommittee();
