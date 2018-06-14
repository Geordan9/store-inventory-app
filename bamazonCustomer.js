var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    connection.query("SELECT * FROM products", function (err, results) {
        var inquirerChoices = [];
        for (item of results) {
            inquirerChoices.push(`${item.item_id} | ${item.product_name} | $${parseFloat(item.price)}`);
        }
        inquirer.prompt([{
                name: "chosenItem",
                type: "list",
                message: "Choose the item you would like to buy:",
                choices: inquirerChoices
            },
            {
                name: "itemQuantity",
                type: "input",
                message: "How many would you like to buy?:"
            }
        ]).then(function (res) {
            var item = results[parseInt(res.chosenItem[0]) - 1];
            if (item.stock_quantity >= res.itemQuantity) {
                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: (item.stock_quantity - res.itemQuantity)
                        },
                        {
                            item_id: item.item_id
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log(`Total cost: $${res.itemQuantity * item.price}`)
                    });
            } else {
                console.log("Insufficient quantity!");
            }
            connection.end();
        });

    });
});