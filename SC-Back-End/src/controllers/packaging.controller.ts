import { promisify } from "util";
import fs from "fs-extra"
import * as path from "path";

import fileUpload from "express-fileupload";
import { Router, Request, Response } from "express";
import { get } from "config";

import logger from "../util/logger";
import { Packaging } from "../util/configInterface";

import { PackageEndpoints } from "./../../../SC_Common/URLEndpoints";
import { ProjectionGeneration } from "../core/ProjectionGeneration";
import { ITemplateDetail } from "../../../SC_Common/DBModels";

const router = Router();

const packagingConfig: Packaging = get<Packaging>("packaging");

router.post(PackageEndpoints.UPLOAD_SONG, async (req: Request, res: Response) => {
    if (!req.files) {
        res.status(400).json({ err: "No files were uploaded." });
        return;
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const song = <fileUpload.UploadedFile> req.files.song;

    const mvPromise = promisify(song.mv);

    try {
        await mvPromise(`${packagingConfig.html_files}${song.name}`);
        res.json({ success: 1 });
        logger.info("A user has uploaded a song to the server:", song.name)
    }
    catch (e) {
        logger.error(e);
        console.error(e);
        res.status(500).json({ success: 0 });
    }
    return

    // Use the mv() method to place the file somewhere on your server
    // song.mv(`${packagingConfig.html_files}${song.name}`, function (err) {
    //     if (err)
    //         return res.status(500).json({ success: 0, err });

    //     res.json({ success: 1 });
    // });
});

router.post(PackageEndpoints.PACKAGE, async function (req: Request, res: Response) {
    const songList: ITemplateDetail[] = req.body.songList;
    const name = req.body.name;
    const tempName = Date.now();
    const exportFolder = packagingConfig.output_paths.stagedPath + tempName + path.sep;

    logger.info("Assembling/Exporting Song list:", songList);

    try {
        fs.mkdir(exportFolder);
    }
    catch (err) {
        if (err.code != 'EEXIST') {
            res.status(500).json(err);
        }
        logger.error(err);
        console.error(err);
    }

    try {
        const promiseArr = [];
        const songPaths: string[] = [];//keeps track of songs that are used so that we know a duplicate has been encountered and we don't need to copy the files again.
        for (let i = 0; i < songList.length; i++) {
            const song = songList[i].song;
            if (!song) {
                throw new Error("Song not defined!");
            }
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
        await Promise.all(promiseArr);

        //copy main file
        await Promise.all([
            //main
            fs.copy(packagingConfig.input_files.main_page.location[0], exportFolder + packagingConfig.input_files.main_page.name[0]), fs.copy(packagingConfig.input_files.main_page.location[1], exportFolder + packagingConfig.input_files.main_page.name[1]),
            //remote control and jquery
            fs.copy(packagingConfig.input_files.remote_control.location, exportFolder + packagingConfig.input_files.remote_control.name), fs.copy(packagingConfig.input_files.jquery.location, exportFolder + packagingConfig.input_files.jquery.name)
        ]);

        const mainFileHTML = await fs.readFile(exportFolder + packagingConfig.input_files.main_page.name[0]);

        const projection: ProjectionGeneration = new ProjectionGeneration(songList);
        projection.GenerateProjection();

        const html = generateMainHtml(songList);
        const main = data.toString().split("\n");
        main.splice(8, 0, `<script src="${jqueryName}"></script>`);
        main.splice(787, 0, html);
        var text = main.join("\n");

        return fs.writeFile(exportFolder + mainPageName[0], text);

        
    }
    catch (e) {
        
    }


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
        
    }).then(data => {
        
    }).then(data => {
        return fs.readFile(exportFolder + packagingConfig.input_files.main_page.name[0]);
    }).then(data => {
        //data is main file text
        const html = generateMainHtml(songList);
        const main = data.toString().split("\n");
        main.splice(8, 0, `<script src="${jqueryName}"></script>`);
        main.splice(787, 0, html);
        var text = main.join("\n");

        return fs.writeFile(exportFolder + packagingConfig.input_files.main_page.name[0], text);
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