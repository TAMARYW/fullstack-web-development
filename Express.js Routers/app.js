//📘 Level 1 – Basic Route Refactor

import express from 'express';

import greetRouter from './routes/greet.js';
import usersRouter from './routes/users.js';

const app = express();
const PORT = 3000;

app.use(greetRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`The server is currently listening on the port ${PORT}`);
})

//📘 Level 2 – Users CRUD API
