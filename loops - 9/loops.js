//1
const sumOfDigits = (num) => {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
};

//2
const printRightAngledTriangle = (num) => {
    for (let i = 1; i <= num; i++) {
        console.log('*'.repeat(i))
    }
}

//3
const TheBig = (n1, n2, n3, n4, n5) => {
    let max = n1;
    if (n2 > max) { max = n2 };
    if (n3 > max) { max = n3 };
    if (n4 > max) { max = n4 };
    if (n5 > max) { max = n5 };
    console.log('The Max is:', max)
}

//4
const countOfDigit = (num) => {
    let count = 0;
    while (num > 0) {
        count++;
        num = Math.floor(num / 10);
    }
    return count;
};

//5
const PrintEvenNumbers = (number1, number2) => {
    let min = Math.min(number1, number2);
    let max = Math.max(number1, number2);

    for (let i = min; i <= max; i++) {
        if (i % 2 === 0) {
            console.log(i);
        }
    }
}
//6
const reverseNumber = (num) => {
    let newNum = 0;
    while (num > 0) {
        newNum = newNum * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    return newNum;
}

//7
const NumberPyramid = (num) => {
    for (let i = 1; i <= num; i++) {
        console.log(String(i).repeat(i));
    }
}

//8
const IsPalindrome = (num) => {
    let reversNum = reverseNumber(num);
    return reversNum === num;
}

//9
const MultiplicationTable = (num) => {
    for (let i = 1; i <= 10; i++) {
        let multi = i * num;
        console.log(`${num} x ${i} = ${multi}`);
    }
}
//10
const CollatzSequence = (num) => {
    console.log(num); 
    while (num > 1) {
        if (num % 2 === 0) {
            num = num / 2;
        } else {
            num = num * 3 + 1;
        }
        console.log(num); 
    }
}
