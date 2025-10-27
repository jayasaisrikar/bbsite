-- Combined SQL script to create all tables and insert mock data
-- Run this in your Supabase SQL Editor

-- Drop tables if they exist (uncomment if you need to reset)
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS testimonials_experience CASCADE;
DROP TABLE IF EXISTS testimonials_home CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS network_items CASCADE;
DROP TABLE IF EXISTS theminermag_posts CASCADE;

-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL
);

-- Insert services data
INSERT INTO services (title, description) VALUES
('Corporate narrative and message architecture', 'Define a clear value proposition, proof points, and phrases that your executive team can repeat in every setting. We document the narrative, align it with investor goals, and keep it current as the plan evolves.'),
('Earnings and disclosure program', 'Strategic planning and execution of quarterly earnings and disclosure communications to maintain investor confidence.'),
('Media and analyst relations', 'Direct engagement with key media outlets and analyst relationships in the Bitcoin and energy sectors.'),
('Community and regulator engagement', 'Building and maintaining relationships with local communities and regulatory bodies to support operations.'),
('Issues and crisis management', 'Strategic response planning and execution for sensitive or crisis situations to protect brand reputation.'),
('Growth transactions and partnerships', 'Communications strategy for M&A, partnerships, and major corporate announcements.');

-- Clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Insert clients data
INSERT INTO clients (name) VALUES
('Bitdeer'),
('Compass Mining'),
('CleanSpark'),
('Marathon Digital'),
('Riot Blockchain'),
('Hut 8'),
('TeraWulf'),
('Core Scientific');

-- Consolidated testimonials table (replaces testimonials_home & testimonials_experience)
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  page TEXT NOT NULL, -- e.g. 'home' or 'experience'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (quote, author, page)
);

-- Insert consolidated testimonials (sample data)
INSERT INTO testimonials (quote, author, title, company, page) VALUES
('Our partnership with Blocksbridge provides actionable strategies, with accountability and consistent success. We wanted to better tell our own story, the Blocksbridge team helped us shape a narrative and pattern for effective communications, with measurable results. I have become a better business leader working with Blocksbridge.', 'Curtis Harris', 'Senior Director of Growth', 'Compass Mining', 'experience'),
('I like to say that I got my graduate training in Bitcoin from the BlocksBridge team. They''ve been in this industry longer than any other PR and communications firm and are hands down the best firm in the space. What''s more: they are among the smartest, generous, and thoughtful people I have ever worked with in my nearly-two decade career in communications and branding.', 'Isaac Holyoak', 'Chief Communications Officer', 'CleanSpark (NASDAQ: CLSK)', 'experience'),
('Working with BlocksBridge gave us confidence that our story was being told accurately and effectively to the right audiences.', 'John Doe', 'Chief Strategy Officer', 'Bitcoin Mining Firm', 'experience'),
('Our partnership with Blocksbridge provides actionable strategies, with accountability and consistent success. We wanted to better tell our own story, the Blocksbridge team helped us shape a narrative and pattern for effective communications, with measurable results.', 'Curtis Harris', 'Senior Director of Growth', 'Compass Mining', 'home'),
('I like to say that I got my graduate training in Bitcoin from the BlocksBridge team. They''ve been in this industry longer than any other PR and communications firm and are hands down the best firm in the space.', 'Isaac Holyoak', 'Chief Communications Officer', 'CleanSpark (NASDAQ: CLSK)', 'home');

