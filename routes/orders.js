const express = require('express');
const { body } = require('express-validator/check')

const ordersController = require('../controllers/orders');
const { application } = require('express');

const router =  express.Router();



//making the router for all the orders from yesterday
router.get('/orders', ordersController.getYesterdayorders);

//making the router for a new order to add to the database and checking that the client id must be 5 digits and the order isnt empty 
 

router.post('/order', ordersController.postOrder);

/* router.post('/order', (req,res,next) => {
    console.log(req.body);
    res.redirect('/order');
}); */
module.exports = router;