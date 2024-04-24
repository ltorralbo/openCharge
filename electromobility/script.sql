-- Crear la base de datos electromobility
CREATE DATABASE electromobility;

-- Conectar a la base de datos electromobility
\c electromobility;

-- Crear la tabla charge_points
CREATE TABLE charge_points (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    operator VARCHAR(100),
    connections INTEGER,
    latitude VARCHAR(20),
    longitude VARCHAR(20),
    country VARCHAR(100),
    power INTEGER
);