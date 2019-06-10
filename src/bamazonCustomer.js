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
    showProducts(() => promptUser(selectID));

};

const promptUser = (next) => {
    inquirer.prompt([{
        name: "id", 
        message: "Which item ID are you purchasing?"
    }]).then(next);
};

const showProducts = (next) => {
    getProducts((products) => {
        const padding = String(products.length).length;
        for (const product of products) {
            print(`Id: ${String(product.item_id).padStart(padding, "0")} | Name: ${product.product_name} | Price: ${product.price} | Inventory: ${product.stock_quantity}`);
        }
        if (!!next){
            next();
        }
    });
};

const selectID = (answer) => {
    inquirer.prompt([{
        name: "amount", 
        message: "Quantity?"
    }]).then((innerAnswer) => purchaseProducts(parseInt(answer.id), parseInt(innerAnswer.amount)));
};

const purchaseProducts = (id, amount) => {
    getProducts((products) => { 
        let handled = false;
        for (const product of products) {
            if (product.item_id !== id) {
                continue;
            }
            handled = true;
            if (product.stock_quantity < amount) {
                logError(`Insufficient quantity for selected Id: ${id}`);
                break;
            }

            updateProduct(id, product.stock_quantity - amount, (err) => {
                if (!!err) {
                    logError(err);
                } else {
                    print(`Successfully purchased ${amount} of product: ${id} for $${(product.price * amount).toFixed(2)}`);
                }
                connection.end();
            });

            return;
        }
        if (!handled) {
            logError(`Id: ${id} not found.`);
            
        }
        connection.end();
    });
    
};

const updateProduct = (id, newQuantity, next) => {
    connection.query(`update products set stock_quantity = ${newQuantity} where item_id = ${id}`, next);
}

const getProducts = (next) => {
    connection.query("select * from products", (err, products) => {
        if (!!err) {
            logError(err);
            connection.end();
            return;
        }
        next(products);
    });
}