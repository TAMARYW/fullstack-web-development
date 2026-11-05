import http from 'http';

// ==========================================
// Exercise 1: Return a fixed text
// ==========================================
const server1 = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello from Node Server!');
});

const PORT1 = 5000;
server1.listen(PORT1, () => {
    console.log(`\n==========================================`);
    console.log(`[Exercise 1] Server is running on port ${PORT1}...`);
});


// ==========================================
// Exercise 2: Return the request method
// ==========================================
const server2 = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(`You used method: ${req.method}`);
});

const PORT2 = 5001;
server2.listen(PORT2, () => {
    console.log(`[Exercise 2] Server is running on port ${PORT2}...`);
});


// ==========================================
// Exercise 3: Return the request headers
// ==========================================
const server3 = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.headers, null, 2));
});

const PORT3 = 5002;
server3.listen(PORT3, () => {
    console.log(`[Exercise 3] Server is running on port ${PORT3}...`);
    console.log(`==========================================\n`);
});


// ==========================================
// Exercise 4: Parse and Log URL Parts
// ==========================================
const logURLParts = (urlStr) => {
    console.log(`\n--- Exercise 4 Output ---`);
    const parsedUrl = new URL(urlStr);
    console.log(`Hostname: ${parsedUrl.hostname}`);
    console.log(`Pathname: ${parsedUrl.pathname}`);
    console.log(`Protocol: ${parsedUrl.protocol}`);
    console.log(`Query: ${parsedUrl.search}`);
    console.log(`Hash: ${parsedUrl.hash}`);
    console.log(`-------------------------\n`);
};

logURLParts('http://localhost:3000/users/list?role=admin&active=true#top');


// ==========================================
// Exercise 5: Extract Query Parameters
// ==========================================
const extractQueryURL = (urlStr) => {
    console.log(`--- Exercise 5 Output ---`);
    const parsedUrl = new URL(urlStr);
    const id = parsedUrl.searchParams.get('id');
    const type = parsedUrl.searchParams.get('type');
    const lang = parsedUrl.searchParams.get('lang');

    console.log(`ID: ${id}`);
    console.log(`Type: ${type}`);
    console.log(`Language: ${lang}`);
    console.log(`-------------------------\n`);
};

extractQueryURL('https://site.com/products?id=15&type=book&lang=en');


// ==========================================
// Exercise 6: Modify Query Parameters
// ==========================================
const modifyURLParams = (urlStr) => {
    console.log(`--- Exercise 6 Output ---`);
    const parsedUrl = new URL(urlStr);

    parsedUrl.searchParams.set('sort', 'desc');
    parsedUrl.searchParams.append('page', '3');
    parsedUrl.searchParams.delete('query');

    console.log(parsedUrl.toString());
    console.log(`-------------------------\n`);
};

modifyURLParams("https://app.com/search?query=node&sort=asc");