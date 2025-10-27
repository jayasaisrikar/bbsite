"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/experience', label: 'Our Experience' },
    { href: '/network', label: 'Network' },
    { href: '/insights', label: 'Insights' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className={`${baseClasses} ${isScrolled ? scrolledClasses : transparentClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative w-[150px] md:w-[200px] h-10">
              <Image
                src="/images/bbsite.png"
                alt="BlocksBridge logo"
                fill
                sizes="(max-width: 767px) 160px, 200px"
                className="object-contain"
              />
            </div>
            <span className="sr-only">BlocksBridge</span>
          </Link>

          <nav className={`hidden md:flex gap-8 ${isScrolled ? 'text-black' : 'text-white'}`}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-red-500 transition">
                {link.label}
              </Link>
            ))}
          </nav>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            title={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 py-4 space-y-2">
            {navLinks.map(link => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-500 transition rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
