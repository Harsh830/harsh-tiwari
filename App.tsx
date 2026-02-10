
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import ResourceResult from './components/ResourceResult';
import DashboardStats from './components/DashboardStats';
import DashboardCourses from './components/DashboardCourses';
import ResourcesLinker from './components/ResourcesLinker';
import PlannerSubscription from './components/PlannerSubscription';
import JackAI from './components/JackAI';
import Auth from './components/Auth';
import Settings from './components/Settings';
import Home from './components/Home';
import AIDoubts from './components/AIDoubts';
import CurrentAffairs from './components/CurrentAffairs';
import StudyNotes from './components/StudyNotes';
import { ExamCategory, EducationBoard, SearchState, ViewTab, User, AuthMode } from './types';
import { searchEducationalContent, generateStudyTool } from './services/geminiService';
import { Loader2, BookOpen, Heart, Sparkles, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('home');
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const [search, setSearch] = useState<SearchState>({
    query: '',
    isLoading: false,
    category: ExamCategory.CIVIL_SERVICES,
    board: EducationBoard.CBSE
  });

  const [result, setResult] = useState<{ title: string; text: string; sources: any[] } | null>(null);
  const [isToolLoading, setIsToolLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setActiveTab('search');
    setSearch(prev => ({ ...prev, query, isLoading: true }));
    try {
      const data = await searchEducationalContent(query, search.category, search.board);
      setResult({ title: query, text: data.text, sources: data.sources });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      alert("Something went wrong during the search. Please check your internet connection.");
    } finally {
      setSearch(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleToolAction = async (type: 'Quiz' | 'Plan' | 'Summary') => {
    if (!result) return;
    setIsToolLoading(true);
    try {
      const content = await generateStudyTool(result.title, type, search.category, search.board);
      setResult(prev => prev ? ({
        ...prev,
        title: `${type}: ${prev.title}`,
        text: content || "No data returned."
      }) : null);
    } catch (err) {
      alert("Failed to generate tool. Please try again.");
    } finally {
      setIsToolLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
    setResult(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home user={user} setActiveTab={setActiveTab} />;
      case 'doubts':
        return <AIDoubts />;
      case 'current-affairs':
        return <CurrentAffairs />;
      case 'notes':
        return <StudyNotes />;
      case 'dashboard':
        return (
          <>
            <DashboardCourses />
            <DashboardStats />
          </>
        );
      case 'resources':
        return <ResourcesLinker />;
      case 'planner':
        return <PlannerSubscription />;
      case 'settings':
        return <Settings user={user} onLogout={handleLogout} />;
      case 'search':
      default:
        return (
          <>
            <Hero 
              isLoading={search.isLoading}
              onSearch={handleSearch}
              category={search.category}
              setCategory={(c) => setSearch(prev => ({ ...prev, category: c }))}
              board={search.board}
              setBoard={(b) => setSearch(prev => ({ ...prev, board: b }))}
            />

            {search.isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
                <p className="text-slate-500 dark:text-slate-400 font-medium font-bold uppercase tracking-[0.2em] text-[10px]">Gathering Knowledge...</p>
              </div>
            ) : result ? (
              <ResourceResult 
                title={result.title}
                content={result.text}
                sources={result.sources}
                onAction={handleToolAction}
                isActionLoading={isToolLoading}
              />
            ) : (
              <section className="max-w-4xl mx-auto px-4 pb-20">
                <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 border border-indigo-100 dark:border-slate-800 rounded-[3rem] p-12 flex flex-col sm:flex-row items-center justify-between gap-10 shadow-2xl shadow-indigo-50 dark:shadow-none">
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-black text-indigo-950 dark:text-white flex items-center justify-center sm:justify-start">
                      <Sparkles className="h-8 w-8 mr-3 text-indigo-600" />
                      Ready to start?
                    </h2>
                    <p className="text-indigo-700/70 dark:text-slate-400 mt-3 font-medium text-lg leading-relaxed">Access 1,000+ free expert modules for UPSC and State Exams instantly.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-indigo-700 hover:scale-105 transition-all shadow-2xl shadow-indigo-200 dark:shadow-none whitespace-nowrap"
                  >
                    Go to My Exams
                  </button>
                </div>
              </section>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-slate-950 selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-500/30 flex transition-colors duration-300">
      {/* Persistent Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header 
          setActiveTab={setActiveTab} 
          user={user}
          onAuth={setAuthMode}
          onLogout={handleLogout}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        <main className="flex-1">
          {renderContent()}

          {activeTab === 'search' && !result && !search.isLoading && (
            <section className="max-w-7xl mx-auto px-6 sm:px-12 py-24">
              <div className="text-center mb-20">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">Domain Selection</p>
                <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">Choose Your Path</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto font-medium">Free preparation for India's most challenging exams, delivered by AI intelligence.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                  { 
                    title: 'Civil Services', 
                    desc: 'IAS, IPS, and State PSC material including specialized Ethics and CSAT prep.',
                    icon: '🏛️'
                  },
                  { 
                    title: 'Armed Forces', 
                    desc: 'Comprehensive NDA, CDS, AFCAT notes with Math and GAT focus.',
                    icon: '🎖️'
                  },
                  { 
                    title: 'School Boards', 
                    desc: 'Support for CBSE, ICSE, UP, MP, MH and all state boards for 10th & 12th.',
                    icon: '📚'
                  }
                ].map((card, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveTab('dashboard')}
                    className="group bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all hover:shadow-[0_32px_64px_-16px_rgba(99,102,241,0.1)] dark:hover:shadow-none cursor-pointer"
                  >
                    <div className="text-6xl mb-10 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-500 inline-block">{card.icon}</div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">{card.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 font-medium text-lg">{card.desc}</p>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-widest group-hover:translate-x-4 transition-transform">
                      Unlock Access
                      <span className="ml-3 text-xl">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-24 px-8 mt-auto border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex justify-center items-center space-x-3 mb-10">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-500/20">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter">EduQuest Hub</span>
            </div>
            
            <div className="mb-16 p-12 rounded-[3.5rem] bg-white/[0.03] border border-white/[0.08] max-w-3xl mx-auto backdrop-blur-xl">
              <p className="text-indigo-400 font-black mb-4 uppercase tracking-[0.3em] text-[10px]">
                Founded & Optimized By
              </p>
              <h4 className="text-4xl font-black text-white uppercase tracking-tight mb-6">
                MR. HARSH TIWARI
              </h4>
              <a 
                href="https://www.EduQuest.HT.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 text-indigo-400 hover:text-white transition-all font-black text-xl hover:scale-105"
              >
                <Globe className="h-6 w-6" />
                <span>www.EduQuest.HT.com</span>
              </a>
              <p className="text-lg mt-8 text-slate-500 max-w-lg mx-auto leading-relaxed font-medium italic">
                "Our mission is simple: To empower every student in India with premium educational tools, absolutely for free."
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10 text-sm font-black uppercase tracking-widest mb-16">
              <button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors">Digital Library</button>
              <button onClick={() => setActiveTab('planner')} className="hover:text-white transition-colors">Study Planner</button>
              <button onClick={() => setActiveTab('settings')} className="hover:text-white transition-colors">Privacy Hub</button>
              <a href="mailto:support@eduquest.ht.com" className="hover:text-white transition-colors">Contact Founder</a>
            </div>
            
            <div className="flex flex-col items-center pt-12 border-t border-white/5">
              <p className="text-[10px] opacity-40 flex items-center tracking-[0.3em] uppercase font-black">
                Crafted with <Heart className="h-4 w-4 text-rose-500 mx-3 fill-rose-500" /> by MR. HARSH TIWARI
              </p>
              <p className="mt-6 text-[9px] opacity-20 uppercase font-black tracking-[0.5em]">© 2024 EduQuest HT Hub • Progressive Web Experience</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Jack AI Assistant */}
      <JackAI />

      {/* Auth Modal */}
      <Auth 
        mode={authMode} 
        onClose={() => setAuthMode(null)} 
        onSuccess={(newUser) => {
          setUser(newUser);
          setAuthMode(null);
          setActiveTab('home');
        }} 
      />
    </div>
  );
};

export default App;
