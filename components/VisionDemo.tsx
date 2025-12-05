import React, { useState, useRef } from 'react';
import { generateVisionResponse } from '../services/geminiService';

export const VisionDemo: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('الرجاء اختيار ملف صورة صالح');
        return;
      }

      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove data URL prefix (data:image/xxx;base64,) to get raw base64
        const resultStr = reader.result as string;
        setImage(resultStr);
        setResult(''); // Clear previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image || loading) return;

    setLoading(true);
    setResult('');

    try {
      // Extract pure base64
      const base64Data = image.split(',')[1];
      const response = await generateVisionResponse(prompt, base64Data, mimeType);
      setResult(response);
    } catch (error) {
      setResult("حدث خطأ أثناء معالجة الصورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Upload Section */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            مدخلات الصورة
          </h3>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              flex-1 min-h-[250px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group
              ${image ? 'border-purple-500/50' : 'border-slate-600 hover:border-purple-400 hover:bg-slate-800'}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            
            {image ? (
              <img src={image} alt="Uploaded" className="absolute inset-0 w-full h-full object-contain bg-black/50 p-2" />
            ) : (
              <div className="text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-slate-500 mb-2 group-hover:text-purple-400 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p className="text-slate-400 group-hover:text-slate-200">اضغط لرفع صورة</p>
                <p className="text-xs text-slate-600 mt-2">JPG, PNG, WEBP</p>
              </div>
            )}
            
            {image && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                 انقر للتغيير
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">ماذا تريد أن تعرف عن الصورة؟</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثال: صف مكونات هذه الصورة بالتفصيل..."
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 h-24 resize-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className={`w-full py-3 rounded-xl font-bold transition-all ${
              !image || loading
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/20'
            }`}
          >
            {loading ? 'جاري التحليل...' : 'تحليل الصورة'}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 flex flex-col h-full min-h-[400px]">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            تحليل Gemini
          </h3>
          
          <div className="flex-1 bg-slate-800/50 rounded-xl p-4 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="animate-pulse">جاري قراءة تفاصيل الصورة...</p>
              </div>
            ) : result ? (
              <div className="prose prose-invert prose-sm max-w-none text-slate-200 leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <p>ستظهر نتيجة التحليل هنا</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};