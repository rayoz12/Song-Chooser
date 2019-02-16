import * as path from "path";
import { get } from "config";
import { ITemplateDetail } from "../../../SC-Common/DBModels";

/**
 * This class handles generating the projections based of a fully resolved template detail list
 */
export class ProjectionGeneration {
    
    public songList: ITemplateDetail[];

    private remoteControlName: string;

    // private 

    constructor(songList: ITemplateDetail[]) {
        this.songList = songList;

        this.remoteControlName = get<string>("packaging.input_files.remote_control.name");
    }

    public GenerateProjection(): void {
        this.GenerateMainHtml();
    }

    private GenerateMainHtml() {
        let returnHtml = "";
        for (let i = 0; i < this.songList.length; i++) {
            const templateDetail = this.songList[i];
            if (templateDetail.song === undefined)
                throw new Error("Template Detail record must have Song defined!");

            const songName = templateDetail.template_song_name || templateDetail.song.song_name || "No name found";
            const basename = encodeURIComponent(path.basename(templateDetail.song.path)); //Amen.html this is the path
            const html = `<p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt'><span lang=EN-US style='font-family:"Arial Narrow",sans-serif;mso-ansi-language:EN-US'><a href="${basename}"> ${songName} </a><o:p></o:p></span></p>`;
            returnHtml += html + "\n";
        }
        returnHtml += `<script src="${this.remoteControlName}"></script>`;
        return returnHtml;
    }
}

