import path, { dirname } from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

//const fileName = __filename; only in coomon es module

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('file path is ', __filename);
console.log('directory name is : ', path.dirname(__filename));

console.log('file name is ', path.basename(__filename));

//converst path into a absolute path based on working directory
const resolvePath = path.resolve('user', 'documents', 'node', 'projects');

console.log(resolvePath);

const normalizePath = path.normalize('/user/.documents/../node/proj');
console.log(normalizePath);

//3 types of module in node.js
//1. callback-based -> fs.readFile('file.txt',(er,data) => {})
//2. syn based -> fs.readFileSync('file.txt')
//3.promise based -> fs.promises.readFile('file.txt')

const dataFolder = path.join(__dirname, 'data');

const folderExists = async (folderPath: string): Promise<boolean> => {
    try {
        await fs.access(folderPath);
        return true;
    } catch {
        console.log('folder doesnot exist');
        return false;
    }
};

(async () => {
    const exists = await folderExists(dataFolder);
    console.log(exists);
})();

//creating/writing a new file

const createFile = async (
    dirname: string,
    filename: string,
    content: string,
): Promise<string | null> => {
    try {
        const filePath = path.join(dirname, filename);
        await fs.writeFile(filePath, content, 'utf-8');
        return filePath;
    } catch (error) {
        console.log('error while writing the file', error);
        return null;
    }
};

//for deleting the file
const deleteFile = async (filepath: string): Promise<boolean> => {
    try {
        await fs.unlink(filepath);
        return true;
    } catch {
        return false;
    }
};
