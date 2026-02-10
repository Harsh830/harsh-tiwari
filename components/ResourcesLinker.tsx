
import React from 'react';
import { Book, ExternalLink, Download, FileText, Gavel } from 'lucide-react';
import { FreeResource } from '../types';

const MOCK_RESOURCES: FreeResource[] = [
  { id: 'r1', title: 'NCERT Class 12 History - Full Set', type: 'NCERT', courseId: '1', link: 'https://ncert.nic.in/textbook.php' },
  { id: 'r2', title: 'S. Chand Physics (Class 11)', type: 'Reference', courseId: '2', link: '#' },
  { id: 'r3', title: 'O.P. Tandon Organic Chemistry', type: 'Reference', courseId: '2', link: '#' },
  { id: 'r4', title: 'Constitutional Law - V.N. Shukla', type: 'Legal Text', courseId: '5', link: '#' },
  { id: 'r5', title: 'Indian Penal Code - Ratanlal & Dhirajlal', type: 'Legal Text', courseId: '5', link: '#' },
  { id: 'r6', title: 'Modern ABC of Biology - 12th', type: 'Reference', courseId: '3', link: '#' },
  { id: 'r7', title: 'UP Board Class 12 Math Solution', type: 'Guide', courseId: '3', link: '#' },
];

const ResourcesLinker: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Digital Library</h2>
        <p className="text-slate-500 dark:text-slate-400">Free books, NCERTs, Legal Texts, and Science Guides by Mr. Harsh Tiwari.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center mb-6">
            <Book className="h-5 w-5 mr-2 text-indigo-600" />
            Core Academic References
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_RESOURCES.map((res) => (
              <a 
                key={res.id} 
                href={res.link} 
                target="_blank" 
                className="flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all group"
              >
                <div className={`p-3 rounded-xl mr-4 ${
                  res.type === 'NCERT' ? 'bg-amber-50 text-amber-600' : 
                  res.type === 'Legal Text' ? 'bg-emerald-50 text-emerald-600' : 
                  'bg-blue-50 text-blue-600'
                }`}>
                  {res.type === 'Legal Text' ? <Gavel className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                </div>
                <div className="flex-1 overflow-hidden text-left">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{res.type}</p>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{res.title}</h4>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 ml-2" />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900 dark:bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Download className="h-32 w-32" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Offline Access</h3>
          <p className="text-indigo-100 dark:text-slate-400 mb-8 leading-relaxed">
            Download curated bundles for B.A.LL.B, Science (PCMB), and Armed Forces to study without interruption.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-sm font-medium">
              <div className="h-2 w-2 rounded-full bg-indigo-400 mr-3" />
              Constitutional Law & Torts Notes
            </li>
            <li className="flex items-center text-sm font-medium">
              <div className="h-2 w-2 rounded-full bg-indigo-400 mr-3" />
              S.Chand & Tondon Physics/Chem Set
            </li>
            <li className="flex items-center text-sm font-medium">
              <div className="h-2 w-2 rounded-full bg-indigo-400 mr-3" />
              Civil Services NCERT Master Bundle
            </li>
          </ul>
          <button className="w-full bg-white dark:bg-indigo-600 text-indigo-900 dark:text-white py-4 rounded-xl font-bold hover:bg-indigo-50 dark:hover:bg-indigo-700 transition-colors shadow-lg">
            Bulk Download (PDFs)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesLinker;
