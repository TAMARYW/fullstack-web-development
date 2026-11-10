import readline from 'readline-sync';
import fs from 'fs';
import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js';

const BASE_URL = 'http://localhost:3000/api';

async function request(method, path, body) {
    const options = { method, headers: {} };

    if (body !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Request failed');
    }

    return data;
}

function handleError(err) {
    if (err instanceof TypeError) {
        console.log('\nCannot reach the server. Is it running? (node server/server.js)\n');
    } else {
        console.log(`\nError: ${err.message}\n`);
    }
}

function withTiming(action, player) {
    return function () {
        const start = Date.now();
        const penalty = action();
        const end = Date.now();
        player.recordTime(start, end + penalty);
    };
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function playGame(player, riddles, startIndex) {
    for (let i = startIndex; i < riddles.length; i++) {
        const riddle = riddles[i];
        if (riddle.level === player.level) {
            const currentRiddle = new Riddle(
                riddle.id,
                riddle.name,
                riddle.level,
                riddle.timeLimit,
                riddle.hint,
                riddle.taskDescription,
                riddle.correctAnswer
            );

            const askWithTiming = withTiming(() => currentRiddle.ask(), player);
            askWithTiming();

            const progress = {
                playerName: player.name,
                level: player.level,
                times: player.times,
                currentIndex: i + 1
            };
            fs.writeFileSync('progress.json', JSON.stringify(progress, null, 2));
        }
    }

    player.showStats();
    await savePlayerTime(player);

    if (fs.existsSync('progress.json')) {
        fs.unlinkSync('progress.json');
    }
}

async function savePlayerTime(player) {
    if (player.times.length === 0) {
        return;
    }

    const totalSec = Number((player.times.reduce((sum, time) => sum + time, 0) / 1000).toFixed(2));

    const allPlayers = await request('GET', '/players');
    let record = allPlayers.find(p => p.name.toLowerCase() === player.name.toLowerCase());

    if (!record) {
        record = await request('POST', '/players', { name: player.name });
    }

    const result = await request('PUT', `/players/${record.id}`, { time: totalSec });

    if (result.firstRecord) {
        console.log('First record saved!');
    } else if (result.updated) {
        console.log('New record! Time updated.');
    }
}

async function startGame() {
    console.log('Welcome to the Riddle Game!');

    if (fs.existsSync('progress.json')) {
        const load = readline.question('Found saved game. Type "yes" to load, or "no" to start new: ');
        if (load.trim().toLowerCase() === 'yes') {
            const savedData = JSON.parse(fs.readFileSync('progress.json', 'utf8'));
            const savedPlayer = new Player(savedData.playerName, savedData.level);
            savedPlayer.times = savedData.times;
            console.log(`\nWelcome back, ${savedPlayer.name}!\n`);

            const savedRiddles = await request('GET', '/riddles');
            await playGame(savedPlayer, savedRiddles, savedData.currentIndex);
            return;
        }
    }

    const playerName = readline.question('What is your name? ');
    const level = readline.question('Choose difficulty: easy / medium / hard : ');
    const player = new Player(playerName, level);
    console.log(`\nHello, ${player.name}!\n`);

    const allPlayers = await request('GET', '/players');
    const existing = allPlayers.find(p => p.name.toLowerCase() === player.name.toLowerCase());

    if (existing && existing.lowestTime) {
        console.log(`Hi ${player.name}! Your previous lowest time was ${existing.lowestTime} seconds.\n`);
    }

    let running = true;

    while (running) {
        console.log('What do you want to do?');
        console.log('Press 1 to Play the game');
        console.log('Press 2 to Create a new riddle');
        console.log('Press 3 to Read all riddles');
        console.log('Press 4 to Update an existing riddle');
        console.log('Press 5 to Delete a riddle');
        console.log('Press 6 to View leaderboard');
        console.log('Press 0 to Exit');

        const choice = readline.question('Your choice: ');

        try {
            switch (choice) {
                case '0': {
                    console.log('Goodbye!');
                    running = false;
                    break;
                }
                case '2': {
                    const name = readline.question('Enter riddle name: ');
                    const taskDescription = readline.question('Enter description: ');
                    const correctAnswer = readline.question('Enter correct answer: ');
                    const riddleLevel = readline.question('Enter level (easy / medium / hard): ');
                    const hint = readline.question('Enter hint: ');
                    const timeLimit = readline.questionInt('Enter time limit (in seconds): ');

                    await request('POST', '/riddles', {
                        name,
                        level: riddleLevel,
                        timeLimit,
                        hint,
                        taskDescription,
                        correctAnswer
                    });

                    console.log('Riddle added!');
                    break;
                }
                case '3': {
                    const riddles = await request('GET', '/riddles');

                    console.log('\n===== All Riddles =====');
                    riddles.forEach((riddle, index) => {
                        console.log(`\n${index + 1}. ${riddle.name}`);
                        console.log(`   Description: ${riddle.taskDescription}`);
                        console.log(`   Hint: ${riddle.hint}`);
                        console.log(`   Correct answer: ${riddle.correctAnswer}`);
                    });
                    console.log('\n=======================\n');
                    break;
                }
                case '4': {
                    const riddles = await request('GET', '/riddles');

                    console.log('\nWhich riddle do you want to update?');
                    riddles.forEach((riddle, index) => {
                        console.log(`${index + 1}. ${riddle.name}`);
                    });

                    const choiceNum = readline.questionInt('Enter riddle number: ');
                    if (choiceNum < 1 || choiceNum > riddles.length) {
                        console.log('Invalid riddle number.');
                        break;
                    }

                    const name = readline.question('Enter new riddle name: ');
                    const taskDescription = readline.question('Enter new description: ');
                    const correctAnswer = readline.question('Enter new correct answer: ');
                    const riddleLevel = readline.question('Enter new level (easy / medium / hard): ');
                    const hint = readline.question('Enter new hint: ');
                    const timeLimit = readline.questionInt('Enter new time limit (in seconds): ');

                    const riddleId = riddles[choiceNum - 1].id;
                    await request('PUT', `/riddles/${riddleId}`, {
                        name,
                        level: riddleLevel,
                        timeLimit,
                        hint,
                        taskDescription,
                        correctAnswer
                    });

                    console.log('Riddle updated!');
                    break;
                }
                case '5': {
                    const riddles = await request('GET', '/riddles');

                    console.log('\nWhich riddle do you want to delete?');
                    riddles.forEach((riddle, index) => {
                        console.log(`${index + 1}. ${riddle.name}`);
                    });

                    const choiceNum = readline.questionInt('Enter riddle number: ');
                    if (choiceNum < 1 || choiceNum > riddles.length) {
                        console.log('Invalid riddle number.');
                        break;
                    }

                    const riddleName = riddles[choiceNum - 1].name;
                    const confirm = readline.question(`Are you sure you want to delete "${riddleName}"? (yes/no): `);
                    if (confirm.trim().toLowerCase() !== 'yes') {
                        console.log('Deletion cancelled.');
                        break;
                    }

                    await request('DELETE', `/riddles/${riddles[choiceNum - 1].id}`);

                    console.log('Riddle deleted!');
                    break;
                }
                case '6': {
                    const allPlayersForBoard = await request('GET', '/players');
                    const ranked = allPlayersForBoard.filter(p => p.lowestTime !== null && p.lowestTime !== undefined);

                    if (ranked.length === 0) {
                        console.log('\nNo records yet. Play a game first!\n');
                        break;
                    }

                    ranked.sort((a, b) => a.lowestTime - b.lowestTime);

                    console.log('\n===== Leaderboard =====');
                    ranked.forEach((p, index) => {
                        console.log(`${index + 1}. ${p.name} - ${p.lowestTime} seconds`);
                    });
                    console.log('=======================\n');
                    break;
                }
                case '1':
                default: {
                    const riddles = await request('GET', '/riddles');
                    shuffleArray(riddles);
                    player.times = [];
                    await playGame(player, riddles, 0);
                    break;
                }
            }
        } catch (err) {
            handleError(err);
        }
    }
}

startGame().catch(err => handleError(err));