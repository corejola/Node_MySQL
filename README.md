# BAMAZON
### Week-12 HW: Node.js & MySQL

## Functionality
bamazonCustomer requires the following Node Packages to be installed prior to launching bamazonCustomer.js and bamazonManager.js.
please ensure to `npm install mysql` & `npm install inquirer`
Links for MySQL & Inquirer are located at the end of this README. 

#
## How to Use bamazon Customer
1. Run `node bamazonCustomer.js`
2. BamazonCustomer will connect to the `bamazondb` and display the current inventory from the products table.
3. item_id, product_name, department_name & price will be displayed to the user.
4. The user will be prompted to input the item_id of the product they would like to purchase.
5. The user will be prompted to input the quantity they would like to purchase.
6. Bamazon will then display the users input & display the current inventory stock.
7. A confirmation will be required to continue. Once confirmed, transaction is complete.
  - ![bamazon Customer Transaction](assets\images\bamazonCustomerTrans.PNG)
8. `bamazondb - products'` stock will be updated.  
    - `UPDATE products SET stock = stock - [user quantity] WHERE item_id = #`
    - ![updated sql](assets\images\SQLSnapshot.PNG)

#
## How to Use bamazon Manager
1. Run `node bamazonManager.js`
2. BamazonManager will connect to the `bamazondb` and the user (4) menu options:

    * ![bamazon Manager Menu](assets\images\bamazonManagerMenu.PNG)

    * `Products for Sale` - display all inventory products from the products table.
    * `Low Inventory` - dispaly inventory products from the products table that have stock count less than 5.
    * `Add to Inventory` - will prompt the user to update the stock of a product with the required information.
        - item_id  
        - Added product Stock
    * `Add New Products` - will prompt the user to add a new product to the products table with the required information.
        - Product Name
        - Department Name
        - Price
        - Stock

    * ![bamazon Manager New Inventory](assets\images\bamazonManagerNewInventory.png)
3. Once an action is completed, bamazoneManager.js will prompt the user if they have finished. 
    * If finished, bamazonManager.js will exit.
    * If more actions are required, main menu will launch.

#
## How to Use bamazon Supervisor (incomplete)
1. run `node bamazonSupervisor.js`
2. BamazonSupervisor will connect to the `bamazondb`
3. User will be prompted to make a selection
    1. View Product Sales by Deparment
        * Product sales of department shows/ combines the products sales value from all items with matching department_names
        * Table displayed to the console (via CLI Table3) will display the overhead against the product sales combined as the alias department_sales
        * Profit is displayed as the difference between the overhead the department_sales
    2. Create New Department
        * Allow use to add new department departments tables
    

## Node Packages used:
- [MySQL](https://www.npmjs.com/package/mysql)
- [Inquirer](https://www.npmjs.com/package/inquirer)

