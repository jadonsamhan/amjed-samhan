import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, onClick, active }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        p-6 rounded-2xl border transition-all duration-300 cursor-pointer
        ${active 
          ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500 shadow-lg shadow-blue-500/20' 
          : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
        }
      `}
    >
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl
        ${active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}
      `}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};