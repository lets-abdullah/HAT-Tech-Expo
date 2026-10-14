-- ==============================================================================
-- HAT TECH EXPO 2026 - SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Partner Inquiries Table (Sponsorship & Partnership forms)
CREATE TABLE IF NOT EXISTS public.partner_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    selected_package TEXT NOT NULL,
    goals TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Student Submissions Table (Projects, Contributions, Contact)
CREATE TABLE IF NOT EXISTS public.student_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_type TEXT NOT NULL,
    full_name TEXT NOT NULL,
    university TEXT NOT NULL,
    email TEXT NOT NULL,
    project_title TEXT,
    message TEXT NOT NULL,
    project_link TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. General Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allows anonymous website visitors to INSERT their inquiries/submissions.
-- Restricts viewing (SELECT) to service role / admin users.
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.partner_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT
CREATE POLICY "Allow public insert on partner_inquiries" 
    ON public.partner_inquiries FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public insert on student_submissions" 
    ON public.student_submissions FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public insert on contact_messages" 
    ON public.contact_messages FOR INSERT 
    WITH CHECK (true);

-- Allow public SELECT (optional, or restricted to authenticated)
CREATE POLICY "Allow authenticated read partner_inquiries"
    ON public.partner_inquiries FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read student_submissions"
    ON public.student_submissions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read contact_messages"
    ON public.contact_messages FOR SELECT
    TO authenticated
    USING (true);
