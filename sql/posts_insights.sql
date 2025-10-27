-- Posts table (insights)
CREATE TABLE IF NOT EXISTS posts_insights (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL
);

-- Insert posts data
INSERT INTO posts_insights (title, excerpt, date, category) VALUES
('Cipher, Bitfarms Lead Bitcoin Miners Rally After Jane Street Discloses Stakes', 'Shares of Cipher Mining, Bitfarms, and Hut 8 jumped on Thursday after trading firm Jane Street reveals significant positions...', 'October 24, 2025', 'Market Analysis'),
('Miner Weekly: Bitcoin Mining Leaderboard Shakes up Ahead of Q3 Earnings', 'This week''s mining leaderboard shows significant shifts as companies prepare Q3 earnings announcements. Here''s what changed...', 'October 23, 2025', 'Mining News'),
('Bitcoin Miner Argo to Delist from London Stock Exchange Amid Debt Restructuring', 'Argo Blockchain, one of the earliest publicly listed Bitcoin mining companies, announced plans to delist from LSE...', 'October 21, 2025', 'Corporate'),
('HIVE Raises 2026 Target to 35 EH/s with Paraguay Bitcoin Mining Expansion', 'HIVE is expanding its operations in Paraguay with a new 100-megawatt bitcoin mine at its Ygua facility...', 'October 21, 2025', 'Operations'),
('TeraWulf Prices Record $3.2B Bond Deal at 7.75%, Betting Big on AI Pivot', 'TeraWulf has priced its previously announced $3.2 billion senior secured note offering at 7.75%...', 'October 17, 2025', 'Finance');