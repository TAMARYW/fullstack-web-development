import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'db', 'players.txt');

async function readPlayers() {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
}

async function writePlayers(players) {
    await fs.writeFile(DB_PATH, JSON.stringify(players, null, 2));
}

function updateBestTime(player, newTime) {
    const previousTime = player.lowestTime ?? null;

    if (previousTime === null) {
        player.lowestTime = newTime;
        return { updated: true, firstRecord: true, previousTime };
    }

    if (newTime < previousTime) {
        player.lowestTime = newTime;
        return { updated: true, firstRecord: false, previousTime };
    }

    return { updated: false, firstRecord: false, previousTime };
}

// GET /api/players 
router.get('/', async (req, res) => {
    try {
        const players = await readPlayers();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ message: 'Failed to read players' });
    }
});

// POST /api/players 
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'name is required' });
        }

        const players = await readPlayers();
        const exists = players.some(p => p.name.toLowerCase() === name.toLowerCase());

        if (exists) {
            return res.status(409).json({ message: 'Player already exists' });
        }

        const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
        const newPlayer = { id: newId, name, lowestTime: null };

        players.push(newPlayer);
        await writePlayers(players);

        res.status(201).json(newPlayer);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add player' });
    }
});

// PUT /api/players/:id 
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const time = Number(req.body.time);

        if (!Number.isFinite(time) || time <= 0) {
            return res.status(400).json({ message: 'time must be a positive number (seconds)' });
        }

        const players = await readPlayers();
        const player = players.find(p => p.id === id);

        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        const result = updateBestTime(player, time);

        if (result.updated) {
            await writePlayers(players);
        }

        res.status(200).json({ ...result, player });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update player' });
    }
});

export default router;