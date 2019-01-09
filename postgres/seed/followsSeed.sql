BEGIN TRANSACTION;

INSERT INTO follows (follower_id, following_id) VALUES (1, 2);
INSERT INTO follows (follower_id, following_id) VALUES (1, 3);
INSERT INTO follows (follower_id, following_id) VALUES (1, 4);

INSERT INTO follows (follower_id, following_id) VALUES (2, 1);
INSERT INTO follows (follower_id, following_id) VALUES (2, 3);
INSERT INTO follows (follower_id, following_id) VALUES (2, 4);

INSERT INTO follows (follower_id, following_id) VALUES (3, 1);
INSERT INTO follows (follower_id, following_id) VALUES (3, 2);
INSERT INTO follows (follower_id, following_id) VALUES (3, 4);

COMMIT;