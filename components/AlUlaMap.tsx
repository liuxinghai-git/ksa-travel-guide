import React, { useState } from 'react';

// 定义景点数据结构
interface Location {
  id: string;
  name: string;
  description: string;
  top: string;  // 垂直位置百分比
  left: string; // 水平位置百分比
}

const locations: Location[] = [
  {
    id: 'hegra',
    name: 'Hegra',
    description: 'Saudi Arabia\'s first UNESCO World Heritage Site.',
    top: '25%', // 根据图片调整位置
    left: '35%',
  },
  {
    id: 'maraya',
    name: 'Maraya Concert Hall',
    description: 'The world\'s largest mirrored building reflecting the desert.',
    top: '50%',
    left: '65%',
  },
  {
    id: 'elephant',
    name: 'Elephant Rock',
    description: 'A massive iconic sandstone monolith.',
    top: '60%',
    left: '45%',
  },
];

const AlUlaMap: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('hegra');

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* --- 地图区域 --- */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
        
        {/* 1. 背景图片 (使用 AlUla 的 Unsplash 图片) */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop')" 
          }}
        >
          {/* 黑色遮罩，让文字更清晰 */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* 2. 左上角标签 (模仿截图) */}
        <div className="absolute top-6 left-6 bg-gray-900/80 backdrop-blur-sm text-amber-500 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 border border-gray-700">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          LIVE TERRAIN ANALYSIS
        </div>

        {/* 3. 交互点 (Markers) */}
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
            style={{ top: loc.top, left: loc.left }}
            onClick={() => setActiveId(loc.id)}
          >
            {/* 选中状态下的光圈动画 */}
            {activeId === loc.id && (
              <>
                <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping w-full h-full"></div>
                {/* 选中时的标签气泡 */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-lg whitespace-nowrap border border-gray-700 shadow-lg animate-fade-in-up">
                  {loc.name}
                  {/* 小三角 */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-700"></div>
                </div>
              </>
            )}

            {/* 图钉图标 */}
            <div className={`
              relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300
              ${activeId === loc.id 
                ? 'bg-amber-500 border-white text-white scale-110' 
                : 'bg-black/50 border-white/60 text-white hover:bg-black/80'}
            `}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* --- 底部按钮控制栏 --- */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setActiveId(loc.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border
              ${activeId === loc.id 
                ? 'bg-amber-500 border-amber-500 text-white shadow-lg scale-105' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-gray-50'}
            `}
          >
            {activeId === loc.id && <span className="w-2 h-2 rounded-full bg-white"></span>}
            {loc.name}
          </button>
        ))}
      </div>

      {/* --- 选中景点的描述信息 (可选) --- */}
      <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-900 text-sm">
        <span className="font-bold">Info: </span>
        {locations.find(l => l.id === activeId)?.description}
      </div>
    </div>
  );
};

export default AlUlaMap;