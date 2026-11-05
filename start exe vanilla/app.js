import http from 'http';
//Exe 1
const server1 = http.createServer((req, res) => {
    console.log(`- Method: ${req.method}`);
    console.log(`- URL: ${req.url}`);
    console.log(`- HTTP Version: ${req.httpVersion}`);
    console.log('---------------------------');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('The request was successfully received by the server.!')
});

const PORT1 = 3000;
server1.listen(PORT1, () => {
    console.log(`Server is running and listening on port ${PORT1}...`);
});

//Exe 2

const server2 = http.createServer((req, res) => {
    if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
        res.statusCode = 200;
        res.end('JSON accepted');
    }
    else {
        res.statusCode = 400;
        res.end('Unsupported request')
    }
});

const PORT2 = 3001;
server2.listen(PORT2, () => {
    console.log(`Server is running and listening on port ${PORT2}...`);

});

//Exe 3
const server3 = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/hello') {
        res.statusCode = 200;
        res.end('Hello from GET');
    }
    else if (req.method === 'POST' && req.url === '/hello') {
        res.statusCode = 200;
        res.end('Hello from POST')
    }
    else {
        res.statusCode = 400;
        res.end('Not supported')
    }
});

const PORT3 = 3002;
server3.listen(PORT3, () => {
    console.log(`Server is running and listening on port ${PORT3}...`);

});


