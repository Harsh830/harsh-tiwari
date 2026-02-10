
import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Clock,
  ShieldCheck,
  Star
} from 'lucide-react';
import { ViewTab, User } from '../types';

interface HomeProps {
  user: User | null;
  setActiveTab: (tab: ViewTab) => void;
}

const Home: React.FC<HomeProps> = ({ user, setActiveTab }) => {
  return (
    <div className="p-4 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-700 rounded-[2rem] p-8 sm:p-12 text-white shadow-2xl shadow-indigo-100">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-indigo-100 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="h-3 w-3 mr-2" />
            Empowering Your Future
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            Welcome back, <br />
            <span className="text-indigo-200">{user?.name || 'Scholar'}!</span>
          </h1>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed opacity-90">
            Your journey to success is fueled by consistency. You've completed 4 modules this week. Ready for the next one?
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setActiveTab('search')}
              className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center shadow-lg"
            >
              Start Studying
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => setActiveTab('planner')}
              className="px-8 py-4 bg-indigo-500/30 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              View Planner
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 hidden lg:block">
          <BookOpen className="h-64 w-64" />
        </div>
      </section>

      {/* Grid Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Progress */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Study Streak</h3>
          <p className="text-slate-500 text-sm mb-4">You're on a 5-day study streak! Keep it up.</p>
          <div className="h-2 w-full bg-slate-100 rounded-full">
            <div className="h-2 bg-amber-500 rounded-full w-[70%]" />
          </div>
        </div>

        {/* Next Exam */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Clock className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Active</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Next Milestone</h3>
          <p className="text-slate-500 text-sm mb-4">UPSC Prelims Mock Test #4 is scheduled for tomorrow.</p>
          <button onClick={() => setActiveTab('planner')} className="text-sm font-bold text-indigo-600 hover:underline">Manage Planner</button>
        </div>

        {/* Top Performer */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Trophy className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Gold</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Knowledge Points</h3>
          <p className="text-slate-500 text-sm mb-4">You have earned 1,240 XP. Top 5% of students this month.</p>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">+12</div>
          </div>
        </div>
      </div>

      {/* Featured Exams Selection */}
      <section className="py-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <ShieldCheck className="h-6 w-6 mr-2 text-indigo-600" />
          Featured Academic Paths
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Civil Services', icon: '🏛️', count: '142 Modules' },
            { title: 'Armed Forces', icon: '🎖️', count: '89 Modules' },
            { title: 'CBSE Boards', icon: '📚', count: '210 Modules' },
            { title: 'State Boards', icon: '📝', count: '156 Modules' },
          ].map((item, i) => (
            <button 
              key={i}
              onClick={() => setActiveTab('dashboard')}
              className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-indigo-500 hover:shadow-lg transition-all text-left group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h4 className="font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.count}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Recommended Section */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 p-8 opacity-20 rotate-12">
          <Star className="h-48 w-48 text-indigo-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Curated by Mr. Harsh Tiwari</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              "Education is the most powerful weapon which you can use to change the world. We provide premium tools, for everyone, absolutely free."
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('resources')}
            className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:scale-105 transition-transform"
          >
            Access Free Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
