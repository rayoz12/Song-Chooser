const express = require("express");
const knex = require("./../core/db");

const router = express.Router();

const Song = require("../model/songModel");

//Look here for routes
require("./registerCrudMethods")(router, Song);

router.get("/songSearch", function (req, res) {
    const searchTerm = req.query.searchTerm;
    knex("Song").where("song_name", "like", `%${searchTerm}%`).orWhere("tags", "like", `%${searchTerm}%`).then(data => {
        res.json(data);
    });
});

module.exports = router;