
import React, { useState } from 'react';
import { Destination } from '../types';

interface Props {
  destination: Destination;
  onClick: (destination: Destination) => void;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2070&auto=format&fit=crop";

const DestinationCard: React.FC<Props> = ({ destination, onClick }) => {
  const [imageSrc, setImageSrc] = useState(destination.image);

  return (
    <div 
      onClick={() => onClick(destination)}
      className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl bg-white cursor-pointer ring-1 ring-stone-200/50"
      role="button"
      aria-label={`View detailed guide for ${destination.name}`}
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={imageSrc} 
          alt={destination.name}
          onError={() => setImageSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:via-black/40"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 p-6 text-white w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex gap-2 mb-3">
          {destination.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-1 tracking-tight">{destination.name}</h3>
        <p className="text-sm text-stone-300 font-light mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          Theme: {destination.englishName}
        </p>
        <p className="text-sm line-clamp-2 text-stone-200 font-light opacity-90 group-hover:opacity-100">
          {destination.description}
        </p>
      </div>
    </div>
  );
};

export default DestinationCard;
