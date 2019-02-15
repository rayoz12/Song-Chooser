export interface IParagraph {
    getTitle(): string;
    getContents(): string;
}

export class Paragraph implements IParagraph {
    private title: string
    private contents: string
    
    
    constructor(title: string, contents: string) {
        this.title = title;
        this.contents = contents;
    }

    getTitle(): string {
        return this.title;
    }

    getContents(): string {
        return this.contents;
    }
}

export interface ISongParser {
    getTitle(): string;
    getParagraphLength(): number;
    getParagraphs(): IParagraph[];
}