import React from 'react';
import { Link } from 'react-router-dom';
import { IconHardHat, IconArrowRight } from '../components/Icons';

const ExpertSelectionPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] bg-[#F2FDFF]">
      <div className="container mx-auto max-w-7xl px-6 py-20 animate-fade-in-up">
        <div className="mb-16 border-b border-[#e5e5e5] pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A210F] mb-4">Select Expertise</h1>
          <p className="text-[#4a4a4a] text-lg font-light max-w-2xl">
            Choose your area of expertise to begin the case study. 
            Each track contains unique document sets and challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link 
            to="/experts/mep" 
            className="group flex flex-col p-8 bg-white border border-[#e5e5e5] transition-all duration-300 rounded-xl hover:shadow-[0_20px_40px_-15px_rgba(10,33,15,0.08)] hover:-translate-y-1 hover:border-[#0A210F]"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="h-14 w-14 bg-[#0A210F] text-white rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm">
                <IconHardHat className="h-7 w-7" />
              </div>
              <div className="h-8 w-8 rounded-full flex items-center justify-center border border-[#e5e5e5] text-[#0A210F] bg-[#F2FDFF] group-hover:bg-[#0A210F] group-hover:text-white group-hover:border-[#0A210F] transition-colors">
                 <IconArrowRight className="h-4 w-4" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-[#0A210F] mb-3">MEP Experts</h3>
            <p className="text-[#4a4a4a] text-sm leading-relaxed mb-8 flex-1">
              Technical expert simulations for Mechanical, Electrical, and Plumbing disputes.
              Focus on installation defects and code compliance.
            </p>
            
            <div className="mt-auto">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A210F] py-1 px-2 -ml-2 rounded-sm transition-colors group-hover:bg-[#e8f5ed] group-hover:text-[#0A210F]">
                Start Case 001
              </span>
            </div>
          </Link>
          
          {/* Placeholder: Structural */}
          <div className="p-8 bg-white border border-[#e5e5e5] rounded-xl flex flex-col items-center justify-center text-center opacity-60 cursor-not-allowed hover:opacity-100 transition-opacity">
             <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mb-2">Coming Soon</span>
             <h3 className="text-xl font-bold text-[#d4d4d4]">Structural</h3>
          </div>
          
          {/* Placeholder: Delay */}
          <div className="p-8 bg-white border border-[#e5e5e5] rounded-xl flex flex-col items-center justify-center text-center opacity-60 cursor-not-allowed hover:opacity-100 transition-opacity">
             <span className="text-xs font-bold uppercase tracking-widest text-[#9ca3af] mb-2">Coming Soon</span>
             <h3 className="text-xl font-bold text-[#d4d4d4]">Delay Analysis</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertSelectionPage;