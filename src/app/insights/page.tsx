import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Insights - BlocksBridge',
  description: 'Latest articles and insights from BlocksBridge and The Miner Mag.',
};

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts_insights')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}

export default async function Insights() {
  const posts = await getPosts();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-800 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1585864299869-592a1dff0dab?w=1200&h=400&fit=crop"
            alt="Insights"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-6">Latest Insights</h1>
          <p className="text-xl md:text-2xl font-light">
            Updates from The Miner Mag and BlocksBridge
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {posts.map((post, idx) => (
              <Link key={idx} href="#" className="block group">
                <div className="border-b border-gray-200 pb-8 hover:pb-6 transition">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-block text-blue-600 font-medium group-hover:text-blue-800">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold mb-4">More Articles on The Miner Mag</h2>
            <p className="text-gray-600 mb-6">
              For more comprehensive coverage of Bitcoin mining, market analysis, and industry trends, visit The Miner Mag - our independent publication focused on accurate, data-driven reporting.
            </p>
            <Link href="https://theminermag.com" target="_blank" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-medium">
              Visit The Miner Mag →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
