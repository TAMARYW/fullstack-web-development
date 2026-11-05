//1
const OddIndexSum = (array) => {
    let sum = 0;
    array.forEach((num, index) => {
        if (index % 2 !== 0)
            sum += num;
    });
    return sum;
}

//2
const MaxMinusMin = (array) => {
    const max = Math.max(...array);
    const min = Math.min(...array);
    return max - min;
}

//3
const CapitalizeFirstLetter = (str) => {
    let strArr = str.splite(' ');
    let newStr = strArr.map((word) => word[0].toUpperCase() + word.slice(1).join(' '));
    return newStr;
}

//4
const CountKeyWithValuesAboveX = (obj, x) => {
    let count = 0;
    Object.values(obj).forEach((num) => {
        if (num > x)
            count++;
    });
    return count;
}

//5
const reverse = (array) => {
    let result = [];
    for (let i = array.length - 1; i >= 0; i--) {
        result.push(array[i]);
    }
    return result;
}

//6
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}


const studentsPass = (studentsArray) => {
    let studentCount = 0;
    studentsArray.forEach((student) => {
        if (student.grade >= 60) {
            studentCount++;
        }
    });
    return `${studentCount} passed.`
}

//7
const Product = (nums) => {
    let prod = [];
    for (let i = 0; i < nums.length; i++) {
        let p = 1;
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                p *= nums[j];
            }
        }
        prod.push(p);
    }
    return prod;
}

//8
const LongestWord = (str) => {
    let words = str.splite(' ');
    let lengths = words.map((word) => word.length);
    let i = Math.max(...lengths);
    return words[i];
}

//9
const invertObject = (obj) => {
    const inverted = {};

    Object.entries(obj).forEach(([key, value]) => {
        inverted[value] = key;
    });

    return inverted;
};

//10
class BankAccount {
    constructor(balance) {
        this.balance = balance;
    }
    deposit(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
        }
        else {
            console.log('Low balance');

        }
    }
    withdraw(amount) {
        this.balance += amount;
    }
}