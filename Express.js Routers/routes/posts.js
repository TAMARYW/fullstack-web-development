import express from 'express';
import commentsRouter from './comments.js';

export const POSTS_DB = [];
export const COMMENTS_DB = {};

const router = express.Router();
let nextID = 1;

// GET /posts
router.get('/', (req, res) => {
    res.json(POSTS_DB);
});

// GET /posts/:postId
router.get('/:postId', (req, res) => {
    const id = Number(req.params.postId);
    const post = POSTS_DB.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
});

// POST /posts
router.post('/', (req, res) => {
    const text = req.body.text;
    const newPost = { id: nextID++, text: text };
    POSTS_DB.push(newPost);
    res.status(201).json(newPost);
});

// PUT /posts/:postId
router.put('/:postId', (req, res) => {
    const id = Number(req.params.postId);
    const post = POSTS_DB.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    
    post.text = req.body.text;
    res.json(post);
});

// DELETE /posts/:postId
router.delete('/:postId', (req, res) => {
    const id = Number(req.params.postId);
    const index = POSTS_DB.findIndex(p => p.id === id);
    
    if (index === -1) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    
    POSTS_DB.splice(index, 1);
    delete COMMENTS_DB[id];
    res.status(204).send();
});

router.use('/:postId/comments', commentsRouter);

export default router;

2955485