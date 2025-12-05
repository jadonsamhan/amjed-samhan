import React from 'react';

interface HomeProps {
  onNavigate: (view: any) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-block p-2 px-4 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
          أهلاً بك في المستقبل
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 via-purple-400 to-white pb-2">
          شو هو "الستوديو" هذا؟
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Google AI Studio هو بيئة متطورة وسريعة تمكن المطورين من تجربة وبناء نماذج الذكاء الاصطناعي التوليدي (مثل Gemini) بسهولة. 
          <br className="hidden md:block"/>
          تخيل أنه "مختبر" حيث يمكنك التحدث مع الذكاء الاصطناعي، إرسال الصور له، وتجربة الأوامر المختلفة.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all group">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">معالجة النصوص</h3>
          <p className="text-slate-400 text-sm">
            القدرة على فهم وإنشاء نصوص معقدة، كتابة أكواد برمجية، وتلخيص المقالات بدقة عالية.
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all group">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
            <span className="text-2xl">👁️</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">تحليل الصور</h3>
          <p className="text-slate-400 text-sm">
            نماذج "متعددة الوسائط" يمكنها رؤية الصور وفهم محتواها والإجابة عن أسئلة تتعلق بها.
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all group">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">السرعة والكفاءة</h3>
          <p className="text-slate-400 text-sm">
            باستخدام نماذج Gemini 2.5 Flash، نحصل على استجابات سريعة جداً وتكلفة منخفضة.
          </p>
        </div>
      </div>

      {/* Call to Action to demos */}
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-4">جرب بنفسك الآن</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            لقد قمنا بدمج قدرات الستوديو في هذا التطبيق المصغر. اختر تجربة لتبدأ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             {/* Note: The parent component handles navigation, we just trigger it vaguely or let the user use the tabs */}
             <div className="text-sm text-slate-400">
                استخدم القائمة العلوية للتنقل بين "المحادثة الذكية" و "تحليل الصور"
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};