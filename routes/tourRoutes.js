
const express = require('express');
const router = express.Router();
const fs = require("fs");
const tourController = require("./../controllers/tourController");


const tourRouter = express.Router()

router.param('id',tourController.checkID);
 
tourRouter.route("/")
.get(tourController.getAllTours)
.post(tourController.createTour);
tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);






module.exports = tourRouter;