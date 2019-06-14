var Table = require('cli-table3');
var mysql = require("mysql");
var inquirer = require("inquirer");

// node bamazonSupervisor has choice of Product Sales by Deparment & Create New Department

// Product sales of department shows/ combines the products sales value from all items with matching department_names
// display using CLI-table 3

// create new department will allow use to create a new department in both the products and departments tables

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    password: "Crendel!0356857",
    database: "bamazondb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    supervisor();
});

function supervisor() {
    inquirer.prompt([
        {
            type: "list",
            name: "selection",
            message: "Choose an Action: ",
            choices: ["View Product Sales by Department", "Create New Department"],
        }
    ]).then(function (answer) {
        console.log(answer.selection)
        if (answer.selection === "View Product Sales by Department") {
            deptSales()
        }
        if (answer.selection === "Create New Department") {
            deptNew()
        }
        else {
            connection.end()
        }
    });
};


// 
// SELECT department_name, SUM(product_sales) AS department_sales
// FROM products
// GROUP BY department_name;
function deptSales() {
    connection.query("SELECT department_name, SUM(product_sales) AS department_sales FROM products Group By department_name", function (err, res) {
        if (err) throw err;
        console.log("Department Name " + "----" + "Department Sales")
        console.log(res[0].department_name + "----" + " $" + res[0].department_sales)
        var table = new Table({
            head: ['TH 1 label', 'TH 2 label']
            , colWidths: [100, 200]
        });
        // using SQL Join between the bamazondb.products & bamaondb.department to have the alias department_sales 
        // console.log(table.push(res))

    });
};

function deptNew() {
    //make MYSQL connection to the bamazondb.departments. 
    //using SQL code & inquirer, user as the ability to add a new department
    //      INSERT INTO departments (department_name, overhead)
    //         values(value, value)
}