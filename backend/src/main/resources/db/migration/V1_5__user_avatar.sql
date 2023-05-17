CREATE TABLE IF NOT EXISTS user_avatar (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    avatar_id INTEGER
);