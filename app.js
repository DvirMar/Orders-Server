const express = require('express');
const bodyParser= require('body-parser');

const ordersRoutes = require('./routes/orders');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use('/orders/order', (req,res,next) =>{
    res.send( '<form action="/orders/order" method="POST"><label>client ID<label><input type="number" min="10000" max="99999" name="clientID"><br><label>the order<label><input type="text" name="theOrder"><br><label>total amount<label><input type="number" step="0.01" name="totalAmount"><br><label>address<label><input type="text" name="address"><br><button type="submit">Add order</button></form>')
    next();
});

app.use('/orders', ordersRoutes);
 
//managing a default eror 404 page
app.use( (req,res,next) => {
    res.status(404).send('<h1>page not found <h1> <h3>please visit http://localhost:8080/orders/orders to see yesterdays order<h3> <h3>please visit http://localhost:8080/orders/order to add new order<h3>');
})

app.listen(8080);