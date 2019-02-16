import { HTML_FilesFS } from "./HTML_Files/HTML_FilesFS";
import { IHTML_File, IHTML_FilesAL } from "./HTML_Files/IHTML_FilesAL";
import { Song } from "../models/Song";
import * as config from "config"
import { Op } from "sequelize";

/**
 * Implements high level functionality to search, add and Edit Songs
 */
export class HTML_FilesSong {
    
    private htmlFS: IHTML_FilesAL;

    constructor(private html_filesLoc: string) {
        // const fileLoc = config.get<string>("packaging.html_files");
        this.htmlFS = new HTML_FilesFS(html_filesLoc);
        this.htmlFS.initialise();
    }

    public async readSongText(id: number): Promise<string> {
        const song = await Song.findById(id);
        if (song === null) {
            throw new Error(HTML_FilesSongErrors.SONG_NOT_FOUND);
        }
        return this.htmlFS.getTextinFile(song.path);
    }

    async searchViaDB(term: string): Promise<Song[]> {
        return Song.findAll({
            where: {
                [Op.or]: [{
                    song_name: {
                        [Op.like]: term
                    }
                },{
                    tags: {
                        [Op.like]: term
                    }
                }]
            }
        })
    }
}

export enum HTML_FilesSongErrors {
    SONG_NOT_FOUND = "SONG_NOT_FOUND"
}