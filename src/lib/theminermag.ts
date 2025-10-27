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

    // Return whatever posts we were able to extract (may be fewer than 6).
    return posts;
  } catch (webError) {
    console.error('Error fetching from web:', webError);
    // On error, return an empty list (no placeholder/mock content).
    return [];
  }
}

function extractDate(url: string): string {
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

// Placeholder/fallback posts removed. If no sources return data, callers will receive [] instead of mock content.
