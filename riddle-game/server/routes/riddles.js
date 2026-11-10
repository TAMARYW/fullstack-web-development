import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'db', 'riddles.txt');

async function readRiddles() {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
}

async function writeRiddles(riddles) {
    await fs.writeFile(DB_PATH, JSON.stringify(riddles, null, 2));
}

// GET /api/riddles 
router.get('/', async (req, res) => {
    try {
        const riddles = await readRiddles();
        res.status(200).json(riddles);
    } catch (err) {
        res.status(500).json({ message: 'Failed to read riddles' });
    }
});

// POST /api/riddles 
router.post('/', async (req, res) => {
    try {
        const { name, taskDescription, correctAnswer, level, hint, timeLimit } = req.body;

        if (!name || !taskDescription || !correctAnswer || !level) {
            return res.status(400).json({ message: 'name, taskDescription, correctAnswer and level are required' });
        }

        const riddles = await readRiddles();
        const newId = riddles.length > 0 ? Math.max(...riddles.map(r => r.id)) + 1 : 1;

        const newRiddle = {
            id: newId,
            name,
            level,
            timeLimit: timeLimit || 15,
            hint: hint || '',
            taskDescription,
            correctAnswer
        };

        riddles.push(newRiddle);
        await writeRiddles(riddles);

        res.status(201).json(newRiddle);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add riddle' });
    }
});

// PUT /api/riddles/:id 
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, taskDescription, correctAnswer, level, hint, timeLimit } = req.body;

        if (!name || !taskDescription || !correctAnswer || !level) {
            return res.status(400).json({ message: 'name, taskDescription, correctAnswer and level are required' });
        }

        const riddles = await readRiddles();
        const index = riddles.findIndex(r => r.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Riddle not found' });
        }

        riddles[index] = {
            id,
            name,
            level,
            timeLimit: timeLimit || 15,
            hint: hint || '',
            taskDescription,
            correctAnswer
        };

        await writeRiddles(riddles);

        res.status(200).json(riddles[index]);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update riddle' });
    }
});

// DELETE /api/riddles/:id 
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        const riddles = await readRiddles();
        const index = riddles.findIndex(r => r.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Riddle not found' });
        }

        riddles.splice(index, 1);
        await writeRiddles(riddles);

        res.status(200).json({ message: 'Riddle deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete riddle' });
    }
});

export default router;