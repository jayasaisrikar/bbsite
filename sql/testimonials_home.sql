-- Testimonials table (home page)
CREATE TABLE IF NOT EXISTS testimonials_home (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL
);

-- Insert testimonials data
INSERT INTO testimonials_home (quote, author, title, company) VALUES
('Our partnership with Blocksbridge provides actionable strategies, with accountability and consistent success. We wanted to better tell our own story, the Blocksbridge team helped us shape a narrative and pattern for effective communications, with measurable results.', 'Curtis Harris', 'Senior Director of Growth', 'Compass Mining'),
('I like to say that I got my graduate training in Bitcoin from the BlocksBridge team. They''ve been in this industry longer than any other PR and communications firm and are hands down the best firm in the space.', 'Isaac Holyoak', 'Chief Communications Officer', 'CleanSpark (NASDAQ: CLSK)');