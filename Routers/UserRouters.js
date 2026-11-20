const express = require("express");
const router = express.Router();
const {SignupUser}=require("../C ontrollers/UserController");

router.post("/signup",SignupUser);

module.exports=router;