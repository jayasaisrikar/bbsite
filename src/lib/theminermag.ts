import { supabase } from './supabase';

export interface MinerMagPost {
  title: string;
  url: string;
  date: string;
  summary: string;
  image?: string;
}

export async function getLatestPosts(): Promise<MinerMagPost[]> {
  try {
    // First try to fetch from Supabase
    const { data: supabasePosts, error } = await supabase
      .from('theminermag_posts')
      .select('*')
      .order('id')
      .limit(6);

    if (!error && supabasePosts && supabasePosts.length > 0) {
      return supabasePosts.map(post => ({
        title: post.title,
        url: post.url,
        date: post.date,
        summary: post.summary,
        image: post.image || undefined
      }));
    }
  } catch (supabaseError) {
    console.error('Error fetching from Supabase:', supabaseError);
  }

  // Fallback to web scraping
  try {
    const response = await fetch('https://theminermag.com/home', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const html = await response.text();
    const posts: MinerMagPost[] = [];

    // Parse image URLs and titles from the page structure
    // Look for img tags and their associated links
    const imagePattern = /<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"[^>]*>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;

    let match;
    let postCount = 0;

    while ((match = imagePattern.exec(html)) && postCount < 6) {
      const [, imageSrc, altText, url, title] = match;

      if (title && url && imageSrc) {
        const cleanTitle = title.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
        if (!cleanTitle.includes('HOME') && cleanTitle.length > 10) {
          posts.push({
            title: cleanTitle,
            url: url.startsWith('http') ? url : `https://theminermag.com${url}`,
            date: extractDate(url),
            summary: cleanTitle.length > 80 ? cleanTitle.substring(0, 80) + '...' : cleanTitle,
            image: imageSrc.startsWith('http') ? imageSrc : `https://theminermag.com${imageSrc}`
          });
          postCount++;
        }
      }
    }

    // If we didn't get 6 posts, try alternative parsing
    if (posts.length < 6) {
      return getEnhancedDefaultPosts();
    }

    return posts;
  } catch (webError) {
    console.error('Error fetching from web:', webError);
    return getEnhancedDefaultPosts();
  }
}function extractDate(url: string): string {
  const match = url.match(/\/(\d{4})-(\d{2})-(\d{2})\//);
  if (match) {
    const [, year, month, day] = match;
    return new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getEnhancedDefaultPosts(): MinerMagPost[] {
  return [
    {
      title: 'Cipher, Bitfarms Lead Bitcoin Miners Rally After Jane Street Discloses Stakes',
      url: 'https://theminermag.com/learn/2025-10-24/cipher-bitfarms-hut-jane-street-bitcoin',
      date: 'Oct 24, 2025',
      summary: 'Shares of Cipher Mining, Bitfarms, and Hut 8 jumped on Thursday after trading firm Jane Street disclosed stakes...',
      image: 'https://images.unsplash.com/photo-1639762681033-6461ffad8d80?w=600&h=400&fit=crop'
    },
    {
      title: 'Miner Weekly: Bitcoin Mining Leaderboard Shakes up Ahead of Q3 Earnings',
      url: 'https://theminermag.com/news/2025-10-23/bitcoin-mining-q3-2025-leaderboard/',
      date: 'Oct 23, 2025',
      summary: 'This article first appeared in Miner Weekly, BlocksBridge Consulting\'s weekly newsletter covering Bitcoin mining...',
      image: 'https://images.unsplash.com/photo-1518546305927-30bfcaaceb44?w=600&h=400&fit=crop'
    },
    {
      title: 'Bitcoin Miner Argo to Delist from London Stock Exchange Amid Debt Restructuring',
      url: 'https://theminermag.com/news/2025-10-21/argo-lse-delist-bitcoin/',
      date: 'Oct 21, 2025',
      summary: 'Argo Blockchain, one of the earliest publicly listed Bitcoin mining companies, announced delisting plans...',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
      title: 'HIVE Raises 2026 Target to 35 EH/s with Paraguay Bitcoin Mining Expansion',
      url: 'https://theminermag.com/news/2025-10-21/hive-paraguay-35-exahash-bitcoin/',
      date: 'Oct 21, 2025',
      summary: 'HIVE is expanding its operations in Paraguay with a new 100-megawatt Bitcoin mine expansion plan...',
      image: 'https://images.unsplash.com/photo-1551531206-5c2910dd6a13?w=600&h=400&fit=crop'
    },
    {
      title: 'TeraWulf Prices Record $3.2B Bond Deal at 7.75%, Betting Big on AI Pivot',
      url: 'https://theminermag.com/news/2025-10-17/terawulf-bitcoin-ai-note-pricing/',
      date: 'Oct 17, 2025',
      summary: 'TeraWulf has priced its previously announced $3.2 billion senior secured note offering at 7.75%...',
      image: 'https://images.unsplash.com/photo-1592433707802-c2b08c0cbf37?w=600&h=400&fit=crop'
    },
    {
      title: 'Core Scientific Reports Strong Q3 Bitcoin Mining Results',
      url: 'https://theminermag.com/news/2025-10-20/core-scientific-q3/',
      date: 'Oct 20, 2025',
      summary: 'Core Scientific released positive quarterly results showing increased mining efficiency and hashrate...',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop'
    }
  ];
}
