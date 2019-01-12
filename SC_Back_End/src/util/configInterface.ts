export interface Server {
    port: number;
}

export interface MainPage {
    location: string[];
    name: string[];
}

export interface RemoteControl {
    location: string;
    name: string;
}

export interface Jquery {
    location: string;
    name: string;
}

export interface InputFiles {
    main_page: MainPage;
    remote_control: RemoteControl;
    jquery: Jquery;
}

export interface OutputPaths {
    stagedPath: string;
    zippedPath: string;
}

export interface Packaging {
    html_files: string;
    input_files: InputFiles;
    output_paths: OutputPaths;
}

export interface RootObject {
    server: Server;
    packaging: Packaging;
}