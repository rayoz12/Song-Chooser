const express = require("express");

const router = express.Router();

const TemplateDetail = require("../model/templateDetailModel");

//Look here for routes
require("./registerCrudMethods")(router, TemplateDetail);

module.exports = router;