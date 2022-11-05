const { json } = require("body-parser");
const { validationResult } = require('express-validator/check');
const Order = require("../models/Order");
const db = require('../util/database');

//the fuctions for the orders of yesterday
exports.getYesterdayorders = async(req, res, next) => {
    //empty array to push the result of the query
    let showYesterdaysOrders =[];
    //our query to fetch the order and order id of all the orders fro, yesterday
    await db.execute('SELECT theOrder,orderID FROM orders WHERE `date`<= subdate(now(),1) AND `date` > subdate(now(),2) ')
    //if the query worked we push the resukts into our empty array
    .then( result => {
        console.log(JSON.stringify(result[0]));
        showYesterdaysOrders.push(JSON.stringify(result[0]));
    })
    //ctaching and printing any errors
    .catch( err => {
        console.log(err);
    });

    //if our results array is empty that means that there arent any orders from yesterday to show 
    if(showYesterdaysOrders[0]==='[]'){
        res.status(200).json({
            NOTICE: 'No orders made yesterday'
        });
    }
    //showing the orders from yesterday
    else {
       res.status(200).json({
        yesterdaysOrders: showYesterdaysOrders
    }); 
    }
   };
    
  //getting the date of today to add to the order
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;


//our function to add an order to the database
exports.postOrder = async (req, res, next) => {
   
    //generating the order id, its not the best way but will do the work in this task
    let orderID= Math.floor(Math.random() * 1000000)+Math.floor(Math.random() * 1000000);
   
    const clientID = req.body.clientID;
    const theOrder = req.body.theOrder;
    const date = today; 
    const totalAmount = req.body.totalAmount;
    const address = req.body.address;

    //creating our new order object
    const order = new Order(clientID,theOrder,date,totalAmount,orderID ,address);
    //saving the orders object to the database
     await order.save()
    .then( result =>{
        console.log(result);
    })
    .catch( err => {
        console.log(err);
    }); 
};