const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Central Committee Data
const centralMembers = [
    { sl_no: 1, name: "Dr. Jyoti Bikash Chakma", designation: "President", level: "central" },
    { sl_no: 2, name: "Mandira Chakma", designation: "Sr. VP", level: "central" },
    { sl_no: 3, name: "D. Paresh Chakma", designation: "V. President", level: "central" },
    { sl_no: 4, name: "Sadhan Bikash Chakma", designation: "Gen. Secy.", level: "central" },
    { sl_no: 5, name: "Shanti Bikash Chakma", designation: "Treasurer", level: "central" },
    { sl_no: 6, name: "Sunamjit Chakma", designation: "Info. Secy.", level: "central" },
    { sl_no: 7, name: "Sadhak Chakma", designation: "EM", level: "central" },
    { sl_no: 8, name: "Krishna Bikash Tong", designation: "EM", level: "central" },
    { sl_no: 9, name: "Pushporath Chakma", designation: "Cul. Secy.", level: "central" },
    { sl_no: 10, name: "Tukru Joy Chakma", designation: "Fin. Secy.", level: "central" },
    { sl_no: 11, name: "Karjan Chakma", designation: "EM", level: "central" },
    { sl_no: 12, name: "Santosh Chakma", designation: "S W Secy.", level: "central" },
    { sl_no: 13, name: "Sobina Chakma", designation: "EM", level: "central" },
    { sl_no: 14, name: "Nabajyoti Chakma", designation: "EM", level: "central" },
    { sl_no: 15, name: "Kalo Moy Chakma", designation: "Office Secy.", level: "central" },
    { sl_no: 16, name: "B. Tarun Bikash Chakma", designation: "EM", level: "central" },
    { sl_no: 17, name: "F. Darpan Chakma", designation: "EM", level: "central" },
    { sl_no: 18, name: "Hiniadon Chakma", designation: "EM", level: "central" },
    { sl_no: 19, name: "Rupam Chakma", designation: "G&S Secy.", level: "central" },
    { sl_no: 20, name: "Hujee Chakma", designation: "EM", level: "central" },
    { sl_no: 21, name: "Tribanko Chakma", designation: "EM", level: "central" },
    { sl_no: 22, name: "Alvert Chakma", designation: "EM", level: "central" },
    { sl_no: 23, name: "K. Chandra Chakma", designation: "EM", level: "central" },
    { sl_no: 24, name: "Satish Chakma", designation: "EM", level: "central" },
    { sl_no: 25, name: "Anupama Chakma", designation: "EM", level: "central" },
    { sl_no: 26, name: "Bindu Chakma", designation: "EM", level: "central" },
    { sl_no: 27, name: "Sangeeta Chakma", designation: "EM", level: "central" },
    { sl_no: 28, name: "Santosh Chakma", designation: "Rel. Secy.", level: "central" },
    { sl_no: 29, name: "Daya Raj Chakma", designation: "EM", level: "central" },
    { sl_no: 30, name: "L. Sumati Ranjan Chakma", designation: "EM", level: "central" },
    { sl_no: 31, name: "Nirmal Kumar Chakma", designation: "Org Secy.", level: "central" },
    { sl_no: 32, name: "Renu Chakma", designation: "EM", level: "central" },
    { sl_no: 33, name: "Monankur Chakma", designation: "EM", level: "central" },
    { sl_no: 34, name: "Doya Ram Chakma", designation: "EM", level: "central" },
    { sl_no: 35, name: "Indumoti Dewan", designation: "EM", level: "central" },
    { sl_no: 36, name: "Sanjoy Chakma", designation: "Jt. Secy.", level: "central" },
    { sl_no: 37, name: "Sumon Chakma", designation: "EM", level: "central" },
    { sl_no: 38, name: "Nihar Kanti Chakma", designation: "EM", level: "central" },
    { sl_no: 39, name: "Subir Chakma", designation: "EM", level: "central" },
    { sl_no: 40, name: "Shanti Moy Chakma", designation: "Office Secy.", level: "central" },
    { sl_no: 41, name: "Nelson Chakma", designation: "EM", level: "central" },
    { sl_no: 42, name: "Porantu Chakma", designation: "EM", level: "central" },
    { sl_no: 43, name: "Humayan Chakma", designation: "EM", level: "central" },
    { sl_no: 44, name: "Erika Chakma", designation: "EM", level: "central" },
];

async function seedMembers() {
    console.log("Seeding Members...");

    // 1. Clear existing members to avoid duplicates in this specific seed
    // await supabase.from('committee_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. Insert Central Members
    const { error } = await supabase.from('committee_members').upsert(
        centralMembers.map(m => ({
            name: m.name,
            designation: m.designation,
            level: 'central',
            display_order: m.sl_no
        }))
    );

    if (error) console.error("Error seeding central members:", error);
    else console.log("Seeded 44 Central Committee members.");

    // 3. Fetch branch mapping to link members to branches
    const { data: branches } = await supabase.from('branches').select('id, name, zone_id');
    const branchMap = {};
    branches.forEach(b => branchMap[b.name] = { id: b.id, zone_id: b.zone_id });

    // Branch Members Example (Kamalanagar-I)
    const branchMembers = [
        { sl_no: 45, name: "Sanjoy Chakma", designation: "President", branch: "Kamalanagar-I" },
        { sl_no: 46, name: "Nishi Mohan", designation: "Vice President", branch: "Kamalanagar-I" },
        { sl_no: 47, name: "L. Alok Bikash Chakma", designation: "Gen. Secy.", branch: "Kamalanagar-I" },
        { sl_no: 48, name: "Nipa Chakma", designation: "Treasurer", branch: "Kamalanagar-I" },
    ];

    const toInsert = branchMembers.map(m => ({
        name: m.name,
        designation: m.designation,
        level: 'branch',
        branch_id: branchMap[m.branch]?.id,
        zone_id: branchMap[m.branch]?.zone_id,
        display_order: m.sl_no
    }));

    if (toInsert.length > 0) {
        const { error: bError } = await supabase.from('committee_members').upsert(toInsert);
        if (bError) console.error("Error seeding branch members:", bError);
        else console.log(`Seeded ${toInsert.length} branch members.`);
    }

    console.log("Seeding complete!");
}

seedMembers();
