const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanup() {
    console.log("Cleaning up Zones database...");

    // 1. Find the zones to remove
    const { data: zones } = await supabase.from('zones').select('id, name, slug');

    const toRemove = zones.filter(z =>
        z.slug === 'kamalanagar' ||
        z.slug === 'damdep' ||
        z.slug === 'tiperagath'
    );

    for (const zone of toRemove) {
        console.log(`Processing removal of: ${zone.name} (${zone.slug})`);

        // Update branches to have NULL zone_id first to prevent CASCADE delete
        const { error: updateError } = await supabase
            .from('branches')
            .update({ zone_id: null })
            .eq('zone_id', zone.id);

        if (updateError) {
            console.error(`  Error decoupling branches from ${zone.name}:`, updateError.message);
        } else {
            console.log(`  Decoupled branches from ${zone.name}.`);

            // Now safe to delete the zone
            const { error: deleteError } = await supabase
                .from('zones')
                .delete()
                .eq('id', zone.id);

            if (deleteError) {
                console.error(`  Error deleting zone ${zone.name}:`, deleteError.message);
            } else {
                console.log(`  Deleted zone ${zone.name}.`);
            }
        }
    }

    // Double check count
    const { data: finalZones } = await supabase.from('zones').select('name');
    console.log('--- Final Zones List ---');
    finalZones.forEach((z, i) => console.log(`${i + 1}. ${z.name}`));
    console.log('Total Zones found:', finalZones.length);
}

cleanup();
