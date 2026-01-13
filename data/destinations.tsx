
import React from 'react';
import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: 'destination-alula',
    name: 'AlUla',
    englishName: 'The Land of Civilizations',
    description: 'Home to the Kingdom\'s first UNESCO World Heritage site, Hegra, with over 200,000 years of history.',
    longDescription: `AlUla is a mesmerizing region in northwestern Saudi Arabia, offering a unique journey through time. As home to the UNESCO World Heritage site of Hegra, it stands as a testament to the Nabataean civilization's ingenuity.\n\nIn AlUla, you can wander through dramatic sandstone canyons, marvel at the monolithic Elephant Rock, and witness the architectural marvel of Maraya—the world's largest mirrored building. Recent luxury developments have transformed AlUla into a premier global destination, blending raw natural beauty with world-class hospitality. It is a place for stargazing, archaeological wonder, and profound serenity.`,
    recommendedDays: '3-4 Days',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop',
    mapImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop',
    tags: ['UNESCO Heritage', 'Archaeology', 'Luxury Retreat'],
    activities: [
      {
        title: "Explore Hegra",
        description: "Visit the meticulously preserved Nabataean tombs and intricate stone carvings.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
      },
      {
        title: "Maraya Experience",
        description: "Dine and discover art in the world's largest mirrored building, a desert mirage.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      }
    ],
    pois: [
      { id: 'hgr', name: 'Hegra', description: 'The Kingdom’s first UNESCO World Heritage site featuring 111 monumental tombs.', x: 45, y: 35 },
      { id: 'mry', name: 'Maraya', description: 'The world\'s largest mirrored building reflecting the stunning desert landscape.', x: 55, y: 45 },
      { id: 'elp', name: 'Elephant Rock', description: 'An iconic geomorphological wonder carved by wind and water over millions of years.', x: 40, y: 60 },
      { id: 'otn', name: 'Old Town', description: 'A labyrinth of mud-brick houses and stone buildings inhabited since the 12th century.', x: 60, y: 55 }
    ]
  },
  {
    id: 'destination-riyadh',
    name: 'Riyadh',
    englishName: 'The Pulsing Heart',
    description: 'The capital city where centuries of history meet a bold, futuristic skyline.',
    longDescription: `Riyadh is the political and commercial hub of Saudi Arabia. It is a city of rapid transformation, perfectly embodying the "Saudi Vision 2030."\n\nYou can start your journey in Diriyah, the birthplace of the Saudi state, before exploring the modern luxury of the Kingdom Centre. Riyadh is also a culinary powerhouse, hosting world-renowned Michelin-starred restaurants and the sprawling Boulevard City. Whether you're seeking traditional Najdi architecture or high-end shopping, Riyadh offers a vibrant, cosmopolitan experience.`,
    recommendedDays: '2-3 Days',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop',
    mapImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop',
    tags: ['Metropolis', 'Shopping', 'Modern Landmarks'],
    activities: [
      {
        title: "Visit Diriyah",
        description: "Discover the heritage of the House of Saud in this beautifully restored mud-brick city.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      },
      {
        title: "Sky Bridge View",
        description: "Walk the Sky Bridge on the 99th floor of the Kingdom Centre for panoramic city views.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      }
    ],
    pois: [
      { id: 'dir', name: 'At-Turaif, Diriyah', description: 'The ancestral home of the Saudi royal family and a UNESCO World Heritage site.', x: 30, y: 40 },
      { id: 'kgc', name: 'Kingdom Centre', description: 'An architectural icon featuring a 99th-floor sky bridge.', x: 50, y: 30 },
      { id: 'msk', name: 'Al Masmak Fortress', description: 'A 19th-century clay and mud-brick castle that played a pivotal role in Saudi history.', x: 55, y: 60 },
      { id: 'blv', name: 'Boulevard World', description: 'A premier entertainment zone showcasing global cultures and attractions.', x: 40, y: 70 }
    ]
  },
  {
    id: 'destination-jeddah',
    name: 'Jeddah',
    englishName: 'The Gateway to Red Sea',
    description: 'A vibrant port city known for its historic coral-stone architecture and world-class diving.',
    longDescription: `Jeddah, the "Bride of the Red Sea," has always been a crossroads for pilgrims and traders. The historic district of Al Balad, a UNESCO site, features unique coral-stone houses with intricate wooden latticed windows known as Rawashin.\n\nThe city’s Corniche stretches for miles, offering seaside recreation and the world’s tallest fountain, King Fahd's Fountain. For water enthusiasts, Jeddah is the ultimate destination for Red Sea diving, with pristine reefs and a rich diversity of marine life just offshore.`,
    recommendedDays: '3 Days',
    image: 'https://images.unsplash.com/photo-1589486071850-932d56778912?q=80&w=2000&auto=format&fit=crop',
    mapImage: 'https://images.unsplash.com/photo-1589486071850-932d56778912?q=80&w=2000&auto=format&fit=crop',
    tags: ['Red Sea', 'Old Town', 'Scuba Diving'],
    activities: [
      {
        title: "Al Balad Walk",
        description: "Lose yourself in the labyrinthine alleys of the historic district and find authentic spices.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      },
      {
        title: "Red Sea Diving",
        description: "Explore crystal-clear waters and vibrant coral reefs teeming with marine life.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
      }
    ],
    pois: [
      { id: 'bld', name: 'Al Balad', description: 'The historic heart of Jeddah with 7th-century origins and UNESCO status.', x: 45, y: 65 },
      { id: 'fnt', name: 'King Fahd\'s Fountain', description: 'The world\'s tallest fountain, shooting water up to 312 meters.', x: 40, y: 50 },
      { id: 'crn', name: 'Jeddah Corniche', description: 'A 30km coastal resort area with recreation, pavilions, and civic sculptures.', x: 35, y: 40 },
      { id: 'flt', name: 'Floating Mosque', description: 'Al-Rahma Mosque, built on the edge of the Red Sea, appears to float at high tide.', x: 30, y: 25 }
    ]
  }
];
