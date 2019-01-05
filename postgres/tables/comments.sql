BEGIN TRANSACTION;

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (post_id) NOT NULL,
    creator_id INTEGER REFERENCES users (user_id) NOT NULL,
    creator_username text REFERENCES users (username) NOT NULL,
    text text NOT NULL,
    score INTEGER DEFAULT 0,
    comment_date text NOT NULL
);

COMMIT;