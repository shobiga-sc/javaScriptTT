//  bigint

const bigNumber: bigint = 123456789012345678901234567890n;
const anotherBigNumber = BigInt(9007199254740991);

console.log(bigNumber + anotherBigNumber); // 123456789012345678910234567881n

//<--------------------------------------------------------------------------------------------------->//

//  Parameters<T>

function add(a: number, b: string): boolean {
    return a.toString() === b;
  }
  
  type AddParams = Parameters<typeof add>; // [number, string]
 
  const args: AddParams = [10, "10"]; // Matches [number, string]

  const result = add(...args); // Spreads args: add(10, "10")

   console.log(result); // true
//<--------------------------------------------------------------------------------------------------->//
//  extends

// Generic Constraints: Ensuring a type is a subtype or meets a condition.
// Class Inheritance: When one class inherits from another.

  function getLength<T extends { length: number }>(item: T): number {
    return item.length;
  }
  
  console.log(getLength("Hello")); // 5 (string has length)
  console.log(getLength([1, 2, 3])); // 3 (array has length)

  // Invalid case
  // console.log(getLength(123)); // Error: number does not have a "length" property
  
//<--------------------------------------------------------------------------------------------------->//

// Array<T>
  
const numbers: Array<number> = [1, 2, 3]; // Array of numbers
const strings: Array<string> = ["one", "two", "three"]; // Array of strings


console.log(numbers[0]); // 1
console.log(strings[1]); // "two"
//<--------------------------------------------------------------------------------------------------->//

//  Intersection with properties ({ a: string } & { b: number })

type A = { a: string };
type B = { b: number };

type Combined = A & B; // Combines A and B into one type

const obj: Combined = { a: "Hello", b: 42 }; // Valid
// const invalidObj: Combined = { a: "Hello" }; // Error: 'b' is missing

//<--------------------------------------------------------------------------------------------------->//
//  Optional properties ({ a?: T })

type User = {
    name: string;
    age?: number; // Optional property
  };
  
  const user1: User = { name: "Alice" }; // Valid, 'age' is omitted
  const user2: User = { name: "Bob", age: 25 }; // Valid
  
//<--------------------------------------------------------------------------------------------------->//

//  ReadonlyMap<K, V>

const map: ReadonlyMap<string, number> = new Map([
    ["one", 1],
    ["two", 2],
  ]);
  
  console.log(map.get("one")); // 1
  // map.set("three", 3); // Error: Cannot modify a ReadonlyMap
  
//<--------------------------------------------------------------------------------------------------->//


//  ThisParameterType<T>

// ThisParameterType<T> extracts the type of this inside a function. 
// It allows you to get the type of the object that the function is called on.

function greet(this: { name: string }): string {
    return `Hello, ${this.name}!`;
  }
  
  type ThisType = ThisParameterType<typeof greet>; // { name: string }
  
  const obj: ThisType = { name: "Alice" }; // This matches the type of `this` in `greet`
  

//<--------------------------------------------------------------------------------------------------->//
// any

// The any type disables type checking, allowing you to assign any value to a variable. 
// It's like saying, "I don't care about the type." 
// It's useful when you are unsure about the type, but you lose all the benefits of TypeScript’s type safety.

let value: any;

value = 42; // No problem, value is a number
value = "hello"; // No problem, value is a string
value = { a: true }; // No problem, value is an object

function logAny(input: any) {
  console.log(input); // No type safety on input
}

logAny(value); // Logs any value

//<--------------------------------------------------------------------------------------------------->//
// Discriminated Unions

// A discriminated union is a TypeScript feature that enables the creation of a 
// type that can represent several different possibilities or variants. 

// a union type for different shapes
type Shape =
  | { kind: "circle"; radius: number } // Circle type
  | { kind: "square"; side: number };  // Square type

// Function to calculate area based on shape
function getArea(shape: Shape): number {
  if (shape.kind === "circle") {
    // TypeScript knows shape has a `radius` because `kind` is "circle"
    return Math.PI * shape.radius ** 2;
  } else {
    // TypeScript knows shape has a `side` because `kind` is "square"
    return shape.side ** 2;
  }
}

console.log(getArea({ kind: "circle", radius: 5 })); // 78.53981633974483
console.log(getArea({ kind: "square", side: 4 }));   // 16

//<--------------------------------------------------------------------------------------------------->//