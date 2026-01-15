
import React from 'react';
import { Destination } from '../types';
// 👇 1. 引入刚才保存的地图组件
//import AlUlaMap from '../components/AlUlaMap'; 

export const destinations: Destination[] = [
  {
    id: 'destination-alula',
    name: 'AlUla',
    englishName: 'Cradle of Civilizations',
    description: 'Home to Saudi Arabia’s first UNESCO World Heritage site, Hegra, with history dating back 200,000 years.',
    longDescription: `AlUla is a mesmerizing region in northwest Saudi Arabia that offers a unique journey through time. As the location of Hegra, it stands as a testament to the Nabataean civilization's ingenuity.\n\nIn AlUla, wander through majestic sandstone canyons, marvel at the giant Elephant Rock, and witness the architectural miracle of Maraya—the world's largest mirrored building. Recent luxury developments have transformed AlUla into a premier global destination, blending raw natural beauty with world-class hospitality.`,
    recommendedDays: '3-4 Days',
    image: 'https://images.unsplash.com/photo-1621370835496-e17f017830f6?q=80&w=2070&auto=format&fit=crop',
    mapImage: 'https://images.unsplash.com/photo-1589309736404-2e142a2acdf0?q=80&w=2000&auto=format&fit=crop',
    tags: ['World Heritage', 'Archaeology', 'Luxury Retreat'],
     // 👇 2. 在这里把组件赋值给 AlUla
    //customComponent: <AlUlaMap />, 
    activities: [
      {
        title: "Explore Hegra",
        description: "Visit remarkably preserved Nabataean tombs and intricate stone carvings.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
      },
      {
        title: "Maraya Experience",
        description: "Experience art and fine dining in the world's largest mirrored building, reflecting the desert like a mirage.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      }
    ],
    pois: [
      { 
        id: 'hgr', 
        name: 'Hegra', 
        shortDescription: 'First UNESCO World Heritage site in Saudi Arabia.', 
        fullDescription: 'Hegra is Saudi Arabia’s most iconic archaeological site, built over 2,000 years ago by the Nabataeans, featuring 111 monumental tombs carved directly into sandstone outcrops.',
        image: 'https://images.unsplash.com/photo-1621370835496-e17f017830f6?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1621370835496-e17f017830f6?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1621370835698-ed19f0747493?q=80&w=600&auto=format&fit=crop'
        ],
        category: 'History',
        x: 35, y: 35 
      },
      { 
        id: 'mry', 
        name: 'Maraya Concert Hall', 
        shortDescription: 'The largest mirrored building in the world.', 
        fullDescription: 'Maraya, meaning "mirror," is covered with 9,740 mirrored panels that reflect the surrounding Ashar Valley, creating a stunning visual illusion.',
        image: 'https://images.unsplash.com/photo-1621370835698-ed19f0747493?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1621370835698-ed19f0747493?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1632766327311-66746f332560?q=80&w=600&auto=format&fit=crop'
        ],
        category: 'Art',
        x: 60, y: 55 
      },
      { 
        id: 'elp', 
        name: 'Elephant Rock', 
        shortDescription: 'A giant natural sandstone marvel.', 
        fullDescription: 'Rising 52 meters into the sky, this rock has been eroded over millions of years into the shape of an elephant, serving as a perfect sunset spot.',
        image: 'https://images.unsplash.com/photo-1632766327311-66746f332560?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1632766327311-66746f332560?q=80&w=600&auto=format&fit=crop'
        ],
        category: 'Nature',
        x: 45, y: 75 
      }
    ]
  },
  {
    id: 'destination-riyadh',
    name: 'Riyadh',
    englishName: 'The Pulsing Heart',
    description: 'The capital of Saudi Arabia, where ancient history meets a bold, futuristic skyline.',
    longDescription: `Riyadh is the political and commercial hub of the Kingdom, perfectly embodying the "Saudi Vision 2030."\n\nBegin your journey in Diriyah, the ancestral home of the Saudi Royal Family, then explore the modern luxury of Kingdom Centre. Riyadh is also a culinary capital, boasting numerous Michelin-star restaurants and the bustling Boulevard City.`,
    recommendedDays: '2-3 Days',
    image: 'https://images.unsplash.com/photo-1548711524-749386763ef8?q=80&w=2074&auto=format&fit=crop',
    mapImage: 'https://images.unsplash.com/photo-1590490359854-dfba19688d70?q=80&w=2000&auto=format&fit=crop',
    tags: ['Metropolis', 'Shopping', 'Modern Landmarks'],
    activities: [
      {
        title: "Visit Diriyah",
        description: "Discover the origins of the Saudi state in this restored mud-brick city.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      },
      {
        title: "Sky Bridge View",
        description: "Overlook the entire city's lights from the 99th floor of Kingdom Centre.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      }
    ],
    pois: [
      { 
        id: 'dir', 
        name: 'At-Turaif', 
        shortDescription: 'The ancestral home of the Saudi Royal Family.', 
        fullDescription: 'At-Turaif is the heart of Diriyah and a UNESCO World Heritage site, showcasing unique Najdi architectural style.',
        image: 'https://images.unsplash.com/photo-1636544576356-8a032906e93d?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1636544576356-8a032906e93d?q=80&w=600&auto=format&fit=crop'
        ],
        category: 'History',
        x: 30, y: 55 
      },
      { 
        id: 'kgc', 
        name: 'Kingdom Centre', 
        shortDescription: 'The most iconic skyscraper in Riyadh.', 
        fullDescription: 'Standing at 302 meters, the Sky Bridge offers unparalleled panoramic views of the city.',
        image: 'https://images.unsplash.com/photo-1548711524-749386763ef8?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1548711524-749386763ef8?q=80&w=600&auto=format&fit=crop'
        ],
        category: 'Modern',
        x: 60, y: 35 
      }
    ]
  },
  {
    id: 'destination-jeddah',
    name: 'Jeddah',
    englishName: 'Gateway to the Red Sea',
    description: 'A vibrant port city known for its historic coral-stone architecture and world-class diving spots.',
    longDescription: `Jeddah, known as the "Bride of the Red Sea," has always been a crossroads for pilgrims and merchants. The historic Al Balad district features unique coral stone houses with stunning wooden Rawashin balconies.\n\nThe city's Corniche stretches for miles, featuring the world's tallest fountain, King Fahd's Fountain. For water enthusiasts, Jeddah is the perfect starting point for exploring Red Sea coral reefs and diverse marine life.`,
    recommendedDays: '3 Days',
    image: 'https://images.unsplash.com/photo-1551041777-ed9383921008?q=80&w=2070&auto=format&fit=crop',
    mapImage: 'https://images.unsplash.com/photo-1551041777-ed9383921008?q=80&w=2000&auto=format&fit=crop',
    tags: ['Red Sea', 'Old Town', 'Diving'],
    activities: [
      {
        title: "Stroll in Al Balad",
        description: "Feel the scent of spices and history in the labyrinthine alleys of the old town.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      },
      {
        title: "Red Sea Diving",
        description: "Explore crystal-clear waters and vibrant coral reefs.",
        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
      }
    ],
    pois: [
      { 
        id: 'bld', 
        name: 'Al Balad', 
        shortDescription: 'World Heritage site, the historical center of Jeddah.', 
        fullDescription: 'Famous for its coral-stone buildings dating from the 7th century, it is the soul of Jeddah.',
        image: 'https://images.unsplash.com/photo-1551041777-ed9383921008?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1551041777-ed9383921008?q=80&w=600&auto=format&fit=crop'
        ],
        category: 'History',
        x: 45, y: 75 
      },
      { 
        id: 'fnt', 
        name: 'King Fahd\'s Fountain', 
        shortDescription: 'The tallest fountain in the world.', 
        fullDescription: 'The water column reaches 312 meters, spectacular at night with over 500 spotlights.',
        image: 'https://images.unsplash.com/photo-1563290635-f09458999330?q=80&w=1000&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1563290635-f09458999330?q=80&w=600&auto=format&fit=crop'
        ],
        category: 'Modern',
        x: 35, y: 50 
      }
    ]
  }
];
