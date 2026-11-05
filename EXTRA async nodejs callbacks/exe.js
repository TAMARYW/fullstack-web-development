import fs from 'fs';
import path from 'path'
import os from 'os';
import { uptime } from 'process';

//6
const appendLog = (filePath, logMessage) => {
    const timestamp = new Date().toISOString();
    const formattedLine = `${timestamp} - ${logMessage}\n`;
    fs.appendFile(filePath, formattedLine, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            return;
        }

        else {
            console.log('Appended to log: ', formattedLine.trim())
        }
    });
}

appendLog('log.txt', 'Log entry');

//7
const creatFolder = (basePath) => {
    const folderPath = path.join(basePath, 'backup');
    fs.access(folderPath, fs.constants.F_OK, (accessErr) => {
        if (accessErr) {
            fs.mkdir(folderPath, (mkdirErr) => {
                if (mkdirErr) {
                    console.log('Failed to create folder.')
                }
                else {
                    console.log('Folder created successfully.')
                }
            });
        }
        else {
            console.log('Folder already exists.')
        }
    });
}

createFolder(__dirname);

//8
const deleteFile = (filePath) => {
    fs.access(filePath, fs.constants.F_OK, (accessErr) => {
        if (accessErr) {
            console.log('File not found.')
        }
        else {
            fs.unlink(filePath, (deleteErr) => {
                if (deleteErr) {
                    console.log('Failed to delete the file');
                }
                else {
                    console.log('File deleted');
                }
            });
        }
    });
}

//9
const getCPUInfo = (callback) => {
    try {
        const cpuData = os.cpus();
        callback(null, cpuData);
    }
    catch (err) {
        callback(err, null);
    }
}

getCPUInfo((err, data) => {
    if (err) {
        console.error('Error fetching CPU details:', err);
        return;
    }
    data.forEach((cpu, index) => {
        console.log(`CPU ${index}: ${cpu.model}`)
    });
})

//10
const printThreeMessages = () => {
    setTimeout(() => {
        console.log('Message 1');

        setTimeout(() => {
            console.log('Message 2');

            setTimeout(() => {
                console.log('Message 3');
            }, 1000);

        }, 1000);

    }, 1000);
};

printThreeMessages();

//11
const fs = require('fs');
const path = require('path');

const sumFileSizes = (directoryPath, callback) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return callback(err);
        }

        if (files.length === 0) {
            return callback(null, 0);
        }

        let totalSize = 0;
        let completed = 0;

        files.forEach((file) => {
            const fullPath = path.join(directoryPath, file);

            fs.lstat(fullPath, (err, stats) => {
                if (err) {
                    return callback(err);
                }

                if (stats.isFile()) {
                    totalSize += stats.size;
                }

                completed++;

                if (completed === files.length) {
                    callback(null, totalSize);
                }
            });
        });
    });
};

sumFileSizes(__tamarWaiss, (err, size) => {
    if (err) {
        console.error('Error calculating folder size:', err);
        return;
    }
    console.log(`Total size of files in directory: ${totalSize} bytes`);
});

//12
const checkFileExtension = (filePath) => {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.log('Failed to access the file.');
            return;
        }
        const isFile = stats.isFile();
        const isTxt = path.extname(filePath) === '.txt';
        if (isFile && isTxtExtension) {
            console.log('The file exists and it is a .txt file.');
        } else if (isFile) {
            console.log('The file exists, but it is not a .txt file.');
        } else {
            console.log('Path exists, but it is a directory, not a file.');
        }
    });
}

//13
const showSystemUptime = (callback) => {
    try {
        const uptime = os.uptime();
        callback(null, uptime);
    } catch (err) {
        callback(err, null);
    }
};

showSystemUptime((err, time) => {
    if (err) {
        console.log('System error: ', err);
    } else {
        console.log(`System uptime: ${time} seconds.`);
    }
});

//14
const CountdownWithRandomDelay = () => {
    console.log('3');
    let delay = 500 + Math.random() * 1000;
    setTimeout(() => {
        console.log('2');
        delay = 500 + Math.random() * 1000;
        setTimeout(() => {
            console.log(1 / n);
        }, delay);
    }, delay);
};

countdownWithRandomDelay();

//15
const createAndWriteFile = (filePath) => {
    fs.access(filePath, fs.constants.F_OK, (accessErr) => {
        if (accessErr) {
            fs.writeFile(filePath, 'Hello Node.js', 'utf-8', (writeErr) => {
                if (writeErr) {
                    console.log('Failed to create and write.', writeErr);
                } else {
                    console.log('File created successfully.');
                }
            });
        } else {
            console.log('File already exists.');
        }
    });
};

createAndWriteFile('example.txt');