
import React from 'react';
import { User, Bell, Shield, Smartphone, LogOut, ChevronRight, Moon, Globe } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsProps {
  user: UserType | null;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 mt-2">Manage your account and app preferences.</p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-8 flex items-center space-x-6 border-b border-slate-100">
            <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl uppercase shadow-inner">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
              <p className="text-slate-500">{user.email}</p>
              <button className="mt-2 text-sm font-bold text-indigo-600 hover:underline">Edit Profile</button>
            </div>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <Bell className="h-5 w-5 text-amber-500" />, title: 'Notifications', desc: 'Manage alerts & reminders' },
              { icon: <Shield className="h-5 w-5 text-emerald-500" />, title: 'Privacy & Security', desc: 'Secure your study data' },
              { icon: <Smartphone className="h-5 w-5 text-blue-500" />, title: 'Device Management', desc: 'Linked browsers & apps' },
              { icon: <Moon className="h-5 w-5 text-purple-500" />, title: 'Dark Mode', desc: 'System preference (Auto)', toggle: true },
            ].map((item, i) => (
              <button key={i} className="flex items-center p-4 hover:bg-slate-50 rounded-2xl transition-colors group text-left">
                <div className="p-3 bg-white border border-slate-100 rounded-xl mr-4 group-hover:border-indigo-200">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-400" />
              </button>
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <div className="flex justify-center pt-8">
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-8 py-3 rounded-2xl text-rose-600 font-bold hover:bg-rose-50 transition-all border border-rose-100"
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out of EduQuest</span>
          </button>
        </div>

        <div className="flex flex-col items-center space-y-2 mt-8">
          <a 
            href="https://www.EduQuest.HT.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-indigo-600 font-bold text-sm hover:underline"
          >
            <Globe className="h-4 w-4" />
            <span>www.EduQuest.HT.com</span>
          </a>
          <div className="text-center text-xs text-slate-400 font-medium">
            App Version 2.0.4 • Powered by Gemini 3 • Created by Mr. Harsh Tiwari
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
