const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
//const sql = require('mssql');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.set('view engine', 'pug');
app.locals.basedir=path.join(__dirname, 'S1');
app.use(bodyParser.urlencoded({ extended: false }))


// view engine setup

app.set('views', path.join(__dirname, 'views'));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    genid: function(req) {
        return uuidv4();
    },
    secret: '4Cp41hsnxK^(G{IY;+A]',
    resave: false,
    saveUninitialized:false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(8080, function(){
    console.log("Server started on port 8080")
});

var mysql = require('mysql2');
//TODO Database configurations

const connection = mysql.createConnection({
    user: 'root',
    password: '1595',
    //server: 'DESKTOP-NNL0TNK',
    port: 1433,
    database: 'sys_db',
    host: 'DESKTOP-NNL0TNK',
    //dialect: 'mysql',
});
//
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ', err);
        return;
    } else {
        console.log('Connected to Sys_DB');
        return;
    }
});
// connection.query('SELECT * from sarst_login_accounts', function(err, rows, fields) {
//     if(err) console.log(err);
//     console.log('The solution is: ', rows);
//     connection.end();
// });
app.get("/", function(req,res) {

    // SEND WORKING FRONT END LOGIN PAGE COMMENT OUT FOR DATABASE CONFIG DEBUGGING
    res.render(__dirname+"/views/index.pug", {title: "login"});

    //res.send(req.sessionID);

 });


app.post('/', function (req, res){
    //TODO validate email and password input
    let email=req.body.emailInput;
    let password=req.body.passwordInput;
    //TODO Authenticate email and password input
    console.log(email + " " + password);
    res.send(`Email: ${email} Password: ${password}`);
});

app.get('/register', function(req, res, next) {
   res.render(__dirname+"/views/register.pug", {title: "register"});
 });

app.post('/register', function (req, res){
    //TODO validate email and password input
    let firstName=req.body.firstName;
    let lastName=req.body.lastName;
    let email=req.body.requestedEmailInput;
    let password=req.body.requestedPasswordInput;
    let userType="";
    if (req.body.requestedUserType=="provider") {
        userType="provider";
    } else {
        userType="admin";
    }
    console.log(firstName + " " + lastName + " " + email + " " + password + " User Type: " + userType);
    res.send(`Email: ${email} Password: ${password}`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
