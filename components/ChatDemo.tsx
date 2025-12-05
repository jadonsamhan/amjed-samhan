import React, { useState, useRef, useEffect } from 'react';
import { generateTextResponse } from '../services/geminiService';
import { Message, Sender } from '../types';

export const ChatDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! أنا نموذج Gemini 2.5 Flash. كيف يمكنني مساعدتك اليوم؟',
      sender: Sender.BOT,
      timestamp: new Date(),
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: Sender.USER,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Build history for context (last 5 messages for simplicity)
      const history = messages.slice(-5).map(m => ({
        role: m.sender === Sender.USER ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const responseText = await generateTextResponse(userMsg.text, history);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.BOT,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
        sender: Sender.SYSTEM,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-bold text-slate-200">محادثة مع Gemini 2.5</span>
        </div>
        <div className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">Text Generation</div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.sender === Sender.USER ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-wrap leading-relaxed ${
                msg.sender === Sender.USER
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : msg.isError 
                    ? 'bg-red-900/50 text-red-200 border border-red-800'
                    : 'bg-slate-700 text-slate-200 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end w-full">
             <div className="bg-slate-700 text-slate-400 rounded-2xl rounded-tl-none p-4 flex gap-2 items-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-slate-800 p-4 border-t border-slate-700">
        <div className="relative flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك هنا..."
            className="w-full bg-slate-900 text-white border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none h-[52px] max-h-32 min-h-[52px]"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className={`p-3 rounded-xl flex-shrink-0 transition-colors ${
              loading || !input.trim() 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 transform rotate-180">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};