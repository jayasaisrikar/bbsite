"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    // Set initial state in case page is loaded scrolled
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const baseClasses = 'fixed top-0 z-50 w-full transition-colors duration-300';
  const scrolledClasses = 'bg-white border-b border-gray-200 text-black';
  const transparentClasses = 'bg-transparent text-red-600';

  return (
    <header className={`${baseClasses} ${isScrolled ? scrolledClasses : transparentClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/bbsite.png" alt="BlocksBridge logo" width={140} height={40} />
            <span className="sr-only">BlocksBridge</span>
          </Link>

          <nav className={`hidden md:flex gap-8 ${isScrolled ? 'text-black' : 'text-red-600'}`}>
            <Link href="/" className="text-sm font-medium hover:text-red-500 transition">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-red-500 transition">
              About Us
            </Link>
            <Link href="/experience" className="text-sm font-medium hover:text-red-500 transition">
              Our Experience
            </Link>
            <Link href="/network" className="text-sm font-medium hover:text-red-500 transition">
              Network
            </Link>
            <Link href="/insights" className="text-sm font-medium hover:text-red-500 transition">
              Insights
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-red-500 transition">
              Contact Us
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
