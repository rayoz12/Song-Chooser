import { IParagraph } from "../../../../SC-Common/DBModels";

export interface ISongParser {
    getTitle(): string;
    getParagraphLength(): number;
    getParagraphs(): IParagraph[];
}