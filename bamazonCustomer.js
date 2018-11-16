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

var queryString = "select * from products";
//show all products id name price and quantity
var showProducts = function() {
	connection.query(queryString, function (error, results, fields) {
  		if (error) throw error;
  		for(var i = 0; i<results.length; i++) {
  			console.log("ID : " + results[i].ItemID);
  			console.log("NAME: " + results[i].ProductName);
  			console.log("DEPARTMENT NAME: " +results[i].DepartmentName);
  			console.log("PRICE " + results[i].Price);
  			console.log("QUANTITY " + results[i].Quantity);
  		}
  		promptBuy();
	});
}

//prompt the id of the product to buy and the quantity
var promptBuy = function() {
	inquirer.prompt([
		{
			name: "id",
			message: "What is the id of the item you would like to buy?"
		},
		{
			name: "quantity",
			message: "What is the quantity that you would like to buy?"
		}
	]).then(function(answers) {
		console.log(answers);
	});

}
//if there is not enough log insuficient quantity

//if there is enough update the database to reflect the transaction and log the total cost

showProducts();