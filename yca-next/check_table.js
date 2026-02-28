const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data, error } = await supabase.from('electoral_roll').select('count', { count: 'exact', head: true });
    if (error) {
        console.log('Error or table not found:', error.message);
    } else {
        console.log('Table exists, count:', data);
    }
}

check();
