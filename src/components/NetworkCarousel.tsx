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
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left side - List */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveId(item.id)}
            className={`cursor-pointer transition-all duration-300 p-6 rounded-lg ${
              activeId === item.id
                ? 'bg-blue-50 border-l-4 border-red-500'
                : 'hover:bg-gray-50'
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block">
        {activeItem && (
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg transition-all duration-300">
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
