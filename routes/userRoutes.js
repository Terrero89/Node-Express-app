
const express = require('express');
const router = express.Router();
const userController = require("./../controllers/userController");




  const userRouter = express.Router();


//?USER BY ID
userRouter.route("/:id").get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

userRouter.route("/").get(userController.getAllUsers).post(userController.createUser);

module.exports = userRouter;