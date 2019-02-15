class SongGeneration {

    constructor() {

    }


    private GenerateSongHtml(title: string, paragraphs: GenerateParagraph[]): string {

        let song = this.GenerateTitle(title) + "<p></p>";
        for (let i = 0; i < paragraphs.length; i++) {
            song += this.GenerateParagraph(paragraphs[i].title, paragraphs[i].text) + "<p></p><p></p>";
        }
        return song;
    }

    private GenerateTitle(title: string): string {
        return `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><b style='mso-bidi-font-weight:normal'><span lang=MS style='font-size:36.0pt; mso-bidi-font-size:12.0pt;font-family:"Arial Narrow",sans-serif;mso-bidi-font-family: Arial;color:#FFC000;mso-ansi-language:MS'>${title}<o:p></o:p></span></b></p>`;
    }

    private GenerateVerseTitle(title: string): string {
        return `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><b style='mso-bidi-font-weight:normal'><span lang=MS style='font-size:48.0pt; font-family:"Arial Narrow",sans-serif;mso-bidi-font-family:Arial;color:#FFC000; mso-ansi-language:MS'>${title}<o:p></o:p></span></b></p>`;
    }

    private GenerateParagraph(title: string, text: string) {
        let paragraph = this.GenerateVerseTitle(title) + "<p></p><p></p>";
        const lines = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            paragraph += `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><span lang=MS style='font-size:48.0pt;font-family:"Arial Narrow",sans-serif; mso-bidi-font-family:Arial;color:white;mso-themecolor:background1;mso-ansi-language:MS'>${lines[i]}<o:p></o:p></span></p>`
                + "<p></p> <p></p> \n\n";
        }
        paragraph += `<p align=center style='margin:0cm;margin-bottom:.0001pt;text-align:center'><span lang=MS style='font-size:48.0pt;font-family:"Arial Narrow",sans-serif; mso-bidi-font-family:Arial;color:white;mso-themecolor:background1;mso-ansi-language:MS'>&nbsp;<o:p></o:p></span></p>`
            + "<p></p> <p></p> \n\n";
        return paragraph;
    }

}



export interface GenerateParagraph {
    title: string,
    text: string
}