DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("USB Flashdrive", "Geo Department", 25.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("USB Harddrive", "Geo Department", 50.00, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Used Toothbrush", "Geo Department", 600.00, 1);