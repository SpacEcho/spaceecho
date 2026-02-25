import React, { useState } from 'react';
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
      if (activeCategory === 'all') {
        return base44.entities.Inspiration.list('-created_date', 50);
      }
      return base44.entities.Inspiration.filter({ category: activeCategory }, '-created_date', 50);
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