BEGIN TRANSACTION;

INSERT INTO login (user_id, username, email, password_hash) VALUES (1, 'Harper', 'harper@harpnet.com', '$2a$10$wEnl5aBkeZI1De8EAM4LoO/RooMMLHOzjzRrziutCbuh6U1EDeHLO');

INSERT INTO login (user_id, username, email, password_hash) VALUES (2, 'Harphene', 'harphene@harpnet.com', '$2a$10$Fn4bXTExxd/D8Dj9B47aZ.x.8zTvfRNfCQJVq1EmVla.4Y54nTutG');

INSERT INTO login (user_id, username, email, password_hash) VALUES (3, 'Bailey', 'bailey@harpnet.com', '$2a$10$fXzgfgcWR15Y8E3QkFfayOIPpOH.u8NacXpG9Ev7lTC6PM5XSWnFS');

INSERT INTO login (user_id, username, email, password_hash) VALUES (4, 'ManyPosts', 'manyposts@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');

INSERT INTO login (user_id, username, email, password_hash) VALUES (5, 'FakeAcc1', 'fake1@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');
INSERT INTO login (user_id, username, email, password_hash) VALUES (6, 'FakeAcc2', 'fake2@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');
INSERT INTO login (user_id, username, email, password_hash) VALUES (7, 'FakeAcc3', 'fake3@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');
INSERT INTO login (user_id, username, email, password_hash) VALUES (8, 'FakeAcc4', 'fake4@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');
INSERT INTO login (user_id, username, email, password_hash) VALUES (9, 'FakeAcc5', 'fake5@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');
INSERT INTO login (user_id, username, email, password_hash) VALUES (10, 'FakeAcc6', 'fake6@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');
INSERT INTO login (user_id, username, email, password_hash) VALUES (11, 'FakeAcc7', 'fake7@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');
INSERT INTO login (user_id, username, email, password_hash) VALUES (12, 'FakeAcc8', 'fake8@harpnet.com', '$2a$10$IijMz7hL/lfpU73XQSxvbePbdqP/1SOhSlIQqD2eFaQnu/MPFYnZK');

COMMIT;