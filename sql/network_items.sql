-- Network items table
CREATE TABLE IF NOT EXISTS network_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL
);

-- Insert network items data
INSERT INTO network_items (title, description, image) VALUES
('The Miner Mag', 'An editorially independent publication focused on Bitcoin mining. Known for accurate, data‑driven reporting and analysis on market structure and company activity.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'),
('Miner Weekly', 'The most read weekly for investors, analysts, bankers, and operators who follow Bitcoin mining. Backed by data and research. Free signup and no spam.', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop'),
('Events', 'High‑signal gatherings for operators, investors, and infrastructure leaders. We host private roundtables and site tours by request.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop');