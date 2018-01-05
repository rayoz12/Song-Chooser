//     _____                      ________                              
//    / ___/____  ____  ____ _   / ____/ /_  ____  ____  ________  _____
//    \__ \/ __ \/ __ \/ __ `/  / /   / __ \/ __ \/ __ \/ ___/ _ \/ ___/
//   ___/ / /_/ / / / / /_/ /  / /___/ / / / /_/ / /_/ (__  )  __/ /    
//  /____/\____/_/ /_/\__, /   \____/_/ /_/\____/\____/____/\___/_/     
//                   /____/                                             

let express = require("express");
let bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
let app = express();
let morgan = require("morgan");
// create application/json parser 
let jsonParser = bodyParser.json();
//let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(fileUpload({ preserveExtension: true}));
app.use(jsonParser);

// create application/x-www-form-urlencoded parser 

let path = require("path");
let util = require("util");
let cors = require("cors");
let cookieParser = require("cookie-parser");
const moment = require("moment"); 

util.inspect.defaultOptions = { colors: true, depth: null, maxArrayLength: 20 }

// view engine setup
app.set("views", path.join(__dirname, "views"));


//colours from http://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
app.use(morgan(function (tokens, req, res) {
    let statusColour = res.statusCode < 400 ? "\x1b[32m" : "\x1b[31m";//green : red
    let resetColour = "\x1b[0m";
    let cyanColour = "\x1b[36m";
    return [
        moment().format("DD/MM/YY HH:mm:ss"), "|",
        req.ip,
        cyanColour + tokens.method(req, res) + resetColour,
        statusColour + tokens.url(req, res) + resetColour,
        statusColour + tokens.status(req, res) + resetColour, "-",
        cyanColour + "Len:" + resetColour, tokens.res(req, res, "content-length"), "-",
        tokens["response-time"](req, res), "ms",
        cyanColour + "Body:" + resetColour, util.inspect(req.body),
        cyanColour + "Params:" + resetColour, util.inspect(req.params),
    ].join(" ");
}));

app.use("/Images", express.static(path.join(__dirname, "images"))); //Here set directory that holds images for the web app
app.use("/HTML_Files", express.static(path.join(__dirname, "HTML_files"))); //Here set directory that will hold the songs
app.use("/SongChooser", express.static(path.join(__dirname, "SongChooser"))); //Here set directory that will hold the songs
app.use("/public", express.static(path.join(__dirname, "public"))); //General public static directory

app.use(cookieParser());
app.use(cors());
app.use(require("stylus").middleware(path.join(__dirname, "public")));

//all routes in here
app.use("/", jsonParser, require("./routes/"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        if ((err.status || 500) == 500) {
            let errObj = { "success": 0, "message": err.message, "err": err };
            console.log(errObj);
            res.json(errObj);
        }
        else {
            res.json({ "success": 0, "code": err.status || 500, "message": err.message });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.json({ "success": 0, "message": err.message });
});


module.exports = app;
