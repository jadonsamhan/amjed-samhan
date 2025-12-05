import React, { useState } from 'react';
import { AppView } from './types';
import { ChatDemo } from './components/ChatDemo';
import { VisionDemo } from './components/VisionDemo';
import { Home } from './components/Home';
import { FeatureCard } from './components/FeatureCard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderContent = () => {
    switch (currentView) {
      case AppView.CHAT:
        return <ChatDemo />;
      case AppView.VISION:
        return <VisionDemo />;
      case AppView.HOME:
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-20">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            onClick={() => setCurrentView(AppView.HOME)}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-bold text-white text-lg">G</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Gemini Studio</span>
          </div>

          <div className="flex gap-1 bg-slate-900/50 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setCurrentView(AppView.HOME)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === AppView.HOME ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setCurrentView(AppView.CHAT)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === AppView.CHAT ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              محادثة ذكية
            </button>
            <button
              onClick={() => setCurrentView(AppView.VISION)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentView === AppView.VISION ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              تحليل الصور
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 mt-12 text-center text-slate-600 text-sm border-t border-white/5">
        <p>
          تم التطوير باستخدام React, Tailwind و Google Gemini API. 
        </p>
        <p className="mt-2 text-xs">
          هذا التطبيق مخصص للأغراض التعليمية لتوضيح إمكانيات "الستوديو".
        </p>
      </footer>
    </div>
  );
}