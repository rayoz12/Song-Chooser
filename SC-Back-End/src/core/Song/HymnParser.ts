import { load } from "cheerio";
import { ISongParser, IParagraph } from "./ISongParser";

export class HTMLWordHymnParser implements ISongParser{
    
    private $: CheerioStatic;

    private title: string = "";
    private subtitle: string = "";
    private paragraphs: IParagraph[] = [];

    constructor(private htmlText: string) {
        this.$ = load(htmlText);
        this.parseHTMLFile();
    }

    private parseHTMLFile() {
        this.getTitlesFromHTML();
    }

    private getTitlesFromHTML() {
        this.title = this.$("p > b > span").first().text();
        this.subtitle = this.$('p > b > span[style*="font-size:22.0pt"]').map((item: number, elem) => this.$(elem).text()).get().join("\n");
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