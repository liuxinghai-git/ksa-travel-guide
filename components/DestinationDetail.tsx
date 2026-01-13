
import React, { useEffect, useState, useMemo } from 'react';
import { Destination, POI } from '../types';
import { destinations } from '../data/destinations';
import DestinationCard from './DestinationCard';

interface Props {
  destination: Destination;
  onBack: () => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2070&auto=format&fit=crop";

const DestinationDetail: React.FC<Props> = ({ destination, onBack }) => {
  const [imageSrc, setImageSrc] = useState(destination.image);
  const [activePoi, setActivePoi] = useState<POI | null>(null);
  const [bubblePoiId, setBubblePoiId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setImageSrc(destination.image);
    setActivePoi(null);
    setBubblePoiId(null);
  }, [destination]);

  const relatedDestinations = useMemo(() => {
    return destinations
      .filter(d => d.id !== destination.id)
      .map(d => ({
        ...d,
        sharedTagsCount: d.tags.filter(tag => destination.tags.includes(tag)).length
      }))
      .filter(d => d.sharedTagsCount > 0)
      .sort((a, b) => b.sharedTagsCount - a.sharedTagsCount)
      .slice(0, 3);
  }, [destination]);

  const handleSelectRelated = (dest: Destination) => {
    window.location.hash = dest.id;
  };

  const handlePoiClick = (poi: POI) => {
    setActivePoi(poi);
    setBubblePoiId(poi.id);
    
    // Clear the temporary bubble after 2.5 seconds
    setTimeout(() => {
      setBubblePoiId(prev => prev === poi.id ? null : prev);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24 animate-in fade-in duration-700">
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={imageSrc} 
            alt={destination.name} 
            onError={() => setImageSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        </div>
        
        <button 
          onClick={onBack}
          className="absolute top-10 left-6 md:left-12 z-20 flex items-center space-x-2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/20 group shadow-lg"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back to Gallery</span>
        </button>

        <div className="container mx-auto px-6 mb-12 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4 animate-in slide-in-from-left-4 duration-700">
              {destination.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-widest bg-amber-500 px-3 py-1 rounded text-white font-bold shadow-sm">
                  {tag}
                </span>
              ))}
              <span className="text-[10px] uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded text-white font-bold border border-white/10">
                Recommended: {destination.recommendedDays}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-2 drop-shadow-md animate-in slide-in-from-left-6 duration-700 delay-100">{destination.name}</h1>
            <p className="text-xl md:text-2xl text-stone-300 font-light italic animate-in slide-in-from-left-8 duration-700 delay-200">{destination.englishName}</p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif mb-4">Discover the Landmarks</h2>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Explore the key points of interest in {destination.name}. Click on the markers to reveal the secrets of this majestic landscape.
              </p>
              
              <div className="space-y-4">
                {destination.pois.map((poi) => (
                  <button 
                    key={poi.id}
                    onClick={() => handlePoiClick(poi)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                      activePoi?.id === poi.id 
                        ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500' 
                        : 'border-stone-100 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <h4 className={`font-bold transition-colors ${activePoi?.id === poi.id ? 'text-amber-700' : 'text-stone-900'}`}>
                        {poi.name}
                      </h4>
                      {activePoi?.id === poi.id && (
                        <p className="text-sm text-stone-600 mt-1 animate-in fade-in slide-in-from-top-1 duration-300">
                          {poi.description}
                        </p>
                      )}
                    </div>
                    <div className={`p-2 rounded-lg transition-all ${
                      activePoi?.id === poi.id ? 'bg-amber-500 text-white rotate-90' : 'bg-stone-50 text-stone-400 group-hover:bg-stone-100'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-stone-200 bg-stone-100">
                {/* Simulated Map Background */}
                <img 
                  src={destination.mapImage} 
                  alt="Stylized Map" 
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                />
                
                {/* Decorative Grid Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* POI Markers */}
                {destination.pois.map((poi) => (
                  <button
                    key={poi.id}
                    onClick={() => handlePoiClick(poi)}
                    className="absolute group z-10 transition-transform hover:scale-125"
                    style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                  >
                    <div className="relative">
                      {/* Outer Ring Pulse */}
                      <span className={`absolute -inset-2 rounded-full animate-ping ${activePoi?.id === poi.id ? 'bg-amber-400 opacity-75' : 'bg-white opacity-40'}`}></span>
                      
                      {/* Marker Body */}
                      <div className={`relative w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-colors duration-300 ${
                        activePoi?.id === poi.id ? 'bg-amber-500' : 'bg-stone-900 group-hover:bg-amber-500'
                      }`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>

                      {/* Transient Stylized Bubble (Temporary on Click) */}
                      <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-4 px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-full whitespace-nowrap shadow-2xl transition-all duration-500 pointer-events-none border border-white/20 z-50 ${
                        bubblePoiId === poi.id 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-4 scale-75'
                      }`}>
                        <div className="flex items-center gap-2">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {poi.name}
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-amber-500"></div>
                      </div>

                      {/* Persistent Hover Label */}
                      <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-stone-900 text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-xl transition-all duration-300 pointer-events-none ${
                        activePoi?.id === poi.id && bubblePoiId !== poi.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                      }`}>
                        {poi.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-stone-900"></div>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Map Legend Overlay */}
                <div className="absolute bottom-4 left-4 z-20 bg-white/80 backdrop-blur-md p-3 rounded-xl border border-white/50 shadow-sm text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                  Interactive Terrain View
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6 border-b border-stone-200">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-3xl font-serif mb-8 text-stone-900 border-l-4 border-amber-500 pl-6">Depth of Exploration</h2>
            <div className="prose prose-stone lg:prose-xl max-w-none text-stone-600 font-light leading-relaxed space-y-6">
              {destination.longDescription.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-stone-900">Highlights & Activities</h3>
              <div className="space-y-8">
                {destination.activities.map((activity, idx) => (
                  <div key={idx} className="flex gap-4 group/item">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 transition-colors group-hover/item:bg-amber-500 group-hover/item:text-white">
                      {activity.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">{activity.title}</h4>
                      <p className="text-sm text-stone-600 leading-relaxed">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-500/30 transform hover:-translate-y-1 active:translate-y-0">
                Book This Destination
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Destinations Section */}
      {relatedDestinations.length > 0 && (
        <section className="py-24 container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl font-serif mb-4">You May Also Like</h2>
            <p className="text-stone-500">Explore more destinations sharing similar wonders and themes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedDestinations.map(dest => (
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                onClick={handleSelectRelated} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DestinationDetail;
