-- Comprehensive update script for ExpertBrief
-- This will:
-- 1. Index all uploaded files in Supabase Storage
-- 2. Remove folder 07 (Expert Report Templates)
-- 3. Rename case to "MEP - Riverside Exchange Development"

-- Step 1: Rename the case
UPDATE cases
SET name = 'MEP - Riverside Exchange Development'
WHERE slug = 'mep-case-001';

-- Step 2: Update Letter of Instruction storage path BEFORE deletions
UPDATE files
SET storage_path = '00 Letter of Instruction/Riverside Exchange MEP LOI.pdf'
WHERE name = 'Riverside Exchange MEP LOI.pdf';

-- Step 3: Delete folder 07 and its files
DELETE FROM files
WHERE folder_id IN (SELECT id FROM folders WHERE slug = '07-expert-report-templates');

DELETE FROM folders
WHERE slug = '07-expert-report-templates';

-- Step 4: Clear existing file records (except Letter of Instruction)
DELETE FROM files
WHERE folder_id NOT IN (
  SELECT id FROM folders WHERE slug = '00-letter-of-instruction'
);

-- Step 4: Insert all file records based on your Supabase Storage uploads
DO $$
DECLARE
  folder_00 UUID;
  folder_01 UUID;
  folder_02 UUID;
  folder_03 UUID;
  folder_04 UUID;
  folder_05 UUID;
  folder_06 UUID;
BEGIN
  -- Get folder IDs
  SELECT id INTO folder_00 FROM folders WHERE slug = '00-letter-of-instruction';
  SELECT id INTO folder_01 FROM folders WHERE slug = '01-project-information';
  SELECT id INTO folder_02 FROM folders WHERE slug = '02-contract-documents';
  SELECT id INTO folder_03 FROM folders WHERE slug = '03-mep-drawings';
  SELECT id INTO folder_04 FROM folders WHERE slug = '04-correspondence';
  SELECT id INTO folder_05 FROM folders WHERE slug = '05-progress-reports';
  SELECT id INTO folder_06 FROM folders WHERE slug = '06-technical-data';

  -- 01 Project Information
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_01, 'Baseline_Programme_Narrative.pdf', 'pdf', '01 Project Information/Baseline_Programme_Narrative.pdf'),
    (folder_01, 'Design_Responsibility_Matrix.pdf', 'pdf', '01 Project Information/Design_Responsibility_Matrix.pdf'),
    (folder_01, 'MEP_Design_Programme.pdf', 'pdf', '01 Project Information/MEP_Design_Programme.pdf'),
    (folder_01, 'MEP_Method_Statement_Extract.pdf', 'pdf', '01 Project Information/MEP_Method_Statement_Extract.pdf')
  ON CONFLICT DO NOTHING;

  -- 02 Contract Documents
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_02, 'Contract_Particulars_Extract.pdf', 'pdf', '02 Contract Documents/Contract_Particulars_Extract.pdf')
  ON CONFLICT DO NOTHING;

  -- 03 MEP Drawings
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_03, 'Design_Revision_Register.pdf', 'pdf', '03 MEP Drawings/Design_Revision_Register.pdf')
  ON CONFLICT DO NOTHING;

  -- 04 Correspondence
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_04, 'Letter_Axis_05Sep2022.pdf', 'pdf', '04 Correspondence/Letter_Axis_05Sep2022.pdf'),
    (folder_04, 'Letter_Axis_30Jan2023.pdf', 'pdf', '04 Correspondence/Letter_Axis_30Jan2023.pdf'),
    (folder_04, 'Letter_Meridian_02Nov2022.pdf', 'pdf', '04 Correspondence/Letter_Meridian_02Nov2022.pdf'),
    (folder_04, 'Letter_Stonebridge_10Oct2022.pdf', 'pdf', '04 Correspondence/Letter_Stonebridge_10Oct2022.pdf'),
    (folder_04, 'Letter_Stonebridge_16Jan2023.pdf', 'pdf', '04 Correspondence/Letter_Stonebridge_16Jan2023.pdf'),
    (folder_04, 'Letter_Stonebridge_22Aug2022.pdf', 'pdf', '04 Correspondence/Letter_Stonebridge_22Aug2022.pdf'),
    (folder_04, 'RFI_Log_Extract.pdf', 'pdf', '04 Correspondence/RFI_Log_Extract.pdf'),
    (folder_04, 'Site_Instructions_Extract.pdf', 'pdf', '04 Correspondence/Site_Instructions_Extract.pdf')
  ON CONFLICT DO NOTHING;

  -- 05 Progress Reports
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_05, 'Clash_Detection_Summary.pdf', 'pdf', '05 Progress Reports/Clash_Detection_Summary.pdf'),
    (folder_05, 'Design_Coordination_Meeting_Minutes.pdf', 'pdf', '05 Progress Reports/Design_Coordination_Meeting_Minutes.pdf'),
    (folder_05, 'Monthly_Progress_Report_April_2023.pdf', 'pdf', '05 Progress Reports/Monthly_Progress_Report_April_2023.pdf'),
    (folder_05, 'Monthly_Progress_Report_January_2023.pdf', 'pdf', '05 Progress Reports/Monthly_Progress_Report_January_2023.pdf'),
    (folder_05, 'Monthly_Progress_Report_October_2022.pdf', 'pdf', '05 Progress Reports/Monthly_Progress_Report_October_2022.pdf'),
    (folder_05, 'Programme_Update_June_2023.pdf', 'pdf', '05 Progress Reports/Programme_Update_June_2023.pdf'),
    (folder_05, 'Progress_Photographs_Description.pdf', 'pdf', '05 Progress Reports/Progress_Photographs_Description.pdf')
  ON CONFLICT DO NOTHING;

  -- 06 Technical Data
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_06, 'Ceiling_Zone_Spatial_Coordination.pdf', 'pdf', '06 Technical Data/Ceiling_Zone_Spatial_Coordination.pdf'),
    (folder_06, 'MEP_Design_Basis_Criteria.pdf', 'pdf', '06 Technical Data/MEP_Design_Basis_Criteria.pdf'),
    (folder_06, 'MEP_Plant_Equipment_Schedule.pdf', 'pdf', '06 Technical Data/MEP_Plant_Equipment_Schedule.pdf'),
    (folder_06, 'Testing_Commissioning_Strategy.pdf', 'pdf', '06 Technical Data/Testing_Commissioning_Strategy.pdf')
  ON CONFLICT DO NOTHING;

END $$;
