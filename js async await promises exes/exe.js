import fs from 'fs/promises';
import { readFile as readFileCallback, access as accessCallback, constants } from 'fs';
import path from 'path';

// ==========================================
// 1. Read File with Promise 
// ==========================================

const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        readFileCallback(path, 'utf8', (err, content) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(content);
            }
        });
    });
};

readFilePromise('./text.txt')
    .then((content) => console.log("1. Content:\n", content))
    .catch((err) => console.error("1. Error:", err.message));


// ==========================================
// 2. Async Read File
// ==========================================

const readFileAsync = async (path) => {
    const content = await fs.readFile(path, 'utf-8');
    return content;
}

readFileAsync('./text.txt')
    .then((content) => console.log('2. Content:\n', content))
    .catch((err) => console.error("2. Error:", err.message));


// ==========================================
// 3. Get File Size
// ==========================================

const getFileSize = async (path) => {
    const stats = await fs.stat(path);
    return stats.size;
}

getFileSize('./text.txt')
    .then((size) => console.log(`3. File size: ${size} bytes`))
    .catch((err) => console.error("3. Error:", err.message));

// ==========================================
// 4. List Files in Directory
// ==========================================

const listFiles = async (dir) => {
    return fs.readdir(dir);
}

listFiles('./')
    .then((list) => console.log('4. Directory list:', list))
    .catch((err) => console.error("4. Error:", err.message));

// ==========================================
// 5. Read Multiple Files in Order 
// ==========================================

const readFilesInOrder = async (files) => {
    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        console.log(`5. Content of ${file}:\n${content}`);
    }
};

readFilesInOrder(['./text.txt', './text.txt'])
    .catch((err) => console.error("5. Error:", err.message));

// ==========================================
// 6. Read Files in Parallel 
// ==========================================

const readFilesParallel = async (files) => {
    const promises = files.map((file) => fs.readFile(file, 'utf-8'));
    const contents = await Promise.all(promises);
    contents.forEach((content, index) => {
        console.log(`6. File #${index + 1} (${files[index]}):\n${content}`);
    });
};

readFilesParallel(['./text.txt', './text.txt'])
    .catch((err) => console.error("6. Error:", err.message));

// ==========================================
// 7. Check If File Exists with Promise
// ==========================================

const fileExists = (filePath) => {
    return new Promise((res, rej) => {
        accessCallback(filePath, constants.F_OK, (err) => {
            if (err) {
                res(false);
            }
            else {
                res(true);
            };
        });
    });
}

fileExists('./text.txt')
    .then((exists) => console.log('7. File exists:', exists));

// ==========================================
// 8. Copy File with Promises
// ==========================================

const copyFile = async (src, dest) => {
    const content = await fs.readFile(src);
    await fs.writeFile(dest, content);
    console.log('8. File copied successfully!')
}

copyFile('a.txt', 'copy.txt')
    .catch((err) => console.error('8. Error copying file:', err.message));

// ==========================================
// 9. Merge Text Files
// ==========================================

const mergeFiles = async (files, output) => {
    let data = '';
    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        data += content + '\n';
    }
    await fs.writeFile(output, data.trim(), 'utf-8');
    console.log('9. Files merged successfully!');
}

mergeFiles(['a.txt', 'b.txt'], 'merged.txt')
    .catch((err) => console.error('9. Error merging files:', err.message))

// ==========================================
// 10. Search Word in All Files
// ==========================================

const searchWordInFiles = async (dir, word) => {
    const files = await fs.readdir(dir);
    await Promise.all(
        files.map(async (file) => {
            const filePath = path.join(dir, file);
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                if (content.includes(word)) {
                    console.log(`Found "${word}" in: ${file}`);
                }
            } catch (err) {

            }
        })
    );
};

searchWordInFiles('./texts', 'important')
    .catch((err) => console.error('Error searching files:', err.message));


    