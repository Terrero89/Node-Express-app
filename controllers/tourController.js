const express = require("express");
const fs = require("fs");



const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); //parsin to be ablke to use file with data

exports.checkID = (req, res, next, val) => {
    console.log(`tour Id is ${val}`);

 
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success", //status that will be used
    requestedAt: req.requestTime,
    results: tours.length, //for more than `1 knowing the len of the data
    data: {
      tours,
    }, //data that will be sent from the server
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params); //id

  const id = req.params.id * 1; //convert it to a number
  const tour = tours.find((el) => el.id === id); //find specific id
  //  if (id > tours.length) {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
          status: "fail",
          message: "invalid ID",
        });
      }
  
  res.status(200).json({
    stats: "success", //status that will be used

    data: {
      tour: tour,
    }, //data that will be sent from the server
  });
};

exports.createTour = (req, res) => {
  //since we are not using body-parser we use the middleware to have the body of req
  //!     console.log(req.body) //onject sent to the post
  const newId = tours[tours.length - 1].id + 1; //adding a new id manually
  const newTour = Object.assign({ id: newId }, req.body); //create object and add it to the array
  tours.push(newTour); //add it to the array tours
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
 
  res.status(200).json({
    status: "Success",
    data: {
      tour: "<updated tour here>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
