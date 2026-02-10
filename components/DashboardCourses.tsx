
import React from 'react';
import { BookOpen, ChevronRight, PlayCircle, Gavel } from 'lucide-react';
import { Course, ExamCategory } from '../types';

const MOCK_COURSES: Course[] = [
  { id: '1', title: 'UPSC Indian Polity', category: ExamCategory.CIVIL_SERVICES, description: 'Comprehensive guide based on M. Laxmikanth.', thumbnail: '🏛️', progress: 45 },
  { id: '2', title: 'Constitutional Law I', category: ExamCategory.LAW_STUDIES, description: 'Fundamental Rights and Duties (V.N. Shukla Ref).', thumbnail: '📜', progress: 10 },
  { id: '3', title: 'Organic Chemistry Prep', category: ExamCategory.BOARDS_K12, description: 'Advanced mechanisms from O.P. Tandon.', thumbnail: '🧪', progress: 12 },
  { id: '4', title: 'CBSE Class 12 Math', category: ExamCategory.BOARDS_K12, description: 'S.Chand Calculus & Algebra modules.', thumbnail: '🔢', progress: 88 },
  { id: '5', title: 'NDA Physics Mastery', category: ExamCategory.ARMED_FORCES, description: 'Class 11 & 12 Physics for Armed Forces.', thumbnail: '⚡', progress: 5 },
];

const DashboardCourses: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-end mb-8 text-left">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Academic Journey</h2>
          <p className="text-slate-500 dark:text-slate-400">Continue your path in Law, Science, or Civil Exams.</p>
        </div>
        <button className="text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-widest hover:underline flex items-center">
          Full Catalog <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {MOCK_COURSES.map((course) => (
          <div key={course.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-xl dark:hover:shadow-none transition-all group border-b-4 hover:border-b-indigo-500">
            <div className={`h-32 flex items-center justify-center text-5xl transition-transform group-hover:scale-125 duration-500 ${
              course.category === ExamCategory.LAW_STUDIES ? 'bg-emerald-50 dark:bg-emerald-950/20' : 'bg-indigo-50 dark:bg-indigo-950/20'
            }`}>
              {course.thumbnail}
            </div>
            <div className="p-6 text-left">
              <span className={`text-[9px] font-black uppercase tracking-widest block mb-2 px-2 py-1 rounded-lg w-fit ${
                course.category === ExamCategory.LAW_STUDIES 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' 
                  : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30'
              }`}>
                {course.category}
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 font-medium">{course.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <button className="w-full mt-8 flex items-center justify-center space-x-2 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-100 dark:shadow-none group-hover:scale-[1.02]">
                <PlayCircle className="h-4 w-4" />
                <span>{course.progress > 0 ? 'Resume' : 'Enroll Free'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCourses;
