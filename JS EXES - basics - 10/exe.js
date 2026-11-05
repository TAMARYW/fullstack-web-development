//1
const Swap = (a, b) => {
    a = a + b;
    b = a.substring(0, a.length - b - length);
    a = a.substring(b.length);
}

//2
const GridCount = (matrix) => {
    let count = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === 'X') {
                count++;
                console.log(`Found 'X' at coordinates: (${i}, ${j})`);
            }
        }
    }
    return count;
}

//3
const NestedObjectRead = (family) => {
    console.log(`The third child's name is: `, family.children[2].name);
    console.log(`Sibling's names:`, family.children[0].name, family.children[1].name, family.children[2].name);
}

//4
const reverseInPlace = (array) => {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let oppositeIndex = array.length - 1 - i;
        let temp = array[i];
        array[i] = array[oppositeIndex];
        array[oppositeIndex] = temp;
    }
    return array;
}

//5
const TypeCollector = (array) => {
    const typeDic = { "number": 0, "string": 0, "object": 0, "boolean": 0, "null": 0 };
    for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current === null) {
            typeDic["null"]++;
        }
        else {
            let t = typeof current;
            typeDic[t]++;
        }
    }
}

//6
const Filter = (array) => {
    let filterArray = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 100) { filterArray.push(array[i]); }
    }
}

//7
const ConditionalObjectFiller = () => {
    const dic = {
        "even": [], "odd": []
    };
    for (let i = 0; i <= 50; i++) {
        if (i % 2 === 0) {
            dic.even.push(i);
        }
        else {
            dic.odd.push(i);
        }
    }

    let count = 0;
    for (let j = 0; j < dic.even.length; j++) {
        if (dic.even[j] % 3 === 0) {
            count++;
        }
    }
    return count;
}

//8
const GridChecker = (matrix) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((i === j) || (i + j === 2)) {
                matrix[i][j] = '#'
            }
        }
    }
}

//9
const frequencyCounter = (str) => {
    const freq = {};
    
    for (let char of str) {
        let lowerChar = char.toLowerCase();
                if (/[a-z]/i.test(lowerChar)) {
                        freq[lowerChar] = (freq[lowerChar] || 0) + 1;
        }
    }
    
    return freq;
};

//10
const flattenAndFilterClassic = (matrix) => {
    let result = [];
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let current = matrix[i][j];
            if (current >= 0) {
                result.push(current);
            }
        }
    }
    
    return result;
};