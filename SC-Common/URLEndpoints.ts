export enum RootEndpoints {
    TEMPLATE = "/template",
    PACKAGE = "/package",
    HYMN = "/hymn"
}

export enum TemplateEndpoints {
    GET_ALL = "/", //GET on /
    GET_BY_ID = "/", //GET on /<ID>
    CREATE = "/", //POST on /
    SAVE = "/", //PUT on /
}

export enum PackageEndpoints {
    UPLOAD_SONG = "/upload-song",
    PACKAGE = "/package"
}

export enum HymnEndpoints {
    GET_PARAGRAPHS = "/paragraphs/", // + <id> or <name>(inluding extention), GET
}