import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: "Hello from /greet!" });
});

export default router;