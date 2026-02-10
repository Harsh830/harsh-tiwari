
import React from 'react';
import { Search, Sparkles, Gift } from 'lucide-react';
import { ExamCategory, EducationBoard } from '../types';

interface HeroProps {
  onSearch: (query: string) => void;
  category: ExamCategory;
  setCategory: (c: ExamCategory) => void;
  board: EducationBoard;
  setBoard: (b: EducationBoard) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, category, setCategory, board, setBoard, isLoading }) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  return (
    <div className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm animate-pulse">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Knowledge Hub
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-widest">
            <Gift className="h-3 w-3 mr-1.5" />
            100% Free Educational Resource
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Everything You Need to <br />
          <span className="text-indigo-600">Ace Your Exams.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10">
          Tailored learning for UPSC, Armed Forces, and School Boards (CBSE, ICSE, UP, MP, and more). Search any topic and generate study tools for free.
        </p>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl border border-slate-200">
            <div className="flex-1 flex items-center px-4">
              <Search className="h-5 w-5 text-slate-400 mr-3" />
              <input
                type="text"
                className="w-full focus:outline-none text-slate-700 bg-transparent py-3"
                placeholder="Search subjects, exams, or syllabus... e.g., UPSC History Notes"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? 'Searching...' : 'Search Free'}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-slate-500">Category:</span>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value as ExamCategory)}
              className="bg-transparent focus:outline-none text-indigo-600 cursor-pointer"
            >
              {Object.values(ExamCategory).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-slate-500">Board/Exam:</span>
            <select 
              value={board} 
              onChange={(e) => setBoard(e.target.value as EducationBoard)}
              className="bg-transparent focus:outline-none text-indigo-600 cursor-pointer"
            >
              {Object.values(EducationBoard).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
