const temps = [];

export function addTemperature(temp) {
    temps.push(temp);
    const sum = temps.reduce((acc, t) => acc + t, 0);
    const avg = sum / temps.length;
    console.log(`Average temperature: ${avg}`);
}
