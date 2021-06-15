const { add, subtract } = require('./jsdoc-cheatsheet-module');

/**
 * @file jsdoc-cheatsheet.js is the root for learning documentation for js projects.
 * @author Mitchell Yuen
 */

/**
 * Student Name
 * @type {string}
 */
const studentName = "Mitchell Yuen";

/**
 * Array of grades
 * @type {Array<number>}
 */
const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * @type {{id:number|string, text: string}}
 */
const todo = {
    id: 1,
    text: "hello"
}

// Function and Params

/**
 * Calculate tax 
 * @param {number} amount - Total amount
 * @param {number} tax - Tax percentage
 * @returns {string}  Total with a dollar sign
 */
const calculateTax = (amount, tax) => { 
    return `$${amount + tax*amount}`
}

console.log(calculateTax(100,0.1))

/** 
 * A student
 * @typedef {Object} Student
 * @property {number} id - Student Id
 * @property {string} name - Student name
 * @property {string|number} [age] - Student age
 * @property {boolean} isActive - Student is active
*/

/** 
 * @type {Student}
*/
const student = {
    id: 1,
    name: "John",
    age: 20,
    isActive: true
}

/**
 * Class to create a person object
 */
class Person {
    /**
     * 
     * @param {Object} personInfo Information about the person
     */
    constructor(personInfo){
        /**
         * @property {string} name Persons name
         */
        this.name = personInfo.name;
        /**
         * @property {string} age Persons age
         */
        this.age = personInfo.age;
    }
    /**
     * @property {Function} greet - A greeting with name and age
     * @returns {string} - A greeting with name and age
     */
    greet(){
        return `Hello, my name is ${this.name} and I am ${this.age}`
    }
}

/**
 * Person one
 * see {@link Person}
 */
const person1 = new Person({
    name: 'John',
    age:20
});

console.log(person1.greet());

console.log(add(20, 50))