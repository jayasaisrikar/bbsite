// Simple script to fetch the WP posts endpoint and print a compact summary
// Usage: set NEXT_PUBLIC_BACKEND_URL="https://theminermag.com"; node ./scripts/inspectWp.js

const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!backend) {
  console.error('Please set NEXT_PUBLIC_BACKEND_URL environment variable.');
  process.exit(1);
}

(async () => {
  try {
    const url = `${backend}/wp-json/wp/v2/posts?acf_format=standard&per_page=4&_=${Date.now()}`;
    console.log('Fetching:', url);
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Fetch failed', res.status, res.statusText);
      process.exit(2);
    }
    const json = await res.json();
    if (!Array.isArray(json)) {
      console.error('Unexpected response shape:', typeof json);
      console.log(JSON.stringify(json, null, 2));
      process.exit(3);
    }

    console.log(`Got ${json.length} posts. Showing first ${Math.min(json.length, 4)}:`);
    for (let i = 0; i < Math.min(json.length, 4); i++) {
      const p = json[i];
      console.log('---');
      console.log('id:', p.id);
      console.log('date:', p.date);
      console.log('link:', p.link);
      console.log('title.rendered:', (p.title && p.title.rendered) || 'N/A');
      console.log('acf.main_image:', p?.acf?.main_image || 'N/A');
      console.log('rank_math_description:', p?.rank_math_description || 'N/A');
    }
  } catch (e) {
    console.error('Error:', e);
    process.exit(99);
  }
})();
