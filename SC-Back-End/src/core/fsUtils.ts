import * as fs from "fs-extra";

export async function copyMany(copy: CopyParams[]): Promise<void> {

}

/**
 * This will make a directory or return if it already exists
 */
export async function makeDir(path: string): Promise<void> {
    try {
        await fs.mkdir(path);
    }
    catch (error) {
        if (!(error.code === "EEXIST")) {
            throw error;
        }
    }
}

export interface CopyParams {
    source: string,
    destination: string
}