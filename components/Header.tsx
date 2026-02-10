
import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Bell, 
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { ViewTab, User } from '../types';

interface HeaderProps {
  setActiveTab: (tab: ViewTab) => void;
  user: User | null;
  onAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  toggleSidebar: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  setActiveTab, user, onAuth, onLogout, toggleSidebar, darkMode, setDarkMode 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-[90] glass-effect border-b border-slate-200 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors lg:hidden"
            >
              <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-80 transition-opacity flex items-center">
                EduQuest
                <Globe className="h-3 w-3 ml-1.5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-all"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button 
              onClick={() => setActiveTab('search')}
              className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm font-medium">Search exams...</span>
            </button>

            <button className="hidden md:block p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-all relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>

             {user ? (
               <div className="relative">
                 <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 pl-2 pr-3 py-1 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl transition-all group"
                 >
                   <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                     {user.name.charAt(0)}
                   </div>
                   <ChevronDown className={`h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                 </button>

                 {showDropdown && (
                   <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                     <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold uppercase">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                          </div>
                        </div>
                     </div>
                     <div className="p-2">
                       <button 
                        onClick={() => { setActiveTab('settings'); setShowDropdown(false); }}
                        className="w-full flex items-center space-x-3 p-3 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 rounded-2xl transition-all font-bold text-sm"
                       >
                         <Settings className="h-4 w-4" />
                         <span>Account Settings</span>
                       </button>
                       <button 
                        onClick={() => { onLogout(); setShowDropdown(false); }}
                        className="w-full flex items-center space-x-3 p-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-2xl transition-all font-bold text-sm"
                       >
                         <LogOut className="h-4 w-4" />
                         <span>Logout</span>
                       </button>
                     </div>
                   </div>
                 )}
               </div>
             ) : (
               <div className="flex items-center space-x-2">
                 <button 
                  onClick={() => onAuth('login')}
                  className="hidden sm:block px-5 py-2 text-indigo-600 font-bold text-sm hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                 >
                   Log In
                 </button>
                 <button 
                  onClick={() => onAuth('signup')}
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                 >
                   Sign Up
                 </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
