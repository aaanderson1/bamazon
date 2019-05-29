const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    main();
    connection.end();
});

const logInfo = (info) => {
    console.log('\x1b[33m%s\x1b[0m', "Info: ", info);
};

const logError = (err) => {
    console.log('\x1b[31m%s\x1b[0m', "Error: ", err);
};

const print = (str) => {
    console.log('\x1b[36m%s\x1b[0m', str);
};

const main = () => {
    showProducts();

};

const showProducts = () => {
    connection.query("select * from products", (err, products) => {
        const padding = String(products.length).length;
        for (const product of products) {
            print(`Id: ${String(product.item_id).padStart(padding, "0")} | Name: ${product.product_name} | Price: ${product.price} | Inventory: ${product.stock_quantity}`);
        }
    });
};