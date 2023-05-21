CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    avatar_id INTEGER DEFAULT 3,
    full_name TEXT,
    total_amount_of_points INTEGER DEFAULT 0,
    current_points INTEGER DEFAULT 0,
    amount_of_avatars INTEGER DEFAULT 1,
    amount_of_scanned_packages INTEGER DEFAULT 0,
    scanned_plastic INTEGER DEFAULT 0,
    scanned_paper INTEGER DEFAULT 0,
    scanned_glass INTEGER DEFAULT 0,
    scanned_non_recyclables INTEGER DEFAULT 0,
    amount_of_questions INTEGER DEFAULT 0,
    amount_of_tries INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    amount_of_victories INTEGER DEFAULT 0,
    quiz_streak INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT now(),
    created_by TEXT,
    updated_at TIMESTAMP DEFAULT now(),
    updated_by TEXT
);