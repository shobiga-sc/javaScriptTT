//  bigint
var bigNumber = 123456789012345678901234567890n;
var anotherBigNumber = BigInt(9007199254740991);
console.log(bigNumber + anotherBigNumber); // 123456789012345678910234567881n
//<--------------------------------------------------------------------------------------------------->//
//  Parameters<T>
function add(a, b) {
    return a.toString() === b;
}
var args = [10, "10"]; // Matches [number, string]
var result = add.apply(void 0, args); // Spreads args: add(10, "10")
console.log(result); // true
//<--------------------------------------------------------------------------------------------------->//
//  extends
// Generic Constraints: Ensuring a type is a subtype or meets a condition.
// Class Inheritance: When one class inherits from another.
function getLength(item) {
    return item.length;
}
console.log(getLength("Hello")); // 5 (string has length)
console.log(getLength([1, 2, 3])); // 3 (array has length)
// Invalid case
// console.log(getLength(123)); // Error: number does not have a "length" property
//<--------------------------------------------------------------------------------------------------->//
// Array<T>
var numbers = [1, 2, 3]; // Array of numbers
var strings = ["one", "two", "three"]; // Array of strings
console.log(numbers[0]); // 1
console.log(strings[1]); // "two"
var obj = { a: "Hello", b: 42 }; // Valid
var user1 = { name: "Alice" }; // Valid, 'age' is omitted
var user2 = { name: "Bob", age: 25 }; // Valid
//<--------------------------------------------------------------------------------------------------->//
//  ReadonlyMap<K, V>
var map = new Map([
    ["one", 1],
    ["two", 2],
]);
console.log(map.get("one")); // 1
// map.set("three", 3); // Error: Cannot modify a ReadonlyMap
//<--------------------------------------------------------------------------------------------------->//
//  ThisParameterType<T>
// ThisParameterType<T> extracts the type of this inside a function. 
// It allows you to get the type of the object that the function is called on.
function greet() {
    return "Hello, ".concat(this.name, "!");
}
var obj = { name: "Alice" }; // This matches the type of `this` in `greet`
//<--------------------------------------------------------------------------------------------------->//
// any
// The any type disables type checking, allowing you to assign any value to a variable. 
// It's like saying, "I don't care about the type." 
// It's useful when you are unsure about the type, but you lose all the benefits of TypeScript’s type safety.
var value;
value = 42; // No problem, value is a number
value = "hello"; // No problem, value is a string
value = { a: true }; // No problem, value is an object
function logAny(input) {
    console.log(input); // No type safety on input
}
logAny(value); // Logs any value
// Function to calculate area based on shape
function getArea(shape) {
    if (shape.kind === "circle") {
        // TypeScript knows shape has a `radius` because `kind` is "circle"
        return Math.PI * Math.pow(shape.radius, 2);
    }
    else {
        // TypeScript knows shape has a `side` because `kind` is "square"
        return Math.pow(shape.side, 2);
    }
}
console.log(getArea({ kind: "circle", radius: 5 })); // 78.53981633974483
console.log(getArea({ kind: "square", side: 4 })); // 16
//<--------------------------------------------------------------------------------------------------->//
