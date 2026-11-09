import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;
const CAT_API_KEY = 'live_dMuuLsAmy7WWvIzum1WaQCUIcj8Mv39jc8HXakyTY9Dhb4GQBBMPwLiSKjeWkcdh';

// Part 1: Basic Setup & First Endpoint
app.get('/greet', (req, res) => {
    res.json({ "msg": `hi from get endpoint ${Date.now()}` });
});

// Part 2: Route Params & Internal Requests
app.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    console.log(`i got name: ${name}`);
    res.json({ "msg": `got name: ${name}` });
});

app.get('/test', async (req, res) => {
    try {
        const targetName = 'Bob';
        const response = await fetch(`http://localhost:${PORT}/greet/${targetName}`);
        const data = await response.json();

        if (data.msg && data.msg.includes(targetName)) {
            res.json({ "result": "ok" });
        } else {
            res.json({ "result": "fail" });
        }
    } catch (error) {
        res.json({ "result": "fail" });
    }
});

// Part 3: Action-Based POST Endpoint
app.post('/action', async (req, res) => {
    const { action } = req.body || {};

    if (!action || (action !== 'cat fact' && action !== 'joke')) {
        return res.status(400).json({ "msg": "body is malformed" });
    }

    try {
        if (action === 'joke') {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();

            const fullJoke = data.joke ? data.joke.toUpperCase() : '';
            return res.json({ "joke": fullJoke });
        }

        if (action === 'cat fact') {
            const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=11', {
                headers: {
                    'x-api-key': CAT_API_KEY
                }
            });
            const data = await response.json();
            return res.json({ "length": data.length.toString() });
        }
    } catch (err) {
        return res.status(500).json({ "msg": "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});