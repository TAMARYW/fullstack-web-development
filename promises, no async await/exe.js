import fs from 'fs';
import https from 'https';
import { json } from 'stream/consumers';

//1
const delayedGreet = (name, delay) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(`Hello, ${name}!`)
        }, delay);
    });
}

delayedGreet("Alice", 2000).then((message) => {
    console.log(message);
});

//2
const readFileContent = (path) => {
    return new Promise((res, rej) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                rej(err);
            }
            else {
                res(data);
            }
        });

    });
}


readFileContent('file.txt').then((contet) => {
    console.log("Content of file.txt: ");
    console.log(data);
})
    .catch((err) => {
        console.error("Error reading file: ", err.message);
    });

//3
const randomOperation = () => {
    return new Promise((res, rej) => {
        const random = Math.random();
        if (random <= 0.5) {
            res("Success!");
        }
        else {
            rej("Failure!");
        }
    });
}

randomOperation().then((message) => {
    console.log(message);
})
    .catch((message) => {
        console.log(message);
    })

//4
const raceTimers = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res("Timer A finished!");
        }, 1000);
        setTimeout(() => {
            res("Timer B finished!");
        }, 2000);

    });
}

raceTimers().then((message) => {
    console.log(message);
})
    .catch((message) => {
        console.log(message);
    })

//5
const fetchData = (url) => {
    return new Promise((res, rej) => {
        https.get(url, (response) => {
            let fullData = '';
            response.on('data', (chunk) => {
                fullData += chunk;
            });
            response.on('end', () => {
                res(fullData);
            });
        })
            .on('error', (err) => {
                rej(err);
            });
    });
};


fetchData('https://jsonplaceholder.typicode.com/todos/1')
    .then((data) => {
        console.log(JSON.parse(data));
    })
    .catch((err) => {
        console.log(err);
    })

//6
const waitAll = () => {
    const promise1 = new Promise((res, rej) => {
        setTimeout(() => {
            res('First');
        }, 1000);
    });

    const promise2 = new Promise((res, rej) => {
        setTimeout(() => {
            res('Second');
        }, 2000);
    });

    const promise3 = new Promise((res, rej) => {
        setTimeout(() => {
            res('Third');
        }, 3000);
    });

    return Promise.all([promise1, promise2, promise3]);

}

waitAll().then((result) => {
    console.log(result);
});

//7
const checkFileExists = (path) => {
    return new Promise((res, rej) => {
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                rej(false);
            }
            else {
                res(true);
            }
        });
    });
}

checkFileExists('file.txt')
    .then((exists) => {
        console.log('File exists: ', exists);
    })
    .catch((exists) => {
        console.log("File exists: ", exists);
    })

8

const delay = (text, ms) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(text)
            res();
        }, ms)
    });
}
const chainedGreetings = () => {
    return delay("Hi", 1000)
        .then(() => delay("How are you?", 2000))
        .then(() => delay("Goodbye", 1000));
}

chainedGreetings();

//9
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

const countWords = (text) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
};

const writeFile = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, 'utf-8', (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const processFile = (inputPath, outputPath) => {
    return readFile(inputPath)
        .then((data) => {
            const count = countWords(data);
            return `Word count: ${count}`;
        })
        .then((formattedText) => {
            return writeFile(outputPath, formattedText);
        })
        .then(() => {
            console.log(`Word count written to ${outputPath}`);
        })
        .catch((err) => {
            console.error('Error during processing:', err);
        });
};

processFile('file.txt', 'result.txt');

//10
const parseJson = (data) => {
    return JSON.parse(data); 
};

const showTitle = (dataObj) => {
    console.log(`User title: ${dataObj.title}`);
};

const getUserTitle = (userId) => {
    const url = `https://jsonplaceholder.typicode.com/todos/${userId}`;
    
    return fetchData(url)
        .then((data) => parseJson(data))
        .then((dataObj) => showTitle(dataObj))
        .catch((err) => {
            console.error('An error occurred:', err.message || err);
        });
};