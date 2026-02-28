const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    // Fetch lookup maps
    const { data: zones } = await supabase.from('zones').select('id, name, slug');
    const { data: branches } = await supabase.from('branches').select('id, name, slug, zone_id');

    const zoneMap = {};
    zones.forEach(z => zoneMap[z.name.toLowerCase().replace(' zone', '')] = z.id);
    zoneMap['kamalanagar'] = zoneMap['kamalanagar'] || zones.find(z => z.slug === 'kamalanagar')?.id;

    const branchMap = {};
    branches.forEach(b => branchMap[b.name.toLowerCase()] = b.id);

    // Data to insert
    const members = [
        // Central (Example snippet)
        { name: "Dr. Jyoti Bikash Chakma", designation: "President", level: "central", display_order: 1 },
        { name: "Mandira Chakma", designation: "Sr. VP", level: "central", display_order: 2 },
        { name: "D. Paresh Chakma", designation: "V. President", level: "central", display_order: 3 },
        { name: "Sadhan Bikash Chakma", designation: "Gen. Secy.", level: "central", display_order: 4 },
        { name: "Shanti Bikash Chakma", designation: "Treasurer", level: "central", display_order: 5 },
        // ... more can be added here
    ];

    // Bulk upsert
    const { error } = await supabase.from('committee_members').upsert(members, { onConflict: 'name, designation, level' });
    if (error) console.error("Error:", error);
    else console.log("Seeded committee members.");
}

seed();
