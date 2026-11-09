//📘 Level 1 – Basic Route Refactor

import express from 'express';

import greetRouter from './routes/greet.js';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';

const app = express();
const PORT = 3000;

app.use(express.json())
app.use('/greet',greetRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter)

app.listen(PORT, () => {
    console.log(`The server is currently listening on the port ${PORT}`);
})

//📘 Level 2 – Users CRUD API
