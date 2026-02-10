
import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, RefreshCw, Loader2, Bookmark, Share2 } from 'lucide-react';
import { getDailyCurrentAffairs } from '../services/geminiService';

const CurrentAffairs: React.FC = () => {
  const [news, setNews] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const fetchNews = async () => {
    setIsLoading(true);
    const result = await getDailyCurrentAffairs();
    setNews(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Newspaper className="h-3 w-3 mr-1.5" />
            Live Updates
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Daily Current Affairs</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Updates for {today}
          </p>
        </div>
        <button 
          onClick={fetchNews}
          disabled={isLoading}
          className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          <span>Refresh Updates</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-sm">
          <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Scanning verified news sources...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] overflow-hidden shadow-sm">
          <div className="p-8 sm:p-12 prose dark:prose-invert max-w-none whitespace-pre-wrap text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {news}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 flex justify-between items-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Source: EduQuest News Grounding</p>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-400 transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 p-8 bg-indigo-600 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black mb-1">Prepare for UPSP/SSC?</h3>
          <p className="text-indigo-100 font-medium opacity-90">Get personalized news analysis for your specific exam.</p>
        </div>
        <button className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl">
          Start Analysis
        </button>
      </div>
    </div>
  );
};

export default CurrentAffairs;
