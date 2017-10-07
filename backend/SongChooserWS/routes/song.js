const express = require("express");
const knex = require("./../core/db");
const fs = require("fs-extra");
const path = require("path");
const zipFolder = require("zip-folder");

const stagedPath = "./public/staged/";
const zippedPath = "./public/zipped/";

const mainPageLocation = ["./public/static/Main_Stripped.htm", "./public/static/Main_Stripped_files"];
const mainPageName = ["Main Page.htm", "Main Page_files"];

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

router.post("/package", function(req, res) {
    const songList = req.body.songList;
    const name = req.body.name;
    const tempName = Date.now();
    const exportFolder = stagedPath + tempName + path.sep;
    //make directory
    new Promise((resolve, reject) => {
        fs.mkdir(exportFolder, 0777, function (err) {
            if (err) {
                if (err.code == 'EEXIST') resolve(); // ignore the error if the folder already exists
                else reject(); // something else went wrong
            } else resolve(); // successfully created folder
        });
    }).then(() => {
        //copy all selected music files
        const promiseArr = [];
        for (let i = 0; i < songList.length; i++) {
            const song = songList[i];
            console.log(song.path);
            const basename = path.basename(song.path); //Amen.html
            const fileName = song.path.substring(0, song.path.lastIndexOf('.')); //Amen
            promiseArr.push(fs.copy(fileName + "_files", exportFolder + basename.substring(0, basename.lastIndexOf('.')) + "_files"));
            promiseArr.push(fs.copy(song.path, exportFolder + basename));
        }
        return Promise.all(promiseArr);
    }).then(data => {
        //copy main file
        return Promise.all([fs.copy(mainPageLocation[0], exportFolder + mainPageName[0]), fs.copy(mainPageLocation[1], exportFolder + mainPageName[1])]);
    }).then(data => {
        return fs.readFile(exportFolder + mainPageName[0]);
    }).then(data => {
        //data is main file text
        const html = generateMainHTML(songList);
        const main = data.toString().split("\n");
        main.splice(787, 0, html);
        var text = main.join("\n");

        return fs.writeFile(exportFolder + mainPageName[0], text);
    }).then(data => {
        return new Promise((resolve, reject) => {
            zipFolder(exportFolder, zippedPath + name + ".zip", err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }).then(data => {
        //console.log(req.body);
        
        const zippedLocation = req.headers.host + (zippedPath + name + ".zip").slice(1);
        res.json({ success: 1, zippedLocation });
    }).catch(err => {
        console.log(err);
        res.json(err);
    });
});

router.post("/generateSong", function (req, res) {
    /*
     * Title
     * `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><b style='mso-bidi-font-weight:normal'><span lang=MS style='font-size:36.0pt; mso-bidi-font-size:12.0pt;font-family:"Arial Narrow",sans-serif;mso-bidi-font-family: Arial;color:#FFC000;mso-ansi-language:MS'>${title}<o:p></o:p></span></b></p>`;
     * 
     * paragrah heading
     * `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><b style='mso-bidi-font-weight:normal'><span lang=MS style='font-size:48.0pt; font-family:"Arial Narrow",sans-serif;mso-bidi-font-family:Arial;color:#FFC000; mso-ansi-language:MS'>${lyrics[i].title}<o:p></o:p></span></b></p>
     * 
     * Line
     * <p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><span lang=MS style='font-size:48.0pt;font-family:"Arial Narrow",sans-serif; mso-bidi-font-family:Arial;color:white;mso-themecolor:background1;mso-ansi-language:MS'>We shall arise at the sound of our name.<o:p></o:p></span></p>
     */
    //lyrics is an array of paragraphs(objects) which contain a title and text
    const lyrics = req.body.lyrics;
    const name = req.body.name;



    for (let i = 0; i < lyrics.length; i++) {
        const paragraph = lyrics[i];
        
    }
});

function generateMainHTML(songList) {
    let returnHtml = "";
    for (let i = 0; i < songList.length; i++) {
        const song = songList[i];
        const songName = song.template_song_name || song.song_name;
        const basename = encodeURIComponent(path.basename(song.path)); //Amen.html this is the path
        const html = `<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span lang=EN-US style='font-family:"Arial Narrow",sans-serif;mso-ansi-language:EN-US'><a href="${basename}"> ${songName} </a><o:p></o:p></span></p>`;
        returnHtml += html + "\n";
    }
    return returnHtml;
}



module.exports = router;