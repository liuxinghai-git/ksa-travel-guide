
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Destinations', id: 'destinations' },
    { name: 'Travel Info', id: 'tips' },
    { name: 'AI Planner', id: 'ai' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className={`text-2xl font-bold font-serif tracking-widest ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
          VISIT <span className="text-amber-500">SAUDI</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-medium hover:text-amber-500 transition-colors ${
                isScrolled ? 'text-stone-700' : 'text-stone-100'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-amber-500/30">
          Plan Your Trip
        </button>
      </div>
    </header>
  );
};

export default Header;
