import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Camera, 
  Palette, 
  Sofa, 
  Lightbulb, 
  Layers,
  ArrowRight,
  Wand2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const designTools = [
  {
    id: 'ai-design',
    title: 'AI Room Designer',
    description: 'Transform your space with AI-powered suggestions',
    icon: Sparkles,
    gradient: 'from-[#C76B6B] to-[#E89B9B]',
    featured: true
  },
  {
    id: 'room-scan',
    title: 'Room Scanner',
    description: 'Scan and visualize your room in 3D',
    icon: Camera,
    gradient: 'from-[#C4A484] to-[#D4B494]'
  },
  {
    id: 'color-match',
    title: 'Color Palette',
    description: 'Find perfect color combinations',
    icon: Palette,
    gradient: 'from-[#9B8B7B] to-[#B0A090]'
  },
  {
    id: 'furniture-finder',
    title: 'Furniture Finder',
    description: 'Discover pieces that fit your style',
    icon: Sofa,
    gradient: 'from-[#C76B6B] to-[#C4A484]'
  },
  {
    id: 'lighting-planner',
    title: 'Lighting Planner',
    description: 'Optimize your room lighting',
    icon: Lightbulb,
    gradient: 'from-[#E8D4C4] to-[#C4A484]'
  },
  {
    id: 'moodboard',
    title: 'Moodboard Creator',
    description: 'Curate your design vision',
    icon: Layers,
    gradient: 'from-[#B59B8B] to-[#C4A484]'
  }
];

const recentProjects = [
  { id: 1, name: 'Living Room Makeover', progress: 75, color: '#C76B6B' },
  { id: 2, name: 'Bedroom Redesign', progress: 40, color: '#C4A484' },
];

export default function Design() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24">
      {/* Header */}
      <header className="px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-stone-800 tracking-tight">Design Studio</h1>
        <p className="text-sm text-stone-400 mt-1">Craft your ideal space</p>
      </header>

      {/* Featured Tool */}
      <section className="px-5 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C76B6B] to-[#E89B9B] p-6 cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-2xl transform -translate-x-10 translate-y-10" />
          
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <Wand2 className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">AI Room Designer</h2>
            <p className="text-white/80 text-sm mb-4 max-w-[200px]">
              Upload a photo and let AI transform your space instantly
            </p>
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Recent Projects */}
      {recentProjects.length > 0 && (
        <section className="px-5 mb-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Continue Designing</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[200px] p-4 bg-white rounded-2xl shadow-sm"
              >
                <h3 className="font-medium text-stone-700 text-sm mb-3">{project.name}</h3>
                <div className="relative h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
                <span className="text-[11px] text-stone-400 mt-2 block">{project.progress}% complete</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Design Tools Grid */}
      <section className="px-5">
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Design Tools</h2>
        <div className="grid grid-cols-2 gap-3">
          {designTools.filter(t => !t.featured).map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              <div className={cn(
                "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3",
                tool.gradient
              )}>
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium text-stone-700 text-sm mb-1">{tool.title}</h3>
              <p className="text-[11px] text-stone-400 leading-relaxed">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}