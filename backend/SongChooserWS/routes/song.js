const express = require("express");
const knex = require("./../core/db");
const fs = require("fs-extra");
const path = require("path");
const zipFolder = require("zip-folder");

const stagedPath = "./public/staged/";
const zippedPath = "./public/zipped/";

const mainPageLocation = ["./public/static/Main_Stripped.htm", "./public/static/Main_Stripped_files"];
const mainPageName = ["Main Page.htm", "Main Page_files"];

const remoteControlLocation = "./public/static/remoteControl.js";
const remoteControlName = "remoteControl.js";

const jqueryLocation = "./public/static/jquery-3.2.1.min.js";
const jqueryName = "jquery-3.2.1.min.js";


const htmlFiles = "./HTML_Files/";

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

router.post("/uploadSong", function (req, res) {
    if (!req.files)
        return res.status(400).json({ success: 0, err: "No files were uploaded." });

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const song = req.files.song;

    // Use the mv() method to place the file somewhere on your server
    song.mv(`${htmlFiles}${song.name}`, function (err) {
        if (err)
            return res.status(500).json({ success: 0, err });

        res.json({ success: 1 });
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
        const songPaths = [];//keeps track of songs that are used so that we know a duplicate has been encountered and we don't need to copy the files again.
        for (let i = 0; i < songList.length; i++) {
            const song = songList[i];
            console.log(song.path);
            const basename = path.basename(song.path); //Amen.html
            const fileName = song.path.substring(0, song.path.lastIndexOf('.')); //Amen

            //check if duplicate
            if (songPaths.includes(basename)) {
                console.log("[INFO] Duplicate Song encountered, not copying files again.");
                continue;
            }
            promiseArr.push(fs.copy(fileName + "_files", exportFolder + basename.substring(0, basename.lastIndexOf('.')) + "_files"));
            promiseArr.push(fs.copy(song.path, exportFolder + basename));
            songPaths.push(basename);
        }
        return Promise.all(promiseArr);
    }).then(data => {
        //copy main file
        return Promise.all([fs.copy(mainPageLocation[0], exportFolder + mainPageName[0]), fs.copy(mainPageLocation[1], exportFolder + mainPageName[1]),
            fs.copy(remoteControlLocation, exportFolder + remoteControlName), fs.copy(jqueryLocation, exportFolder + jqueryName)]);
    }).then(data => {
        return fs.readFile(exportFolder + mainPageName[0]);
    }).then(data => {
        //data is main file text
        const html = generateMainHtml(songList);
        const main = data.toString().split("\n");
        main.splice(8, 0, `<script src="${jqueryName}"></script>`);
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
     * `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><span lang=MS style='font-size:48.0pt;font-family:"Arial Narrow",sans-serif; mso-bidi-font-family:Arial;color:white;mso-themecolor:background1;mso-ansi-language:MS'>We shall arise at the sound of our name.<o:p></o:p></span></p>`
     */
    //lyrics is an array of paragraphs(objects) which contain a title and text

    const exportFolder = htmlFiles;

    const lyrics = req.body.lyrics.map(item => {
            return {text: removeSmartQuotes(item.text), title: removeSmartQuotes(item.title)}
        })
    const title = removeSmartQuotes(req.body.title);

    const songPageName = ["Main Page.htm", "Main Page_files"];
    const destSongPath = [exportFolder + title + ".htm", exportFolder + title + "_files"];
    //copy files
    Promise.all([fs.copy(mainPageLocation[0], destSongPath[0]), fs.copy(mainPageLocation[1], destSongPath[1])]).then(() => {
        console.log("Copied main file");
    }).then(() => {
        return fs.readFile(destSongPath[0]);
    }).then(data => {
        //data is main file text
        const html = generateSongHtml(title, lyrics);
        console.log(html);
        const mainText = data.toString();
        const replacedText = mainText.replace(/Main_Stripped/g, title);
        const main = replacedText.split("\n");
        main.splice(787, 0, html);
        const text = main.join("\n");
        //write changes
        return fs.writeFile(destSongPath[0], text);
    }).then(() => {
        console.log("Wrote modified main.xml");
        //modify file list to point to new name
        const fileText =
            `<xml xmlns:o="urn:schemas-microsoft-com:office:office">
 <o:MainFile HRef="../${encodeURI(title + ".htm")}"/>
 <o:File HRef="themedata.thmx"/>
 <o:File HRef="colorschememapping.xml"/>
 <o:File HRef="filelist.xml"/>
</xml>`;
        return fs.writeFile(destSongPath[1] + path.sep + "filelist.xml", fileText);
    }).then(() => {
        console.log("Wrote modified filelist.xml");
        //add to DB now
        return Song.create({ song_name: title, path: destSongPath[0]});
    }).then(() => {
        res.json({ success: 1, path: destSongPath[0] });
    }).catch(e => {
        console.error(e);
    });

    
});

function generateMainHtml(songList) {
    let returnHtml = "";
    for (let i = 0; i < songList.length; i++) {
        const song = songList[i];
        const songName = song.template_song_name || song.song_name;
        const basename = encodeURIComponent(path.basename(song.path)); //Amen.html this is the path
        const html = `<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span lang=EN-US style='font-family:"Arial Narrow",sans-serif;mso-ansi-language:EN-US'><a href="${basename}"> ${songName} </a><o:p></o:p></span></p>`;
        returnHtml += html + "\n";
    }
    returnHtml += `<script src="${remoteControlName}"></script>`;
    return returnHtml;
}

function generateSongHtml(title, paragraphs) {
    let song = generateTitle(title) + "<p></p>";
    for (let i = 0; i < paragraphs.length; i++) {
        song += generateParagraph(paragraphs[i].title, paragraphs[i].text) + "<p></p><p></p>";
    }
    return song;
}

function generateTitle(title) {
    return `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><b style='mso-bidi-font-weight:normal'><span lang=MS style='font-size:36.0pt; mso-bidi-font-size:12.0pt;font-family:"Arial Narrow",sans-serif;mso-bidi-font-family: Arial;color:#FFC000;mso-ansi-language:MS'>${title}<o:p></o:p></span></b></p>`;
}

function generateVerseTitle(title) {
    return `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><b style='mso-bidi-font-weight:normal'><span lang=MS style='font-size:48.0pt; font-family:"Arial Narrow",sans-serif;mso-bidi-font-family:Arial;color:#FFC000; mso-ansi-language:MS'>${title}<o:p></o:p></span></b></p>`;
}

function generateParagraph(title, text) {
    let paragraph = generateVerseTitle(title) + "<p></p><p></p>";
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
        paragraph += `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><span lang=MS style='font-size:48.0pt;font-family:"Arial Narrow",sans-serif; mso-bidi-font-family:Arial;color:white;mso-themecolor:background1;mso-ansi-language:MS'>${lines[i]}<o:p></o:p></span></p>`
            + "<p></p> <p></p> \n\n";
    }
    paragraph += `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><span lang=MS style='font-size:48.0pt;font-family:"Arial Narrow",sans-serif; mso-bidi-font-family:Arial;color:white;mso-themecolor:background1;mso-ansi-language:MS'>&nbsp;<o:p></o:p></span></p>`
        + "<p></p> <p></p> \n\n";
    return paragraph;
}

function removeSmartQuotes(text) {
    return text.replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"');
}

module.exports = router;
