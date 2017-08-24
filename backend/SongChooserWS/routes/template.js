const express = require("express");

const router = express.Router();

const Template = require("../model/templateModel");

//Look here for routes
require("./registerCrudMethods")(router, Template);

module.exports = router;