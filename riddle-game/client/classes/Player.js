export default class Player {
    constructor(name, level) {
        this.name = name;
        this.level = level;
        this.times = [];
    }
    recordTime(start, end) {
        let duration = end - start;
        this.times.push(duration);
    }

    showStats() {
        let totalTimeMs = this.times.reduce((sum, time) => sum + time, 0)
        let avgTimeMs = this.times.length > 0 ? totalTimeMs / this.times.length : 0
        const totalSec = (totalTimeMs / 1000).toFixed(2);
        const avgSec = (avgTimeMs / 1000).toFixed(2);
        console.log(`\nGreat job, ${this.name}!`);
        console.log(`Total time: ${totalSec} seconds`);
        console.log(`Average per riddle: ${avgSec} seconds\n`);
    }

}