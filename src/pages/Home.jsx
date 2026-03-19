import React, { useState } from 'react';

const MOCK_INSPIRATIONS = [
  { id: 'm1', title: '北欧极简客厅', description: '白色与原木的完美融合', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', category: 'living_room', style: 'scandinavian', likes_count: 342, saves_count: 128 },
  { id: 'm2', title: '日式侘寂卧室', description: '自然材质与柔和光线', image_url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80', category: 'bedroom', style: 'minimalist', likes_count: 287, saves_count: 95 },
  { id: 'm3', title: '工业风开放式厨房', description: '裸砖墙配黑色金属', image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', category: 'kitchen', style: 'industrial', likes_count: 198, saves_count: 67 },
  { id: 'm4', title: '波西米亚风客厅', description: '层次丰富的纹理与暖色调', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', category: 'living_room', style: 'bohemian', likes_count: 415, saves_count: 183 },
  { id: 'm5', title: '现代简约主卧', description: '大理石纹理与柔灰色调', image_url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80', category: 'bedroom', style: 'modern', likes_count: 523, saves_count: 241 },
  { id: 'm6', title: '禅意浴室设计', description: '竹石元素与哑光材质', image_url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80', category: 'bathroom', style: 'minimalist', likes_count: 312, saves_count: 109 },
  { id: 'm7', title: '居家办公角落', description: '大窗采光配实木书桌', image_url: 'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?w=400&q=80', category: 'office', style: 'scandinavian', likes_count: 276, saves_count: 134 },
  { id: 'm8', title: '户外露台休闲区', description: '藤编家具与绿植', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', category: 'outdoor', style: 'bohemian', likes_count: 389, saves_count: 157 },
  { id: 'm9', title: '奶油风餐厨一体', description: '拱形门洞与奶白色调', image_url: 'https://images.unsplash.com/photo-1556909190-cf35b8d94f80?w=400&q=80', category: 'kitchen', style: 'modern', likes_count: 467, saves_count: 198 },
  { id: 'm10', title: '斯堪的纳维亚浴室', description: '白色瓷砖与松木', image_url: 'https://images.unsplash.com/photo-1620626011761-996317702782?w=400&q=80', category: 'bathroom', style: 'scandinavian', likes_count: 294, saves_count: 112 },
  { id: 'm11', title: '现代工业风客厅', description: '混凝土质感与皮质沙发', image_url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80', category: 'living_room', style: 'industrial', likes_count: 358, saves_count: 143 },
  { id: 'm12', title: '传统中式书房', description: '实木家具与字画装饰', image_url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80', category: 'office', style: 'traditional', likes_count: 231, saves_count: 88 },
];
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Search, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import MasonryGrid from '@/components/feed/MasonryGrid';
import CategoryPills from '@/components/feed/CategoryPills';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'living_room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'office', label: 'Office' },
  { value: 'outdoor', label: 'Outdoor' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchFocused, setSearchFocused] = useState(false);

  const { data: inspirations = [], isLoading } = useQuery({
    queryKey: ['inspirations', activeCategory],
    queryFn: async () => {
      try {
        let result;
        if (activeCategory === 'all') {
          result = await base44.entities.Inspiration.list('-created_date', 50);
        } else {
          result = await base44.entities.Inspiration.filter({ category: activeCategory }, '-created_date', 50);
        }
        if (!result || result.length === 0) {
          return MOCK_INSPIRATIONS.filter(i => activeCategory === 'all' || i.category === activeCategory);
        }
        return result;
      } catch {
        return MOCK_INSPIRATIONS.filter(i => activeCategory === 'all' || i.category === activeCategory);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/80 backdrop-blur-xl">
        <div className="px-5 pt-12 pb-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-stone-800 tracking-tight">SpaceEcho</h1>
              <p className="text-xs text-stone-400 mt-0.5">遇见梦想之家</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative p-2.5 rounded-2xl bg-white shadow-sm"
            >
              <Bell className="w-5 h-5 text-stone-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#C76B6B] rounded-full" />
            </motion.button>
          </div>

          {/* Search bar */}
          <motion.div
            animate={{ scale: searchFocused ? 1.02 : 1 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search inspirations..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C4A484]/30 shadow-sm transition-all duration-300"
            />
          </motion.div>
        </div>

        {/* Categories */}
        <div className="px-5 pb-4">
          <CategoryPills
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>
      </header>

      {/* Content */}
      <main className="px-4">
        {isLoading ? (
          <div className="masonry-grid">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="masonry-item">
                <Skeleton 
                  className="w-full rounded-2xl" 
                  style={{ height: `${180 + (i % 3) * 60}px` }} 
                />
              </div>
            ))}
          </div>
        ) : inspirations.length > 0 ? (
          <MasonryGrid inspirations={inspirations} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-[#C76B6B]/20 to-[#C4A484]/20 flex items-center justify-center">
              <Search className="w-10 h-10 text-[#C4A484]" />
            </div>
            <h3 className="text-lg font-semibold text-stone-700 mb-2">No inspirations yet</h3>
            <p className="text-sm text-stone-400 text-center max-w-xs">
              Start exploring and discover beautiful home designs that inspire you
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}