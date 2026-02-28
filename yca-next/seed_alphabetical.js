const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const zonesData = [
    {
        name: "Bageisury Zone",
        slug: "bageisury",
        branches: ["Adubangasora", "Bageisury-I", "Bageisury-II", "Bolsury", "Jamersury", "Jognasury", "Mondirasora", "Sedailui", "Sumsilui", "Tego Adam", "Tuikhurlui", "Ulusury"]
    },
    {
        name: "Borapansury Zone",
        slug: "borapansury",
        branches: ["Amtuli", "Barapansury-I East", "Barapansury-I West", "Barapansury-II", "Borunasury", "Chhotapansury", "Gerakuluksora", "Gulsingbapsora", "Jarulsury-I", "Jarulsury-II", "Kurvalovasora", "Kurvalovasora-West", "Nakdarasora", "Songrasury", "Silsury", "Tungasora", "Ugalsury", "Ugudasury South"]
    },
    {
        name: "Kamalanagar Zone",
        slug: "kamalanagar",
        branches: ["Arotinagar", "Baganpara", "Bajeisora", "Kamalanagar-I", "Kamalanagar-II", "Kamalanagar-III", "Kamalanagar-IV", "Kamalanagar-V", "Kamalanagar-VI", "Montola", "Mastorpara", "Nalbonya", "Palenosora", "Rajmondal", "Thanzamasora", "Udalthana-I", "Udalthana-II", "Ugudasury (N)"]
    },
    {
        name: "Longpuighat Zone",
        slug: "longpuighat",
        branches: ["Ajasora-I", "Ajasora-II", "Ajasora-III", "Barakhabakali-I", "Betbonya", "Bolisora", "Borkolok", "Bortuli", "Chamdur-P-II", "Chaminisora", "Damlui", "Devasora North", "Fangfarlui", "Fulsora", "Futsury", "Golasury", "Karlui-I", "Karlui-II", "Kukurduleya", "Lokhisury", "Longpuighat-I", "Longpuighat-II", "Ludisora", "Mainabapsora-I", "Mainabapsora-II", "Pandanglui", "Rengkashya", "Sekului", "Semeisury", "Vaseitlang-I"]
    },
    {
        name: "Marpara Zone",
        slug: "marpara",
        branches: ["Begabekya", "Erengsury", "Hnahva (Lokhisury)", "Hruiduk (Hujurukbui)", "Marpara N'", "Marpara South-I", "Marpara South-II", "Mauzam", "Salmor", "Silsury East", "Silsury West-I", "Silsury West-II", "Sumosumi", "Tarabonia"]
    },
    {
        name: "New Jagnasury Zone",
        slug: "new-jagnasury",
        branches: ["Bilosora", "Boraguisury", "Boroituli", "Chotoguisury-I", "Chotoguisury-II", "Devasora South", "Dursora", "Fultuli", "Gerasury", "Jaruldubosora", "Kamtuli", "Kangla Muni Adam", "Massury", "New Jagnasury-I", "New Jagnasury-III", "Parva-I", "Parva-IV", "Phabalakhali", "Samuksora", "Silbanga", "Silosora"]
    },
    {
        name: "Nunsury Zone",
        slug: "nunsury",
        branches: ["Bandiasora", "Bindasora", "Devasora", "Dursury", "Hmundo", "Kalapani", "Lokhisury", "Malsury", "Nakkuk Sora", "New Balukiasuri", "Nunsury-I", "Nunsury-Kamala Bagan", "Puankhai", "Puankahai Chota Basti", "Saisen", "Tablabagh", "Tlabung"]
    },
    {
        name: "Rajiv Nagar Zone",
        slug: "rajiv-nagar",
        branches: ["Andermanik", "Bagantuli", "Bazarline", "Belkai", "Borolui", "Kadamtuli", "Kantlang", "Mualthum", "Ponsury", "Ulusury"]
    },
    {
        name: "Tipperaghat Zone",
        slug: "tipperaghat",
        branches: ["Borunasury", "Bulongsury Branch", "Chandobighat Branch", "Chawilung", "Denosora", "Khojoysury Dowr", "Lettisury", "Maddyo Sora", "New Khojoysury", "Silkur", "Silkur Branch", "Teghaduor Branch", "Tipperaghat-I", "Zohmun (11 Kilo)"]
    },
    {
        name: "Tuichawng Zone",
        slug: "tuichawng",
        branches: ["Diblibagh", "Gobosury", "Kauchhua", "Mattrisora", "Nou Adam", "Pantlang", "Shipirtlang", "Sugarbasora", "Samuksury", "Tuichawng-I", "Tuichawng-II", "Ugudhasury", "Undermanik"]
    }
];

async function seed() {
    console.log("Seeding Zones and Branches in Alphabetical Order...");

    // Sort zones by name
    const sortedZones = [...zonesData].sort((a, b) => a.name.localeCompare(b.name));

    for (const zone of sortedZones) {
        const { data: zData, error: zError } = await supabase
            .from('zones')
            .upsert({
                name: zone.name,
                slug: zone.slug,
                description: `Official administrative zone covering multiple local branches.`
            }, { onConflict: 'slug' })
            .select();

        if (zError) {
            console.error(`Error zone ${zone.name}:`, zError);
            continue;
        }

        const zoneId = zData[0].id;
        console.log(`Zone: ${zone.name}`);

        // Sort branches alphabetically
        const sortedBranches = [...zone.branches].sort((a, b) => a.localeCompare(b));

        for (const branchName of sortedBranches) {
            const branchSlug = branchName.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[()']/g, '')
                .replace(/-+/g, '-');

            const { error: bError } = await supabase
                .from('branches')
                .upsert({
                    name: branchName,
                    slug: branchSlug,
                    zone_id: zoneId,
                    description: `Local branch unit under ${zone.name}.`
                }, { onConflict: 'slug' });

            if (bError) console.error(`  Error branch ${branchName}:`, bError);
        }
        console.log(`  Added ${sortedBranches.length} branches.`);
    }
    console.log("Complete!");
}

seed();
