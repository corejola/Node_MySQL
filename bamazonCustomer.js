// Node_MySQL HW assignment to utilze the NPM mysql & the inquirer packages to run
// Create productsDB with the relevant column headers, see products.sql
var mysql = require("mysql");
var inquirer = require("inquirer");

// Modularize Code for BamazonCustomer.js

// user's choices are then compared to stock quanity from the SQL table
// if user selected "product_id" is "stock" === 0, display message that there is "Insufficient Quantity", and they cannot move forwrd with the transaction
// allow them to pick another "product_id"

// otherwise, proceed with the transaction
// update SQL database "stock", based on "product_id"

// display total of order 
// function transaction() for price * stock

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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // upon running file, full list of items instock to be displayed   
    viewProducts();
});

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("------------")
            console.log("\nItem Id: " + res[i].item_id +
                "\nProduct:" + res[i].product_name +
                "\nDepartment: " + res[i].department_name +
                "\nPrice : $" + res[i].price);
        }
        console.log("\n")
        // initiate transaction here:
        makePurchase();
    });
};

// following the display of all the items, terminal prompt user with 2 messages, using NPM inquirer 
// ask user to input product ID they would like to purchase
// ask user quanity of product they would like to purchse

function makePurchase() {
    inquirer.prompt([
        {
            type: "input",
            name: "prodID",
            message: "Which product would you like to purchase? Please input Product ID #.",
            validate: function (val) {
                if (isNaN(val) || val === "") return false;
                return true;
            }
        },
        {
            type: "input",
            name: "purchase",
            message: "How many products would you like to purchase?",
            validate: function (val) {
                if (isNaN(val) || val === "") return false;
                return true;
            }
        }
    ]).then(function (answer) {
        //validation: input must be a number
        console.log("Your Selection is Product Id #" + answer.prodID)
        displaySelected(answer.prodID, answer.purchase)
        //validation: item availability.
        stockCheck(answer.prodID, answer.purchase);
    });
};

function displaySelected(id, quantity) {
    connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            var totalPrice = res[i].price * quantity
            console.log("------------" + "\nYour Transaction Summary: ")
            console.log("\nItem Id: " + res[i].item_id +
                "\nProduct:" + res[i].product_name +
                "\nQuantity: " + quantity +
                "\nTotal Price : $" + totalPrice)
        };
    });
};

function stockCheck(id, quantity) {
    // check the products - stock of the item
    // if the user quantity is > than the current available stock, inform the user that there is not enough stock and display the current available stock
    // if the stock === 0, inform the user the item is out of stock
    var prodID = id;
    var queryQuantity = quantity;

    connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (err, res) {
        if (err) throw err;

        console.log("\n" + "Product Name: " + res[0].product_name + "\nStock Check: " + res[0].stock);

        if (quantity <= res[0].stock) {
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "proceed",
                    message: "Confirm Transaction."
                }
            ]).then(function (answer) {
                if (answer) {
                    // if are you done with transaction? Y - sum & sql update
                    // N - run makePurchase();
                    console.log("Thank you for your purchase.")
                    transaction(prodID, queryQuantity);
                    connectionEnd();
                } else {
                    console.log("Goodbye")
                    connectionEnd();
                };
            });
        }
        if (quantity > res[0].stock) {
            console.log("Currenty inventory has insufficient stock" + "\nPlease check again later");
            connectionEnd();
        }
        if (res[0].stock === 0) {
            console.log("Product: " + res[0].product_name + " OUT OF STOCK");
        }
    });
};

function transaction(id, purchased) {
    // update MySQL with deduction  database stock column with quantity input from stock parameter by user input
    var sql = "UPDATE products SET stock = stock - ? WHERE item_id = ?";
    var inserts = [purchased, id];
    sql = mysql.format(sql, inserts);

    connection.query(sql,
        function (err, res) {
            if (err) throw err;
            console.log(res)
        });
};

function connectionEnd() {
    connection.end();
};