-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
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