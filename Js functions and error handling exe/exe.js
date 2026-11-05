const extractNumbers = (arr) => {
    if (!Array.isArray(arr)) {
        throw new Error("Not an Array");
    }

    return arr.filter(item => typeof item === 'number' && !isNaN(item));
}

//2
const sumNumbersSafe = (arr) => {
    try {
        const nums = extractNumbers(arr);
        return nums.reduce((sum, num) => sum + num, 0);
    } catch (error) {
        console.error("Error:", error.message);
        return 0;
    }
}

//3
const filterLargeSums = (arrList, minTotal) => {
        let validArrays = [];
        arrList.forEach(arr => {
            let sum = sumNumbersSafe(arr);
            if (sum >= minTotal) { validArrays.push(arr) }
        });
        return validArrays;
}

//4
const summaryStats = (arrList) => {
        let result = [];
        let validArrays = filterLargeSums(arrList, 10);
        
        validArrays.forEach(arr => {
            let sum = sumNumbersSafe(arr);
            let validNumbers = extractNumbers(arr);
            let average = validNumbers.length > 0 ? sum / validNumbers.length : 0;
            
            result.push({ sum, average });
        });
        
        return result;
}

//5
const safeCalculator = (a, b, operation) => {
    if (typeof a !== typeof b) {
        throw new Error("Type mismatch: 'a' and 'b' must be of the same type.");
    }

    if (typeof a !== 'number' || isNaN(a) || isNaN(b)) {
        throw new Error("Invalid input: Both arguments must be valid numbers.");
    }

    switch (operation) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            if (b === 0) {
                throw new Error("Math error: Cannot divide by zero.");
            }
            return a / b;
        default:
            throw new Error(`Invalid operation: '${operation}'. Allowed operations are 'add', 'subtract', 'multiply', 'divide'.`);
  