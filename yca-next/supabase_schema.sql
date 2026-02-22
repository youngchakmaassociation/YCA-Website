-- SQL for creating Bylaws tables in Supabase

-- 1. Create the 'bylaws' table (Articles)
CREATE TABLE IF NOT EXISTS bylaws (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_number TEXT NOT NULL UNIQUE, -- e.g. '1', 'M', 'preamble'
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the 'bylaw_sections' table (Clauses)
CREATE TABLE IF NOT EXISTS bylaw_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bylaw_id UUID REFERENCES bylaws(id) ON DELETE CASCADE,
    section_number TEXT NOT NULL,
    label TEXT, -- e.g. 'Preamble', 'Name', etc.
    content TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    has_flag_video BOOLEAN DEFAULT FALSE,
    has_symbol BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS (Optional but recommended)
ALTER TABLE bylaws ENABLE ROW LEVEL SECURITY;
ALTER TABLE bylaw_sections ENABLE ROW LEVEL SECURITY;

-- 4. Create public read policy
CREATE POLICY "Allow public read access to bylaws" ON bylaws FOR SELECT USING (true);
CREATE POLICY "Allow public read access to bylaw_sections" ON bylaw_sections FOR SELECT USING (true);
