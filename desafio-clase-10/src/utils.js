import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

async function readFile(file) {
    try {
        let readfilename = __dirname + "/" + file
        let result = await fs.promises.readFile(__dirname + "/" + file, 'utf8');
        let data = await JSON.parse(result);
        return data
        }  catch (error) {
        console.log(error);
        }
}

async function writeFile(file, data) {
    try {
        await fs.promises.writeFile(
            __dirname + "/" + file,
            JSON.stringify(data)
        ); return true
        }  catch (error) {
        console.log(error);
        }
}

async function deleteFile(path, data) {
    try {
        await fs.promises.unlink(
            __dirname + "/" + file,
            JSON.stringify(data)
        ); return true
        }  catch (error) {
        console.log(error);
        }
}

export default{ writeFile, deleteFile, readFile}