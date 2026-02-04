import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F2FDFF]">
      <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e5e5e5]">
        <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <span className="font-serif font-medium tracking-tight text-[#0A210F]" style={{ fontFamily: 'Georgia, serif', fontWeight: 500, fontSize: '1.5625rem' }}>
              ExpertBrief
              <span className="sr-only">home</span>
            </span>
          </Link>
          
          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link 
              to="/experts" 
              className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-lg bg-[#0A210F] text-white hover:bg-[#1a3d28] transition-colors duration-300"
            >
              Start
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="border-t border-[#0A210F] py-16 bg-[#0A210F]">
        <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-bold text-lg mb-2 text-white">ExpertBrief</div>
            <p className="text-sm text-[#b8cfc3]">© {new Date().getFullYear()} ExpertBrief. <br className="md:hidden"/>Training for the modern expert witness.</p>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-[#F2FDFF] hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[#F2FDFF] hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-[#F2FDFF] hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;