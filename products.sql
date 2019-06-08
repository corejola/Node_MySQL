DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (50) NULL,
    department_name VARCHAR
    (50) NULL,
    price DECIMAL
    (10,2) NULL,
    stock INT
    (10) NULL,
    PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name,department_name, price, stock
        )
    VALUES
        ("60M-rope", "climb", 200, 10);
