import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconFolder, IconChevronRight, IconArrowLeft, IconUpload } from '../components/Icons';
import { getFoldersByCase, type Folder } from '../lib/database';
import { supabase } from '../lib/supabase';

const FolderListPage: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadFolders() {
      try {
        setLoading(true);
        const data = await getFoldersByCase('mep-case-001');
        setFolders(data);
      } catch (err) {
        console.error('Error loading folders:', err);
        setError('Failed to load folders. Please check your Supabase setup.');
      } finally {
        setLoading(false);
      }
    }
    loadFolders();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file only.');
      return;
    }

    try {
      setUploading(true);
      setUploadSuccess(false);

      // Create a unique filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${timestamp}_${file.name}`;
      const storagePath = `uploaded-reports/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('case-documents')
        .upload(storagePath, file);

      if (uploadError) throw uploadError;

      // Show success message
      setUploadSuccess(true);
      alert('Report uploaded successfully! Our team will review it shortly.');

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Hide success message after 5 seconds
      setTimeout(() => setUploadSuccess(false), 5000);
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Failed to upload report. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-[#F2FDFF] flex items-center justify-center">
        <div className="container mx-auto max-w-5xl px-6 py-12">
          <div className="text-center py-12">
            <p className="text-[#4a4a4a]">Loading folders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] bg-[#F2FDFF]">
        <div className="container mx-auto max-w-5xl px-6 py-12">
          <div className="bg-red-50 border border-red-200 rounded-sm p-6">
            <p className="text-red-600">{error}</p>
            <p className="text-sm text-[#4a4a4a] mt-2">Make sure you've run the SQL migration and added your Supabase anon key.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] bg-[#F2FDFF]">
      <div className="container mx-auto max-w-5xl px-6 py-12 animate-fade-in-up">
        <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-wider font-medium">
<Link to="/experts" className="text-[#0A210F] hover:text-[#1a3d28] transition-colors">Simulations</Link>
        <IconChevronRight className="h-3 w-3 text-[#9ca3af]" />
          <span className="text-[#0A210F]">MEP Case 001</span>
        </div>

        <div className="mb-12 border-b border-[#e5e5e5] pb-8">
          <Link to="/experts" className="inline-flex items-center gap-2 text-sm text-[#4a4a4a] hover:text-[#0A210F] mb-6 transition-colors font-medium group">
            <IconArrowLeft className="h-4 w-4 text-[#0A210F] group-hover:-translate-x-1 transition-transform" /> Return to Selection
          </Link>
          <h1 className="text-4xl font-bold text-[#0A210F] mb-3">Riverside Exchange MEP Dispute Documents</h1>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(10,33,15,0.08)]">
          <div className="grid grid-cols-1 divide-y divide-[#e5e5e5]">
            {folders.map((folder: Folder) => (
              <Link
                key={folder.id}
                to={`/experts/mep/${folder.slug}`}
                className="group flex items-center gap-6 p-6 hover:bg-[#F2FDFF] transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-xl text-[#1a1a1a] group-hover:text-[#0A210F] transition-colors flex items-center gap-3">
                    <IconFolder className="h-5 w-5 text-[#9ca3af] group-hover:text-[#0A210F] transition-colors" />
                    {folder.name}
                  </h3>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A210F]">Open Folder</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 border border-[#e5e5e5] bg-white p-8 rounded-sm shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0A210F] mb-2">Submit Report</h3>
              <p className="text-[#4a4a4a] text-sm leading-relaxed max-w-xl">
                Upload your report in PDF or DocX format, and our team will analyse your methodology and your formed opinions to respond with comments.
              </p>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={handleUploadClick}
                disabled={uploading}
                className="flex items-center gap-3 px-8 py-4 bg-[#0A210F] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#1a3d28] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IconUpload className="h-4 w-4" />
                {uploading ? 'Uploading...' : 'Upload Report'}
              </button>
              {uploadSuccess && (
                <p className="text-sm text-[#0A210F] mt-2">Report uploaded successfully!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderListPage;