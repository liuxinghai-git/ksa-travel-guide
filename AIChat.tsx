
import React, { useState, useRef, useEffect } from 'react';
import { streamTravelAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, streamingText, isLoading]);

  const handleSend = async (customInput?: string) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: messageToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setStreamingText('');

    try {
      const finalResponse = await streamTravelAdvice(
        messageToSend, 
        messages, 
        (text) => setStreamingText(text)
      );
      setMessages(prev => [...prev, { role: 'model', text: finalResponse }]);
      setStreamingText('');
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error connecting to our concierge service. Please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingText('');
    setIsLoading(false);
  };

  const samplePrompts = [
    "Plan a 5-day itinerary for AlUla",
    "Best diving spots in the Red Sea?",
    "Etiquette guide for visitors",
    "Traditional Saudi dishes to try",
    "High-speed rail vs flying"
  ];

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Basic markdown parsing for bolding
      const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-amber-600 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return <p key={i} className="mb-2 last:mb-0">{formattedLine}</p>;
    });
  };

  return (
    <section id="ai" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-stone-900 rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-[700px] border border-stone-800">
          
          {/* Sidebar */}
          <div className="md:w-1/3 p-10 bg-stone-800/50 backdrop-blur-xl text-white flex flex-col justify-between border-r border-stone-700/50">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <button 
                  onClick={clearChat}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-white"
                  title="New Chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              
              <h2 className="text-3xl font-serif mb-4 leading-tight">Saudi Concierge</h2>
              <p className="text-stone-400 font-light text-sm mb-8 leading-relaxed">
                Your luxury gateway to the Kingdom. Ask about itineraries, culture, or hidden gems.
              </p>
              
              <div className="space-y-3">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Quick Start</span>
                {samplePrompts.map((prompt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(prompt)} 
                    disabled={isLoading}
                    className="w-full text-left text-[11px] bg-white/5 hover:bg-amber-500/20 hover:border-amber-500/50 p-3 rounded-xl border border-white/10 transition-all duration-300 disabled:opacity-50"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3 pt-6">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest">System Active: Gemini 3 Pro</span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-[#fafaf9]">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 text-center px-12 animate-in fade-in duration-1000">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                    </svg>
                  </div>
                  <h3 className="text-stone-900 font-serif text-xl mb-2">Welcome to your Saudi Journey</h3>
                  <p className="text-sm font-light max-w-xs">Ask me to plan your route through AlUla or explore the souqs of Jeddah.</p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[90%] px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-stone-900 text-white rounded-tr-none' 
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none'
                  }`}>
                    {formatText(msg.text)}
                  </div>
                </div>
              ))}
              
              {(isLoading || streamingText) && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <div className="max-w-[90%] bg-white border border-stone-200 px-5 py-4 rounded-2xl rounded-tl-none shadow-sm text-stone-800 text-sm leading-relaxed">
                    {streamingText ? formatText(streamingText) : (
                      <div className="flex space-x-1 py-1">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-stone-200">
              <div className="flex space-x-3 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask your travel concierge..."
                  className="flex-1 bg-stone-100 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/50 transition-all outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-amber-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-amber-700 transition-all disabled:bg-stone-200 disabled:text-stone-400 shadow-lg shadow-amber-600/20 active:scale-95"
                >
                  <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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
