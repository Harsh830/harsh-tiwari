
import React, { useState } from 'react';
import { HelpCircle, Send, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { solveDoubt } from '../services/geminiService';

const AIDoubts: React.FC = () => {
  const [subject, setSubject] = useState('General');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer(null);
    const result = await solveDoubt(subject, question);
    setAnswer(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl text-indigo-600 dark:text-indigo-400 mb-4">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Ask AI Doubts</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Get instant, logical solutions to any academic question.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-100 dark:shadow-none">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Subject</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 dark:text-white"
              >
                <option>History</option>
                <option>Polity</option>
                <option>Science</option>
                <option>Geography</option>
                <option>Mathematics</option>
                <option>Economics</option>
                <option>General</option>
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Your Question</label>
              <input 
                type="text"
                placeholder="Ex: Explain the significance of the 1857 revolt..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={isLoading || !question}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span>Solve My Doubt</span>
          </button>
        </form>

        {answer && (
          <div className="mt-12 p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/50">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-black uppercase tracking-widest">AI Expert Answer</span>
            </div>
            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {answer}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex items-center justify-center space-x-2 text-slate-400">
        <MessageCircle className="h-4 w-4" />
        <p className="text-xs font-bold uppercase tracking-widest italic">Powered by EduQuest AI Doubt Resolver</p>
      </div>
    </div>
  );
};

export default AIDoubts;
