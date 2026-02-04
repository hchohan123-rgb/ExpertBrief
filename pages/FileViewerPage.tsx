import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { IconChevronRight, IconArrowLeft, IconFileText, IconEdit, IconX, IconDownload } from '../components/Icons';
import { getFolderBySlug, getFileById, getFileUrl, type Folder, type File } from '../lib/database';

const FileViewerPage: React.FC = () => {
  const { folderId, fileId } = useParams<{ folderId: string; fileId: string }>();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFileAndFolder() {
      if (!folderId || !fileId) return;

      try {
        setLoading(true);
        const folder = await getFolderBySlug('mep-case-001', folderId);
        setCurrentFolder(folder);

        const fileData = await getFileById(fileId);
        setFile(fileData);
      } catch (err) {
        console.error('Error loading file:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFileAndFolder();
  }, [folderId, fileId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F2FDFF]">
        <p className="text-[#4a4a4a]">Loading file...</p>
      </div>
    );
  }

  if (!currentFolder || !file) {
    return <Navigate to="/experts/mep" />;
  }

  // Get the file URL from Supabase Storage
  const fileUrl = getFileUrl(file.storage_path);
  const fileExtension = file.file_type?.toLowerCase();

  const renderContent = () => {
    // PDF Viewer
    if (fileExtension === 'pdf') {
      return (
        <iframe 
          src={fileUrl} 
          className="w-full h-full border-none bg-[#e5e5e5]" 
          title={file.name}
        />
      );
    }
    
    // Image Viewer
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension || '')) {
      return (
        <div className="w-full h-full flex items-center justify-center p-8 overflow-auto bg-[#F2FDFF]">
          <img 
            src={fileUrl} 
            alt={file.name} 
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
        </div>
      );
    }

    // Fallback for unsupported types
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in-up bg-[#F2FDFF]">
        <div className="bg-white p-6 rounded-sm shadow-sm border border-[#e5e5e5] mb-6">
          <IconFileText className="h-10 w-10 text-[#9ca3af]" />
        </div>
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Preview not available</h3>
        <p className="text-[#4a4a4a] max-w-md mb-8 font-light">
          This file type ({fileExtension?.toUpperCase()}) cannot be viewed directly.
        </p>
        <a 
          href={fileUrl} 
          download 
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A210F] text-white text-sm font-medium uppercase tracking-wider rounded-lg hover:bg-[#1a3d28] transition-colors shadow-sm"
        >
          <IconDownload className="h-4 w-4" /> Download File
        </a>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#F2FDFF] overflow-hidden">
      {/* Viewer Header */}
      <div className="bg-white border-b border-[#e5e5e5] px-6 py-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4 overflow-hidden">
          <Link to={`/experts/mep/${folderId}`} className="p-2 hover:bg-[#e8f5ed] rounded-sm text-[#4a4a4a] hover:text-[#0A210F] transition-colors shrink-0">
             <IconArrowLeft className="h-5 w-5" /> 
          </Link>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#4a4a4a] truncate">
             <span className="hidden sm:inline">MEP Case 001</span>
             <IconChevronRight className="h-3 w-3 hidden sm:inline" />
             <span className="truncate max-w-[150px]">{currentFolder.name}</span>
             <IconChevronRight className="h-3 w-3" />
             <span className="font-bold text-[#1a1a1a] truncate highlight-static px-1">{file.name}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsReportOpen(!isReportOpen)}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${isReportOpen ? 'bg-[#0A210F] text-white border-[#0A210F]' : 'bg-white text-[#0A210F] border-[#0A210F]/30 hover:border-[#0A210F]'}`}
        >
          <IconEdit className="h-4 w-4" />
          <span className="hidden sm:inline">{isReportOpen ? 'Close Draft' : 'Open Draft'}</span>
        </button>
      </div>

      {/* Main Content Area - Split View */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Document Viewer */}
        <div className="flex-1 bg-[#e5e5e5] relative">
          {renderContent()}
        </div>

        {/* Report Drafting Sidebar */}
        <div 
          className={`
            fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) border-l border-[#e5e5e5] z-20 flex flex-col mt-20 sm:mt-0 sm:relative sm:transform-none
            ${isReportOpen ? 'translate-x-0' : 'translate-x-full sm:hidden'}
          `}
        >
          <div className="p-5 border-b border-[#e5e5e5] bg-white flex items-center justify-between">
            <h3 className="font-bold text-lg text-[#0A210F] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0A210F] rounded-full animate-pulse"></span>
              Notes & Observations
            </h3>
            <button 
              onClick={() => setIsReportOpen(false)}
              className="p-1 text-[#4a4a4a] hover:text-[#0A210F] transition-colors sm:hidden"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto bg-[#F2FDFF]/50">
            <div className="bg-[#e8f5ed] p-4 border-l-4 border-[#0A210F] text-sm text-[#4a4a4a] italic">
              "Note any discrepancies between the contract timeline and the actual progress reports."
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#4a4a4a]">Your Findings</label>
                <textarea
                className="flex-1 w-full p-6 border border-[#e5e5e5] bg-white focus:border-[#0A210F] focus:ring-1 focus:ring-[#0A210F] outline-none text-[#1a1a1a] leading-relaxed text-base shadow-sm transition-all"
                placeholder="Start typing your observations..."
                value={reportContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReportContent(e.target.value)}
                />
            </div>
          </div>

          <div className="p-4 border-t border-[#e5e5e5] bg-white flex justify-between items-center">
            <span className="text-xs text-[#4a4a4a] font-mono">AUTOSAVED</span>
            <button className="text-xs font-bold text-[#0A210F] hover:text-[#1a3d28] uppercase tracking-wider">
                Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileViewerPage;