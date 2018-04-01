var express = require("express");
var router = express.Router();
var routerAPI = express.Router();

var path = require("path");
let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const settings = require("./../settings");

//prevents of mounting of these files
var fileBlacklist = [
    "index.js",
    "registerCrudMethods.js"
];

//this loads all files in routes
let loadedFiles = 0;
let errorFiles = 0;
var normalizedPath = path.join(__dirname, "");
console.log("[INIT] Starting to Load Routes: ");
require("fs").readdirSync(normalizedPath).forEach(function (file, index) {
    //skip this file
    if (fileBlacklist.includes(file)) {
        console.log("[INIT]\x1b[33m Ignore: " + file + "\x1b[0m");
        return;
    }
    let camel = "/" + camelise(path.basename(file, ".js"));
    let fileLoc = "./" + file;
    try {
        routerAPI.use(camel, require(fileLoc));
        loadedFiles++;
    }
    catch (e) {
        console.error("[INIT]\x1b[31m Failed to load file: " + file + "\x1b[0m");
        console.error(e);
        errorFiles++;
        return;
    }
    console.log("[INIT]\x1b[32m Loaded: " + file + ", on Route: " + camel + "\x1b[0m");
});

if (errorFiles > 0)
    console.log("[INIT]\x1b[31m Loaded " + loadedFiles + "/" + (loadedFiles + errorFiles) + " files. " + errorFiles + " error(s) were encountered." + "\x1b[0m");
else
    console.log("[INIT] Loaded " + loadedFiles + "/" + (loadedFiles + errorFiles) + " files. " + errorFiles + " error(s) were encountered.");

/**
* @api {get} /SongChooser/ Requests the server to serve the Smart Child Care Web Application.
* @apiDescription This route does not need authentication.
* @apiName SmartChildCare
* @apiGroup Root
*/
router.get("/SongChooser", (req, res) => {
    let angularloc = path.resolve("./SongChooser", "index.html");
    res.sendFile(angularloc);
});

/* GET home page. */
router.get("/", function (req, res) {
    res.redirect("/SongChooser");
});

router.use("/API", routerAPI);
module.exports = router;

function camelise(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return letter.toUpperCase();
    }).replace(/\s+/g, "");
}