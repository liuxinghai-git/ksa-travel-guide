
import React from 'react';

export interface POI {
  id: string;
  name: string;
  description: string;
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
}

export interface Destination {
  id: string;
  name: string;
  englishName: string;
  description: string;
  longDescription: string;
  recommendedDays: string;
  image: string;
  mapImage: string;
  tags: string[];
  activities: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  pois: POI[];
}

export interface PracticalTip {
  title: string;
  content: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
