var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
require('dotenv').config();
var app = express();


mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log(
      `Connected to MongoDB! Database`
    );
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/user', authRouter);
app.use('/api', usersRouter);

app.use(express.static("uploads"));
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

module.exports = app;
