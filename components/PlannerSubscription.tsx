
import React, { useState } from 'react';
import { Calendar, Clock, Lock, Sparkles, CreditCard, CheckCircle2 } from 'lucide-react';

const PlannerSubscription: React.FC = () => {
  const [showSubscription, setShowSubscription] = useState(false);
  
  // Trial logic simulation
  const daysRemainingInTrial = 364;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Planner View */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 flex items-center">
                  <Calendar className="h-8 w-8 mr-3 text-indigo-600" />
                  Smart Planner
                </h2>
                <p className="text-slate-500 mt-1">AI-optimized schedule for your upcoming exams.</p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-100">
                <Clock className="h-4 w-4" />
                <span>{daysRemainingInTrial} Days Free Trial Left</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-7 gap-4 mb-8">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{d}</div>
                ))}
                {Array.from({ length: 31 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-12 flex items-center justify-center rounded-xl text-sm font-medium cursor-pointer transition-all ${
                      i + 1 === 15 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Today's Schedule</h4>
                <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-white bg-indigo-600 shadow-sm" />
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-indigo-600 mb-1">08:00 AM - 10:00 AM</p>
                      <h5 className="font-bold text-slate-900">UPSC Polity Revision</h5>
                      <p className="text-sm text-slate-500 mt-1">Focus on Fundamental Rights and Directive Principles.</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[37px] top-1 h-4 w-4 rounded-full border-4 border-white bg-slate-300 shadow-sm" />
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 opacity-60">
                      <p className="text-xs font-bold text-slate-400 mb-1">11:00 AM - 01:00 PM</p>
                      <h5 className="font-bold text-slate-900">Armed Forces Physical Drill</h5>
                      <p className="text-sm text-slate-500 mt-1">Light cardio and 5km run tracking.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Subscription Info */}
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
            <Sparkles className="h-10 w-10 mb-6 text-indigo-200" />
            <h3 className="text-2xl font-bold mb-4">EduQuest Premium</h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Unlock advanced AI analytics, 1-on-1 mentorship sessions, and exclusive mock tests.
            </p>
            
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Current Plan</span>
                <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Trial</span>
              </div>
              <p className="text-lg font-bold">1 Year Free Trail</p>
              <p className="text-xs text-indigo-200 mt-1">Activated: Jan 2024</p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                "Unlimited AI Queries",
                "Personalized Roadmap",
                "State Board Exclusives",
                "Civil Exam Checklists"
              ].map((item, i) => (
                <div key={i} className="flex items-center text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3 mr-2 text-indigo-300" />
                  {item}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowSubscription(true)}
              className="w-full py-4 bg-white text-indigo-700 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-4 w-4" />
              <span>Renew Now</span>
            </button>
            <p className="text-[10px] text-center text-indigo-300 mt-4 uppercase font-bold tracking-widest">
              Renew for $3 / 2 Months
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Modal Overlay */}
      {showSubscription && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-8 text-center bg-indigo-50">
              <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Lock className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Renew Subscription</h4>
              <p className="text-slate-500 mt-2">By Mr. Harsh Tiwari</p>
            </div>
            <div className="p-8">
              <div className="p-4 rounded-2xl border-2 border-indigo-600 bg-indigo-50/50 flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Premium Access</p>
                  <p className="text-lg font-bold text-slate-900">2 Months Pack</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-slate-900">$3.00</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Billed Bi-Monthly</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8 text-sm text-slate-600">
                <p>• Continues after 1 year free trial</p>
                <p>• Cancel anytime from settings</p>
                <p>• 24/7 Academic Support included</p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowSubscription(false)}
                  className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                  Pay with Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannerSubscription;
