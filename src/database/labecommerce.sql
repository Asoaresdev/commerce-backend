-- Active: 1690225505629@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    created_at TEXT NOT NULL
);


INSERT INTO users(id, name, email, password, created_at)
VALUES
("001", "João Silva", "joao@email.com", "12345678", "2023-07-24"),
("002", "Maria Teste", "maria@email.com", "12345678", "2023-07-24");

SELECT * FROM users;


INSERT INTO users(id, name, email, password, created_at)
VALUES
("010", "Teste Silva", "teste@email.com", "12345678", "2023-07-24");

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name  TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES("prod001","Mouse gamer", 250, "Melhor mouse do mercado!", "https://picsum.photos/seed/Mouse%20gamer/400" ),
("prod0010","Mouse", 50, "Melhor mouse do mercado!", "https://picsum.photos/seed/Mouse%20gamer/400" ),
("prod002", "Monitor", 900, "Monitor LED Full HD 24 polegadas", "https://picsum.photos/seed/Monitor/400"),
("prod003", "Monitor2", 950, "Monitor LED Full HD 24 polegadas", "https://picsum.photos/seed/Monitor/400");

SELECT * FROM products;

SELECT AVG(price) FROM products;

SELECT COUNT(id) FROM users;

SELECT DATETIME('now');

INSERT INTO users(id, name, email, password, created_at)
VALUES
("0100", "Teste Silva", "testANDO@email.com", "12345678", DATETIME('now'));

SELECT * FROM users
ORDER BY name DESC;

SELECT COUNT(*),
name
FROM users
GROUP BY name;

SELECT * FROM users
LIMIT 2
OFFSET 0;

SELECT * FROM users
LIMIT 2
OFFSET 2;