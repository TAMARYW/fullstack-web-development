import readline from 'readline-sync';
import Player from './classes/Player.js';
import Riddle from './classes/Riddle.js';
import fs from 'fs';

let allRiddles = JSON.parse(fs.readFileSync('./riddles/db.txt', 'utf8'));

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

function playGame(player, startIndex) {
    for (let i = startIndex; i < allRiddles.length; i++) {
        const riddle = allRiddles[i];
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
    savePlayerTime(player);

    if (fs.existsSync('progress.json')) {
        fs.unlinkSync('progress.json');
    }
}

function savePlayerTime(player) {
    if (player.times.length === 0) {
        return;
    }

    const totalSec = Number((player.times.reduce((sum, time) => sum + time, 0) / 1000).toFixed(2));

    const players = JSON.parse(fs.readFileSync('./players/players.txt', 'utf8'));
    const existing = players.find(p => p.name.toLowerCase() === player.name.toLowerCase());

    if (!existing) {
        const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
        players.push({ id: newId, name: player.name, lowestTime: totalSec });
        console.log('First record saved!');
    } else if (totalSec < existing.lowestTime) {
        console.log(`New record! Time updated.`);
        existing.lowestTime = totalSec;
    }

    fs.writeFileSync('./players/players.txt', JSON.stringify(players, null, 2));
}

function startGame() {
    console.log('Welcome to the Riddle Game!');

    if (fs.existsSync('progress.json')) {
        const load = readline.question('Found saved game. Type "yes" to load, or "no" to start new: ');
        if (load.trim().toLowerCase() === 'yes') {
            const savedData = JSON.parse(fs.readFileSync('progress.json', 'utf8'));
            const player = new Player(savedData.playerName, savedData.level);
            player.times = savedData.times;
            console.log(`\nWelcome back, ${player.name}!\n`);
            playGame(player, savedData.currentIndex);
            return;
        }
    }

    const playerName = readline.question('What is your name? ');
    const level = readline.question('Choose difficulty: easy / medium / hard : ');
    const player = new Player(playerName, level);
    console.log(`\nHello, ${player.name}!\n`);

    const players = JSON.parse(fs.readFileSync('./players/players.txt', 'utf8'));
    const existing = players.find(p => p.name.toLowerCase() === player.name.toLowerCase());

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
                const level = readline.question('Enter level (easy / medium / hard): ');
                const hint = readline.question('Enter hint: ');
                const timeLimit = readline.questionInt('Enter time limit (in seconds): ');

                const riddles = JSON.parse(fs.readFileSync('./riddles/db.txt', 'utf8'));
                const newId = riddles.length > 0 ? Math.max(...riddles.map(r => r.id)) + 1 : 1;

                const newRiddle = new Riddle(newId, name, level, timeLimit, hint, taskDescription, correctAnswer);

                riddles.push(newRiddle);
                fs.writeFileSync('./riddles/db.txt', JSON.stringify(riddles, null, 2));
                allRiddles.push(newRiddle);

                console.log('Riddle added!');
                break;
            }
            case '3': {
                const riddles = JSON.parse(fs.readFileSync('./riddles/db.txt', 'utf8'));

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
                const riddles = JSON.parse(fs.readFileSync('./riddles/db.txt', 'utf8'));

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
                const level = readline.question('Enter new level (easy / medium / hard): ');
                const hint = readline.question('Enter new hint: ');
                const timeLimit = readline.questionInt('Enter new time limit (in seconds): ');

                const oldId = riddles[choiceNum - 1].id;
                riddles[choiceNum - 1] = new Riddle(oldId, name, level, timeLimit, hint, taskDescription, correctAnswer);

                fs.writeFileSync('./riddles/db.txt', JSON.stringify(riddles, null, 2));
                allRiddles = JSON.parse(fs.readFileSync('./riddles/db.txt', 'utf8'));

                console.log('Riddle updated!');
                break;
            }
            case '5': {
                const riddles = JSON.parse(fs.readFileSync('./riddles/db.txt', 'utf8'));

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

                riddles.splice(choiceNum - 1, 1);

                fs.writeFileSync('./riddles/db.txt', JSON.stringify(riddles, null, 2));
                allRiddles = JSON.parse(fs.readFileSync('./riddles/db.txt', 'utf8'));

                console.log('Riddle deleted!');
                break;
            }
            case '6': {
                const players = JSON.parse(fs.readFileSync('./players/players.txt', 'utf8'));

                if (players.length === 0) {
                    console.log('\nNo records yet. Play a game first!\n');
                    break;
                }

                players.sort((a, b) => a.lowestTime - b.lowestTime);

                console.log('\n===== Leaderboard =====');
                players.forEach((p, index) => {
                    console.log(`${index + 1}. ${p.name} - ${p.lowestTime} seconds`);
                });

                console.log('=======================\n');
                break;

            } case '1':
            default:
                player.times = [];
                shuffleArray(allRiddles);
                playGame(player, 0);
                break;
        }
    }
}

startGame();