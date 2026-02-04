-- Bulk add files to the database
-- After uploading files to Supabase Storage, run this SQL to create database records
--
-- Instructions:
-- 1. Upload your files to storage first in their respective folders
-- 2. Update this script with your actual file names
-- 3. Run in Supabase SQL Editor

DO $$
DECLARE
  folder_01 UUID;
  folder_02 UUID;
  folder_03 UUID;
  folder_04 UUID;
  folder_05 UUID;
  folder_06 UUID;
  folder_07 UUID;
BEGIN
  -- Get folder IDs
  SELECT id INTO folder_01 FROM folders WHERE slug = '01-project-information';
  SELECT id INTO folder_02 FROM folders WHERE slug = '02-contract-documents';
  SELECT id INTO folder_03 FROM folders WHERE slug = '03-mep-drawings';
  SELECT id INTO folder_04 FROM folders WHERE slug = '04-correspondence';
  SELECT id INTO folder_05 FROM folders WHERE slug = '05-progress-reports';
  SELECT id INTO folder_06 FROM folders WHERE slug = '06-technical-data';
  SELECT id INTO folder_07 FROM folders WHERE slug = '07-expert-report-templates';

  -- Insert files for 01 Project Information
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_01, 'Project Overview.pdf', 'pdf', '01-project-information/Project Overview.pdf'),
    (folder_01, 'Construction Timeline.pdf', 'pdf', '01-project-information/Construction Timeline.pdf');

  -- Insert files for 02 Contract Documents
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_02, 'Contract Agreement.pdf', 'pdf', '02-contract-documents/Contract Agreement.pdf'),
    (folder_02, 'General Specifications.pdf', 'pdf', '02-contract-documents/General Specifications.pdf');

  -- Insert files for 03 MEP Drawings
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_03, 'MEP-GA-Level-B1.pdf', 'pdf', '03-mep-drawings/MEP-GA-Level-B1.pdf'),
    (folder_03, 'HVAC-Schematic.png', 'png', '03-mep-drawings/HVAC-Schematic.png');

  -- Insert files for 04 Correspondence
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_04, 'Email - RFI Clarification.pdf', 'pdf', '04-correspondence/Email - RFI Clarification.pdf'),
    (folder_04, 'Email - Delay Notification.pdf', 'pdf', '04-correspondence/Email - Delay Notification.pdf');

  -- Insert files for 05 Progress Reports
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_05, 'Progress Report - Jan.pdf', 'pdf', '05-progress-reports/Progress Report - Jan.pdf'),
    (folder_05, 'Progress Report - Feb.pdf', 'pdf', '05-progress-reports/Progress Report - Feb.pdf');

  -- Insert files for 06 Technical Data
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_06, 'Submittal - Chillers.pdf', 'pdf', '06-technical-data/Submittal - Chillers.pdf'),
    (folder_06, 'Fan Data Sheet.pdf', 'pdf', '06-technical-data/Fan Data Sheet.pdf');

  -- Insert files for 07 Expert Report Templates
  INSERT INTO files (folder_id, name, file_type, storage_path) VALUES
    (folder_07, 'Expert Report Template.docx', 'docx', '07-expert-report-templates/Expert Report Template.docx');

END $$;
