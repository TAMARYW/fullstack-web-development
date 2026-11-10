import readline from 'readline-sync';
export default class Riddle {
    constructor(id, name, level, timeLimit, hint, taskDescription, correctAnswer) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.timeLimit = timeLimit;
        this.hint = hint;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }
    ask() {
        console.log(`\n--- Riddle ${this.id}: ${this.name} ---`);
        console.log(this.taskDescription);
        console.log("(Type 'hint' if you need a clue, but it adds a 10-second penalty!)");
        let startTime = Date.now();
        let isCorrect = false;
        let hintPenalty = 0;

        while (!isCorrect) {
            const userAnswer = readline.question('Your answer: ');

            if (userAnswer === 'hint') {
                console.log(`Hint: ${this.hint}`);
                hintPenalty = 10000;
                continue;
            }

            if (userAnswer.trim().toLowerCase() === this.correctAnswer.toLowerCase()) {
                console.log('Correct!')
                isCorrect = true;
                let endTime = Date.now();
                let durationAnswer = (endTime - startTime) / 1000;
                let totalPenalty = hintPenalty;
                if (durationAnswer > this.timeLimit) {
                    console.log("Too slow! 5 seconds penalty applied.")
                    totalPenalty += 5000;
                }
                return totalPenalty;
            }
            else {
                console.log('Wrong answer, try again! You can do it!')
            }
        }
    }
}