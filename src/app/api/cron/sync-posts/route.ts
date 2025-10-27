import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;
const cronSecret = process.env.CRON_SECRET!;

interface WPPost {
  id: number;
  title: {
    rendered: string;
  };
  link: string;
  date: string;
  acf?: {
    main_image?: string;
  };
  rank_math_description?: string;
  excerpt?: {
    rendered: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    // Verify the cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch posts from WordPress API
    if (!backendUrl) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_BACKEND_URL not configured' },
        { status: 400 }
      );
    }

    const wpResponse = await fetch(
      `${backendUrl}/wp-json/wp/v2/posts?acf_format=standard&per_page=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!wpResponse.ok) {
      throw new Error(`WordPress API returned ${wpResponse.status}`);
    }

    const wpPosts: WPPost[] = await wpResponse.json();

    if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
      return NextResponse.json(
        { message: 'No posts received from WordPress API', synced: 0 },
        { status: 200 }
      );
    }

    // Transform WordPress posts to match theminermag_posts schema
    const transformedPosts = wpPosts.map((post) => {
      const title = post.title?.rendered || '';
      const url = post.link || '';
      const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const summary = post.rank_math_description || 
                     post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || 
                     title.substring(0, 160);
      const image = post.acf?.main_image || null;

      return {
        title,
        url,
        date,
        summary,
        image,
      };
    });

    // Clear existing posts and insert new ones
    // Using upsert strategy: delete old posts and insert fresh ones
    const { error: deleteError } = await supabase
      .from('theminermag_posts')
      .delete()
      .neq('id', -1); // Delete all rows

    if (deleteError) {
      console.error('Error deleting old posts:', deleteError);
      // Continue anyway - we'll try to insert
    }

    // Insert new posts
    const { data, error: insertError } = await supabase
      .from('theminermag_posts')
      .insert(transformedPosts);

    if (insertError) {
      console.error('Error inserting posts:', insertError);
      return NextResponse.json(
        { error: 'Failed to insert posts', details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Posts synced successfully',
        synced: transformedPosts.length,
        posts: transformedPosts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cron job error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Cron job failed', details: errorMessage },
      { status: 500 }
    );
  }
}
