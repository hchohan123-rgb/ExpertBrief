# Complete Setup Instructions

This guide will help you complete the final steps to index all your uploaded files, remove folder 07, and rename the case.

## What You Need to Do

### Step 1: Get Exact File Names from Supabase Storage

The SQL script needs the **exact file names** from your Supabase Storage. Here's how to get them:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Storage** in the left sidebar
4. Click on your **case-documents** bucket
5. Navigate to folder **06-technical-data**
6. **Copy the exact full name** of each file (not the truncated version)

The files I can see are:
- `Ceiling_Zone_Spatial_Coo...` (need full name)
- `MEP_Design_Basis_Criteri...` (need full name)
- `MEP_Plant_Equipment_Sc...` (need full name)
- `Testing_Commissioning_S...` (need full name)

### Step 2: Update the SQL Script

Once you have the exact file names, you need to update `update-all-files.sql`:

1. Open the file `update-all-files.sql` in your code editor
2. Find lines 80-83 (the 06 Technical Data section)
3. Replace the file names with the **exact names** from your Supabase Storage
4. Make sure the names in both the `name` column AND the `storage_path` column match exactly

**Example:**
If the actual file name is `Ceiling_Zone_Spatial_Coordination_Report.pdf`, change:
```sql
(folder_06, 'Ceiling_Zone_Spatial_Coordination.pdf', 'pdf', '06-technical-data/Ceiling_Zone_Spatial_Coordination.pdf'),
```
to:
```sql
(folder_06, 'Ceiling_Zone_Spatial_Coordination_Report.pdf', 'pdf', '06-technical-data/Ceiling_Zone_Spatial_Coordination_Report.pdf'),
```

### Step 3: Run the SQL Script

After updating the file names:

1. Go to your Supabase Dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the **entire contents** of `update-all-files.sql`
5. Paste it into the SQL Editor
6. Click **Run** (or press Cmd+Enter)

This script will:
- ✅ Rename your case from "MEP Case 001" to "MEP - Riverside Exchange Development"
- ✅ Delete folder 07 (Expert Report Templates) and all its files
- ✅ Clear existing file records (except Letter of Instruction)
- ✅ Index all your uploaded files in the database

### Step 4: Verify Everything Works

1. Open your ExpertBrief application in the browser
2. You should see:
   - Case name changed to "MEP - Riverside Exchange Development"
   - Only 7 folders displayed (00-06, no folder 07)
   - All your uploaded files visible when you click into each folder

## What I've Already Done

✅ Removed folder 07 from `constants.ts`
✅ Created comprehensive SQL script `update-all-files.sql` that:
  - Renames the case
  - Deletes folder 07
  - Indexes all files from storage
✅ Updated the script with estimated file names for folder 06

## If You Encounter Issues

### Files Not Appearing
- Check that the file names in the SQL script **exactly match** the names in Supabase Storage (including capitalization, spaces, underscores, etc.)
- Check that the `storage_path` format is correct: `folder-slug/File Name.pdf`

### SQL Errors
- Make sure you copied the entire SQL script
- Check for any syntax errors if you manually edited file names
- Verify all folder slugs are correct

### Folder 07 Still Showing
- Make sure you saved `constants.ts` after the changes
- Restart your development server (`npm run dev`)
- Hard refresh your browser (Cmd+Shift+R)

## Need Help?

If you need me to help with any step, just let me know:
- "I need help getting the exact file names"
- "The SQL script gave me an error"
- "The files aren't showing up"
