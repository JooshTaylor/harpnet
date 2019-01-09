BEGIN TRANSACTION;

INSERT INTO comments (post_id, creator_id, creator_username, text, score, comment_date) VALUES (38, 1, 'Harper', 'Sample comment', 0, 'Jan 07 2019 18:22:02');

COMMIT;