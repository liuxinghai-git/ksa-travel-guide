
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2070&auto=format&fit=crop" 
          alt="Saudi Desert Landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-700"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 drop-shadow-lg leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Awaken Your<br/><span className="text-amber-400">Senses</span>
        </h1>
        <p className="text-xl md:text-2xl text-stone-100 mb-10 font-light tracking-wide max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          Where ancient legends meet futuristic visions. From vast golden dunes to the deep blue Red Sea, discover a journey like no other.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
          <a href="#destinations" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-md text-lg font-medium transition-all w-full sm:w-auto shadow-xl hover:shadow-amber-500/20">
            Explore Destinations
          </a>
          <a href="#ai" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-md text-lg font-medium transition-all w-full sm:w-auto">
            Ask AI Planner
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
