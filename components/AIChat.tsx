
import React, { useState, useRef, useEffect } from 'react';
import { getTravelAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getTravelAdvice(input, messages);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  const samplePrompts = [
    "Plan a 5-day Riyadh & AlUla itinerary",
    "What are the best dive sites in the Red Sea?",
    "Local cultural etiquette for first-timers",
    "Best family-friendly activities in Riyadh",
    "Off-the-beaten-path locations in the Asir region",
    "Traditional Saudi dishes I must try",
    "How to travel between cities (train vs flights)"
  ];

  return (
    <section id="ai" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px]">
          {/* Sidebar */}
          <div className="md:w-1/3 p-8 bg-stone-800 text-white flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-3xl font-serif mb-4">AI Travel Planner</h2>
              <p className="text-stone-400 font-light text-sm mb-6 leading-relaxed">
                Looking for a custom route? Or need a 3-day guide to Jeddah? 
                Ask your personal Saudi Travel expert now.
              </p>
              <div className="space-y-3">
                {samplePrompts.map((prompt, i) => (
                  <button 
                    key={i}
                    onClick={() => setInput(prompt)} 
                    className="w-full text-left text-[11px] bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/10 transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
            <div className="text-[10px] text-stone-500 uppercase tracking-widest pt-6">
              Powered by Gemini 3 Flash
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-stone-50">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 italic">
                  <p>Welcome. I am your personal Saudi guide. Where should we go today?</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'bg-white border border-stone-200 text-stone-800 shadow-sm'
                  }`}>
                    {msg.text.split('\n').map((line, i) => <p key={i} className="mb-2 last:mb-0">{line}</p>)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl shadow-sm flex space-x-1">
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-stone-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Plan your dream Saudi adventure..."
                  className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-stone-900 text-white p-3 rounded-xl hover:bg-amber-600 transition-colors disabled:bg-stone-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
