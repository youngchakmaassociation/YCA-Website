const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Simplified mapping based on PDF structure
const zonesData = [
    { name: "Kamalanagar Zone", slug: "kamalanagar", branches: ["Kamalanagar-I", "Kamalanagar-II", "Kamalanagar-III", "Kamalanagar-IV", "Kamalanagar-V", "Kamalanagar-VI", "Baganpara", "Bajeisora", "Arotinagar", "Thanzamasora", "Nalbonya", "Udalthana-I", "Udalthana-II", "Palenosora", "Rajmondal", "Montola", "Ugudasury (N)", "Mastorpara"] },
    { name: "Longpuighat Zone", slug: "longpuighat", branches: ["Longpuighat-I", "Longpuighat-II", "Karlui-II", "Karlui-I", "Ajasora-I", "Ajasora-II", "Ajasora-III", "Borkolok", "Semeisury", "Pandanglui", "Damlui", "Golasury", "Betbonya", "Fangfarlui", "Bolisora", "Sekului", "Chamdur-P-II", "Chaminisora", "Vaseitlang-I", "Barakhabakali-I", "Mainabapsora-I", "Mainabapsora-II", "Kukurduleya", "Rengkashya", "Lokhisury", "Futsury", "Devasora North", "Bortuli", "Ludisora", "Fulsora"] },
    { name: "Bageisury Zone", slug: "bageisury", branches: ["Bageisury-I", "Bageisury-II", "Tego Adam", "Jamersury", "Ulusury", "Mondirasora", "Adubangasora", "Bolsury", "Jognasury", "Sumsilui", "Tuikhurlui", "Sedailui"] },
    { name: "New Jagnasury Zone", slug: "new-jagnasury", branches: ["New Jagnasury-I", "New Jagnasury-III", "Chotoguisury-I", "Chotoguisury-II", "Kangla Muni Adam", "Dursora", "Silbanga", "Jaruldubosora", "Gerasury", "Boroituli", "Fultuli", "Silosora", "Boraguisury", "Samuksora", "Bilosora", "Devasora South", "Massury", "Parva-I", "Parva-IV", "Kamtuli", "Phabalakhali"] },
    { name: "Borapansury Zone", slug: "borapansury", branches: ["Borunasury", "Kurvalovasora", "Kurvalovasora-West", "Borapansury-I East", "Barapansury-I West", "Barapansury-II", "Amtuli", "Ugalsury", "Silsury", "Tungasora", "Chhotapansury", "Songrasury", "Gulsingbapsora", "Nakdarasora", "Gerakuluksora", "Jarulsury-II", "Jarulsury-I", "Ugudasury South"] },
    { name: "Tuichawng Zone", slug: "tuichawng", branches: ["Tuichawng-I", "Tuichawng-II", "Nou Adam", "Mattrisora", "Diblibagh", "Sugarbasora", "Shipirtlang", "Gobosury", "Undermanik", "Kauchhua", "Samuksury", "Ugudhasury", "Pantlang"] },
    { name: "Marpara Zone", slug: "marpara", branches: ["Marpara South-I", "Marpara South-II", "Marpara N'", "Begabekya", "Hnahva (Lokhisury)", "Tarabonia", "Silsury West-I", "Silsury West-II", "Sumosumi", "Mauzam", "Silsury East", "Hruiduk (Hujurukbui)", "Erengsury", "Salmor"] },
    { name: "Tipperaghat Zone", slug: "tipperaghat", branches: ["Tipperaghat-I", "Denosora", "Maddyo Sora", "Bulongsury Branch", "Silkur", "Lettisury", "Zohmun (11 Kilo)", "Chawilung", "Khojoysury Dowr", "New Khojoysury", "Borunasury", "Silkur Branch", "Teghaduor Branch", "Chandobighat Branch"] },
    { name: "Nunsury Zone", slug: "nunsury", branches: ["Malsury", "Lokhisury", "Kalapani", "Saisen", "Dursury", "Nunsury-Kamala Bagan", "Tablabagh", "Bandiasora", "Hmundo", "Puankhai", "Puankahai Chota Basti", "Devasora", "Nakkuk Sora", "Bindasora", "New Balukiasuri", "Tlabung", "Nunsury-I"] },
    { name: "Rajiv Nagar Zone", slug: "rajiv-nagar", branches: ["Kadamtuli", "Bagantuli", "Andermanik", "Ponsury", "Bazarline", "Ulusury", "Borolui", "Belkai", "Kantlang", "Mualthum"] }
];

async function seedZonesAndBranches() {
    console.log("Seeding Zones and Branches...");

    for (const zone of zonesData) {
        // 1. Upsert Zone
        const { data: zData, error: zError } = await supabase
            .from('zones')
            .upsert({ name: zone.name, slug: zone.slug }, { onConflict: 'slug' })
            .select();

        if (zError) {
            console.error(`Error upserting zone ${zone.name}:`, zError);
            continue;
        }

        const zoneId = zData[0].id;
        console.log(`Zone ${zone.name} ready (ID: ${zoneId})`);

        // 2. Upsert Branches
        for (const branchName of zone.branches) {
            const branchSlug = branchName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
            const { error: bError } = await supabase
                .from('branches')
                .upsert({
                    name: branchName,
                    slug: branchSlug,
                    zone_id: zoneId
                }, { onConflict: 'slug' });

            if (bError) {
                console.error(`Error upserting branch ${branchName}:`, bError);
            }
        }
        console.log(`  Added ${zone.branches.length} branches to ${zone.name}`);
    }
    console.log("Seeding complete!");
}

seedZonesAndBranches();
