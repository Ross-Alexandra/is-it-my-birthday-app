DELETE FROM users;
DELETE FROM streaks;

INSERT INTO users(id, display_name, email, birth_day, birth_month) VALUES
    (1, 'Ross Alexandra', 'Ross-Alexandra@outlook.com', 1, 1),
    (2, 'Mason Amelia', 'Mason.Amelia@gmail.com', 2, 2),
    (3, 'Michael Salamander', 'salamander@ssss.com', 7, 7),
    (4, 'Doe John', 'foo@bar.com', 27, 1),
    (5, 'Doe Jane', 'bar@foo.ca', 5, 5),
    (6, 'William Petersmithe', 'wps@hotmail.com', 6, 6),
    (7, 'John Callibre', 'JC@Penny.com', 7, 7),
    (8, 'Christopher Smith', 'C.smith@gmail.com', 8, 8),
    (9, 'Jessica Johnson', 'JJ@KK.LL', 9, 9),
    (10, 'Ashley Williams', 'Ash.will@outlook.com', 10, 10),
    (11, 'Justin Parker', 'Justin@hotmail.com', 11, 11),
    (12, 'Daniel Jones', 'DJ@rappers.co.uk', 12, 12);

INSERT INTO streaks(user_id, current_streak, last_check_in, streak_type) VALUES
    (1, 15, SUBDATE(NOW(), INTERVAL 500 MINUTE), 'daily'),
    (2, 33, SUBDATE(NOW(), INTERVAL 10 MINUTE), 'daily'),
    (3, 105, SUBDATE(NOW(), INTERVAL 3 DAY), 'daily'),
    (4, 1, SUBDATE(NOW(), INTERVAL 3 DAY), 'daily'),
    (5, 20, SUBDATE(NOW(), INTERVAL 24 HOUR), 'daily'),
    (6, 1, SUBDATE(NOW(), INTERVAL 24 HOUR), 'daily'),
    (7, 1, SUBDATE(NOW(), INTERVAL 24 HOUR), 'daily'),
    (8, 1, SUBDATE(NOW(), INTERVAL 25 HOUR), 'daily'),
    (9, 1, SUBDATE(NOW(), INTERVAL 25 HOUR), 'daily'),
    (10, 1, SUBDATE(NOW(), INTERVAL 25 HOUR), 'daily'),
    (11, 1, SUBDATE(NOW(), INTERVAL 23 HOUR), 'daily'),
    (12, 1, SUBDATE(NOW(), INTERVAL 23 HOUR), 'daily'),
    (1, 3, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (2, 2, SUBDATE(NOW(), INTERVAL 367 DAY), 'birthday'),
    (3, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (4, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (5, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (6, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (7, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (8, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (9, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (10, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (11, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday'),
    (12, 1, SUBDATE(NOW(), INTERVAL 1 YEAR), 'birthday');
