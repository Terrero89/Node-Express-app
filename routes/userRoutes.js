
const express = require('express');
const router = express.Router();
const userController = require("./../controllers/userController");




//?USER BY ID
router.route("/:id").get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

router.route("/").get(userController.getAllUsers).post(userController.createUser);

module.exports = router;