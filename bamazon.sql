DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

create table products (
  item_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(255) DEFAULT NULL,
  department_name varchar(255) NOT NULL,
  price varchar(45) DEFAULT '0.0',
  stock_quantity int(11) NOT NULL,
  PRIMARY KEY (item_id),
  UNIQUE KEY item_id_UNIQUE (item_id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=ascii;

insert into products (product_name, department_name, price, stock_quantity)
values ("Gum", "Food", 2.05, 1000);

insert into products (product_name, department_name, price, stock_quantity)
values ("Silly Putty", "Toy", 10.50, 900);

insert into products (product_name, department_name, price, stock_quantity)
values ("GI Joe", "Toy", 10.75, 1050);

insert into products (product_name, department_name, price, stock_quantity)
values ("Laptop", "Electronics", 2050.99, 500);

insert into products (product_name, department_name, price, stock_quantity)
values ("Drone", "Toy", 1050.10, 475);

insert into products (product_name, department_name, price, stock_quantity)
values ("Dog House", "Pets", 200.99, 200);

insert into products (product_name, department_name, price, stock_quantity)
values ("Bicycle", "Sports", 520.15, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("Coffee Maker", "Home", 210.49, 300);

insert into products (product_name, department_name, price, stock_quantity)
values ("Recliner", "Furniture", 1099.50, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Camera", "Electronics", 609.55, 7);

insert into products (product_name, department_name, price, stock_quantity)
values ("Lockbox", "Home", 250.55, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("iPhone", "Electronics", 520.44, 14);

insert into products (product_name, department_name, price, stock_quantity)
values ("Television", "Electronics", 1575.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Futon", "Home", 245.55, 15);

insert into products (product_name, department_name, price, stock_quantity)
values ("Clock", "Home", 110.50, 15);