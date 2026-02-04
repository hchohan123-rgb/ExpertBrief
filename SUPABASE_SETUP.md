# Supabase Setup Guide

Follow these steps to set up your Supabase backend for ExpertBrief.

## Step 1: Run the SQL Migration

1. Go to your Supabase project dashboard: https://mewomfgplojjiuzcwohg.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `supabase-schema.sql` and paste it into the editor
5. Click **Run** to execute the SQL

This will create:
- `cases` table - stores your cases (e.g., MEP Case 001)
- `folders` table - stores folders within each case
- `files` table - stores file metadata
- Row Level Security policies for public read access
- A sample "MEP Case 001" with all 8 folders

## Step 2: Create Storage Bucket

1. In your Supabase dashboard, go to **Storage** in the left sidebar
2. Click **New bucket**
3. Name it: `case-documents`
4. Set it to **Public bucket** (so files can be viewed)
5. Click **Create bucket**

## Step 3: Set Up Storage Policies

1. Click on the `case-documents` bucket
2. Go to **Policies** tab
3. Click **New policy**
4. Choose **Get objects** and select **Public access (Anyone can read)**
5. Click **Review** and **Save policy**

This allows the app to display PDFs and files to users.

## Step 4: Add Your Supabase Anon Key

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **anon public** key
3. Open `.env.local` in your project
4. Replace `your_anon_key_here` with your actual key

## Step 5: Upload Your First File

You can upload files either:

### Option A: Via Supabase Dashboard (Quick Test)

1. Go to **Storage** → `case-documents`
2. Create a folder matching a folder ID from the database (e.g., create a folder for the Letter of Instruction)
3. Upload your PDF file
4. Then add a record to the `files` table:
   - Go to **Table Editor** → `files`
   - Click **Insert row**
   - Fill in:
     - `folder_id`: (get this from the folders table)
     - `name`: "Riverside Exchange MEP LOI.pdf"
     - `file_type`: "pdf"
     - `storage_path`: "folder-id/filename.pdf" (path to your uploaded file)
     - `file_size`: (file size in bytes)

### Option B: Via SQL (Recommended)

First, get your folder ID:
```sql
SELECT id FROM folders WHERE slug = '00-letter-of-instruction';
```

Then, after uploading your PDF to storage at path `00-letter-of-instruction/Riverside Exchange MEP LOI.pdf`:

```sql
INSERT INTO files (folder_id, name, file_type, storage_path, file_size)
VALUES (
  'YOUR_FOLDER_ID_HERE',
  'Riverside Exchange MEP LOI.pdf',
  'pdf',
  '00-letter-of-instruction/Riverside Exchange MEP LOI.pdf',
  0  -- Replace with actual file size
);
```

## Step 6: Test Your Setup

1. Make sure your `.env.local` has the correct Supabase URL and anon key
2. Run your app: `npm run dev`
3. Navigate to the MEP case and folders
4. Your uploaded files should now appear and be viewable

## Database Schema Overview

```
cases
├── id (UUID)
├── name (e.g., "MEP Case 001")
├── slug (e.g., "mep-case-001")
└── description

folders
├── id (UUID)
├── case_id (references cases.id)
├── name (e.g., "00 Letter of Instruction")
├── slug (e.g., "00-letter-of-instruction")
└── sort_order (for ordering)

files
├── id (UUID)
├── folder_id (references folders.id)
├── name (filename)
├── file_type (e.g., "pdf", "png")
├── storage_path (path in Supabase storage)
└── file_size (bytes)
```

## Next Steps

After setup, you'll need to update the frontend components to fetch data from Supabase instead of using static constants. The helper functions in `lib/database.ts` are ready to use.

## Troubleshooting

- **Can't see files?** Check that the storage bucket is public and policies are set correctly
- **Database errors?** Verify the SQL migration ran successfully
- **Files not loading?** Check the `storage_path` in the files table matches the actual path in storage
