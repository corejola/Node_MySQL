var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Crendel!0356857",
    database: "bamazondb"
});

// list Menu
// Products for sale: displays item_ID, product_name, department_name, price & stock
// view low inventory: displays items with stock < 5;
// add to inventory: prompt to add to current inventory
// add new products: prompt to add new inventory
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    initiateMGMT();
});

function initiateMGMT() {
    inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Choose an Action: ",
            choices: ["Products for Sale", "Low Inventory", "Add to Inventory", "Add New Products"],
        }
    ]).then(function (answer) {
        console.log(answer.selection)
        if (answer.selection === "Products for Sale") {
            saleProducts()
        }

        if (answer.selection === "Low Inventory") {
            lowInventory()
        }

        if (answer.selection === "Add to Inventory") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "prodID",
                    message: "Input Product ID # to be updated.",
                    validate: function (val) {
                        if (isNaN(val) || val === "") return false;
                        return true;
                    }
                },
                {
                    type: "input",
                    name: "stock",
                    message: "Increase Product Stock by # Units.",
                    validate: function (val) {
                        if (isNaN(val) || val === "") return false;
                        return true;
                    }
                }
            ]).then(function (answer) {
                // console.log("stock: " + answers.stock)
                // console.log("product ID: " + answers.prodID)
                restock(answer.stock, answer.prodID)
            });
        };

        if (answer.selection === "Add New Products") {
            console.log("Upload New Inventory Information")
            inquirer.prompt([
                {
                    type: "input",
                    name: "prodName",
                    message: "Input New Product Name.",
                },
                {
                    type: "input",
                    name: "dptName",
                    message: "Input Product Deptarment Association.",
                },
                {
                    type: "input",
                    name: "price",
                    message: "Input New Product Price.",
                    validate: function (val) {
                        if (isNaN(val) || val === "") return false;
                        return true;
                    }
                },
                {
                    type: "input",
                    name: "stock",
                    message: "Input New Product Inventory Stock.",
                    validate: function (val) {
                        if (isNaN(val) || val === "") return false;
                        return true;
                    }
                }
            ]).then(function (answer) {
                newInventory(answer.prodName, answer.dptName, answer.price, answer.stock)
            });
        };
    });
};

function saleProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("------------" + "\nCurrent Store Inventory: ")
        for (var i = 0; i < res.length; i++) {
            console.log("\nItem Id: " + res[i].item_id +
                "\nProduct: " + res[i].product_name +
                "\nDepartment Name: " + res[i].department_name +
                "\nStock: " + res[i].stock +
                "\nUnit Price : $" + res[i].price)
        };
        complete();
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products Where stock < 5", function (err, res) {
        if (err) throw err;
        console.log("------------" + "\nCurrent Store Inventory: Stock < 5 ")
        for (var i = 0; i < res.length; i++) {
            console.log("\nItem Id: " + res[i].item_id +
                "\nProduct: " + res[i].product_name +
                "\nDepartment Name: " + res[i].department_name +
                "\nStock: " + res[i].stock +
                "\nUnit Price : $" + res[i].price)
        };
        complete();
    });
};

function newInventory(name, deptName, price, stock) {
    connection.query("INSERT INTO products SET ?",
        {
            product_name: name,
            department_name: deptName,
            price: price,
            stock: stock
        },
        function (err, res) {
            if (err) throw err;
            // console.log(res)
            console.log("New Inventory Added")
        });
    complete();
};

function restock(quantity, productID) {
    connection.query("UPDATE products SET stock = stock + ? WHERE item_id = ?",
        [quantity, productID],
        function (err, res) {
            if (err) throw err;
            console.log(res)
            console.log("Inventory restocked.")
        });
    complete();
};

function complete() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "processComplete",
            message: "Are you finished?"
        }
    ]).then(function (answer) {
        if (answer) {
            console.log("Goodbye");
            connectionEnd();
        } else {
            initiateMGMT();
        };
    });
};

function connectionEnd() {
    connection.end();
};