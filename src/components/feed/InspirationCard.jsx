import React, { useState } from 'react';
import { Heart, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function InspirationCard({ inspiration, index }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const styleLabels = {
    modern: 'Modern',
    minimalist: 'Minimalist',
    scandinavian: 'Scandinavian',
    industrial: 'Industrial',
    bohemian: 'Bohemian',
    traditional: 'Traditional'
  };

  const categoryLabels = {
    living_room: 'Living Room',
    bedroom: 'Bedroom',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    office: 'Office',
    outdoor: 'Outdoor'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="masonry-item group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500">
        <div className="relative">
          <img
            src={inspiration.image_url}
            alt={inspiration.title}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ 
              height: `${180 + (index % 3) * 60}px`,
              minHeight: '180px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-2.5 rounded-full backdrop-blur-md transition-colors duration-200",
                isLiked 
                  ? "bg-[#C76B6B] text-white" 
                  : "bg-white/90 text-stone-600 hover:bg-white"
              )}
            >
              <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "p-2.5 rounded-full backdrop-blur-md transition-colors duration-200",
                isSaved 
                  ? "bg-[#C4A484] text-white" 
                  : "bg-white/90 text-stone-600 hover:bg-white"
              )}
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
            </motion.button>
          </div>

          {/* Style tag */}
          {inspiration.style && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase bg-white/90 backdrop-blur-md rounded-full text-stone-700">
                {styleLabels[inspiration.style]}
              </span>
            </div>
          )}
        </div>

        <div className="p-3.5">
          <h3 className="font-medium text-sm text-stone-800 leading-snug line-clamp-2">
            {inspiration.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-stone-400 font-medium">
              {categoryLabels[inspiration.category]}
            </span>
            <div className="flex items-center gap-3 text-[11px] text-stone-400">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {(inspiration.likes_count || 0) + (isLiked ? 1 : 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}