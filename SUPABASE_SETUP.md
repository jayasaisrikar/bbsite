# Supabase Database Setup

## Setup Instructions

1. **Go to your Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Clean up existing tables (if needed):**
   - If tables already exist from previous runs, drop them first:
   ```sql
   DROP TABLE IF EXISTS services CASCADE;
   DROP TABLE IF EXISTS clients CASCADE;
   DROP TABLE IF EXISTS testimonials_experience CASCADE;
   DROP TABLE IF EXISTS testimonials_home CASCADE;
   DROP TABLE IF EXISTS team_members CASCADE;
   DROP TABLE IF EXISTS posts_insights CASCADE;
   DROP TABLE IF EXISTS network_items CASCADE;
   DROP TABLE IF EXISTS theminermag_posts CASCADE;
   ```

4. **Run the Setup Script:**
   - Copy the entire contents of `sql/setup_database.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute all the CREATE TABLE and INSERT statements

5. **Verify Tables**
   - Go to "Table Editor" in the left sidebar
   - You should see all 8 new tables with data populated

## Tables Created

- `services` - Services offered by BlocksBridge
- `clients` - List of client companies
- `testimonials_experience` - Testimonials for the experience page
- `testimonials_home` - Testimonials for the home page
- `team_members` - Team member information with bios and images
- `posts_insights` - Blog posts for the insights page
- `network_items` - Network items for the carousel
- `theminermag_posts` - Posts from TheMinerMag

## Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing

After running the SQL script, restart your Next.js development server:

```bash
npm run dev
```

The application should now load data from Supabase instead of the hardcoded arrays, and the team section will display with the new card-based design including images and bios.