const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
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
            name: 'Macmillan Chakma',
            designation: 'General Secretary',
            level: 'branch',
            branch_id: BRANCHES['Sumsilui Branch'],
            display_order: 2,
            photo_url: 'https://scontent.fajl1-1.fna.fbcdn.net/v/t39.30808-6/514175747_24164777296449256_6932244748562086651_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=53a332&_nc_ohc=MeBbvj8cx8UQ7kNvwEH8FKZ&_nc_ohc=MeBbvj8cx8UQ7kNvwEH8FKZ&_nc_oc=AdkvZi7ht8HqTf8W0FUeuDeWByIqU9egqLdLfzkKySwLgbyBT_X2qypKMp9kriWy-hU&_nc_zt=23&_nc_ht=scontent.fajl1-1.fna&_nc_gid=FL_IPG6N_ooK8nw0UG5HsQ&oh=00_AfsVG2NVe3wjaNIAsSujhZIZrpL-CewZb1Y0M6l2XzT8ew&oe=69A0EB87',
            phone: '+917003069633'
        },
        {
            name: 'Uttam Chakma',
            designation: 'Branch Assistant Secretary',
            level: 'branch',
            branch_id: BRANCHES['Sumsilui Branch'],
            display_order: 3
        },
        // MULTI-ROLE MEMBER
        {
            name: 'Shyamal Kanti Chakma',
            designation: 'General Secretary',
            level: 'zonal',
            zone_id: ZONES['Bageisury Zone'],
            display_order: 3,
            photo_url: 'https://scontent.fajl1-1.fna.fbcdn.net/v/t39.30808-6/624509331_3356146174543082_3361437895158922117_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Nb7A_2RgJUUQ7kNvwGUGbCa&_nc_oc=AdmvtsXMzZlbgAtyACC8p7aqoHFOg4lqdwu7HeladTcmu9n2wa4YIeUZK94tviZtE7E&_nc_zt=23&_nc_ht=scontent.fajl1-1.fna&_nc_gid=-aU1uABFNL4rrCX5uTxddw&oh=00_AfvvWBWL4cVs38egnN2zcL2PblXPlKAdg8BT1BM0y_FqJA&oe=69A0FC3A'
        },
        {
            name: 'Shyamal Kanti Chakma',
            designation: 'President',
            level: 'branch',
            branch_id: BRANCHES['Sumsilui Branch'],
            display_order: 1,
            photo_url: 'https://scontent.fajl1-1.fna.fbcdn.net/v/t39.30808-6/624509331_3356146174543082_3361437895158922117_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Nb7A_2RgJUUQ7kNvwGUGbCa&_nc_oc=AdmvtsXMzZlbgAtyACC8p7aqoHFOg4lqdwu7HeladTcmu9n2wa4YIeUZK94tviZtE7E&_nc_zt=23&_nc_ht=scontent.fajl1-1.fna&_nc_gid=-aU1uABFNL4rrCX5uTxddw&oh=00_AfvvWBWL4cVs38egnN2zcL2PblXPlKAdg8BT1BM0y_FqJA&oe=69A0FC3A'
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
