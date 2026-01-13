
import React from 'react';

const PracticalInfo: React.FC = () => {
  const tips = [
    {
      title: "e-Visa & Entry",
      content: "Citizens from 60+ countries can apply for an e-Visa online. The process is seamless and usually approved within minutes.",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "When to Visit",
      content: "October to March offers the best climate, with pleasant temperatures ranging between 20°C and 30°C, perfect for outdoor exploration.",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Dress Code",
      content: "While Abayas are not mandatory for visitors, modest dress is required in public spaces. Ensure shoulders and knees are covered.",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10h4.704a2 2 0 001.94-1.515l1.204-4.816A2 2 0 0019.912 1H4.088a2 2 0 00-1.938 2.669l1.204 4.816A2 2 0 005.296 10H10m4 0V1a3 3 0 00-6 0v9m6 0a2 2 0 012 2v7a2 2 0 01-2 2H10a2 2 0 01-2-2v-7a2 2 0 012-2m4 0h-4" />
        </svg>
      )
    },
    {
      title: "Payments",
      content: "The Saudi Riyal (SAR) is the local currency. Credit cards are widely accepted, but keep cash for local souks and remote areas.",
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="tips" className="py-24 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4">Plan Your Journey</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">Essential insights for a seamless and respectful visit to the Kingdom.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6">{tip.icon}</div>
              <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticalInfo;
