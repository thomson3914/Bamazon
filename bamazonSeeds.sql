DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (item_id)
  );
  
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple TV (4th generation)", "Television", 149, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Lightning Jack Adapter", "Audio", 11.22, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple 13.3 MacBook Air", "Laptop", 834.85, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch", "Wearable Technology", 220.49, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple 15 Inch MacBook Pro", "Laptop", 1899.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iPad with WiFi", "Tablet", 599.99, 36);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple 13 MacBook Pro", "Laptop", 1649.95, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iPhone X", "Cell Phone", 1270, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple World Travel Adapter Kit", "Accessories", 28.99, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iMac 21.5-inch", "Desktop", 1565, 6);