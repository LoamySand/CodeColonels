const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const createError = require('http-errors');

const app = express();


const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
const router = express.Router();
const dbConfig = require("./app/config/db.config");


app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))

const {v4: uuidv4} = require('uuid');
app.use(logger('dev'));
app.use(cookieParser());

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(session({
  genid: function(req) {
    return uuidv4();
  },
  secret: '4Cp41hsnxK^(G{IY;+A]',
  resave: false,
  saveUninitialized:false
}));

const db = require("./app/models");
const Role = db.role;

db.mongoose
    // DEBUG CONNECTION STRING MAY NEED TO BE CHANGED BETWEEN DEVELOPERS
  .connect("mongodb+srv://leboyd:woG5ARXCb4qOmj87@cluster0.fka9l0p.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// GET ROUTES
app.get('/', (req, res) => {
  // res.json({ message: "Welcome to bezkoder application." });
  res.render(__dirname+"/app/views/index.pug", {title: "login"});
});

app.get('/register', function(req, res, next) {
  res.render(__dirname+"/app/views/register.pug", {title: "register"});
});

//POST ROUTES
// app.post('/', function (req, res){
//   //TODO validate email and password input
//   let email=req.body.emailInput;
//   let password=req.body.passwordInput;
//   //TODO Authenticate email and password input
// });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
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
  res.render(__dirname+"/app/views/register.pug");
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count == 0) {
      new Role({
        name: "provider"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'provider' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "root"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'root' to roles collection");
      });
    } else {
      console.log(err);
    }
  });
}
