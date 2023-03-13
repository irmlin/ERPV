CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    avatar_id SERIAL,
    full_name TEXT,
    created_at TIMESTAMP,
    created_by TEXT,
    updated_at TIMESTAMP,
    updated_by TEXT
);