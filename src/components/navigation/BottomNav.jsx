import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Palette, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BottomNav({ currentPage }) {
  const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'Design', icon: Palette, page: 'Design' },
    { name: 'Profile', icon: User, page: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-stone-200/50">
      <div className="max-w-lg mx-auto px-6 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={createPageUrl(item.page)}
                className="relative flex flex-col items-center py-2 px-6"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2 rounded-2xl transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-br from-[#C76B6B] to-[#C4A484] text-white shadow-lg shadow-[#C76B6B]/20" 
                      : "text-stone-400 hover:text-stone-600"
                  )}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className={cn(
                  "text-[10px] mt-1 font-medium tracking-wide transition-colors duration-300",
                  isActive ? "text-[#C76B6B]" : "text-stone-400"
                )}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-2 w-1 h-1 rounded-full bg-[#C76B6B]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}