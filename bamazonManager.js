var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bam'
});

var queryString;

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
  menu();
});

// prompt menu (view all products, view low inventory, add to inventory, add new product)
var menu = function() {
	inquirer.prompt([
		{
			name: "menuOption",
			message: "What would you like to do? Please type fully one of the following options: view products, view low inventory, add inventory, or add new product"
		}
	]).then(function(answers) {
		switch(answers.menuOption) {
			case "view products":
				viewProducts();
				break;
			case "view low inventory":
				lowInventory();
				break;
			case "add inventory":
				addInventory();
				break;
			case "add new product":
				addProduct();
				break;
			default:
				console.log("Sorry, command not recognized please try again.");
				connection.end();				
		}
	});

}
// log all product information
var viewProducts = function() {
	console.log("viewing products");
	queryString="select * from products";
	connection.query(queryString, function (error, results, fields) {
  		if (error) throw error;
  		for(var i = 0; i<results.length; i++) {
  			console.log("ID : " + results[i].ItemID);
  			console.log("NAME: " + results[i].ProductName);
  			console.log("DEPARTMENT NAME: " +results[i].DepartmentName);
  			console.log("PRICE " + results[i].Price);
  			console.log("QUANTITY " + results[i].Quantity);
  		}
	});
	connection.end();
}
// find and return all products with less than 50 in stock
var lowInventory = function() {
	console.log("viewing low inventory");
	queryString="select * from products where Quantity < 50";
	connection.query(queryString, function(error, results, fields) {
		if (error) throw error;
  		for(var i = 0; i<results.length; i++) {
  			console.log("ID : " + results[i].ItemID);
  			console.log("NAME: " + results[i].ProductName);
  			console.log("DEPARTMENT NAME: " +results[i].DepartmentName);
  			console.log("PRICE " + results[i].Price);
  			console.log("QUANTITY " + results[i].Quantity);
  		}
	});
	connection.end();
}
// prompt id and amount of inventory to add and then update the product quantity
var addInventory = function() {
	inquirer.prompt([
		{
			name: "id",
			message: "What is the id of the product you would like to add inventory to?"
		},
		{
			name: "quant",
			message: "What quantity would you like to add?"
		}
	]).then(function(answers) {
		queryString="select * from products where ?";
		connection.query(queryString, {ItemID: answers.id}, function(error, results, fields) {
			if (error) throw error;
			var newQ = results[0].Quantity + parseFloat(answers.quant);
			queryString="update products set ? where ?";
			connection.query(queryString, [{Quantity: newQ}, {ItemID: answers.id}], function(error, results, fields) {
				console.log("adding inventory! New item quantity: " + newQ);
				connection.end();
			});
		});
	});
}
// prompt all categories and add a new product to db
var addProduct = function() {
	inquirer.prompt([
		{
			name: "prodName",
			message: "What is the name of the product you would like to add?"
		},
		{
			name: "dept",
			message: "What is the product department?"
		},
		{
			name: "price",
			message: "What is the price of the product?"
		},
		{
			name: "quant",
			message: "What is the quantity of the product that you would like to add?"
		}
	]).then(function(answers) {
		queryString="insert into products (ProductName, DepartmentName, Price, Quantity) values ('" + answers.prodName + "', '" + answers.dept + "', '" + answers.price + "', '" + answers.quant + "')";
		connection.query(queryString, function(error, results, fields) {
			console.log("adding product");
			console.log(answers);
			connection.end();
		});
	});
}
