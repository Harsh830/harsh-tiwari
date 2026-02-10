
import React from 'react';
import { FileText, Link as LinkIcon, Download, Share2, Clipboard } from 'lucide-react';

interface ResourceResultProps {
  title: string;
  content: string;
  sources: { title: string; uri: string }[];
  onAction: (type: 'Quiz' | 'Plan' | 'Summary') => void;
  isActionLoading: boolean;
}

const ResourceResult: React.FC<ResourceResultProps> = ({ title, content, sources, onAction, isActionLoading }) => {
  const formattedContent = content.split('\n').map((line, i) => {
    if (line.startsWith('###')) return <h3 key={i} className="text-xl font-bold mt-4 mb-2 text-slate-800">{line.replace('###', '')}</h3>;
    if (line.startsWith('##')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3 text-slate-900 border-b pb-2">{line.replace('##', '')}</h2>;
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) return <li key={i} className="ml-4 list-disc text-slate-700 my-1">{line.replace(/^[\s*-]+/, '')}</li>;
    return <p key={i} className="text-slate-600 leading-relaxed mb-3">{line}</p>;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Header Action Bar */}
        <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium">
            <FileText className="h-4 w-4" />
            <span>Search Result</span>
          </div>
          <div className="flex space-x-2">
             <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-indigo-600" title="Copy to clipboard">
               <Clipboard className="h-5 w-5" />
             </button>
             <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-indigo-600" title="Download as PDF">
               <Download className="h-5 w-5" />
             </button>
             <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-indigo-600" title="Share link">
               <Share2 className="h-5 w-5" />
             </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8">{title}</h1>
          <div className="prose prose-slate max-w-none">
            {formattedContent}
          </div>

          {sources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                Verified Sources & References
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sources.map((source, idx) => (
                  <li key={idx}>
                    <a 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all border border-transparent hover:border-indigo-200 group"
                    >
                      <span className="text-sm font-medium truncate flex-1">{source.title}</span>
                      <LinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 ml-2" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Quick Tools Footer */}
        <div className="bg-indigo-600 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h3 className="text-xl font-bold mb-1">Make it your own!</h3>
            <p className="text-indigo-100 opacity-90">Generate custom study tools based on this topic.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => onAction('Quiz')}
              disabled={isActionLoading}
              className="px-5 py-2.5 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-md disabled:opacity-50"
            >
              Generate Quiz
            </button>
            <button 
              onClick={() => onAction('Plan')}
              disabled={isActionLoading}
              className="px-5 py-2.5 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-400 transition-all shadow-md border border-indigo-400 disabled:opacity-50"
            >
              Create Study Plan
            </button>
            <button 
              onClick={() => onAction('Summary')}
              disabled={isActionLoading}
              className="px-5 py-2.5 bg-indigo-700 text-indigo-100 rounded-xl font-bold hover:bg-indigo-800 transition-all shadow-md disabled:opacity-50"
            >
              Expert Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceResult;
