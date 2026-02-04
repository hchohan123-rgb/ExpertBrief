import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight, IconX } from '../components/Icons';
import { supabase } from '../lib/supabase';

const LandingPage: React.FC = () => {
  const [expertiseIndex, setExpertiseIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Form Data State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    expertise: ''
  });

  const expertises = ["MEP", "Fire", "Delay", "Structural", "Quantum"];

  useEffect(() => {
    const interval = setInterval(() => {
      setExpertiseIndex((prev) => (prev + 1) % expertises.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [expertises.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    try {
      // Check if credentials are still the placeholders
      if (supabase.supabaseUrl.includes('example.supabase.co')) {
        console.warn('Supabase credentials not configured. Simulating success.');
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        // Submit to Supabase
        const { error } = await supabase
          .from('waitlist')
          .insert([
            { 
              full_name: formData.fullName,
              email: formData.email,
              expertise_interest: formData.expertise,
              created_at: new Date().toISOString()
            }
          ]);
        
        if (error) throw error;
      }
      
      setFormState('success');
      setFormData({ fullName: '', email: '', expertise: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      alert('There was an error joining the waitlist. Please try again.');
      setFormState('idle');
    }
  };

  return (
    <div className="flex flex-col bg-[#F2FDFF]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-16 px-6 overflow-hidden bg-[#F2FDFF]">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#F2FDFF]"></div>
          <div className="absolute top-[-10%] left-[20%] w-[30rem] h-[30rem] bg-[#0A210F]/8 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
          <div className="absolute top-[10%] right-[10%] w-[25rem] h-[25rem] bg-[#0A210F]/5 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[40%] w-[35rem] h-[35rem] bg-[#0A210F]/6 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-block mb-6 px-3 py-1 bg-[#0A210F] text-white text-xs uppercase tracking-widest font-semibold rounded-full animate-fade-in-up">
            V1.0 Public Beta
          </div>
          
          <h1 className="relative text-5xl md:text-7xl font-serif font-medium text-[#0A210F] mb-4 leading-[1.1] animate-fade-in-up delay-100">
            Train like a real
            <br />
            <span className="relative inline-block px-4 pb-2 mt-2">
              <span className="absolute inset-0 bg-[#FFD700] -z-10 transform -rotate-1 rounded-sm opacity-95"></span>
              <span key={expertiseIndex} className="inline-block animate-text-enter text-[#1a1a1a]">
                {expertises[expertiseIndex]}
              </span>
              <span className="text-[#1a1a1a]"> expert witness.</span>
            </span>
          </h1>
          
          <p className="text-xl text-[#4a4a4a] mb-6 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
            Immersive case simulations built based on real project data. <br/>
            <span className="text-[#1a1a1a]">Sharpen your analysis, writing, and expert judgement.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <Link 
              to="/experts" 
              className="w-full sm:w-auto px-8 py-4 bg-[#0A210F] text-white text-sm uppercase tracking-wider font-semibold hover:bg-[#1a3d28] transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              START
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#0A210F] text-[#0A210F] text-sm uppercase tracking-wider font-semibold hover:bg-[#0A210F] hover:text-white transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
            >
              Get Early Access
            </button>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="py-8 pb-20 px-2 md:px-4 bg-[#F2FDFF]">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-lg shadow-[0_20px_40px_-15px_rgba(10,33,15,0.08)] border border-[#e5e5e5] overflow-hidden">
            <img 
              src="/screenshot.png" 
              alt="ExpertBrief Interface" 
              className="w-full h-auto block"
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Section One: Setting Expectations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A210F] leading-tight">
            Real disputes are messy. That's the point.
          </h2>
          <p className="text-xl text-[#4a4a4a] leading-relaxed mt-4">
            Emails don't line up. Drawings conflict. Records are incomplete. ExpertBrief drops you into that reality and lets you practise working through it safely.
          </p>
        </div>
      </section>

      {/* Section Two: How It Works */}
      <section className="pt-4 pb-16 bg-white">
        <div className="container mx-auto max-w-3xl px-6">
          <div className="space-y-12 mb-12">
            <div className="flex items-start gap-8">
              <div className="text-3xl font-bold font-mono shrink-0 text-[#0A210F]">1</div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A210F] mb-3">Choose a discipline</h3>
                <p className="text-lg text-[#4a4a4a] leading-relaxed">
                  MEP, Structural, or Delay with a full dispute dataset.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <div className="text-3xl font-bold font-mono shrink-0 text-[#0A210F]">2</div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A210F] mb-3">Analyse and draft</h3>
                <p className="text-lg text-[#4a4a4a] leading-relaxed">
                  Review the discovery material and build your report as the case unfolds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <div className="text-3xl font-bold font-mono shrink-0 text-[#0A210F]">3</div>
              <div>
                <h3 className="text-2xl font-bold text-[#0A210F] mb-3">Compare with reality</h3>
                <p className="text-lg text-[#4a4a4a] leading-relaxed">
                  See how your conclusions compare with the actual judgment and expert commentary.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <Link 
              to="/experts"
              className="inline-block px-8 py-4 bg-[#0A210F] text-white text-sm uppercase tracking-wider font-semibold hover:bg-[#1a3d28] transition-colors duration-300 rounded-lg"
            >
              Start your first simulation
            </Link>
          </div>
        </div>
      </section>

      {/* Early Access Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-[#0A210F]/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="bg-white relative w-full max-w-md p-8 rounded-lg shadow-2xl transform transition-all animate-fade-in-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#4a4a4a] hover:text-[#0A210F] transition-colors"
            >
              <IconX className="h-5 w-5" />
            </button>

            {formState === 'success' ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 bg-[#e8f5ed] text-[#0A210F] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0A210F] mb-2">You're on the list!</h3>
                <p className="text-[#4a4a4a] mb-8">We'll be in touch shortly with early access details.</p>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-[#0A210F] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#1a3d28]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#0A210F] mb-2">Request Early Access</h3>
                  <p className="text-[#4a4a4a] text-sm">Join the waitlist for new case simulations and expert tracks.</p>
                </div>

                <form onSubmit={handleJoinWaitlist} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a4a4a] mb-2">
                      Full Name
                    </label>
                    <input 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      className="w-full p-3 bg-slate-50 border border-[#e5e5e5] rounded-sm focus:border-[#0A210F] focus:ring-1 focus:ring-[#0A210F] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a4a4a] mb-2">
                      Email Address
                    </label>
                    <input 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      required
                      placeholder="jane@example.com"
                      className="w-full p-3 bg-slate-50 border border-[#e5e5e5] rounded-sm focus:border-[#0A210F] focus:ring-1 focus:ring-[#0A210F] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4a4a4a] mb-2">
                      Expertise Interest
                    </label>
                    <input 
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      type="text" 
                      required
                      placeholder="Delay, Fire, Quantum, MEP, Architecture..."
                      className="w-full p-3 bg-slate-50 border border-[#e5e5e5] rounded-sm focus:border-[#0A210F] focus:ring-1 focus:ring-[#0A210F] outline-none transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full mt-4 py-4 bg-[#0A210F] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#1a3d28] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? 'Submitting...' : 'Join Waitlist'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
