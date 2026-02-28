const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("Seeding Extracted Presidents and Secretaries from the PDF...");

    const { data: zones } = await supabase.from('zones').select('id, name, slug');
    const { data: branches } = await supabase.from('branches').select('id, name, slug, zone_id');

    const zoneMap = {};
    zones.forEach(z => zoneMap[z.slug] = z.id);

    const branchMap = {};
    branches.forEach(b => branchMap[b.name.toLowerCase()] = { id: b.id, zone_id: b.zone_id });

    const members = [
        // Longpuighat Zone Executive (Page 9)
        { name: "D.P Sundarban Chakma", designation: "President", level: "zonal", zone: "longpuighat", display_order: 117 },
        { name: "L. Sailo Chakma", designation: "Vice President", level: "zonal", zone: "longpuighat", display_order: 118 },
        { name: "Gupal Chakma", designation: "Vice President", level: "zonal", zone: "longpuighat", display_order: 119 },
        { name: "Rupen Kumar Chakma", designation: "Gen. Secy.", level: "zonal", zone: "longpuighat", display_order: 120 },
        { name: "Devaraj Tongvhangya", designation: "Treasurer", level: "zonal", zone: "longpuighat", display_order: 121 },

        // Longpuighat Branches (Page 10)
        { name: "Priyo Muni Tongchangya", designation: "President", level: "branch", branch: "Longpuighat-I", display_order: 131 },
        { name: "Rajesh Kumar Chakma", designation: "Vice President", level: "branch", branch: "Longpuighat-I", display_order: 132 },
        { name: "Doyal Chandra Chakma", designation: "President", level: "branch", branch: "Longpuighat-II", display_order: 135 },
        { name: "Mithun Chakma", designation: "Vice President", level: "branch", branch: "Longpuighat-II", display_order: 136 },
        { name: "Mongal Mohan Chakma", designation: "President", level: "branch", branch: "Karlui-II", display_order: 139 },
        { name: "Megha Baran Chakma", designation: "Vice President", level: "branch", branch: "Karlui-II", display_order: 140 },
        { name: "Kala Dhan Chakma", designation: "President", level: "branch", branch: "Karlui-I", display_order: 143 },

        // Bageisury Zone (Page 16)
        { name: "Pulin Bikash Chakma", designation: "President", level: "zonal", zone: "bageisury", display_order: 251 },
        { name: "A. Lentu Moy Chakma", designation: "Vice President", level: "zonal", zone: "bageisury", display_order: 252 },
        { name: "Sunil Bikash Chakma", designation: "Vice President", level: "zonal", zone: "bageisury", display_order: 253 },
        { name: "Shyamal Kanti Chakma", designation: "Gen. Secy.", level: "zonal", zone: "bageisury", display_order: 254 },

        // Bageisury Branches (Page 17)
        { name: "Suresh Kanti Chakma", designation: "President", level: "branch", branch: "Bageisury-I", display_order: 265 },
        { name: "Sudipta Chakma", designation: "President", level: "branch", branch: "Bageisury-II", display_order: 269 },
        { name: "Priyo Ranjan Chakma", designation: "President", level: "branch", branch: "Tego Adam", display_order: 273 },
        { name: "Nathun Bihari Chakma", designation: "President", level: "branch", branch: "Jamersury", display_order: 277 },

        // Marpara Zone (Page 32)
        { name: "Priya Lal Chakma", designation: "President", level: "zonal", zone: "marpara", display_order: 566 },
        { name: "Dhana Bikash Chakma", designation: "Vice President", level: "zonal", zone: "marpara", display_order: 567 },
        { name: "Subash Lalrinsanga", designation: "Vice President", level: "zonal", zone: "marpara", display_order: 568 },
        { name: "Dharma Mohan Chakma", designation: "Gen. Secy.", level: "zonal", zone: "marpara", display_order: 569 },

        // Rajiv Nagar Zone (Page 45)
        { name: "Arun Moy Chakma", designation: "President", level: "zonal", zone: "rajiv-nagar", display_order: 800 },
        { name: "Nilo Baran Chakma", designation: "Vice President", level: "zonal", zone: "rajiv-nagar", display_order: 801 },
        { name: "Chandra Kumar Chakma", designation: "Vice President", level: "zonal", zone: "rajiv-nagar", display_order: 802 },
        { name: "Monu Mohan Chakma", designation: "Gen. Secy.", level: "zonal", zone: "rajiv-nagar", display_order: 803 },

        // Donor Members (Page 49)
        { name: "Purna Muni Chakma", designation: "Donor Member", level: "central", display_order: 854 },
        { name: "Adi Kanta Tongchangya", designation: "Donor Member", level: "central", display_order: 855 },
        { name: "Biro Kumar Chakma", designation: "Donor Member", level: "central", display_order: 856 }
    ];

    const finalData = members.map(m => ({
        name: m.name,
        designation: m.designation,
        level: m.level,
        display_order: m.display_order,
        zone_id: m.zone ? zoneMap[m.zone] : (m.branch ? branchMap[m.branch.toLowerCase()]?.zone_id : null),
        branch_id: m.branch ? branchMap[m.branch.toLowerCase()]?.id : null
    }));

    const { error } = await supabase.from('committee_members').upsert(finalData, { onConflict: 'name, designation, level' });
    if (error) console.error(error);
    else console.log(`Seeded ${finalData.length} key leaders from PDF.`);
}

seed();
