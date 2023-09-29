const express = require("express");
var morgan = require("morgan");

const tourRouter  = require("./routes/tourRoutes");
const userRouter  = require("./routes/userRoutes");

const app = express();

//?1) MIDDLEWARES

//?middleware to check if we are in development or production mode
if(process.env.NODE_ENV === "development"){
  app.use(morgan("dev")); //using morgan for development 
}

app.use(express.json()); //middleware
app.use(express.static(`${__dirname}/public`)) //public directory export


app.use((req, res, next) => {
  console.log("HELLO FROM MIDDLEWARE ");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use("/api/v1/tours", tourRouter); //middleware forspecific route
app.use("/api/v1/users", userRouter);



module.exports = app;
