-- ExpertBrief Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cases table (e.g., MEP Case 001)
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Folders table (e.g., 00 Letter of Instruction, 01 Project Information)
CREATE TABLE IF NOT EXISTS folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(case_id, slug)
);

-- Files table (PDFs, images, documents)
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  storage_path TEXT NOT NULL,
  file_size BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_folders_case_id ON folders(case_id);
CREATE INDEX IF NOT EXISTS idx_files_folder_id ON files(folder_id);
CREATE INDEX IF NOT EXISTS idx_folders_sort_order ON folders(case_id, sort_order);

-- Insert sample case
INSERT INTO cases (name, slug, description)
VALUES (
  'MEP Case 001',
  'mep-case-001',
  'Riverside Exchange MEP dispute case involving Stonebridge Construction (UK) Ltd'
) ON CONFLICT (slug) DO NOTHING;

-- Get the case_id for MEP Case 001
DO $$
DECLARE
  mep_case_id UUID;
BEGIN
  SELECT id INTO mep_case_id FROM cases WHERE slug = 'mep-case-001';

  -- Insert folders for MEP Case 001
  INSERT INTO folders (case_id, name, slug, sort_order) VALUES
    (mep_case_id, '00 Letter of Instruction', '00-letter-of-instruction', 0),
    (mep_case_id, '01 Project Information', '01-project-information', 1),
    (mep_case_id, '02 Contract Documents', '02-contract-documents', 2),
    (mep_case_id, '03 MEP Drawings', '03-mep-drawings', 3),
    (mep_case_id, '04 Correspondence', '04-correspondence', 4),
    (mep_case_id, '05 Progress Reports', '05-progress-reports', 5),
    (mep_case_id, '06 Technical Data', '06-technical-data', 6),
    (mep_case_id, '07 Expert Report Templates', '07-expert-report-templates', 7)
  ON CONFLICT (case_id, slug) DO NOTHING;
END $$;

-- Enable Row Level Security (RLS)
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (you can modify these based on your needs)
CREATE POLICY "Allow public read access to cases" ON cases
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to folders" ON folders
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to files" ON files
  FOR SELECT USING (true);

-- Optional: Create policies for authenticated insert/update/delete
-- Uncomment these if you want to allow authenticated users to manage data

-- CREATE POLICY "Allow authenticated insert to cases" ON cases
--   FOR INSERT TO authenticated WITH CHECK (true);

-- CREATE POLICY "Allow authenticated update to cases" ON cases
--   FOR UPDATE TO authenticated USING (true);

-- CREATE POLICY "Allow authenticated delete to cases" ON cases
--   FOR DELETE TO authenticated USING (true);

-- CREATE POLICY "Allow authenticated insert to folders" ON folders
--   FOR INSERT TO authenticated WITH CHECK (true);

-- CREATE POLICY "Allow authenticated update to folders" ON folders
--   FOR UPDATE TO authenticated USING (true);

-- CREATE POLICY "Allow authenticated delete to folders" ON folders
--   FOR DELETE TO authenticated USING (true);

-- CREATE POLICY "Allow authenticated insert to files" ON files
--   FOR INSERT TO authenticated WITH CHECK (true);

-- CREATE POLICY "Allow authenticated update to files" ON files
--   FOR UPDATE TO authenticated USING (true);

-- CREATE POLICY "Allow authenticated delete to files" ON files
--   FOR DELETE TO authenticated USING (true);
