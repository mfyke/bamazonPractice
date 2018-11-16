var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bam'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

// prompt menu (view all products, view low inventory, add to inventory, add new product)
 
// log all product information

// find and return all products with less than 50 in stock

// promp id and amount of inventory to add and then update the product quantity

// prompt all categories and add a new product to db
