const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUsers() {
    console.log('--- Checking Supabase Profiles ---');
    const { data, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Error fetching profiles:', error.message);
        return;
    }

    if (data.length === 0) {
        console.log('No users found in the profiles table yet.');
    } else {
        console.log(`Found ${data.length} user(s):`);
        data.forEach((user, index) => {
            console.log(`${index + 1}. Name: ${user.name} | Role: ${user.role} | Created: ${user.created_at}`);
        });
    }
}

checkUsers();
