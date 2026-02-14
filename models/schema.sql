CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK (role IN ('owner','labourer')) NOT NULL
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  radius_meters INTEGER DEFAULT 100
);

CREATE TABLE time_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  project_id INTEGER REFERENCES projects(id),
  clock_in TIMESTAMP,
  clock_out TIMESTAMP,
  lat DECIMAL,
  lng DECIMAL
);
