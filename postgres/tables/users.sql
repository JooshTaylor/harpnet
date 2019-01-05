BEGIN TRANSACTION;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    biography TEXT,
    karma INTEGER DEFAULT 0,
    privacy INTEGER DEFAULT 1
);

COMMIT;