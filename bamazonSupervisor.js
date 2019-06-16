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
            console.log("Add New Department")
            inquirer.prompt([
                {
                    type: "input",
                    name: "deptName",
                    message: "Input New Department Name.",
                },
                {
                    type: "input",
                    name: "overhead",
                    message: "Input Department Overhead",
                    validate: function (val) {
                        if (isNaN(val) || val === "") return false;
                        return true;
                    }
                }
            ]).then(function (answer) {
                deptNew(answer.deptName, answer.overhead)
            });
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
    connection.query("SELECT departments.department_id, departments.department_name, departments.overhead, SUM(products.product_sales) AS product_sales, (product_sales - departments.overhead) AS Profit FROM departments LEFT JOIN products ON products.department_name = departments.department_name GROUP BY products.department_name ORDER BY departments.department_id", function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['Department ID', 'Department Name', 'Overhead', 'Product Sales', 'Profit']
            , colWidths: []
        });


        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].department_id, res[i].department_name, res[i].overhead, res[i].product_sales, res[i].Profit]
            );
        }
        console.log(table.toString());
        connection.end();
    });
};

function deptNew(deptName, overhead) {
    //make MYSQL connection to the bamazondb.departments. 
    //using SQL code & inquirer, user as the ability to add a new department
    //      INSERT INTO departments (department_name, overhead)
    //         values(value, value)
    connection.query("INSERT INTO departments SET ?",
        {
            department_name: deptName,
            overhead: overhead
        },
        function (err, res) {
            if (err) throw err;
            // console.log(res)
            console.log("New Department Added")
        });
    connection.end();


}