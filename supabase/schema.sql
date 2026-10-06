-- ====================================================================
-- WANGARAWA GLOBAL TECHNOLOGY LIMITED (CAC RC No. 9161655)
-- Production Supabase PostgreSQL Schema & Row Level Security (RLS)
-- Location: No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse, Jigawa State
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL DEFAULT 'Wangarawa Global Technology Limited',
    rc_number TEXT NOT NULL DEFAULT 'CAC RC No. 9161655',
    tagline TEXT NOT NULL DEFAULT 'Empowering the next generation of innovators.',
    address TEXT NOT NULL DEFAULT 'No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse, Jigawa State, Nigeria.',
    email TEXT NOT NULL DEFAULT 'wangarawatech@gmail.com',
    phone_primary TEXT NOT NULL DEFAULT '08169323996',
    phone_secondary TEXT NOT NULL DEFAULT '08104508713',
    whatsapp_number TEXT NOT NULL DEFAULT '2348169323996',
    logo_url TEXT,
    cloudinary_cloud_name TEXT,
    cloudinary_upload_preset TEXT,
    google_maps_embed_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. HERO SLIDES TABLE
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    headline TEXT NOT NULL,
    subheadline TEXT NOT NULL,
    bg_image_url TEXT NOT NULL,
    bg_video_url TEXT,
    primary_cta_text TEXT NOT NULL DEFAULT 'Explore Our Work',
    primary_cta_link TEXT NOT NULL DEFAULT '#projects',
    secondary_cta_text TEXT NOT NULL DEFAULT 'Work With Us',
    secondary_cta_link TEXT NOT NULL DEFAULT '#contact',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    image TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    video_url TEXT,
    category TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    "order" INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PROGRAMS & TRAINING TABLE
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    video_url TEXT,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    location TEXT NOT NULL,
    target_audience TEXT NOT NULL,
    registration_link TEXT NOT NULL DEFAULT '#contact',
    status TEXT NOT NULL CHECK (status IN ('Open for Registration', 'In Progress', 'Upcoming', 'Completed')),
    gallery TEXT[] DEFAULT '{}',
    curriculum_highlights TEXT[] DEFAULT '{}',
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PROJECTS / OUR IMPACT TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    videos TEXT[] DEFAULT '{}',
    project_date TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('AI Education', 'Youth Empowerment', 'Digital Skills', 'Technology', 'Community Development', 'Innovation', 'Training')),
    beneficiaries_count INT NOT NULL DEFAULT 0,
    impact_metrics JSONB DEFAULT '[]'::jsonb,
    partners TEXT[] DEFAULT '{}',
    status TEXT NOT NULL CHECK (status IN ('Completed', 'In Progress', 'Upcoming')),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. NEWS & ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.news_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    featured_image TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Wangarawa Tech',
    date TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Announcement', 'Community Impact', 'Technology', 'Education', 'Partnerships')),
    images TEXT[] DEFAULT '{}',
    video_url TEXT,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    read_time_minutes INT NOT NULL DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    biography TEXT NOT NULL,
    profile_image TEXT NOT NULL,
    linkedin TEXT,
    email TEXT,
    twitter TEXT,
    display_order INT NOT NULL DEFAULT 1,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    organization TEXT NOT NULL,
    quote TEXT NOT NULL,
    avatar_url TEXT,
    program_or_project TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. PARTNERS TABLE
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    type TEXT NOT NULL,
    website_url TEXT,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. MEDIA METADATA TABLE (Cloudinary & Local references)
CREATE TABLE IF NOT EXISTS public.media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('image', 'video')),
    size_bytes BIGINT NOT NULL DEFAULT 0,
    provider TEXT NOT NULL CHECK (provider IN ('local', 'cloudinary', 'external')),
    public_id TEXT,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. CONTACT INBOX MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    service_of_interest TEXT,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Anonymous visitors can read published content)
CREATE POLICY "Public can view settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active slides" ON public.hero_slides FOR SELECT USING (active = true);
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Public can view published programs" ON public.programs FOR SELECT USING (published = true);
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Public can view published news" ON public.news_posts FOR SELECT USING (published = true);
CREATE POLICY "Public can view published team" ON public.team_members FOR SELECT USING (published = true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public can view published partners" ON public.partners FOR SELECT USING (published = true);
CREATE POLICY "Public can view media files" ON public.media_files FOR SELECT USING (true);

-- PUBLIC INSERT POLICY FOR CONTACT MESSAGES (Visitors can submit inquiries)
CREATE POLICY "Public can submit contact inquiries" ON public.contact_messages 
FOR INSERT WITH CHECK (true);

-- ADMIN FULL ACCESS POLICIES (Authenticated users can manage all rows)
CREATE POLICY "Admins full access on settings" ON public.site_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on services" ON public.services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on programs" ON public.programs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on news_posts" ON public.news_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on team_members" ON public.team_members FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on partners" ON public.partners FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on media_files" ON public.media_files FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true);

-- INDEXES FOR FAST QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects (published);
CREATE INDEX IF NOT EXISTS idx_programs_status ON public.programs (status);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news_posts (slug);
CREATE INDEX IF NOT EXISTS idx_messages_read ON public.contact_messages (read);
