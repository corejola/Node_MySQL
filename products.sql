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

    -- use to update stock # when transactions are made
    UPDATE products
SET 
    product_name = 'ipod'
WHERE
    item_id = 12;

    -- transaction
    SELECT stock
    FROM products
    WHERE product_id =?
    -- [user selected]
    -- current stock - user selected quantity
    update products set stock = stock - 2 where item_id = 1
    ;



    SELECT *
    FROM products
    WHERE stock < 5;

    INSERT INTO products
    SET

    CREATE TABLE departments
    (
        department_id INT NOT NULL
        AUTO_INCREMENT,
    department_name VARCHAR
        (50) NULL,
    overhead DECIMAL
        (10,2) NULL,
    product_sales INT
        (10) NULL,
     total_profit INT
        (10) NULL,
    PRIMARY KEY
        (department_id)
);


        UPDATE products SET product_sales = product_sales + 200 WHERE item_id = 1;

        SELECT department_name, SUM(product_sales) AS department_sales
        FROM products
        GROUP BY department_name;

        SELECT products.product_sales, products.department_name, departments.department_name
        FROM products
            Left JOIN departments ON products.department_name = departments.department_name
        ORDER BY departments.department_id;

        INSERT INTO departments
            (department_name, overhead)
        values(value, value)