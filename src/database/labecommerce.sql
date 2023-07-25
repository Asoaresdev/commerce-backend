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

-- query buscar todos os users

SELECT * FROM users;

-- query buscar todos os produtos
SELECT * FROM products;

-- query usando um termo de busca
SELECT * FROM products
WHERE name like "%gamer%";

-- query criar um usuario
INSERT INTO users(id, name, email, password, created_at)
VALUES
("05", "Teste Silva", "teste05@email.com", "12345678", DATETIME('now'));

-- query criar novo produto
INSERT INTO products (id, name, price, description, image_url)
VALUES("prod005","Mouse gamer", 250, "Melhor mouse do mercado!", "https://picsum.photos/seed/Mouse%20gamer/400" );

-- editar produto por id
UPDATE products
SET 
    id ="prod01",
    name = "mouse Gamer", 
    price = 300,
    description ="bla bla"
    image_url = "teste"
WHERE id= "prod01";

-- deletar usuario por id 
DELETE FROM users
WHERE id = "0100"; 

-- deletar produto por id 

DELETE FROM products
WHERE id = "prod005";

CREATE TABLE purchases (
    id  TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price  REAL NOT NULL,
    created_at TEXT NOT NULL,
    Foreign Key (buyer) REFERENCES users (id)
);

INSERT INTO purchases (id, buyer, total_price, created_at)
VALUES("purc001","002", 2500,  DATETIME('now') );

SELECT * FROM purchases;

DELETE FROM purchases
WHERE ID = "purc005";

UPDATE purchases
SET total_price = 1000
WHERE id= "purc001";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer=users.id;

SELECT 
    purchases.id,
    purchases.buyer,
    users.name,
    users.id
FROM purchases
INNER JOIN users
ON purchases.buyer=users.id;