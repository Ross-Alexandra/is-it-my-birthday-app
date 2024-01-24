CREATE DATABASE IF NOT EXISTS iimb;
USE iimb;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    display_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birth_day INT NOT NULL,
    birth_month INT NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS login_attempts (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    login_secret VARCHAR(255) NOT NULL,
    attempted_at DATETIME NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
