-- Services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
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