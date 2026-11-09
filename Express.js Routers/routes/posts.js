import express from 'express';

const POSTS_DB = [];

const router = express.Router();
let nextID = 1;

router.get('/', (req, res) => {
    res.json(POSTS_DB);
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = POSTS_DB.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });;
    }
    res.json(post.copy());

})

router.post('/', (req, res) => {
    const text = req.body.text;
    const newPost = { id: nextID++, text: text };
    POSTS_DB.push(newPost);
    res.json(newPost);
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = POSTS_DB.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });;
    }
    post.text = req.body.text;
    res.json(post.copy());
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = POSTS_DB.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ msg: 'Post not found' });;
    }
    POSTS_DB.splice(index, 1);
    res.status(204).send();
})


export default router;