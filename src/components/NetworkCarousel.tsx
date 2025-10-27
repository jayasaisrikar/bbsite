'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface NetworkItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function NetworkCarousel() {
  const [items, setItems] = useState<NetworkItem[]>([]);
  const [activeId, setActiveId] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from('network_items')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error fetching network items:', error);
        setItems([]);
      } else {
        setItems(data || []);
        if (data && data.length > 0) {
          setActiveId(data[0].id);
        }
      }
      setLoading(false);
    }

    fetchItems();
  }, []);

  const activeItem = items.find(item => item.id === activeId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
      {/* Left side - List */}
      <div className="space-y-3 md:space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveId(item.id)}
            className={`cursor-pointer transition-all duration-300 p-3 sm:p-4 md:p-6 rounded-lg ${
              activeId === item.id
                ? 'bg-blue-50 border-l-4 border-red-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Right side - Image */}
      <div className="block md:block">
        {activeItem && (
          <div className="relative h-64 sm:h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg transition-all duration-300">
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}
