import express from 'express';
import { POSTS_DB, COMMENTS_DB } from './posts.js';

const router = express.Router({ mergeParams: true });

router.use((req, res, next) => {
    const postId = Number(req.params.postId);
    const postExists = POSTS_DB.some(post => post.id === postId);
    
    if (!postExists) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    next();
});

// GET /posts/:postId/comments
router.get('/', (req, res) => {
    const postId = Number(req.params.postId);
    res.json(COMMENTS_DB[postId] || []);
});

// GET /posts/:postId/comments/:commentId
router.get('/:commentId', (req, res) => {
    const postId = Number(req.params.postId);
    const commentId = Number(req.params.commentId);
    
    COMMENTS_DB[postId] = COMMENTS_DB[postId] || [];
    const comment = COMMENTS_DB[postId].find(c => c.id === commentId);
    
    if (!comment) {
        return res.status(404).json({ msg: 'Comment not found' });
    }
    res.json(comment);
});

// POST /posts/:postId/comments
router.post('/', (req, res) => {
    const postId = Number(req.params.postId);
    const text = req.body.text;
    
    COMMENTS_DB[postId] = COMMENTS_DB[postId] || [];
    const newComment = { id: Date.now(), text: text };
    COMMENTS_DB[postId].push(newComment);
    
    res.status(201).json(newComment);
});

// PUT /posts/:postId/comments/:commentId
router.put('/:commentId', (req, res) => {
    const postId = Number(req.params.postId);
    const commentId = Number(req.params.commentId);
    
    COMMENTS_DB[postId] = COMMENTS_DB[postId] || [];
    const comment = COMMENTS_DB[postId].find(c => c.id === commentId);
    
    if (!comment) {
        return res.status(404).json({ msg: 'Comment not found' });
    }
    
    comment.text = req.body.text;
    res.json(comment);
});

// DELETE /posts/:postId/comments/:commentId
router.delete('/:commentId', (req, res) => {
    const postId = Number(req.params.postId);
    const commentId = Number(req.params.commentId);
    
    COMMENTS_DB[postId] = COMMENTS_DB[postId] || [];
    const index = COMMENTS_DB[postId].findIndex(c => c.id === commentId);
    
    if (index === -1) {
        return res.status(404).json({ msg: 'Comment not found' });
    }
    
    COMMENTS_DB[postId].splice(index, 1);
    res.status(204).send();
});

export default router;