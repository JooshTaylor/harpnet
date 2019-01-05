BEGIN TRANSACTION;

CREATE TABLE follows (
    follower_id INTEGER REFERENCES users (user_id) NOT NULL,
    following_id INTEGER REFERENCES users (user_id) NOT NULL,
    PRIMARY KEY (follower_id, following_id)
);

COMMIT;