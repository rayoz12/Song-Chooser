import { promisify } from "util";

import { Router, Request, Response } from "express";
import { get } from "config";
import logger from "../util/logger";
import fileUpload from "express-fileupload";
import { Packaging } from "../util/configInterface";

const router = Router();

const packagingConfig: Packaging = get<Packaging>("packaging");

router.post("/uploadSong", async (req: Request, res: Response) => {
    if (!req.files) {
        res.status(400).json({ success: 0, err: "No files were uploaded." });
        return;
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const song = <fileUpload.UploadedFile> req.files.song;

    const mvPromise = promisify(song.mv);

    try {
        await mvPromise(`${packagingConfig.html_files}${song.name}`);
        res.json({ success: 1 });
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