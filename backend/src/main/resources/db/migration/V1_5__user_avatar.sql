CREATE TABLE IF NOT EXISTS user_avatar (
    id SERIAL PRIMARY KEY,
    user_id SERIAL,
    avatar_id SERIAL
);