import { supabase } from './supabase';

// Types for database entities
export interface Case {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Folder {
  id: string;
  case_id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface File {
  id: string;
  folder_id: string;
  name: string;
  file_type: string | null;
  storage_path: string;
  file_size: number | null;
  created_at: string;
  updated_at: string;
}

// Fetch all cases
export async function getCases() {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Case[];
}

// Fetch a single case by slug
export async function getCaseBySlug(slug: string) {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Case;
}

// Fetch folders for a case
export async function getFoldersByCase(caseSlug: string) {
  // #region agent log
  if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7242/ingest/6e40aa55-1f21-4915-8f95-48a5c1d51167',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/database.ts:getFoldersByCase',message:'getFoldersByCase entry',data:{caseSlug},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'})}).catch(()=>{});
  // #endregion
  const { data, error } = await supabase
    .from('folders')
    .select(`
      *,
      cases!inner(slug)
    `)
    .eq('cases.slug', caseSlug)
    .order('sort_order', { ascending: true });

  // #region agent log
  if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7242/ingest/6e40aa55-1f21-4915-8f95-48a5c1d51167',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/database.ts:getFoldersByCase',message:'getFoldersByCase result',data:{hasError:Boolean(error),errorMessage:error?.message,errorCode:error?.code,rowCount:data?.length},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H3'})}).catch(()=>{});
  // #endregion
  if (error) throw error;
  return data as Folder[];
}

// Fetch a single folder by slug
export async function getFolderBySlug(caseSlug: string, folderSlug: string) {
  const { data, error } = await supabase
    .from('folders')
    .select(`
      *,
      cases!inner(slug)
    `)
    .eq('cases.slug', caseSlug)
    .eq('slug', folderSlug)
    .single();

  if (error) throw error;
  return data as Folder;
}

// Fetch files in a folder
export async function getFilesByFolder(folderId: string) {
  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('folder_id', folderId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as File[];
}

// Fetch a single file by id
export async function getFileById(fileId: string) {
  const { data, error } = await supabase
    .from('files')
    .select('*')
    .eq('id', fileId)
    .single();

  if (error) throw error;
  return data as File;
}

// Get public URL for a file in storage
export function getFileUrl(storagePath: string) {
  const { data } = supabase.storage
    .from('case-documents')
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

// Upload a file to Supabase storage
export async function uploadFile(
  folderId: string,
  file: globalThis.File
) {
  // Create a unique path for the file
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const storagePath = `${folderId}/${fileName}`;

  // Upload to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('case-documents')
    .upload(storagePath, file);

  if (uploadError) throw uploadError;

  // Create database record
  const { data: fileData, error: fileError } = await supabase
    .from('files')
    .insert({
      folder_id: folderId,
      name: file.name,
      file_type: fileExt,
      storage_path: storagePath,
      file_size: file.size,
    })
    .select()
    .single();

  if (fileError) throw fileError;

  return fileData as File;
}

// Delete a file
export async function deleteFile(fileId: string) {
  // Get file info first
  const file = await getFileById(fileId);

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('case-documents')
    .remove([file.storage_path]);

  if (storageError) throw storageError;

  // Delete from database
  const { error: dbError } = await supabase
    .from('files')
    .delete()
    .eq('id', fileId);

  if (dbError) throw dbError;
}
