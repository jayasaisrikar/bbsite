import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image src="/images/bbsite.png" alt="BlocksBridge logo" width={120} height={34} />
            </Link>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link href="/experience" className="hover:text-blue-600">Our Experience</Link></li>
              <li><Link href="/network" className="hover:text-blue-600">Network</Link></li>
              <li><Link href="/insights" className="hover:text-blue-600">Insights</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about#mining" className="hover:text-blue-600">For Bitcoin Miners</Link></li>
              <li><Link href="/about#treasury" className="hover:text-blue-600">For Treasury Companies</Link></li>
              <li><Link href="/about#infrastructure" className="hover:text-blue-600">For Hyperscalers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-sm">
              <a href="mailto:consult@blocksbridge.com" className="hover:text-blue-600">
                consult@blocksbridge.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com/BlocksBridge" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/blocksbridge" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/BlocksBridge_" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2025 BlocksBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
