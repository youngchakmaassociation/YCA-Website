import { supabase } from './supabase';


// Helper to handle Supabase responses
const handleSupabaseResponse = (data, error) => {
    // If Supabase is not configured yet, return failure to trigger local fallbacks
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') {
        return { success: false, error: 'Supabase not configured' };
    }

    if (error) {
        if (error.code === 'PGRST205') {
            console.warn('Supabase Table Missing: The requested table does not exist in your database. Using local fallback data instead.');
        } else if (error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
            console.warn('Supabase Connection Issue: Failed to connect to database. Using local fallback data instead.');
        } else {
            console.error('Supabase error:', JSON.stringify(error, null, 2));
        }
        return { success: false, error: error.message || 'Unknown Supabase error' };
    }

    // Map 'id' to '_id' for compatibility with existing frontend components
    if (data) {
        const mapId = (obj) => {
            if (obj && typeof obj === 'object') {
                if (obj.id) obj._id = obj.id;
                if (obj.start_date) obj.startDate = obj.start_date;
                if (obj.end_date) obj.endDate = obj.end_date;
                if (obj.total_votes) obj.totalVotes = obj.total_votes;
                if (obj.published_at) obj.publishedAt = obj.published_at;

                // Recursively map nested objects/arrays if needed
                Object.values(obj).forEach(val => {
                    if (Array.isArray(val)) val.forEach(mapId);
                    else if (typeof val === 'object') mapId(val);
                });
            }
        };

        if (Array.isArray(data)) {
            data.forEach(mapId);
        } else {
            mapId(data);
        }
    }

    return { success: true, data };
};

export const newsAPI = {
    getAll: async (params = '') => {
        const { data, error } = await supabase
            .from('news')
            .select('*, author:profiles(name)')
            .eq('is_published', true)
            .order('created_at', { ascending: false });
        return handleSupabaseResponse(data, error);
    },
    getOne: async (id) => {
        // Basic UUID format check to avoid "invalid input syntax" errors in Supabase
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            return { success: false, error: 'Invalid UUID format' };
        }

        const { data, error } = await supabase
            .from('news')
            .select('*, author:profiles(name)')
            .eq('id', id)
            .single();
        return handleSupabaseResponse(data, error);
    },
    getComments: async (id) => {
        const { data, error } = await supabase
            .from('comments')
            .select('*, profiles(name)')
            .eq('news_id', id);
        return handleSupabaseResponse(data, error);
    },
};

export const zonesAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('zones')
            .select('*')
            .eq('is_active', true);
        return handleSupabaseResponse(data, error);
    },
    getOne: async (slugOrId) => {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);

        const column = isUUID ? 'id' : 'slug';
        const { data, error } = await supabase
            .from('zones')
            .select('*, branches(*)')
            .eq(column, slugOrId)
            .single();
        return handleSupabaseResponse(data, error);
    },
};

export const branchesAPI = {
    getAll: async (zoneId = null) => {
        let query = supabase.from('branches').select('*, zones(name, slug)');
        if (zoneId) query = query.eq('zone_id', zoneId);
        const { data, error } = await query;
        return handleSupabaseResponse(data, error);
    },
    getOne: async (slugOrId) => {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);

        if (isUUID) {
            const { data, error } = await supabase
                .from('branches')
                .select('*, zones(name, slug)')
                .eq('id', slugOrId)
                .single();
            return handleSupabaseResponse(data, error);
        } else {
            // 1. Try exact slug match
            let { data, error } = await supabase
                .from('branches')
                .select('*, zones(name, slug)')
                .eq('slug', slugOrId)
                .maybeSingle();

            // 2. If no slug, try name match (case-insensitive) as a smart fallback
            if (!data && !error) {
                const { data: nameData, error: nameError } = await supabase
                    .from('branches')
                    .select('*, zones(name, slug)')
                    .ilike('name', `%${slugOrId}%`)
                    .limit(1)
                    .maybeSingle();
                data = nameData;
                error = nameError;
            }

            return handleSupabaseResponse(data, error);
        }
    },
};

export const committeeAPI = {
    getAll: async (level = null, zoneId = null, branchId = null) => {
        let query = supabase
            .from('committee_members')
            .select('*, zones(name, slug), branches(name, slug, zones(name))')
            .order('display_order', { ascending: true });

        if (level) query = query.eq('level', level);
        if (zoneId) query = query.eq('zone_id', zoneId);
        if (branchId) query = query.eq('branch_id', branchId);

        const { data, error } = await query;
        return handleSupabaseResponse(data, error);
    },
    getByName: async (name) => {
        const { data, error } = await supabase
            .from('committee_members')
            .select('*, zones(name, slug), branches(name, slug, zones(name))')
            .ilike('name', name);
        return handleSupabaseResponse(data, error);
    }
};

