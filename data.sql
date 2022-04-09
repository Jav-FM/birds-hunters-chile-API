-- Creación de base de datos
CREATE DATABASE birdsHuntersChile;

-- Creación de tablas
CREATE TABLE userTypes
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    userTypeId INT NOT NULL,
    names VARCHAR(50) NOT NULL,
    firstLastName VARCHAR(50) NOT NULL,
    secondLastName VARCHAR(50) NOT NULL,
    rut VARCHAR(11) NOT NULL UNIQUE,
    adress VARCHAR(100) NOT NULL,
    phoneNumbner INT(9)
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    FOREIGN KEY (userTypeId) REFERENCES userTypes(id)
);

CREATE TABLE photos
(
    id SERIAL PRIMARY KEY,
    photo VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    birdId INT NOT NULL,
    names VARCHAR(50) NOT NULL,
    place VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    order VARCHAR(50) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);