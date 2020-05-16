const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

// console.log(process.env.MONGODB_URI);

// EXPRESS SERVER
const app = express();

//  MIDDLEWARE SETUP
app.use(
  cors({
    credentials: true,
    origin: [process.env.PUBLIC_DOMAIN],
  })
);


// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true ,
    keepAlive: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // reconnectTries: Number.MAX_VALUE,
    useFindAndModify: false, ///changed as mern-project manager 
  })
  .then(() => console.log(`Connected to database`))
  .catch(err => console.log(`Mongoose connection error => `, err));


// SESSION MIDDLEWARE
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 7 // 7 days
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized:true,
    cookie: {
      maxAge: 24 * 60 * 60 * 365
    }
  })
)


// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());  ///changed as mern-project manager 

//ROUTE FOR SERVING REACT APP (index.hml)
app.use(express.static(path.join(__dirname, 'public')));


// ROUTERS MIDDLEWARE
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/auth', authRouter);   ///the 2nd says 'auth' in mern-project manager 
app.use('/tasks', tasksRouter);


// 404
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: "not found" });
});


// ERROR HANDLING
app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only send the error if the error ocurred before sending the response
  // (don't try to send the response after it has already been sent)
  if (!res.headersSent) {
    const statusError = err.status || "500";
    res.status(statusError).json(err);
  }
});


module.exports = app;