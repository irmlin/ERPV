CREATE TABLE IF NOT EXISTS users (
    id UUID,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    avatar_id UUID NOT NULL,
    full_name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    created_by TEXT NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    updated_by TEXT NOT NULL,
    PRIMARY KEY (id)
);