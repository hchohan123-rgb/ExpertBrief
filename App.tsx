import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ExpertSelectionPage from './pages/ExpertSelectionPage';
import FolderListPage from './pages/FolderListPage';
import FileListPage from './pages/FileListPage';
import FileViewerPage from './pages/FileViewerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/experts" element={<ExpertSelectionPage />} />
          <Route path="/experts/mep" element={<FolderListPage />} />
          <Route path="/experts/mep/:folderId" element={<FileListPage />} />
          <Route path="/experts/mep/:folderId/:fileId" element={<FileViewerPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;