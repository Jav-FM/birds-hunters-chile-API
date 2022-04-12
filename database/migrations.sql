-- Creación de base de datos
CREATE DATABASE birdshunterschile;

-- Creación de tablas
-- 1. Tabla tipos de usuarios
CREATE TABLE user_types
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- 2. Tabla usuarios
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    user_type_id INT NOT NULL,
    names VARCHAR(50) NOT NULL,
    first_lastname VARCHAR(50) NOT NULL,
    second_lastname VARCHAR(50) NOT NULL,
    rut VARCHAR(11) NOT NULL UNIQUE,
    adress VARCHAR(100) NOT NULL,
    phone_number INT,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    FOREIGN KEY (user_type_id) REFERENCES user_types(id)
);

-- 3. Tabla fotos
CREATE TABLE photos
(
    id SERIAL PRIMARY KEY,
    photo VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    bird_id INT NOT NULL,
    place VARCHAR(250) NOT NULL,
    "date" DATE NOT NULL,
    "order" VARCHAR(250) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Alimentación de tabla tipos de usuarios
INSERT INTO user_types (name)
VALUES ('administrador'), ('fotografo');