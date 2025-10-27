import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

type WPPost = any;

function mapPostToCard(item: WPPost) {
  const image = item?.acf?.main_image ?? '/images/about.png';
  const date = item?.date ?? null;
  const title = item?.title?.rendered ?? '';
  const excerpt = item?.rank_math_description ?? item?.excerpt?.rendered ?? '';
  let link = item?.link ?? '#';

  try {
    const u = new URL(link);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
    const siteHostname = process.env.NEXT_PUBLIC_SITE_HOSTNAME;

    // If a public website URL is provided and the post comes from the backend host,
    // rewrite the link to point to the public site (preserves pathname+search).
    if (websiteUrl && backendUrl) {
      try {
        const backendHost = new URL(backendUrl).hostname;
        if (u.hostname === backendHost) {
          link = websiteUrl.replace(/\/$/, '') + u.pathname + u.search;
        } else {
          link = u.toString();
        }
      } catch {
        link = u.toString();
      }
    } else if (siteHostname && u.hostname === siteHostname) {
      // If a site hostname is configured (same as site), convert to relative path
      link = u.pathname + u.search;
    } else {
      // Default: keep absolute link
      link = u.toString();
    }
  } catch {
    // keep original value
  }

  return { image, date, title, excerpt, link };
}

export default async function LatestPosts({ getPosts }: { getPosts?: any[] }) {
  // Use posts passed from the page server component if available; otherwise fetch here.
  let posts: WPPost[] = Array.isArray(getPosts) ? getPosts : [];

  if (!Array.isArray(getPosts) || getPosts.length === 0) {
    // Server-side fetch from WP REST API. Keep caching to avoid rate limits.
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (backend) {
      try {
        const res = await fetch(
          `${backend}/wp-json/wp/v2/posts?acf_format=standard&per_page=4&_=${Date.now()}`,
          { next: { revalidate: 3600 } }
        );

        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json)) posts = json;
        } else {
          console.error('LatestPosts: WP fetch failed', res.status, res.statusText);
        }
      } catch (e) {
        console.error('LatestPosts: fetch error', e);
      }
    } else {
      console.warn('LATEST POSTS: NEXT_PUBLIC_BACKEND_URL not set; skipping WP fetch');
    }
  }

  // Defensive fallback: if we didn't retrieve posts, render nothing or a friendly message
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Latest Posts From TheMinerMag</h2>
          <p className="text-center text-gray-600">No posts available right now.</p>
        </div>
      </section>
    );
  }

  const featured = posts[0];
  const cards = posts.slice(1, 4).map(mapPostToCard);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Latest Posts From <span className="text-red-600">TheMinermag</span></h2>

        {/* Featured */}
        {featured && (
          <article className="mb-12 grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 bg-gray-200 overflow-hidden rounded-lg">
              {featured.acf?.main_image ? (
                <Image
                  src={featured.acf.main_image}
                  alt={(featured.title?.rendered ?? '').replace(/<[^>]+>/g, '')}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-3 font-medium">{new Date(featured.date).toLocaleDateString()}</p>
              <h3 className="text-2xl font-bold mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: featured.title?.rendered ?? '' }} />
              <p className="text-gray-600 mb-6">{featured.rank_math_description ?? featured.excerpt?.rendered}</p>
              <Link
                href={mapPostToCard(featured).link}
                className="text-red-500 font-medium"
                target={/http/.test(featured.link) ? '_blank' : undefined}
                rel={/http/.test(featured.link) ? 'noopener noreferrer' : undefined}
              >
                Read article →
              </Link>
            </div>
          </article>
        )}

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((post, idx) => (
            <Link key={idx} href={post.link} target={/^https?:\/\//.test(post.link) ? '_blank' : undefined} rel={/^https?:\/\//.test(post.link) ? 'noopener noreferrer' : undefined}>
              <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title.replace(/<[^>]+>/g, '')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600" />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-3 font-medium">{post.date ? new Date(post.date).toLocaleDateString() : ''}</p>
                  <h4 className="text-lg font-bold mb-3 line-clamp-3 leading-tight group-hover:text-red-500 transition-colors" dangerouslySetInnerHTML={{ __html: post.title }} />
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt?.replace(/<[^>]+>/g, '')}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="https://theminermag.com" target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              View All Articles →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
