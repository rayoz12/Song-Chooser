/**
 * This controller handles the endpoints for getting Hymns and editing them
 */
import config from "config"

import { Router, Request, Response } from "express";
import { HymnEndpoints } from "../../../SC-Common/URLEndpoints";

import { HTMLWordHymnParser } from "./../core/Song/HymnParser";
import { HTML_FilesSong } from "../core/HTML_FilesSong";

const htmlFilesLocation = config.get<string>("packaging.html_files");

const html_FileSong = new HTML_FilesSong(htmlFilesLocation);

const router = Router();

router.get(HymnEndpoints.GET_PARAGRAPHS + ":identifier", async (req: Request, res: Response) => {
    const hymnID: number = parseInt(req.params.identifier);
    try {
        const text = await html_FileSong.readSongText(hymnID);
    
        const HTMLParser = new HTMLWordHymnParser(text);
        console.log(hymnID);
        
        res.json(HTMLParser.getTitle());
    }
    catch(e) {
        res.status(500).json(e);
        // res.end();
    }
})

export const HymnController: Router = router;