var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Warehouse = require('./src/models/warehouseModel');
const PORT = 8080;

var bodyParser = require('body-parser');
//mongoose.connect('mongodb+srv://applicazioniweb2019:applicazioniweb2019@cluster0-f3q4q.gcp.mongodb.net/dbwarehouse', { useNewUrlParser: true, useFindAndModify: false });
mongoose.connect('mongodb://localhost/dbwarehouse', { useNewUrlParser: true, useFindAndModify: false });

//Per gestire i parametri passati nel corpo della richiesta http.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));


var path = require('path');
global.appRoot = path.resolve(__dirname);

var routes = require('./src/routes/warehouseRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function () {
  console.log('Node API server started on port '+ PORT);
});
