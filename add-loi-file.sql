-- Add the Letter of Instruction PDF to the database
-- Run this in Supabase SQL Editor

-- First, get the folder ID for "00 Letter of Instruction"
-- Then insert the file record

DO $$
DECLARE
  loi_folder_id UUID;
BEGIN
  -- Get the folder ID for "00 Letter of Instruction"
  SELECT id INTO loi_folder_id
  FROM folders
  WHERE slug = '00-letter-of-instruction';

  -- Insert the file record
  INSERT INTO files (folder_id, name, file_type, storage_path, file_size)
  VALUES (
    loi_folder_id,
    'Riverside Exchange MEP LOI.pdf',
    'pdf',
    '00-letter-of-instruction/Riverside Exchange MEP LOI.pdf',
    0  -- You can update this with the actual file size later if needed
  );
END $$;
