BEGIN TRANSACTION;

CREATE TABLE login (
    user_id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    CONSTRAINT login_fkey1 FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT login_fkey2 FOREIGN KEY (username) REFERENCES users (username),
    CONSTRAINT login_fkey3 FOREIGN KEY (email) REFERENCES users (email)
);

COMMIT;