// //1
// const doubleValues = (arrayNumber) => {
//     return arrayNumber.map((num) => num * 2)
// }

// //2
// const onlyEvenValues = (arrayNumber) => {
//     return arrayNumber.filter((num) => num % 2 === 0)
// }

// //3
// const showFirstAndLast = (array) => {
//     return array.filter((item, index) => index === 0 || index === array.length - 1);
// }

// //4
// const vowelCount = (str) => {
//     let dictCount = {};
//     const vowels = "aeiou";
//     [...str.toLowerCase()].forEach(ch => {
//         if (vowels.includes(ch)) {
//             dictCount[ch] = (dictCount[ch] || 0) + 1;
//         }
//     });
//     return dictCount;
// }

// //5
// const capitalize = (str) => {
//     return str.toUpperCase();
// }


// //6
// const shiftLetters = (str) => {
//     return [...str].map((char) => {
//         let code = char.charCodeAt(0);
//         if (char === 'z') return 'a';
//         if (char === 'Z') return 'A';

//         if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
//             return String.fromCharCode(code + 1);
//         }

//         return char;
//     }).join('');
// }

// //7
// const swapCase = (str) => {
//     return str.split(' ').map((word, index) => {
//         if (index % 2 !== 0) {
//             return word.toUpperCase();
//         }
//         return word;
//     }).join(' ');
// }

// //11.3_massaging_data_with_map

// const data = [
//     {
//         name: "John",
//         birthday: "1-1-1995",
//         favoriteFoods: {
//             meats: ["hamburgers", "sausages"],
//             fish: ["salmon", "pike"],
//         },
//     },
//     {
//         name: "Mark",
//         birthday: "10-5-1980",
//         favoriteFoods: {
//             meats: ["hamburgers", "steak", "lamb"],
//             fish: ["tuna", "salmon", "barracuda"],
//         },
//     },
//     {
//         name: "Mary",
//         birthday: "1-10-1977",
//         favoriteFoods: {
//             meats: ["cow", "chicken"],
//             fish: ["pike"],
//         },
//     },
//     {
//         name: "Thomas",
//         birthday: "1-10-1990",
//         favoriteFoods: {
//             meats: ["bird", "rooster"],
//             fish: ["salmon"],
//         },
//     },
//     {
//         name: "Mary",
//         birthday: "1-10-1977",
//         favoriteFoods: {
//             meats: ["hamburgers", "lamb"],
//             fish: ["bass", "tuna"],
//         },
//     },
// ];

// //1
// const AllNames = (data) => {
//     return data.map((obj) => obj.name);
// }

// //2
// const Before1990 = (data) => {
//     return data.filter((obj) => {
//         let year = Number(obj.birthday.split('-')[2]);
//         return year < 1990;
//     })
// }

// //3
// const FoodDicCount = (data) => {
//     const FoodDic = {};
//     data.forEach((obj) => {
//         obj.favoriteFoods.meats.forEach((meat) => {
//             FoodDic[meat] = (FoodDic[meat] || 0) + 1;
//         });
//         obj.favoriteFoods.fish.forEach((fish) => {
//             FoodDic[fish] = (FoodDic[fish] || 0) + 1;
//         });
//     });
//     return FoodDic;
// }

// function outer() {
//     let counter = 0;
//     function inner() {
//         counter++;
//         return counter;
//     }
//     return inner;
// }

// const count = outer();
// console.log(count());
// console.log(count());


// const nums = ['hi', 'bye', 'die'];
// for (let index = 0; index < nums.length; index++) {
//     const element = nums[index];
//     console.log(element.toUpperCase())
// }

// function processData() {
//     const data = { id: 329148753 };
//     console.log("ID", data.id);

//     const list = [1, 2, 3];
//     list.pop();

//     const user = { name: "Dana", age: function () { console.log("I am very big!!"); } };
//     user.age();

// }
// processData();

// function countLetters(str) {
//     let total = 0;
//     for (let i = 0; i < str.length; i++) {
//         total += str[i].length;
//     }
//     return total;
// }

// console.log(countLetters('hello world'));