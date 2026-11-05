const array = [];
//1
array.push(1);
array.push(2);
array.push(3);
array.pop();

//2
array[0] = 4;
array[1] = 5;
array[2] = 6;
array.length = array.length - 1;

//3
array = [1, 2, 3];
let newArray = array.slice(0, array.length - 1);

//4
array.push(1, 2, 3);
array.splice(2, 1)

//5
array = array.concat(1);
array = array.concat(2);
array = array.concat(3);
array.pop();
