
import React, { useState } from 'react';
import { BookOpen, Search, Folder, ChevronRight, FileText, Sparkles, Filter, Gavel } from 'lucide-react';
import { ExamCategory } from '../types';

const StudyNotes: React.FC = () => {
  const subjects = [
    { name: 'Indian Polity', icon: '⚖️', topics: 12, category: ExamCategory.CIVIL_SERVICES },
    { name: 'Constitutional Law', icon: '📜', topics: 18, category: ExamCategory.LAW_STUDIES },
    { name: 'Legal Theory & Jurisprudence', icon: '🏛️', topics: 9, category: ExamCategory.LAW_STUDIES },
    { name: 'Organic Chemistry (Tondon)', icon: '🧪', topics: 22, category: ExamCategory.BOARDS_K12 },
    { name: 'Ancient History', icon: '🏺', topics: 8, category: ExamCategory.CIVIL_SERVICES },
    { name: 'Law of Torts', icon: '⚖️', topics: 14, category: ExamCategory.LAW_STUDIES },
    { name: 'Mathematics (Calculus)', icon: '📐', topics: 24, category: ExamCategory.BOARDS_K12 },
    { name: 'Modern Physics', icon: '⚛️', topics: 15, category: ExamCategory.ARMED_FORCES },
  ];

  const [search, setSearch] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 text-left">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">AI Study Hub</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Science (S.Chand/Tondon), Legal (LL.B), and Civil Exam notes built by AI.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search subjects or law notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium w-64 focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="h-4 w-4" />
            <span>Filter Category</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.filter(s => s.name.toLowerCase().includes(search.toLowerCase())).map((subject, i) => (
          <div key={i} className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-100/30 dark:hover:shadow-none cursor-pointer">
            <div className="flex items-start justify-between mb-8">
              <div className="text-5xl group-hover:scale-110 transition-transform duration-500">{subject.icon}</div>
              <div className={`p-2 rounded-xl transition-all ${
                subject.category === ExamCategory.LAW_STUDIES 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' 
                  : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30'
              }`}>
                {subject.category === ExamCategory.LAW_STUDIES ? <Gavel className="h-5 w-5" /> : <Folder className="h-5 w-5" />}
              </div>
            </div>
            
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 text-left">{subject.category}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors text-left">{subject.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8 text-left">{subject.topics} AI-Optimized Modules Available</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                <Sparkles className="h-3 w-3" />
                <span>Reference Validated</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}

        <div className="group bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center hover:border-indigo-300 transition-all cursor-pointer">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl shadow-sm mb-6">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Build New Subject</h4>
          <p className="text-sm text-slate-400 font-medium">Request specific LL.B or JEE/NEET notes from S.Chand series.</p>
        </div>
      </div>
      
      <div className="mt-16 p-10 bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 border border-indigo-100 dark:border-slate-700 rounded-[3rem] text-center shadow-xl shadow-slate-200/50 dark:shadow-none">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">The Complete Professional Library</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium mb-8">All legal references (V.N. Shukla/IPC) and science guides (S.Chand/Tondon) are updated daily by EduQuest Intelligence.</p>
        <button className="px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 hover:scale-105 transition-all">
          Explore Legal Wing
        </button>
      </div>
    </div>
  );
};

export default StudyNotes;
