const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixZones() {
    console.log("Fixing Zone Naming and Mappings...");

    // Get current zones
    const { data: zones } = await supabase.from('zones').select('*');
    console.log("Current Zones in DB:", zones.map(z => `${z.name} (${z.slug})`));

    // 1. Rename the current 'Damdep Zone' (which was Nunsury) back to 'Nunsury Zone'
    const damdepZone = zones.find(z => z.slug === 'damdep');
    if (damdepZone) {
        console.log(`Renaming ${damdepZone.name} to Nunsury Zone`);
        await supabase.from('zones').update({ name: 'Nunsury Zone', slug: 'nunsury' }).eq('id', damdepZone.id);
    }

    // 2. Rename 'New Jagnasury Zone' to 'New Jagnasury Zone (Damdep Zone)'
    const njZone = zones.find(z => z.slug === 'new-jagnasury');
    if (njZone) {
        console.log(`Renaming ${njZone.name} to New Jagnasury Zone (Damdep Zone)`);
        await supabase.from('zones').update({ name: 'New Jagnasury Zone (Damdep Zone)', slug: 'damdep' }).eq('id', njZone.id);
    }

    // Verify
    const { data: finalZones } = await supabase.from('zones').select('name, slug');
    console.log("Final Zones:", finalZones.map(z => `${z.name} (${z.slug})`));

    // Also ensures branches are linked.
    // The branches already had zone_id pointing to these IDs, so the links persist.
}

fixZones();
