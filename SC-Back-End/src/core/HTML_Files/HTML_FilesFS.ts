import { IHTML_FilesAL, IHTML_File } from "./IHTML_FilesAL";
import * as fs from "fs-extra";

/**
 * HTML_Files File System Abstraction 
 */
export class HTML_FilesFS implements IHTML_FilesAL {
        
    protected htmlFiles_root: string;
    protected initialised: boolean = false;
    protected file_cache: IHTML_File[] = [];
    
    constructor(htmlFiles_root: string) {
        this.htmlFiles_root = htmlFiles_root;
        //check if folder exists and create it.
    }
    
    async initialise(): Promise<void> {
        //check if the folder exists or create it;
        await fs.ensureDir(this.htmlFiles_root);

        this.file_cache = await this.getAllFiles();

        this.initialised = true;
        
    }

    
    async getAllFiles(): Promise<IHTML_File[]> {
        if (!this.isInitialised())
            await this.initialise();
        
        const files = await fs.readdir(this.htmlFiles_root);
        const promiseArray: Promise<fs.Stats>[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            promiseArray.push(fs.stat(this.htmlFiles_root + file));
        }
        const results = await Promise.all(promiseArray);
        const html_files: IHTML_File[] = results.map((stats, i) => {
            const html_file: IHTML_File = {
                date_created: stats.ctime,
                date_modified: stats.mtime,
                path: this.htmlFiles_root + files[i],
                name: files[i]
            }
            return html_file;
        });
        return html_files;
    }

    async getFilebyName(name: string): Promise<IHTML_File | undefined> {
        if (!this.isInitialised())
            await this.initialise();
        
        const file = this.file_cache.find(item => item.name === name);
        if (file !== undefined) {
            return file;
        }

        //check if it exists
        try {
            const stats = await fs.stat(this.htmlFiles_root + name);
            const html_file: IHTML_File = {
                date_created: stats.ctime,
                date_modified: stats.mtime,
                path: this.htmlFiles_root + name,
                name: name
            }
    
            this.file_cache.push(html_file);
            return html_file;
        }
        catch (e) {
            return undefined;
        }
    }

    async getTextinFile(name: string): Promise<string> {
        if (!this.isInitialised())
            await this.initialise();
        
        return fs.readFile(this.htmlFiles_root + name, 'utf8');
    }

    async getTextByPath(path: string): Promise<string> {
        if (!this.isInitialised())
            throw new Error(HTML_FilesFSError.NOT_INITIALISED);

        return fs.readFile(path, 'utf8');
    }

    async copyFile(name: string[], destination: string[]): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async writeFile(name: string, text: string): Promise<void> {
        if (!this.isInitialised())
            throw new Error(HTML_FilesFSError.NOT_INITIALISED);
        throw new Error("Method not implemented.");
    }

    async appendToFile(): Promise<void> {
        if (!this.isInitialised())
            throw new Error(HTML_FilesFSError.NOT_INITIALISED);
        throw new Error("Method not implemented.");
    }

    async search(term: string): Promise<IHTML_File[]> {
        return this.file_cache.filter(item => item.name.includes(term));
    }

    private isInitialised() {
        return this.initialise;
    }

}

export enum HTML_FilesFSError {
    NOT_INITIALISED = "NOT_INITIALISED",
    FILE_NOT_FOUND = "FILE_NOT_FOUND"
}