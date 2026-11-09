import express from 'express';

const USERS_DB = [];
let nextID = 1;

const router = express.Router();

router.get('/', (req, res) => {
    res.json(USERS_DB);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = USERS_DB.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
})

router.post('/', (req, res) => {
    const userName = req.body.name;
    const newUser = { id: nextID++, name: userName };
    USERS_DB.push(newUser);
    res.status(201).json(newUser);
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = USERS_DB.find(u => u.id === id);
    if (user) {
        user.name = req.body.name;
        return res.json(user);
    }
    return res.status(404).json({ msg: 'User not found' });
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = USERS_DB.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ msg: 'User not found' });
    }

    USERS_DB.splice(index, 1);
    res.status(204).send();
})

export default router;