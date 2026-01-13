
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DestinationCard from './components/DestinationCard';
import DestinationDetail from './components/DestinationDetail';
import PracticalInfo from './components/PracticalInfo';
import AIChat from './components/AIChat';
import Modal from './components/LegalModals';
import { Destination } from './types';
import { destinations } from './data/destinations';

const App: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [modalContent, setModalContent] = useState<{title: string, content: React.ReactNode} | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const found = destinations.find(d => d.id === hash);
      if (found) {
        setSelectedDestination(found);
        window.scrollTo(0, 0);
      } else if (!hash) {
        setSelectedDestination(null);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleDestinationSelect = (dest: Destination) => {
    window.location.hash = dest.id;
  };

  const handleBack = () => {
    window.location.hash = '';
    setSelectedDestination(null);
  };

  const showPrivacy = () => setModalContent({
    title: "Privacy Policy",
    content: (
      <div className="space-y-4">
        <p>Welcome to Explore Saudi. Your privacy is paramount. This policy details how we collect and protect your data.</p>
        <h4 className="font-bold">1. Information Collection</h4>
        <p>We may collect interaction data when you use our AI planner or contact forms. We never sell your personal data.</p>
        <h4 className="font-bold">2. Cookies</h4>
        <p>We use cookies to optimize user experience. Google AdSense and other partners may also use cookies for personalized advertising.</p>
        <h4 className="font-bold">3. Security</h4>
        <p>Industry-standard encryption is used to safeguard your information from unauthorized access.</p>
      </div>
    )
  });

  const showTerms = () => setModalContent({
    title: "Terms of Service",
    content: (
      <div className="space-y-4">
        <p>By using this site, you agree to comply with all applicable local and international laws.</p>
        <h4 className="font-bold">1. Content Ownership</h4>
        <p>All travel guides and media are for personal use only. Commercial reproduction is strictly prohibited.</p>
        <h4 className="font-bold">2. Disclaimer</h4>
        <p>Information provided is for reference. Travel regulations can change quickly. Please verify all visa and entry requirements before departure.</p>
      </div>
    )
  });

  if (selectedDestination) {
    return (
      <div className="min-h-screen">
        <DestinationDetail destination={selectedDestination} onBack={handleBack} />
        <footer className="bg-stone-950 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="text-2xl font-bold font-serif mb-6">VISIT <span className="text-amber-500">SAUDI</span></div>
            <p className="text-stone-600 text-xs">© {new Date().getFullYear()} Explore Saudi. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Modal 
        isOpen={!!modalContent} 
        onClose={() => setModalContent(null)} 
        title={modalContent?.title || ""} 
        content={modalContent?.content} 
      />
      
      <main>
        <Hero />

        <div className="container mx-auto px-6 py-4">
            <div className="bg-stone-100 h-24 flex items-center justify-center text-stone-400 text-xs uppercase tracking-widest border border-dashed border-stone-300">
                Sponsor Content Placeholder
            </div>
        </div>

        <section id="about" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-serif mb-8">About Explore Saudi</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Explore Saudi is an independent portal dedicated to showcasing the profound beauty and rapid evolution of the Kingdom to the global community.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Our mission is to bridge the information gap using advanced AI technology and authentic local insights. From heritage sites to modern cityscapes, we are your premier digital gateway.
              </p>
            </div>
          </div>
        </section>

        <section id="destinations" className="py-24 bg-stone-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl font-serif mb-4">Legendary Destinations</h2>
                <p className="text-stone-500">Carefully curated guides to Saudi Arabia's most iconic locations. Click to view detailed planning insights and itineraries.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map(dest => (
                <DestinationCard 
                  key={dest.id} 
                  destination={dest} 
                  onClick={handleDestinationSelect} 
                />
              ))}
            </div>
          </div>
        </section>

        <PracticalInfo />
        <AIChat />

        <section id="contact" className="py-24 bg-stone-100">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="bg-white rounded-3xl p-10 shadow-xl">
                    <h2 className="text-3xl font-serif mb-6 text-center">Get in Touch</h2>
                    <p className="text-stone-500 text-center mb-10 text-sm">
                        Planning a bespoke trip or have a press inquiry? Our team is here to assist.
                    </p>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Your Name" className="bg-stone-50 p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                            <input type="email" placeholder="Your Email" className="bg-stone-50 p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                        </div>
                        <textarea placeholder="Your Message..." rows={4} className="w-full bg-stone-50 p-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500"></textarea>
                        <button className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-amber-600 transition-colors">Send Inquiry</button>
                    </form>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-stone-950 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold font-serif mb-6">VISIT <span className="text-amber-500">SAUDI</span></div>
              <p className="text-stone-500 text-sm leading-relaxed">
                Your premier English-language encyclopedia for Saudi Arabian travel. Discover the unknown.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-amber-500">Quick Links</h4>
              <ul className="space-y-3 text-stone-400 text-sm">
                <li><a href="#destinations" className="hover:text-white">Destinations</a></li>
                <li><a href="#tips" className="hover:text-white">Visa Guide</a></li>
                <li><a href="#ai" className="hover:text-white">AI Planner</a></li>
                <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-amber-500">Legal</h4>
              <ul className="space-y-3 text-stone-400 text-sm">
                <li><button onClick={showPrivacy} className="hover:text-white">Privacy Policy</button></li>
                <li><button onClick={showTerms} className="hover:text-white">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-10 text-center">
            <p className="text-stone-600 text-xs">© {new Date().getFullYear()} Visit Saudi Portal. An independent travel guide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
