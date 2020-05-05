const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const Mongostore = require('connect-mongo')(session);
require('dotenv').config();

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

// EXPRESS SERVER
const app = express();

// CORS MIDDLEWARE SETUP
app.use(
  cors({
    creadentials: true,
    origin: [process.env.PUBLIC_DOMAIN]
  })
);

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    useFindAndModify: false
  })
  .then(() => console.log(`Connected to database`))
  .catch(err => console.log(err));

// SESSION MIDDLEWARE
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 7 // 7 days
    })
  })
);

// ROUTERS MIDDLEWARE
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);



// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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