const express = require("express");
const router = express.Router();
const db = require("../core/db");

const bcrypt = require("bcrypt");
const glob = require("glob");

const SongModel = require("./../model/songModel");

const fs = require("fs"), path = require("path");
const ignoreFields = [
    "owner",
    "created_by",
    "last_modified_by",
    "created_at",
    "last_updated_at",
];
if (process.env.NODE_ENV === "development") {
    router.get("/PasswordHash", (req, res) => {
        bcrypt.hash(req.query.pass, 10).then((hash) => {
            res.send(hash);
        });
    });

    router.get("/GetTableColumns", (req, res) => {
        const table = req.param("table");
        const sql = `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}'`;
        console.log(`calling sql: ${sql}`);
        db.raw(sql).then((data, err) => {
            res.json(data);
        });
    });

    router.post("/RawSQL", (req, res) => {
        const sql = req.body.sql;
        console.log(`calling sql: ${sql}`);
        db.raw(sql).then((data, err) => {
            if (err) res.json(err);
            res.json(data);
        });
    });

    router.get("/GenerateRoute", (req, res) => {
        const table = req.param("table");
        const sql = `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}'`;
        console.log(`calling sql: ${sql}`);
        db.raw(sql).then((data => {
            if (data.length == 0) {
                res.json({ "success": 0, });
                return;
            }
            const model = generateModel(table, data);
            const route = generateRoute(table);
            //console.log("Model: " + model);
            //console.log("Route: " + route);
            const modelFile = camelise(table) + "Model.js";
            const routeFile = camelise(table) + ".js";
            let wroteRoute = false;
            fs.writeFile(`model/${modelFile}`, model, (err) => {
                if (err) throw err;
                console.log("Saved Model");
                if (!fs.existsSync(`routes/${routeFile}`)) {
                    fs.writeFileSync(`routes/${routeFile}`, route);
                    console.log("Saved Route");
                    wroteRoute = true;
                }
                else {
                    console.log(`not saving route as "routes/${routeFile}" already exists`);
                }
                res.json({ "success": 1, model, route, wroteRoute });
            });
        }));
    });

    router.post("/GenerateSongs", (req, res) => {
        //const songDir = req.body.path;
        const songDir = "./HTML_Files/";
        const filter = songDir + "**/**.htm";
        const records = [];
        glob(filter, (err, result) => {
            for (let  i = 0; i < result.length; i++) {
                const file = result[i];
                let containingDir = path.dirname(file).split(path.sep).pop().slice(songDir.length);
                containingDir = containingDir.replace(/\//g, " ");
                const name = path.basename(file);
                const songModel = {
                    song_name: name,
                    path: file,
                    tags: containingDir
                }
                records.push(songModel);
            }
            SongModel.rawSQL("truncate table song").then(() => {
                return SongModel.createBatch(records);
            }).then((data) => {
                res.json({ success: 1, data });
            }).catch((data) => {
                res.json({ success: 0, data });
            });

        });
    });
}
else {
    router.all("*", (req, res) => {
        res.json({ success: 0, err: "Running in Production Mode" });
    });
}

function generateModel(modelName, fields) {
    let modelStr = "const ORM = require(\"../core/ORM\");\n\n";
    modelStr += "const model = {\n";
    //generate id special case
    modelStr += "\tid: {\n\t\ttype: ORM.Types.BIGINT,\n\t\tautoIncrement: true,\n\t},\n";
    for (let i = 1; i < fields.length; i++) {
        if (ignoreFields.includes(fields[i].COLUMN_NAME))
            continue;
        const modelField = fields[i].COLUMN_NAME;
        let modelType;
        switch (fields[i].DATA_TYPE) {
            case "datetime2":
                modelType = "DATETIME";
                break;
            case "constchar":
                modelType = "constCHAR";
                break;
            case "numeric":
                modelType = "INT";
                break;
            default:
                modelType = fields[i].DATA_TYPE.toUpperCase();
        }
        modelStr += `\t${modelField}: ORM.Types.${modelType},\n`;
    }
    modelStr += `}\nconst modelInterface = new ORM.Table("${modelName}", model);\n\nmodule.exports = modelInterface;`;
    return modelStr;
}

function generateRoute(modelName) {
    return `const express = require("express");\n\nconst router = express.Router();\n\nconst ${modelName} = require("../model/${camelise(modelName)
        }Model");\n\n//Look here for routes\nrequire("./registerCrudMethods")(router, ${modelName});\n\nmodule.exports = router;`;
}

function camelise(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

module.exports = router;