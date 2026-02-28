const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("Seeding Members from Electoral Roll...");

    // 1. Get lookup data
    const { data: zones } = await supabase.from('zones').select('id, name, slug');
    const { data: branches } = await supabase.from('branches').select('id, name, slug, zone_id');

    const zoneMap = {};
    zones.forEach(z => zoneMap[z.name.toLowerCase().replace(' zone', '')] = z.id);
    zoneMap['kamalanagar'] = zoneMap['kamalanagar'] || zones.find(z => z.slug === 'kamalanagar')?.id;

    const branchMap = {};
    branches.forEach(b => branchMap[b.name.toLowerCase()] = b.id);

    // 2. Clear members to avoid messy duplicates in testing
    // await supabase.from('committee_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 3. Member Data Assembly
    const membersToInsert = [
        // Central (All 44)
        { name: "Dr. Jyoti Bikash Chakma", designation: "President", level: "central", display_order: 1 },
        { name: "Mandira Chakma", designation: "Sr. VP", level: "central", display_order: 2 },
        { name: "D. Paresh Chakma", designation: "V. President", level: "central", display_order: 3 },
        { name: "Sadhan Bikash Chakma", designation: "Gen. Secy.", level: "central", display_order: 4 },
        { name: "Shanti Bikash Chakma", designation: "Treasurer", level: "central", display_order: 5 },
        { name: "Sunamjit Chakma", designation: "Info. Secy.", level: "central", display_order: 6 },
        { name: "Sadhak Chakma", designation: "EM", level: "central", display_order: 7 },
        { name: "Krishna Bikash Tong", designation: "EM", level: "central", display_order: 8 },
        { name: "Pushporath Chakma", designation: "Cul. Secy.", level: "central", display_order: 9 },
        { name: "Tukru Joy Chakma", designation: "Fin. Secy.", level: "central", display_order: 10 },
        { name: "Karjan Chakma", designation: "EM", level: "central", display_order: 11 },
        { name: "Santosh Chakma", designation: "S W Secy.", level: "central", display_order: 12 },
        { name: "Sobina Chakma", designation: "EM", level: "central", display_order: 13 },
        { name: "Nabajyoti Chakma", designation: "EM", level: "central", display_order: 14 },

        // Kamalanagar Area Branches (Page 4-5)
        { name: "Sanjoy Chakma", designation: "President", level: "branch", branch: "Kamalanagar-I", display_order: 45 },
        { name: "Nishi Mohan", designation: "Vice President", level: "branch", branch: "Kamalanagar-I", display_order: 46 },
        { name: "Indra Kumar Chakma", designation: "President", level: "branch", branch: "Kamalanagar-II", display_order: 49 },
        { name: "D. Paresh Chakma", designation: "President", level: "branch", branch: "Kamalanagar-III", display_order: 53 },
        { name: "Bimal Bikash Chakma", designation: "President", level: "branch", branch: "Kamalanagar-IV", display_order: 57 },
        { name: "Binoy Jyoti Chakma", designation: "President", level: "branch", branch: "Kamalanagar-V", display_order: 61 },
        { name: "Sukralal Chakma", designation: "President", level: "branch", branch: "Kamalanagar-VI", display_order: 65 },

        // Longpuighat Zone (Page 10)
        { name: "D.P Sundarban Chakma", designation: "President", level: "zonal", zone: "longpuighat", display_order: 117 },
        { name: "Priyo Muni Tongchangya", designation: "President", level: "branch", branch: "Longpuighat-I", display_order: 131 },
        { name: "Doyal Chandra Chakma", designation: "President", level: "branch", branch: "Longpuighat-II", display_order: 135 },

        // Bageisury Zone (Page 16)
        { name: "Pulin Bikash Chakma", designation: "President", level: "zonal", zone: "bageisury", display_order: 251 },

        // Tipperaghat Zone (Page 36)
        { name: "Sunil Bikash Chakma", designation: "President", level: "zonal", zone: "tipperaghat", display_order: 648 },

        // Nunsury Zone (Page 41)
        { name: "Monzu Dewan Chakma", designation: "President", level: "zonal", zone: "nunsury", display_order: 718 },

        // Rajiv Nagar Zone (Page 45)
        { name: "Arun Moy Chakma", designation: "President", level: "zonal", zone: "rajiv-nagar", display_order: 800 },
    ];

    const finalMembers = membersToInsert.map(m => ({
        name: m.name,
        designation: m.designation,
        level: m.level,
        display_order: m.display_order,
        zone_id: m.zone ? zoneMap[m.zone] : (m.level === 'central' ? null : (m.branch ? branchMap[m.branch.toLowerCase()]?.zone_id : null)),
        branch_id: m.branch ? branchMap[m.branch.toLowerCase()] : null
    }));

    const { error: mError } = await supabase.from('committee_members').upsert(finalMembers, { onConflict: 'name, designation, level' });

    if (mError) {
        console.error("Error seeding members:", mError);
    } else {
        console.log(`Successfully seeded ${finalMembers.length} members from the Electoral Roll.`);
    }
}

seed();
