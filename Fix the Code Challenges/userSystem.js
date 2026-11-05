const users = [];

export function greetUser(name) {
    if (users.includes(name)) {
        console.log(`Welcome back, ${name}!`);
    } else {
        console.log(`Welcome, ${name}!`);
    }
    users.push(name);
}
