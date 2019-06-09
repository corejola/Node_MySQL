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
        makePurchase();

    });
    // initiate transaction here:

};


// following the display of all the items, terminal prompt user with 2 messages, using NPM inquirer 
// ask user to input product ID they would like to purchase
// ask user quanity of product they would like to purchse
// store users choices into a constructor?

function makePurchase() {
    inquirer.prompt([
        {
            type: "input",
            name: "prodID",
            message: "Which product would you like to purchase? Please input Product ID #."
        }
    ]).then(function (answer) {
        if (isNaN(answer.prodID)) {
            console.log("Please try again and select a valid Product ID # ")
            connectionEnd();
        } else {
            console.log("Your Selection is Product Id #" + answer.prodID)
            displaySelected(answer.prodID)
        }
        //validation: input must be a number
        // if are you done with transaction? Y - sum & sql update
        // N - run makePurchase();
    });
};

function displaySelected(id) {
    connection.query("SELECT * FROM products WHERE item_id = ?", [id], function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("------------")
            console.log("\nItem Id: " + res[i].item_id +
                "\nProduct:" + res[i].product_name +
                "\nPrice : $" + res[i].price);
        };
    });
};

function connectionEnd() {
    connection.end();
}