
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, User, UserCircle, Settings2, Loader2, Minimize2 } from 'lucide-react';
import { JackAIGender, JackAIMessage } from '../types';
import { chatWithJack } from '../services/geminiService';

const JackAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [gender, setGender] = useState<JackAIGender>('male');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<JackAIMessage[]>([
    { role: 'model', text: "Hello! I'm Jack AI. How can I assist your studies today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [history, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await chatWithJack(userMsg, history, gender);
    setHistory(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 transition-all group flex items-center space-x-2"
      >
        <MessageSquare className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="font-bold pr-2">Ask Jack AI</span>
      </button>
    );
  }

  return (
    <div className={`fixed z-[60] transition-all duration-300 ${isMinimized ? 'bottom-8 right-8 w-72' : 'bottom-8 right-8 w-full max-w-md h-[600px]'} flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden`}>
      {/* Header */}
      <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-xl">
            {gender === 'male' ? <User className="h-5 w-5" /> : <UserCircle className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="font-bold leading-none">Jack AI</h3>
            <span className="text-[10px] opacity-75 uppercase tracking-widest">{gender} Mentor</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => {
              setGender(prev => prev === 'male' ? 'female' : 'male');
              setHistory(prev => [...prev, { role: 'model', text: `Switching to my ${gender === 'male' ? 'female' : 'male'} persona. How can I help you differently now?` }]);
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Toggle Gender"
          >
            <Settings2 className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl border border-slate-200 rounded-tl-none flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
                  <span className="text-xs text-slate-400 font-medium">Jack is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-2xl border border-slate-200 focus-within:border-indigo-300 focus-within:bg-white transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Jack anything about your exams..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 py-1 text-slate-700"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JackAI;
