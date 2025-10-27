-- TheMinerMag posts table
CREATE TABLE IF NOT EXISTS theminermag_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
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