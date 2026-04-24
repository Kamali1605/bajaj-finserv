"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Database, Sparkles, Layers, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 dark:bg-[#07070B] overflow-x-hidden font-sans pt-20 pb-24">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/30 dark:bg-violet-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-fuchsia-500/20 dark:bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[30%] bg-orange-500/20 dark:bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-32 flex flex-col items-center text-center">
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
        >
            <div className="mb-8 inline-flex items-center space-x-2 border border-white/40 dark:border-white/10 rounded-full px-5 py-2 bg-white/50 dark:bg-black/30 backdrop-blur-md shadow-sm">
                <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-orange-500">
                    Next Generation Data Processor
                </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white leading-[1.05] mb-8 drop-shadow-sm mix-blend-normal">
                Analyze Node <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 animate-gradient-x">
                    Hierarchies Instantly.
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl font-medium leading-relaxed">
                Connect to a powerful Node.js engine capable of mathematically parsing string relationships, discovering structural cycles, and rendering interactive JSON trees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                <Link 
                    href="/processor" 
                    className="group relative flex items-center justify-center px-10 py-5 bg-gradient-to-r from-violet-600 to-orange-500 text-white font-extrabold rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-2xl shadow-orange-500/30"
                >
                    <span className="relative z-10 flex items-center text-lg">
                        Launch Dashboard
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                </Link>
                
                <Link 
                    href="/docs" 
                    className="group flex items-center justify-center px-10 py-5 bg-white/60 dark:bg-white/5 backdrop-blur-md text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 shadow-xl shadow-gray-200/20 dark:shadow-black/50 font-extrabold hover:bg-white/80 dark:hover:bg-white/10 transition-all rounded-2xl hover:-translate-y-1"
                >
                    API Documentation
                    <Code className="w-5 h-5 ml-3 text-fuchsia-500 group-hover:rotate-12 transition-transform" />
                </Link>
            </div>
        </motion.div>

      </section>

      {/* Vibrant Features */}
      <section className="relative z-10 w-full py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {[
                  {
                      icon: <Zap className="w-8 h-8 text-violet-500" />,
                      title: "Sub-second Execution",
                      description: "Performance tested to validate up to 50 nodes and process graphical algorithms within guaranteed SLAs."
                  },
                  {
                      icon: <Layers className="w-8 h-8 text-fuchsia-500" />,
                      title: "Cycle Detection",
                      description: "Instantly captures pure cycles, invalidates self-loops, and dynamically reassigns redundant parent relationships."
                  },
                  {
                      icon: <Database className="w-8 h-8 text-orange-500" />,
                      title: "CORS Ready API",
                      description: "Backend perfectly configured to accept evaluator origins and cross-domain validation checks securely."
                  }
              ].map((feat, idx) => (
                  <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group flex flex-col p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 hover:-translate-y-2 transition-transform"
                  >
                      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/10 border border-gray-100 dark:border-white/5 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          {feat.icon}
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">{feat.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                          {feat.description}
                      </p>
                  </motion.div>
              ))}

          </div>
      </section>

    </div>
  );
}
