import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Heart, 
  Bookmark, 
  Grid3X3, 
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
  Star
} from 'lucide-react';

const menuItems = [
  { icon: Heart, label: 'My Favorites', count: 24 },
  { icon: Bookmark, label: 'Saved Collections', count: 8 },
  { icon: Grid3X3, label: 'My Projects', count: 3 },
  { icon: Star, label: 'Following', count: 156 },
];

const settingsItems = [
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help & Support' },
];

export default function Profile() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (isAuth) {
        return base44.auth.me();
      }
      return null;
    },
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C76B6B] via-[#C4A484] to-[#E8D4C4]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative px-5 pt-12 pb-8">
          <div className="flex justify-end mb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm"
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden"
            >
              {user?.full_name ? (
                <span className="text-3xl font-bold text-[#C76B6B]">
                  {user.full_name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-3xl font-bold text-[#C76B6B]">S</span>
              )}
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">
                {user?.full_name || 'Space Explorer'}
              </h1>
              <p className="text-white/70 text-sm">
                {user?.email || 'Join to save your designs'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="px-5 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-4 flex justify-around"
        >
          {[
            { value: '24', label: 'Saved' },
            { value: '3', label: 'Projects' },
            { value: '156', label: 'Following' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-xl font-bold text-stone-800">{stat.value}</p>
              <p className="text-xs text-stone-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Menu Items */}
      <section className="px-5 mt-6">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">My Space</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C76B6B]/10 to-[#C4A484]/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#C76B6B]" />
                </div>
                <span className="font-medium text-stone-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && (
                  <span className="text-sm text-stone-400">{item.count}</span>
                )}
                <ChevronRight className="w-4 h-4 text-stone-300" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Settings */}
      <section className="px-5 mt-6">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Settings</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {settingsItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-stone-400" />
                <span className="text-stone-700">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-300" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Logout */}
      {user && (
        <section className="px-5 mt-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => base44.auth.logout()}
            className="w-full flex items-center justify-center gap-2 p-4 bg-white rounded-2xl shadow-sm text-[#C76B6B] font-medium hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </motion.button>
        </section>
      )}
    </div>
  );
}