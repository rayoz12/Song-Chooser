import { load } from "cheerio";
import { ISongParser } from "./ISongParser";
import { IParagraph } from "../../../../SC-Common/DBModels";

export class HTMLWordHymnParser implements ISongParser {
    
    private $: CheerioStatic;

    private title: string = "";
    private subtitle: string = "";
    private paragraphs: IParagraph[] = [];

    constructor(private htmlText: string) {
        this.$ = load(htmlText, {
            normalizeWhitespace: true
        });
        this.parseHTMLFile();
    }

    private parseHTMLFile() {
        this.getTitlesFromHTML();
        this.constructParagraph();
    }

    private getTitlesFromHTML() {
        this.title = this.$("p > b > span").first().text();
        this.subtitle = this.$('p > b > span[style*="font-size:22.0pt"]').map((item: number, elem) => this.$(elem).text()).get().join("\n");
    }

    private constructParagraph() {
        const titles = this.getParagraphTitles();
        const paragraphText = this.getDocumentParagraphText();

        console.log("title", titles, "paragraphs", paragraphText);
    }

    private getParagraphTitles(): string[] {
        const cleanedTextElements = this.$('span[style*="color:#FFC000"]').filter((i, item) => {
            let item$ = this.$(item);
            const text = item$.text();
            return text !== "";
        });
        const textNodes = cleanedTextElements.map((i, item) => {
            let item$ = this.$(item);
            return item$.text();
        });
        
        return textNodes.get();
    }

    private getDocumentParagraphText(): string[] {
        const textElements = this.$("p > span").map((index, item) => {
            const text = this.$(item).text();
            // console.log(text);
            return text;
        });
        return textElements.get();
    }
    
    getTitle(): string {
        return this.title;
    }
    getParagraphLength(): number {
        return this.paragraphs.length;
    }
    getParagraphs(): IParagraph[] {
        return this.paragraphs;
    }
}