
import React, { useEffect, useState, useMemo } from 'react';
import { Destination, POI } from '../types';
import { destinations } from '../data/destinations';
import DestinationCard from './DestinationCard';

interface Props {
  destination: Destination;
  onBack: () => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2070&auto=format&fit=crop";
const MAP_FALLBACK = "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2000&auto=format&fit=crop";

const DestinationDetail: React.FC<Props> = ({ destination, onBack }) => {
  const [imageSrc, setImageSrc] = useState(destination.image);
  const [mapSrc, setMapSrc] = useState(destination.mapImage);
  
  const initialPoi = destination.pois && destination.pois.length > 0 ? destination.pois[0] : null;
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(initialPoi);
  const [currentPoiImage, setCurrentPoiImage] = useState<string>(initialPoi ? initialPoi.image : '');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setImageSrc(destination.image);
    setMapSrc(destination.mapImage);
    const newPoi = destination.pois && destination.pois.length > 0 ? destination.pois[0] : null;
    setSelectedPoi(newPoi);
    setCurrentPoiImage(newPoi ? newPoi.image : '');
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

  const handlePoiSelect = (poi: POI) => {
    if (!selectedPoi || selectedPoi.id === poi.id) return;
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedPoi(poi);
      setCurrentPoiImage(poi.image);
      setIsAnimating(false);
    }, 300);
  };

  const handleThumbnailClick = (img: string) => {
    setCurrentPoiImage(img);
  };

  const getCategoryName = (category?: string) => {
    switch(category) {
      case 'History': return 'Historic Heritage';
      case 'Art': return 'Art & Culture';
      case 'Nature': return 'Nature & Wildlife';
      case 'Modern': return 'Modern Landmark';
      default: return 'Featured Spot';
    }
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
          aria-label="Back to destinations"
          className="absolute top-10 left-6 md:left-12 z-20 flex items-center space-x-2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all border border-white/20 group shadow-lg"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back to List</span>
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
                REC. STAY: {destination.recommendedDays}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-2 drop-shadow-md animate-in slide-in-from-left-6 duration-700 delay-100">{destination.name}</h1>
            <p className="text-xl md:text-2xl text-stone-300 font-light italic animate-in slide-in-from-left-8 duration-700 delay-200">{destination.englishName}</p>
          </div>
        </div>
      </section>

      {/* Interactive Explorer */}
      {destination.pois && destination.pois.length > 0 && (
        <section className="py-24 bg-white border-y border-stone-200 overflow-hidden" aria-label="Interactive POI Explorer">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif mb-6">Interactive Exploration</h2>
              <p className="text-stone-600 leading-relaxed">
                Discover the landmark highlights of {destination.name}. Click map markers or select from the list below to reveal deep historical insights.
              </p>
            </div>

            <div className="flex flex-col xl:flex-row gap-12 bg-stone-50 rounded-[40px] p-6 lg:p-10 shadow-inner border border-stone-100">
              {/* Left: Interactive Map */}
              <div className="xl:w-3/5 w-full order-2 xl:order-1">
                <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-stone-900 group ring-1 ring-stone-200" role="application" aria-label={`${destination.name} Interactive Map`}>
                  <img 
                    src={mapSrc} 
                    alt="Map Terrain Background" 
                    onError={() => setMapSrc(MAP_FALLBACK)}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-700"
                  />
                  
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                    <span className="text-[10px] text-white/80 font-bold tracking-widest uppercase">Live Terrain Analysis</span>
                  </div>

                  {destination.pois.map((poi) => (
                    <button
                      key={poi.id}
                      onClick={() => handlePoiSelect(poi)}
                      aria-label={`View spot: ${poi.name}`}
                      aria-pressed={selectedPoi?.id === poi.id}
                      className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 
                        ${selectedPoi?.id === poi.id ? 'scale-125' : 'hover:scale-110'}`}
                      style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                    >
                      <div className="relative">
                        {/* Highlighting selected marker with a pulsing ring */}
                        {selectedPoi?.id === poi.id && (
                          <div className="absolute -inset-8 rounded-full border-2 border-amber-500/60 animate-subtle-pulse pointer-events-none"></div>
                        )}
                        
                        <div className={`w-10 h-10 rounded-full border-4 border-white shadow-2xl flex items-center justify-center transition-all duration-500 ${
                          selectedPoi?.id === poi.id 
                            ? 'bg-amber-500 rotate-[360deg]' 
                            : 'bg-stone-900 hover:bg-amber-600'
                        }`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>

                        <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3 py-1 bg-stone-900 text-white text-[10px] font-bold rounded-lg whitespace-nowrap transition-all duration-300 pointer-events-none ${
                          selectedPoi?.id === poi.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                        }`}>
                          {poi.name}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-t-4 border-t-stone-900"></div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex gap-4 overflow-x-auto pb-4 no-scrollbar" role="tablist" aria-label="POI Tabs">
                  {destination.pois.map(poi => (
                    <button
                      key={poi.id}
                      onClick={() => handlePoiSelect(poi)}
                      aria-label={`Select ${poi.name}`}
                      aria-pressed={selectedPoi?.id === poi.id}
                      className={`flex-shrink-0 px-6 py-3 rounded-2xl border-2 transition-all duration-300 font-bold text-sm flex items-center gap-3 ${
                        selectedPoi?.id === poi.id 
                          ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105' 
                          : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${selectedPoi?.id === poi.id ? 'bg-white' : 'bg-stone-300'}`}></span>
                      {poi.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: POI Details */}
              <div className="xl:w-2/5 w-full order-1 xl:order-2" aria-live="polite">
                {selectedPoi && (
                  <div className={`h-full flex flex-col transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
                    <div className="relative h-64 lg:h-80 rounded-[32px] overflow-hidden mb-6 shadow-xl group">
                      <img 
                        src={currentPoiImage} 
                        alt={`${selectedPoi.name} Main View`} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6">
                        <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                          {getCategoryName(selectedPoi.category)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-6 lg:pr-4 overflow-y-auto max-h-[450px] no-scrollbar">
                      <div>
                        <h3 className="text-3xl font-serif text-stone-900 mb-2">{selectedPoi.name}</h3>
                        <p className="text-amber-600 font-medium italic">{selectedPoi.shortDescription}</p>
                      </div>
                      
                      {/* Gallery */}
                      {selectedPoi.gallery && selectedPoi.gallery.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar" aria-label={`${selectedPoi.name} Gallery`}>
                          {selectedPoi.gallery.map((img, idx) => (
                            <button 
                              key={idx}
                              onClick={() => handleThumbnailClick(img)}
                              aria-label={`View photo ${idx + 1}`}
                              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                currentPoiImage === img ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                              }`}
                            >
                              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="w-12 h-1 bg-stone-200 rounded-full"></div>

                      <div className="prose prose-stone">
                        <p className="text-stone-600 leading-relaxed text-lg font-light">
                          {selectedPoi.fullDescription}
                        </p>
                      </div>

                      <div className="pt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600" aria-hidden="true">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </div>
                          <div>
                            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Est. Time</div>
                            <div className="text-sm font-bold text-stone-900">2 - 3 Hours</div>
                          </div>
                        </div>
                        <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm flex items-center gap-3">
                          <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-600" aria-hidden="true">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                          </div>
                          <div>
                            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Entry Info</div>
                            <div className="text-sm font-bold text-stone-900">Varies</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Soul of the Destination */}
      <section className="py-24 container mx-auto px-6 border-b border-stone-200">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-4xl font-serif mb-8 text-stone-900 border-l-4 border-amber-500 pl-8">The Soul of {destination.name}</h2>
            <div className="prose prose-stone lg:prose-xl max-w-none text-stone-600 font-light leading-relaxed space-y-8">
              {destination.longDescription.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-stone-100 sticky top-24">
              <h3 className="text-2xl font-bold mb-8 text-stone-900">Travel Highlights</h3>
              <div className="space-y-10">
                {destination.activities.map((activity, idx) => (
                  <div key={idx} className="flex gap-6 group/item">
                    <div className="flex-shrink-0 w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 transition-all duration-500 group-hover/item:bg-amber-500 group-hover/item:text-white group-hover/item:scale-110 group-hover/item:rotate-6">
                      {activity.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-2 text-lg">{activity.title}</h4>
                      <p className="text-sm text-stone-500 leading-relaxed font-light">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-12 bg-stone-900 text-white py-5 rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-xl hover:shadow-amber-500/40 transform hover:-translate-y-1 active:translate-y-0">
                Talk to a Planner
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Gems */}
      {relatedDestinations.length > 0 && (
        <section className="py-24 container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-serif mb-4">Discover More Gems</h2>
            <p className="text-stone-500 max-w-2xl">If you enjoyed the magic of {destination.name}, you might also love these curated locations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DestinationDetail;
