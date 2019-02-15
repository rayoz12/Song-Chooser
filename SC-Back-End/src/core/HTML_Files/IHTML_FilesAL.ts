export interface IHTML_FilesAL {
    /**
     * Initialise access to the HTML_Files. In the case of a file system making sure that a directory exists or connecting to an online service
     * @returns Promise when we have successfully initialised
     */
    initialise(): Promise<void>;
    /**
     * Get All HTML_Files
     */
    getAllFiles(): Promise<IHTML_File[]>;
    /**
     * Get a file by name
     * @param name The name of the file to get
     * @returns Promise<IHTML_File | undefined> resolves with undefined when unable to find the file.
     */
    getFilebyName(name: string): Promise<IHTML_File | undefined>;
    /**
     * Read all text in a file. Throws an error if the file can't be found.
     * @param name The name of the file to read
     */
    getTextinFile(name: string): Promise<string>;
    copyFile(name: string[], destination:string[]): Promise<string>;
    writeFile(name: string, text: string): Promise<void>;
    appendToFile(): Promise<void>;
    search(term: string): Promise<IHTML_File[]>
}

export interface IHTML_File {
    /**
     * The name of the file.
     */
    name: string;
    /**
     * A path that is standalone from the HTML_File and the end user can access directly
     */
    path: string;
    /**
     * The date this file was modified
     */
    date_modified: Date;
    /**
     * The date this file was created
     */
    date_created: Date;
}