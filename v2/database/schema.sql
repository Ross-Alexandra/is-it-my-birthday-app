CREATE DATABASE IF NOT EXISTS iimb;
USE iimb;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    display_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    birth_day INT NOT NULL,
    birth_month INT NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS login_attempts (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    login_secret VARCHAR(30) NOT NULL,
    attempted_at DATETIME NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS streaks (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    current_streak INT NOT NULL,
    last_check_in DATETIME NOT NULL,
    streak_type ENUM('daily', 'birthday'),

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
