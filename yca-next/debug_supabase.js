const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugCommittee() {
    console.log('--- Checking Committee Members ---');
    const { data: members, error: mError } = await supabase.from('committee_members').select('*');
    if (mError) {
        console.error('Error fetching members:', mError);
    } else {
        console.table(members.map(m => ({
            name: m.name,
            designation: m.designation,
            level: m.level,
            zone_id: m.zone_id,
            branch_id: m.branch_id
        })));
    }

    console.log('\n--- Checking Branches ---');
    const { data: branches, error: bError } = await supabase.from('branches').select('id, name, slug');
    if (bError) console.error(bError);
    else console.table(branches);

    console.log('\n--- Checking Zones ---');
    const { data: zones, error: zError } = await supabase.from('zones').select('id, name, slug');
    if (zError) console.error(zError);
    else console.table(zones);
}

debugCommittee();
