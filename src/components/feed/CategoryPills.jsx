import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CategoryPills({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <motion.button
          key={category.value}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
            activeCategory === category.value
              ? "bg-gradient-to-r from-[#C76B6B] to-[#C4A484] text-white shadow-lg shadow-[#C76B6B]/20"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          )}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
}