import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { IconFileText, IconChevronRight, IconArrowLeft, IconFolder } from '../components/Icons';
import { getFolderBySlug, getFilesByFolder, type Folder, type File } from '../lib/database';

const FileListPage: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFolderAndFiles() {
      if (!folderId) return;

      try {
        setLoading(true);
        const folder = await getFolderBySlug('mep-case-001', folderId);
        setCurrentFolder(folder);

        const folderFiles = await getFilesByFolder(folder.id);
        setFiles(folderFiles);
      } catch (err) {
        console.error('Error loading folder and files:', err);
        setError('Failed to load folder contents.');
      } finally {
        setLoading(false);
      }
    }
    loadFolderAndFiles();
  }, [folderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-[#F2FDFF] flex items-center justify-center">
        <div className="container mx-auto max-w-5xl px-6 py-12">
          <div className="text-center py-12">
            <p className="text-[#4a4a4a]">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentFolder) {
    return <Navigate to="/experts/mep" />;
  }

  return (
    <div className="min-h-[60vh] bg-[#F2FDFF]">
      <div className="container mx-auto max-w-5xl px-6 py-12 animate-fade-in-up">
        <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-wider font-medium">
          <Link to="/experts" className="text-[#0A210F] hover:text-[#1a3d28] transition-colors">Simulations</Link>
          <IconChevronRight className="h-3 w-3 text-[#9ca3af]" />
          <Link to="/experts/mep" className="text-[#0A210F] hover:text-[#1a3d28] transition-colors">MEP Case 001</Link>
          <IconChevronRight className="h-3 w-3 text-[#9ca3af]" />
          <span className="text-[#0A210F] truncate max-w-[200px]">{currentFolder.name}</span>
        </div>

        <div className="mb-12 border-b border-[#e5e5e5] pb-8">
           <Link to="/experts/mep" className="inline-flex items-center gap-2 text-sm text-[#4a4a4a] hover:text-[#0A210F] mb-6 transition-colors font-medium group">
            <IconArrowLeft className="h-4 w-4 text-[#0A210F] group-hover:-translate-x-1 transition-transform" /> Up Level
          </Link>
          <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-[#e8f5ed] text-[#0A210F] rounded-sm flex items-center justify-center shrink-0">
                  <IconFolder className="h-6 w-6" />
              </div>
              <div>
                  <h1 className="text-3xl font-bold text-[#0A210F]">{currentFolder.name}</h1>
                  <p className="text-[#4a4a4a] text-sm mt-1 font-mono">{files.length} ITEMS FOUND</p>
              </div>
          </div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(10,33,15,0.08)]">
          {files.length > 0 ? (
              <div className="grid grid-cols-1 divide-y divide-[#e5e5e5]">
              {files.map((file: File) => (
                  <Link
                  key={file.id}
                  to={`/experts/mep/${folderId}/${file.id}`}
                  className="group flex items-center gap-6 p-5 hover:bg-[#F2FDFF] transition-colors"
                  >
                  <div className="h-8 w-8 text-[#9ca3af] group-hover:text-[#0A210F] transition-colors flex items-center justify-center shrink-0">
                      <IconFileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                      <h3 className="font-medium text-[#1a1a1a] group-hover:text-[#0A210F] transition-colors text-lg">{file.name}</h3>
                  </div>
                  <div className="px-2 py-1 bg-[#e8f5ed] text-[10px] font-bold text-[#0A210F] uppercase tracking-widest rounded-sm">
                      {file.file_type?.toUpperCase() || 'FILE'}
                  </div>
                  </Link>
              ))}
              </div>
          ) : (
              <div className="p-16 text-center border border-dashed border-[#e5e5e5] bg-[#F2FDFF] rounded-sm">
                  <p className="text-[#4a4a4a] italic">This folder is empty.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileListPage;