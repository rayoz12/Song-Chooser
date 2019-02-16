export interface IUser {
    username: string,
    password: string,
    activated: boolean
}

export interface ISong {
    id: number,
    song_name: string,
    path: string,
    tags: string
}

export interface ITemplate {
    id: number,
    name: string
}
export interface ITemplateDetail {
    id: number,
    template_id: number,
    song_id: number,
    song?: ISong,
    order_index: number
    template_song_name: string
}

export interface ISongText {
    id: number,
    song_id: number,
    song?: ISong,
    text_id: number,
    text?: IText
}


export interface IParagraph {
    title: string;
    contents: string;
}

export class Paragraph implements IParagraph {
    public title: string
    public contents: string;

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

export interface IText {
    id: number,
    title: string,
    subtitle: string,
    paragraphs: IParagraph,
}