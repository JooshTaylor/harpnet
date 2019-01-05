BEGIN TRANSACTION;

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    creator_id INTEGER REFERENCES users (user_id) NOT NULL,
    creator_username text REFERENCES users (username) NOT NULL,
    content text NOT NULL,
    score INTEGER DEFAULT 0,
    post_date text NOT NULL
);

COMMIT;