// ID Card Generation Helper
export const generateIDNumber = (member) => {
    const prefix = 'YCA';

    // 1. Get Zone/Branch Abbreviations
    const getAbbr = (name) => {
        if (!name) return '???';
        return name.split(' ')[0].substring(0, 3).toUpperCase();
    };

    let zoneAbbr = 'CEC'; // Default for Central
    let branchAbbr = '';

    if (member.level === 'zonal' || member.level === 'branch') {
        const zoneName = member.zones?.name || member.branches?.zones?.name || 'GEN';
        zoneAbbr = getAbbr(zoneName);
    }

    if (member.level === 'branch') {
        branchAbbr = `-${getAbbr(member.branches?.name)}`;
    }

    // 2. Rank Numbering (Based on YCA Hierarchy)
    const rankMap = {
        'president': '001',
        'vice-president': '002',
        'general secretary': '003',
        'joint secretary': '004',
        'office secretary': '005',
        'finance secretary': '006',
        'treasurer': '007',
        'information secretary': '008',
        'cultural secretary': '009',
        'sports secretary': '010'
    };

    const desig = (member.designation || '').toLowerCase();
    const rank = rankMap[desig] || (100 + (member.display_order || 0)).toString().padStart(3, '0');

    return `${prefix}-${zoneAbbr}${branchAbbr}-${rank}`;
};

export const bylawsAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('bylaws')
            .select('*, sections:bylaw_sections(*)')
            .order('article_number', { ascending: true });

        // Custom handling to ensure sections are ordered
        if (data) {
            data.forEach(art => {
                art.sections?.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
            });
        }
        return handleSupabaseResponse(data, error);
    },
};

export const electionsAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('elections')
            .select('*')
            .order('start_date', { ascending: false });
        return handleSupabaseResponse(data, error);
    },
    getOne: async (id) => {
        const { data, error } = await supabase
            .from('elections')
            .select('*, candidates(*)')
            .eq('id', id)
            .single();
        return handleSupabaseResponse(data, error);
    },
    nominate: async (electionId, data) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase
            .from('candidates')
            .insert([{ ...data, election_id: electionId, user_id: user.id }]);
        return handleSupabaseResponse(null, error);
    },
};

export const votesAPI = {
    cast: async (data) => {
        const { error } = await supabase.from('votes').insert([data]);
        return handleSupabaseResponse(null, error);
    },
    getMyVotes: async (electionId) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('votes')
            .select('*')
            .eq('election_id', electionId)
            .eq('user_id', user.id);
        return handleSupabaseResponse(data, error);
    },
};

export const profilesAPI = {
    getAll: async (branchId = null, zoneId = null) => {
        let query = supabase.from('profiles').select('*');
        if (branchId) query = query.eq('branch_id', branchId);
        if (zoneId) query = query.eq('zone_id', zoneId);
        const { data, error } = await query;
        return handleSupabaseResponse(data, error);
    }
};

export const membershipAPI = {
    apply: async (data) => {
        const { data: { user } = {} } = await supabase.auth.getUser(); // Destructure with default empty object
        if (!user) {
            return { success: false, error: 'User not authenticated' };
        }
        const { error } = await supabase
            .from('profiles')
            .update(data)
            .eq('id', user.id);
        return handleSupabaseResponse(null, error);
    },
    getMyStatus: async () => {
        const { data: { user } = {} } = await supabase.auth.getUser(); // Destructure with default empty object
        if (!user) {
            return { success: false, error: 'User not authenticated' };
        }
        const { data, error } = await supabase
            .from('profiles')
            .select('is_active, membership_type, membership_expiry')
            .eq('id', user.id)
            .single();
        return handleSupabaseResponse(data, error);
    },
};

export const authAPI = {
    login: async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { success: false, error: error.message };
        return { success: true, user: data.user, session: data.session };
    },
    register: async ({ email, password, name }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } }
        });
        if (error) return { success: false, error: error.message };
        return { success: true, user: data.user };
    },
    requestWhatsAppOtp: async (phone) => {
        // Ensure phone is in E.164 format (e.g. +91XXXXXXXXXX)
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
        const { error } = await supabase.auth.signInWithOtp({
            phone: formattedPhone,
            options: {
                channel: 'whatsapp', // This tells Supabase to attempt WhatsApp delivery
            }
        });
        if (error) return { success: false, error: error.message };
        return { success: true };
    },
    verifyWhatsAppOtp: async (phone, token) => {
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
        const { data, error } = await supabase.auth.verifyOtp({
            phone: formattedPhone,
            token,
            type: 'sms', // Supabase treats phone OTPs as 'sms' type in verification
        });
        if (error) return { success: false, error: error.message };
        return { success: true, user: data.user, session: data.session };
    },
    getMe: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        return { success: !!user, data: user };
    },
    logout: async () => {
        await supabase.auth.signOut();
    }
};

// Placeholder for legacy support or complex logic
// All active features now use Supabase directly.
