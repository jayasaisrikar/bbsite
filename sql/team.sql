-- Team table
CREATE TABLE IF NOT EXISTS team (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  linkedin TEXT,
  twitter TEXT
);

-- Insert team data
INSERT INTO team (name, title, linkedin, twitter) VALUES
('Nishant Sharma', 'Founder and Partner', 'https://www.linkedin.com/in/nishantsharma87/', 'https://x.com/nishantsharma87'),
('Jesse Colzani', 'Partner, Strategic Communications & Client Advisory', 'https://www.linkedin.com/in/jesse-cz/', ''),
('Wolfie Zhao', 'Head of Research - TheMinerMag', '', 'https://x.com/WolfieZhao');