
import React from 'react';
import { ReactNode } from 'react'; // 👈 必须引入 ReactNode

export interface POI {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string; // 每个景点的具体主图
  gallery?: string[]; // 景点的额外图库
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
  category?: 'History' | 'Modern' | 'Nature' | 'Art';
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
  // 👇 确保加上这一行，允许每个目的地有一个自定义组件
  customComponent?: ReactNode; 
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
