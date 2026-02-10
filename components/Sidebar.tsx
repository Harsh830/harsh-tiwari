
import React from 'react';
import { 
  Home, 
  Search, 
  LayoutDashboard, 
  Book, 
  Calendar, 
  Settings, 
  X, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  BookOpen,
  User as UserIcon,
  ChevronRight,
  HelpCircle,
  Newspaper,
  FileText
} from 'lucide-react';
import { ViewTab, ExamCategory, User } from '../types';

interface SidebarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen, user }) => {
  const menuItems = [
    { id: 'home', label: 'Home Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'search', label: 'Ask Jack AI', icon: <Search className="h-5 w-5" /> },
    { id: 'doubts', label: 'AI Doubt Solver', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'current-affairs', label: 'Daily Affairs', icon: <Newspaper className="h-5 w-5" /> },
    { id: 'notes', label: 'Study Notes', icon: <FileText className="h-5 w-5" /> },
    { id: 'dashboard', label: 'Active Courses', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'resources', label: 'Digital Library', icon: <Book className="h-5 w-5" /> },
    { id: 'planner', label: 'Study Planner', icon: <Calendar className="h-5 w-5" /> },
  ];

  const examShortcuts = [
    { label: 'UPSC / Civil Services', category: ExamCategory.CIVIL_SERVICES, icon: <ShieldCheck className="h-4 w-4" /> },
    { label: 'Armed Forces Prep', category: ExamCategory.ARMED_FORCES, icon: <Award className="h-4 w-4" /> },
    { label: 'State & Central Boards', category: ExamCategory.BOARDS_K12, icon: <BookOpen className="h-4 w-4" /> },
  ];

  const navItemClass = (id: string) => `
    flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all mb-1.5
    ${activeTab === id 
      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-none ring-4 ring-indigo-50 dark:ring-indigo-900/20' 
      : 'text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'}
  `;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-[101] transition-transform duration-500 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block
      `}>
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="p-8 pb-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-none">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">EduQuest</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>

          {/* User Profile Summary (If Logged In) */}
          {user && (
            <div className="px-6 py-4">
              <button 
                onClick={() => setActiveTab('settings')}
                className="w-full flex items-center p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all group"
              >
                <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-black uppercase text-sm border border-white dark:border-slate-700 shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="ml-3 flex-1 text-left">
                  <p className="text-xs font-black text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Scholar Profile</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </button>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
            <div className="mb-8">
              <p className="px-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Study Corner</p>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as ViewTab);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={navItemClass(item.id)}
                >
                  <div className={`${activeTab === item.id ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mb-8">
              <p className="px-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Exams Hub</p>
              {examShortcuts.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveTab('dashboard');
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all mb-1 group"
                >
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div>
              <p className="px-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Preferences</p>
              <button
                onClick={() => {
                  setActiveTab('settings');
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={navItemClass('settings')}
              >
                <Settings className={`${activeTab === 'settings' ? 'text-white' : 'text-slate-400 dark:text-slate-500'} h-5 w-5`} />
                <span>Account Settings</span>
              </button>
            </div>
          </nav>

          {/* Footer Branding */}
          <div className="p-6 m-4 bg-slate-900 dark:bg-slate-950 rounded-3xl border border-white/5">
            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">Founded By</p>
            <p className="text-sm font-black text-white uppercase tracking-tight">HARSH TIWARI</p>
            <a 
              href="https://www.EduQuest.HT.com" 
              target="_blank" 
              className="text-[10px] text-slate-500 hover:text-indigo-300 mt-2 flex items-center space-x-1.5 transition-colors"
            >
              <Award className="h-3 w-3" />
              <span className="truncate">EduQuest.HT.com</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
