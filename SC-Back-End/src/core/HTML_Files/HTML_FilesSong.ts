import { HTML_FilesFS } from "./HTML_FilesFS";
import { IHTML_File, IHTML_FilesAL } from "./IHTML_FilesAL";
import { Song } from "./../../models/Song";
import * as config from "config"
import { Op } from "sequelize";

/**
 * Implements high level functionality to search, add and Edit Songs
 */
export class HTML_FilesSong extends HTML_FilesFS {
    
    constructor(private html_filesLoc: string) {
        // const fileLoc = config.get<string>("packaging.html_files");
        super(html_filesLoc);
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