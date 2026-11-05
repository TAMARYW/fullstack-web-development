//1
function Phone(brand, model) {
    this.brand = brand;
    this.model = model;
}

Phone.prototype.details = function () {
    console.log(`Phone: ${this.brand} ${this.model}`);
};

const myPhone = new Phone("Samsung", "S22");
myPhone.details();



//2
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.area = function () {
    return this.width * this.height;
};

const rect = new Rectangle(5, 4);
console.log(rect.area());

//3
function BankAccount(owner, balance) {
    this.owner = owner;
    this.balance = balance;
}

BankAccount.prototype.deposit = function (amount) {
    this.balance += amount;
};

BankAccount.prototype.withdraw = function (amount) {
    if (amount <= this.balance) {
        this.balance -= amount;
    } else {
        console.log("Insufficient funds!");
    }
};

BankAccount.prototype.checkBalance = function () {
    console.log(`Balance: ${this.balance}`);
};

const account = new BankAccount("תמר", 1000);
account.deposit(500);
account.withdraw(200);
account.checkBalance();

//4
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function () {
    console.log(`${this.name} makes a sound.`);
}

function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
    console.log(`${this.name} barks`);
}

//5
function Vehicle(type) {
    this.type = type;
}

Vehicle.prototype.describe = function () {
    console.log(`This is a ${this.type}`);
}


function Car(type, brand) {
    Vehicle.call(this, type);
    this.brand = brand;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.info = function () {
    console.log(`This is a ${this.brand} ${this.type}`);
}

//6
function Shape() {
}

Shape.prototype.area = function () {
    return 0;
}

function Circle(radius) {
    Shape.call(this);
    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
    return Math.PI * this.radius * this.radius;
}


function Square(side) {
    Shape.call(this);
    this.side = side;
}
Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

Square.prototype.area = function () {
    return this.side * this.side;
}


//7
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
    info() {
        console.log(`${this.title} by ${this.author}`);
    }
}

//8
class Person {
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
}

class Student extends Person {
    constructor(name, school) {
        super(name);
        this.school = school;
    }

    study() {
        console.log(`${this.name} is studying at ${this.school}`);
    }
}

//9
class Employee {
    #salary;
    constructor(salary) {
        this.#salary = salary;
    }

    getSalary() {
        return this.#salary;
    }

    work() {
        console.log(`Employee is working`);
    }
}

class Manager extends Employee {
    work() {
        console.log(`Manager is managing`);
    }
}

