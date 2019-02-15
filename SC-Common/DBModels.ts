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