-- Team table
CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert team data
INSERT INTO team_members (id, name, role, bio, image_url, linkedin_url, twitter_url, "order") VALUES
('1', 'Nishant Sharma', 'Founder and Partner', 'Industry expert with deep knowledge of Bitcoin infrastructure and capital markets. Founded BlocksBridge to bring strategic communications expertise to Bitcoin miners and treasury companies.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', 'https://www.linkedin.com/in/nishantsharma87/', 'https://x.com/nishantsharma87', 1),
('2', 'Jesse Colzani', 'Partner, Strategic Communications & Client Advisory', 'Senior communications strategist specializing in Bitcoin and energy sector messaging. Brings extensive experience in corporate narrative development and stakeholder engagement.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', 'https://www.linkedin.com/in/jesse-cz/', '', 2),
('3', 'Wolfie Zhao', 'Head of Research - TheMinerMag', 'Leading research and analysis for TheMinerMag, providing data-driven insights into Bitcoin mining market structure and company performance.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', '', 'https://x.com/WolfieZhao', 3);

-- Network items table
CREATE TABLE network_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image TEXT NOT NULL
);

-- Insert network items data
INSERT INTO network_items (title, description, image) VALUES
('The Miner Mag', 'An editorially independent publication focused on Bitcoin mining. Known for accurate, data‑driven reporting and analysis on market structure and company activity.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'),
('Miner Weekly', 'The most read weekly for investors, analysts, bankers, and operators who follow Bitcoin mining. Backed by data and research. Free signup and no spam.', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop'),
('Events', 'High‑signal gatherings for operators, investors, and infrastructure leaders. We host private roundtables and site tours by request.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop');

-- TheMinerMag posts table
CREATE TABLE theminermag_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  date TEXT NOT NULL,
  summary TEXT NOT NULL,
  image TEXT
);

-- Insert theminermag posts data
INSERT INTO theminermag_posts (title, url, date, summary, image) VALUES
('Cipher, Bitfarms Lead Bitcoin Miners Rally After Jane Street Discloses Stakes', 'https://theminermag.com/learn/2025-10-24/cipher-bitfarms-hut-jane-street-bitcoin', 'Oct 24, 2025', 'Shares of Cipher Mining, Bitfarms, and Hut 8 jumped on Thursday after trading firm Jane Street disclosed stakes...', 'https://images.unsplash.com/photo-1639762681033-6461ffad8d80?w=600&h=400&fit=crop'),
('Miner Weekly: Bitcoin Mining Leaderboard Shakes up Ahead of Q3 Earnings', 'https://theminermag.com/news/2025-10-23/bitcoin-mining-q3-2025-leaderboard/', 'Oct 23, 2025', 'This article first appeared in Miner Weekly, BlocksBridge Consulting''s weekly newsletter covering Bitcoin mining...', 'https://images.unsplash.com/photo-1518546305927-30bfcaaceb44?w=600&h=400&fit=crop'),
('Bitcoin Miner Argo to Delist from London Stock Exchange Amid Debt Restructuring', 'https://theminermag.com/news/2025-10-21/argo-lse-delist-bitcoin/', 'Oct 21, 2025', 'Argo Blockchain, one of the earliest publicly listed Bitcoin mining companies, announced delisting plans...', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'),
('HIVE Raises 2026 Target to 35 EH/s with Paraguay Bitcoin Mining Expansion', 'https://theminermag.com/news/2025-10-21/hive-paraguay-35-exahash-bitcoin/', 'Oct 21, 2025', 'HIVE is expanding its operations in Paraguay with a new 100-megawatt Bitcoin mine expansion plan...', 'https://images.unsplash.com/photo-1551531206-5c2910dd6a13?w=600&h=400&fit=crop'),
('TeraWulf Prices Record $3.2B Bond Deal at 7.75%, Betting Big on AI Pivot', 'https://theminermag.com/news/2025-10-17/terawulf-bitcoin-ai-note-pricing/', 'Oct 17, 2025', 'TeraWulf has priced its previously announced $3.2 billion senior secured note offering at 7.75%...', 'https://images.unsplash.com/photo-1592433707802-c2b08c0cbf37?w=600&h=400&fit=crop'),
('Core Scientific Reports Strong Q3 Bitcoin Mining Results', 'https://theminermag.com/news/2025-10-20/core-scientific-q3/', 'Oct 20, 2025', 'Core Scientific released positive quarterly results showing increased mining efficiency and hashrate...', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop');