-- Testimonials table (experience page)
CREATE TABLE IF NOT EXISTS testimonials_experience (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL
);

-- Insert testimonials data
INSERT INTO testimonials_experience (quote, author, title, company) VALUES
('Our partnership with Blocksbridge provides actionable strategies, with accountability and consistent success. We wanted to better tell our own story, the Blocksbridge team helped us shape a narrative and pattern for effective communications, with measurable results. I have become a better business leader working with Blocksbridge.', 'Curtis Harris', 'Senior Director of Growth', 'Compass Mining'),
('I like to say that I got my graduate training in Bitcoin from the BlocksBridge team. They''ve been in this industry longer than any other PR and communications firm and are hands down the best firm in the space. What''s more: they are among the smartest, generous, and thoughtful people I have ever worked with in my nearly-two decade career in communications and branding.', 'Isaac Holyoak', 'Chief Communications Officer', 'CleanSpark (NASDAQ: CLSK)'),
('Working with BlocksBridge gave us confidence that our story was being told accurately and effectively to the right audiences.', 'John Doe', 'Chief Strategy Officer', 'Bitcoin Mining Firm');