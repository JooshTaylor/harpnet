BEGIN TRANSACTION;

INSERT INTO users (email, username, first_name, biography) VALUES ('harper@harpnet.com', 'Harper', 'Harper', 'Public account #1');

INSERT INTO users (email, username, first_name, biography) VALUES ('harphene@harpnet.com', 'Harphene', 'Harphene', 'Public account #2');

INSERT INTO users (email, username, first_name, biography) VALUES ('bailey@harpnet.com', 'Bailey', 'Bailey', 'Public account #3');

INSERT INTO users (email, username, biography) VALUES ('manyposts@harpnet.com', 'ManyPosts', 'Account has 35 posts to show functionality of having too many posts.');

INSERT INTO users (email, username, biography) VALUES ('fake1@harpnet.com', 'FakeAcc1', 'Dummy account');
INSERT INTO users (email, username, biography) VALUES ('fake2@harpnet.com', 'FakeAcc2', 'Dummy account');
INSERT INTO users (email, username, biography) VALUES ('fake3@harpnet.com', 'FakeAcc3', 'Dummy account');
INSERT INTO users (email, username, biography) VALUES ('fake4@harpnet.com', 'FakeAcc4', 'Dummy account');
INSERT INTO users (email, username, biography) VALUES ('fake5@harpnet.com', 'FakeAcc5', 'Dummy account');
INSERT INTO users (email, username, biography) VALUES ('fake6@harpnet.com', 'FakeAcc6', 'Dummy account');
INSERT INTO users (email, username, biography) VALUES ('fake7@harpnet.com', 'FakeAcc7', 'Dummy account');
INSERT INTO users (email, username, biography) VALUES ('fake8@harpnet.com', 'FakeAcc8', 'Dummy account');

COMMIT;