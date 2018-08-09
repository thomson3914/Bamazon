// require dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var figlet = require('figlet');
var Table = require("cli-table");
var colors = require("colors");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",  
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    // The database
    database: "bamazon"
});

// connect to the database and returns bamazon logo and calls displayItems
connection.connect(function (err) {
    if (err) throw err;
    console.log(figlet.textSync('BAMAZON', {
    }));
    displayItems();
});

// function that displays items for sale in a table
function displayItems() {
    connection.query('SELECT * FROM products', function (error, response){
        
        let table = new Table ({ 
          head: ['Item ID', 'Product Name', 'Department', 'Price (billions)', 'Quantity']
        });
        for (let i = 0; i < response.length; i++) {
          table.push([response[i].item_id, response[i].product_name, response[i].department_name, '$' + response[i].price, response[i].stock_quantity])   
        }
        // console.reset();
        console.log(table.toString());
       
        userPrompt();    //call method
      })
    }

// prompt the user for the item/quantity they would like to purchase
function userPrompt() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the ID of the item you would like to purchase: "
        }, {
            name: "quantity",
            type: "input",
            message: "Enter the quantity of this item you would like to purchase: "
        }
    // then three responses returned - Out of Stock + Almost Out of Stock + Thank You for your Purchase
    ]).then(function (response) {
        connection.query(
            "SELECT item_id, product_name, price, stock_quantity FROM products",
            function (err, res) {
                var itemIndex = response.id - 1;
                if (res[itemIndex].stock_quantity <= 0) {
                    console.log(
                        "\n---------------------------------------------------------------------------------------\n" +
                        "Insufficient Quantity! This Item is Out of Stock." +
                        "\n---------------------------------------------------------------------------------------\n"
                    );
                    displayItems();
                }
                else if (res[itemIndex].stock_quantity < response.quantity) {
                    console.log(
                        "\n---------------------------------------------------------------------------------------\n" +
                        "This Item is Almost Out of Stock." +
                        "There are Only " + res[itemIndex].stock_quantity + " Unit(s) Remaining." +
                        "\n---------------------------------------------------------------------------------------\n"
                    );
                    displayItems();
                }
                else {
                    var invoice = res[itemIndex].price * response.quantity;

                    console.log(figlet.textSync('BAMAZON', {}) +
                        "\n---------------------------------------------------------------------------------------\n" +
                        "Thank You for your Purchase - Total Cost = $" + invoice +
                        "\n---------------------------------------------------------------------------------------\n"
                    );
                    // updating the mySQL database to reflect the remaining quantity
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: res[itemIndex].stock_quantity - response.quantity
                            },
                            {
                                item_id: response.id
                            }
                        ],
                        function (error, results) {
                            displayItems();
                        }
                    );
                }
            }
        );
    });
}