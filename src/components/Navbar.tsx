import React from 'react';
import Link from 'next/link';
import { Network, Home, Cpu, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-500 rounded-2xl p-2.5 text-white shadow-xl shadow-fuchsia-500/30 group-hover:shadow-fuchsia-500/50 group-hover:scale-105 transition-all duration-300">
              <Network className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
              BFHL<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-orange-500">Engine</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8 bg-white/40 dark:bg-black/30 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/30 dark:border-white/10 shadow-lg">
            <Link href="/" className="flex items-center space-x-2 text-sm font-bold text-gray-700 hover:text-fuchsia-600 dark:text-gray-200 dark:hover:text-fuchsia-400 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <Link href="/processor" className="flex items-center space-x-2 text-sm font-bold text-gray-700 hover:text-fuchsia-600 dark:text-gray-200 dark:hover:text-fuchsia-400 transition-colors">
              <Cpu className="w-4 h-4" />
              <span>API Processor</span>
            </Link>
            <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <Link href="/docs" className="flex items-center space-x-2 text-sm font-bold text-gray-700 hover:text-fuchsia-600 dark:text-gray-200 dark:hover:text-fuchsia-400 transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center space-x-4">
            <Link 
                href="/processor" 
                className="hidden md:flex bg-gradient-to-r from-violet-500 to-orange-500 hover:from-violet-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-extrabold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
                Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
