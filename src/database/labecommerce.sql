-- Active: 1690225505629@@127.0.0.1@3306



-- =======================********================================


CREATE TABLE users (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    created_at TEXT NOT NULL
);

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name  TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE purchases (
    id  TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price  REAL DEFAULT(0) NOT NULL,
    created_at TEXT NOT NULL,
    Foreign Key (buyer) REFERENCES users (id)
        ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela users
        ON DELETE CASCADE -- efeito cascata ao deletar id na tabela users 
);

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity REAL NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id)
        ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela purchases
        ON DELETE CASCADE -- efeito cascata ao deletar id na tabela purchases
    FOREIGN KEY (product_id) REFERENCES products (id)
        ON UPDATE CASCADE -- efeito cascata ao atualizar id na tabela products
        ON DELETE CASCADE -- efeito cascata ao deletar id na tabela products
);

SELECT * FROM users;
SELECT * FROM purchases;
SELECT * FROM purchases_products;
SELECT * FROM products;