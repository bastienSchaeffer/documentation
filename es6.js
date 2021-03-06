
//--------------------------------------------------------------------------------
/*
  1 - VARIABLES
  2 - FUNTIONS IMPROVMENTS: ARROWS AND DEFAULT ARGUMENTS
  3 - TEMPLATE STRINGS / LITERALS
  4 - STRING METHODS
  5 - DESTRUCTURING
  6 - ITERABLES & LOOPING
  7 - ARRAY IMPROVEMENTS
  8 - ...SPREAD & ...REST
  9 - OBJECT LITERAL UPGRADES
  10 - PROMISES
  11 - SYMBOLS
  12 - CLASSES
 */
//--------------------------------------------------------------------------------

/*
  -----------------------------
  1 - VARIABLES
  -----------------------------
 */

//--------------------------------------------------------------- SCOPE

// Var is function scoped (default: window or global)
function setWidth() {
  // var variables are function scoped
  var width = 100;
  console.log(width); // 100
}
console.log(width); // ERROR: ReferenceError: width is not defined


// Var inside a block (condition/loop) can leak on the parent scope (!!: function vs scope)
if (condition){
  var data = 'The value';
}
console.log(data); // 'The value'


// Const and Let are blocked scoped
let winner = false;
if (condition){
  let dataLet = 'This value';
  const dataConst = 'The value';
  let winner = true;
  console.log(winner) // true, winner is blocked scoped and won't modify upper scope
}
console.log(dataLet, dataConst); // ERROR: ReferenceError: width is not defined
console.log(winner); // false, the upper scope hasn't been modified


//--------------------------------------------------------------- MUTABILITY
const key = 'abc';
key = 'def'; // Uncaught TypeError: Assignment to constant variable.

// Const is bind to a Type, so properties can be modified (Array/Object/Set)
const person = { name: 'Wes', age: 28 };
person.age = 30; // properties are writable


// IIFE: Immediately invoked function expression was used to create a scope (Var is function scoped).
for(var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 1000);
  })(i);
}

// With let:
for(let i = 0; i < 10; i++) {
  console.log(i);
  setTimeout(function() {
    console.log('The number is ' + i);
  },1000);
}


//--------------------------------------------------------------- TEMPORAL DEAD ZONE

// const and let can't be used before having been defined
console.log(naturalHoisting); // undefined
var naturalHoisting = 'value1';
console.log(deadZone); // ERROR: ReferenceError: deadZone is not defined
const deadZone = 'value2';


//--------------------------------------------------------------- What and when?
// use const by default
// only use let if rebinding is needed
// (var shouldn't be used in ES6)


/*
  -----------------------------
  2 - FUNTIONS IMPROVMENTS: ARROWS AND DEFAULT ARGUMENTS
  Functions: arrow and default arguments
  - much more concise
  - implicit return
  - doesn't rebind the value of this when used inside another function (clickHandler)
  -----------------------------
 */

//--------------------------------------------------------------- ARROW FUNCTION

const names = ['jj', 'brig', 'cat', 'bast'];
const fullNames = names.map(name => `${name} Schaeffer`);
const noParamsEmptyParenthesis = names.map(() => `All good`);


// Always anonymous function, can't be named but can be put in a variable
const sayMyName = (name) => { alert(`Hello ${name}!`) };
sayMyName('bast'); // Hello bast!


// Create new table of objects from winners with {name, race, place}
const race = 'London Marathon';
const winners = ['Hunter Gath', 'Singa Song', 'Imda Bos'];
// Parenthesis containing the object is an implicit return (race without :)
const win = winners.map((winner, i) => ({name: winner, race, place: i + 1}));

// Create new table of old people
const ages = [23,62,45,234,2,62,234,62,34];
const old = ages.filter(age => age >= 60);


//--------------------------------------------------------------- ARROW AND THIS

const box = document.querySelector('.box');
// IMPORTANT NOTE: A regular function is used not an arrow function
// - in an arrow function the 'this' is not rebound inside of this function and use previous scope
box.addEventListener('click', function() {
  // ^^^ this is the <div.box> since box has called addEventListener.
  // variables are rebinded, use let
  let first = 'opening';
  let second = 'open';
  if(this.classList.contains(first)) {
    // switch them by destructuring
    [first, second] = [second, first];
  }
  this.classList.toggle(first);
  // An arrow function is used, 'this' is not rebound and inherits from its parent named function
  // so this.classList is correct
  setTimeout(() => {
    this.classList.toggle(second);
  }, 250);
});


//--------------------------------------------------------------- ARGUMENTS

// Default arguments, check if undefined
// NOTE: should be refactored with destructuring for flexibility
function calculateBill(total, tax = 0.13, tip = 0.15) {
  return total + (total * tax) + (total * tip);
}
// pass undefined to get the default
const totalBill = calculateBill(100, undefined, 0.25);


//--------------------------------------------------------------- WHEN NOT USE

// When you really need `this`
const button = document.querySelector('#pushy');
button.addEventListener('click', function() {
  console.log(this);
  this.classList.toggle('on');
});

// When you need a method to bind to an object
const person = {
  points: 23,
  // else here 'this' would be the Window
  // - a method inside an object doesn't need the word 'function'
  score() {
    console.log(this);
    this.points++;
  }
};

// When you need to add a prototype method
class Car {
  constructor(make, colour) {
    this.make = make;
    this.colour = colour;
  }
}

// else here 'this' would be the Window
Car.prototype.summarize = function() {
  return `This car is a ${this.make} in the colour ${this.colour}`;
};

// When you need arguments object
const orderChildren = function() {
  const children = Array.from(arguments);
  return children.map((child, i) => {
    return `${child} was child #${i + 1}`;
  })
  console.log(arguments);
};


//--------------------------------------------------------------- EXERCISES

// Select all the list items on the page and convert to array
const items = Array.from(document.querySelectorAll('[data-time]'));

// Filter for only the elements that contain the word 'Flexbox'
const filtered = items
  .filter(item => item.textContent.includes('Flexbox'))
  // map down to a list of time strings
  .map(item => item.dataset.time)
  // map to an array of seconds
  .map(timecode => {
    const parts = timecode.split(':').map(part => parseFloat(part));
    return (parts[0] * 60) + parts[1];
  })
  // reduce to get total
  .reduce((runningTotal, seconds) => runningTotal + seconds);


// Create an array of the numbers greater than `70`
const numbers = [3, 62, 234, 7, 23, 74, 23, 76, 92];
const largeNumbers = numbers.filter(number => number > 70);

/*
  -----------------------------
  3 - TEMPLATE STRINGS / LITERALS
  -----------------------------
 */

//--------------------------------------------------------------- CONCATENATE

const name = 'Snickers';
const age = 2;
const sentence = `My dog ${name} is ${age * 7} years old.`;

// HTML fragments
const markup = `
    <div class="person">>
      <p class="bio">${person.bio}</p>
    </div>`;
document.body.innerHTML = markup;

// If statement (note the the tilts)
const markup = `
  <div class="song">
    <p>${song.featuring ? `(Featuring ${song.featuring})` : ''}</p>
  </div>`;
document.body.innerHTML = markup;

// Loop (note the .map().join('') and the tilts)
const markup = `
  <ul class="dogs">
    ${dogs.map(dog => `<li>${dog.name}</li>`).join('')}
  </ul>`;
document.body.innerHTML = markup;


//--------------------------------------------------------------- RENDER FUNCTIONS

// common use case in React
function renderKeywords(keywords) {
  return `
      <ul>
        ${keywords.map(keyword => `<li>${keyword}</li>`).join('')}
      </ul>`;
}
const markup = `
    <div class="beer">
      ${renderKeywords(beer.keywords)}
    </div>`;
document.body.innerHTML = markup;


//--------------------------------------------------------------- TAGGED TEMPLATE

// IMPORTANT NOTE:
// -> strings array will always be bigger than values (can add empty value automatically)
// -> strings = ['My dog', 'is', 'years old']
// -> values = ['Snickers', 100]
function highlight(strings, ...values) {
  let str = '';
  // which is why here if undefined it returns ''
  strings.forEach((string, i) => {
    str += `${string} <span contenteditable class="hl">${values[i] || ''}</span>`;
  });
  return str;
}
const name = 'Snickers';
const age = 100;
const sentence = highlight`My dog ${name} is ${age} years old`;
document.body.innerHTML = sentence;
console.log(sentence);

//--------------------------------------------------------------- DICTIONARY
const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

function addAbbreviations(strings, ...values) {

  // Create a new array, string if normal, html <abbr> if it is an abbreviation
  const abbreviated = values.map(value => {
    // if the dictionary contains the value, it is an abbreviation with a definition
    if(dict[value]) {
      return `<abbr title="${dict[value]}">${value}</abbr>`
    }
    // else it is a 'normal' string
    return value;
  });

  return strings.reduce((sentence, string, i) => sentence + string + (abbreviated[i] || ''), '');
  // return strings.reduce((sentence, string, i) => {
  //   return sentence + string + (abbreviated[i] || '');
  // }, '');
}

const first = 'Wes';
const last = 'Bos';
const sentence = addAbbreviations`Hi my name is ${first} ${last} and I love to code ${'JS'}, ${'HTML'} 
and ${'CSS'} all day and all night long!`;
const bio = document.querySelector('.bio');
const p = document.createElement('p');
p.innerHTML = sentence;
bio.appendChild(p);


//--------------------------------------------------------------- SANITIZE

// SANITIZE ALWAYS: Must make sure there is no sneaky/harmful content
function sanitize(strings, ...values) {
  const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ''}`, '');
  return DOMPurify.sanitize(dirty);
}

const first = 'Wes';
const aboutMe = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;
const html = sanitize`
    <h3>${first}</h3>
    <p>${aboutMe}</p>
  `;

const bio = document.querySelector('.bio');
bio.innerHTML = html;


/*
  -----------------------------
  4 - STRING METHODS
  -----------------------------
 */

const course = ‘RFG3’;

// startsWith
// - parameter: start after x characters: here 1
course.startsWith('RF'); // true
course.startsWith('FG', 1); // true

// endsWith
// - parameter: take the x first characters: here 3
course.endsWith(‘G3’) // true
course.endsWith(‘FG’, 3) // true

// includes
course.includes(‘FG’) //true

// repeat
course.reapeat(3) // ‘RFG3RFG3RFG3’
`${'lala' * 5}`.repeat(10) + ' Batman!'; // "NaNNaNNaNNaNNaNNaNNaNNaNNaNNaN Batman!"


/*
  -----------------------------
  5 - DESTRUCTURING
  - allows to extract data from Array, Objects, Sets, Maps
    - items from an array
    - properties from an object
  - less repetitive
  -----------------------------
 */

//--------------------------------------------------------------- SYNTAX

// One level
const person = { first: 'Wes', last: 'Bos' };
const { first, last } = person;

// Multiple level with renamed variables
const wes = {
  first: 'Wes',
  last: 'Bos',
  links: {
    social: {
      twitter: 'https://twitter.com/wesbos',
      facebook: 'https://facebook.com/wesbos.developer',
    },
    web: {
      blog: 'https://wesbos.com'
    }
  }
};
const { twitter: tweet, facebook: fb } = wes.links.social;

// With default values
const settings = { width: 300, color: 'black' }; // height, fontSize
const { width = 100, height = 100, color = 'blue', fontSize = 25} = settings;
// => width=300, height=100, color=’black’, fontSize=25

// Object Destructuring with variable renaming & default values
const { w: width = 400, h: height = 500 } = { w: 800 };
// => width=800, height=500


//--------------------------------------------------------------- ARRAYS

// Create variables from items (useful when index based arrays)
const details = ['Wes Bos', 123, 'wesbos.com'];
const [name, id, website] = details;

// Create from a separated coma string (converted directly from .split())
// - without the same length, it ignores the extra values: here ignore: wes, bos, cool
const data = 'Basketball,Sports,33510,wes,bos,cool';
const [itemName, category, zip] = data.split(',');

// Using rest parameter
const team = ['Wes', 'Harry', 'Sarah', 'Keegan', 'Riker'];
const [captain, assistant, ...players] = team;
//=> console.log(captain, assistant, players) // ‘Wes’, ‘Harry’, [‘Sarah’, ‘Keegan’, 'Riker']


//--------------------------------------------------------------- SWAPPING

let inRing = 'Hulk Hogan';
let onSide = 'The Rock';
console.log(inRing, onSide); // Hulk Hogan, The Rock
// Destructure directly into the opposite variables (onSide becomes inRing)
[inRing, onSide] = [onSide, inRing];
console.log(inRing, onSide); // The Rock, Hulk Hogan


//--------------------------------------------------------------- FUNCTIONS

// With multiple data
function convertCurrency(amount) {
  const converted = {
    USD: amount * 0.76,
    GPB: amount * 0.53,
    AUD: amount * 1.01,
    MEX: amount * 13.30
  };
  return converted;
}
const { USD, GBP } = convertCurrency(100); // AUD, MEX disappear completely

// With unordered and default argument and default properties in argument
// - can be called without any arguments as it also defaults the arguments (= {})
function tipCalc({ total = 100, tip = 0.15, tax = 0.13 } = {}) {
  return total + (tip * total) + (tax * total);
}
const bill = tipCalc({ tip: 0.20, total: 200 });
console.log(bill);


/*
  -----------------------------
  6 - ITERABLES & LOOPING
  - iterable is anything that can be looped over
  -----------------------------
 */

//--------------------------------------------------------------- EXISTING LOOPS

const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

// Not nice syntax read
for (let i = 0; i < cuts.length; i++) {
  console.log(cuts[i]);
}

// can't abort or skip (break/continue) aren't available
cuts.forEach((cut) => {
  console.log(cut);
  if(cut === 'Brisket') {
    continue;
  }
});

// retrieves only the index
// - loop over every iterables including any prototypes or functions attached
cuts.shop = 'MM MEats';
for (const index in cuts) {
  console.log(cuts[index]);
}

// For of is much better: use it for everything but Objects (for..in)
// - loops only over actual items (^)
// - NOTE: the break/continue behaviour
for (const cut of cuts) {
  if(cut === 'Brisket') {
    break; // ['Chuck', 'Brisket']
    continue; // ['Chuck', 'Shank', 'Short Rib']
  }
  console.log(cut);
}


//--------------------------------------------------------------- EXAMPLES

const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

// NOTE:
// - with destructured and renamed variables
// - with entries (array used in generator containing index and value)
for (const [i, cut] of cuts.entries()) {
  console.log(`${cut} is the ${i + 1} item`);
}


// NO need to convert to a true Array (here arguments), it loops only over actual items
function addUpNumbers() {
  let total = 0;
  // ATTENTION: arguments here is not EXACTLY an array (contains prototype)
  // !!TRAP COULD BE PROPOSED HERE: if for..in is used
  for (const num of arguments) {
    total += num;
  }
  console.log(total);
  return total;
}
addUpNumbers(10,23,52,34,12,13,123);

// Useful for a string, make always sure to use const for its scope
const name = 'Wes Bos';
for (const char of name) {
  console.log(char);
}

// For DOM manipulation
const ps = document.querySelectorAll('p');
for (const paragraph of ps) {
  paragraph.addEventListener('click', function() {
    console.log(this.textContent);
  });
}


//--------------------------------------------------------------- PLAIN OBJECTS

// Regular plain object is not an iterable, use for..in
const apple = {
  color: 'Red',
  size: 'Medium',
  weight: 50,
  sugar: 10
};

for (const prop in apple) {
  const value = apple[prop];
  console.log(value, prop);
}


/*
  -----------------------------
  7 - ARRAY IMPROVEMENTS
  -----------------------------
 */

//--------------------------------------------------------------- ARRAY FROM & OF

// ARRAY FROM: Convert an array-ish to a true Array (with all attached prototype)
// => to be able to use all arrays methods
const pageHtml = `
  <div class="people">
    <p>Wes</p>
    <p>Kait</p>
    <p>Snickers</p>
  </div>`;

const people = document.querySelectorAll('.people p');
// the second parameter is a map function
const peopleArray = Array.from(people, person => {
  console.log(person);
  // NOTE: access the textContent
  return person.textContent;
});
console.log(peopleArray);


// ARRAY FROM: Convert arguments a true Array (with all attached prototype)
// => to be able to use all arrays methods here: reduce
function sumAll() {
  const nums = Array.from(arguments);
  return nums.reduce((prev, next) => prev + next, 0);
}
sumAll(2, 34, 23, 234, 234, 234234, 234234, 2342);

// ARRAY OF: create an array from arguments passed, simple nothing to say
const ages = Array.of(12,4,23,62,34);
console.log(ages);


//--------------------------------------------------------------- ARRAY FIND & FINDINDEX

const posts = [
  {
    "code":"BAcyDyQwcXX",
    "caption":"Lunch #hamont",
    "category":"dev",
    "id":"1161022966406956503"
  },
  {
    "code":"BAcJeJrQca9",
    "caption":"Snow! ⛄️🌨❄️ #lifewithsnickers",
    "category":"dev",
    "id":"1160844458347054781"
  }
];


const code = 'BAcJeJrQca9';
const post = posts.find(post => post.code === code);
// NOTE: for multiple selection, use posts.filter(post => post.category === 'dev');


const postIndex = posts.findIndex(post => post.code === code);
console.log(postIndex);


//--------------------------------------------------------------- ARRAY SOME & EVERY (not ES6)

const ages = [32, 15, 19, 12];

// is there at least one adult in the group?
const adultPresent = ages.some(age => age >= 18);
console.log(adultPresent);

// is everyone old enough to drink?
const allOldEnough = ages.every(age => age >= 19);
console.log(allOldEnough);


/*
  -----------------------------
  8 - ...SPREAD & ...REST
  -----------------------------
 */

//--------------------------------------------------------------- SPREAD
// IMPORTANT: the spead operator (...)
// - takes every single item from an iterable
// - iterable: anything that can be looped over with for..of:
// => includes array, strings, DOM nodes, arguments, objects, map...
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const specialty = ['Meatzza', 'Spicy Mama', 'Margherita'];

// !!TEST IMPROVE: much more flexible than .concat
const pizzas = [...featured, 'veg', ...specialty];
// => ['Deep Dish', 'Pepperoni', 'Hawaiian', 'veg', 'Meatzza', 'Spicy Mama', 'Margherita']
// STRING: [...'wes'] // => ['w', 'e', 's']

// const fridayPizzas = pizzas; => SUPER WRONG THIS IS A REFERENCE
// -> and can be overwritten
// NOTE: the spread is copying the array as opposed to reference it
// -> doesn't modify pizzas => SUPER GOOD
const fridayPizzas = [...pizzas];

const deepDish = {
  pizzaName: 'Deep Dish',
  size: 'Medium',
  ingredients: ['Marinara', 'Italian Sausage', 'Dough', 'Cheese']
};


//--------------------------------------------------------------- EXERCISE

const domElement = `<h2 class="jump">SPREADS!</h2>`;

const heading = document.querySelector('.jump');
heading.innerHTML = sparanWrap(heading.textContent);
function sparanWrap(word) {
  // it spread the word: ['S', 'P', 'R'..
  return [...word].map(letter => `<span>${letter}</span>`).join('');
}


const people = [...document.querySelectorAll('.people p')]; // Node dom at that point
//  === const people = Array.from(document.querySelectorAll('.people p'));
const names = people.map((person) => person.textContent );


// Create new array from property on an object
const deepDish = {
  pizzaName: 'Deep Dish',
  size: 'Medium',
  ingredients: ['Marinara', 'Italian Sausage', 'Dough', 'Cheese']
};
const shoppingList = ['Milk', 'Flour', ...deepDish.ingredients];
// => ['Milk', 'Flour', 'Marinara', 'Italian Sausage', 'Dough', 'Cheese']


// 'Delete' an object: create a new array: spread take
const comments = [
  { id: 209384, text: 'I love your dog!' },
  { id: 523423, text: 'Cuuute! 🐐' },
  { id: 632429, text: 'You are so dumb' },
  { id: 192834, text: 'Nice work on this wes!' },
];
const id = 632429;
const commentIndex = comments.findIndex(comment => comment.id === id);
const newComments = [...comments.slice(0,commentIndex), ...comments.slice(commentIndex + 1)];
console.log(newComments);


//--------------------------------------------------------------- SPREAD INTO A FUNCTION
// unpacks in multiple items

const inventors = ['Einstein', 'Newton', 'Galileo'];
const newInventors = ['Musk', 'Jobs'];
// It spreads directly into a function
inventors.push(...newInventors);
// old way was: inventors.push.apply(inventors, newInventors)
console.log(inventors);


// It spreads directly as a variable
const name = ['Wes', 'Bos'];
// NOTE: so the function receives vars
function sayHi(first, last) {
  alert(`Hey there ${first} ${last}`);
}
// It spreads directly as a variable here
sayHi(...name);


//--------------------------------------------------------------- REST PARAM
// exact opposite: packs into a single array

// NOTE: With variable names
// When certain items are defined precisely (rate first value): here the first 3
function convertCurrency(rate, tax, tip, ...amounts) {
  console.log(rate, tax, tip, amounts);
  // => 1.54, 10, 23, [52, 1, 56]
  return amounts.map(amount => amount * rate);
}

const amounts = convertCurrency(1.54, 10, 23, 52, 1, 56);
console.log(amounts);
// => [80.08, 1.54, 86.24000000000001]
// => EXPLICIT : [52*1.54, 1*1.54, 58*1.54]


// NOTE: With variable names
// Example data: sports app
const runner = ['Wes Bos', 123, 5.5, 5, 3, 6, 35];
const [name, id, ...runs] = runner;
console.log(name, id, runs); // => 'Wes Bos', 123, [5.5, 5, 3, 6, 35]


const team = ['Wes', 'Kait', 'Lux', 'Sheena', 'Kelly'];
const [captain, assistant, ...players] = team;
console.log(captain, assistant, players);
// => 'Wes', 'Kait', ["Lux", "Sheena", "Kelly"]


/*
  -----------------------------
  9 - OBJECT LITERAL UPGRADES
  -----------------------------
 */

//--------------------------------------------------------------- SYNTAX

const first = 'snickers';
const last = 'bos';
const age = 2;
const breed = 'King Charles Cav';
const dog = {
  firstName: first, // rename to firstName
  last, // (Less redundant : last: last
  age,
  breed,
  pals: ['Hugo', 'Sunny']
};
console.log(JSON.stringify(dog));
/*
=> {
    firstName: "snickers",
    last: "bos",
    age: 2,
    breed: "King Charles Cav",
    pals: Array(2)
  }
 */


// Leave out word function and the column
// !!QUESTION:
// - attention no arrow function here
// - attention no arrow function here
const modal = {
  // old way
  // create: function(){
  //
  // },
  create(selector) {

  }
};


// Compute the value: [`${key}Opposite`]
function invertColor(color) {
  return '#' + ("000000" + (0xFFFFFF ^ parseInt(color.substring(1),16)).toString(16)).slice(-6);
}
const key = 'pocketColor';
const value = '#ffc600';
const tShirt = {
  [key]: value,
  // compute the copy
  [`${key}Opposite`]: invertColor(value)
};


// !!NOTE: Combine 2 Arrays as Key/Value in new Object
const keys = ['size', 'color', 'weight'];
const values = ['medium', 'red', 100];

// .shift: removes the first element from an array and returns that remove
const shirt = {
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
}
console.log(shirt);
// => {"size":"medium","color":"red","weight":100}


/*
  -----------------------------
  10 - PROMISES
   - The Promise object represents the eventual completion (or failure)
  of an asynchronous operation, and its resulting value. (often used with fetch)
    - The Fetch API provides an interface for fetching resources
   -A Promise is a proxy for a value not necessarily known when the promise is created
  - A Promise is in one of these states:
    - pending: initial state, neither fulfilled nor rejected.
    - fulfilled: meaning that the operation completed successfully.
    - rejected: meaning that the operation failed.
  -----------------------------
 */

//--------------------------------------------------------------- INTRO

// Fetch is similar to $.getJSON/$.ajax but native (no library)
// - a promise is something that will happen between now and the future (asynchronous)
// => fetch queues up the search but doesn't store the result (it owes it)
// => Promise is listening the fetch
// => .then is the callback function(s)
// => the Promise returns the raw data (not a JSON)
// => then console it

// The fetch() method takes one mandatory argument, the path to the resource to fetch.
const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');
// It returns a Promise that resolves to the Response to that request
postsPromise
  // return as a JSON
  .then(data => data.json())
  .then(data => { console.log(data) })
  // catch any error (wrong URL for instance (500,404..))
  .catch((err) => {
    console.error(err);
  });


//--------------------------------------------------------------- SYNTAX TO BUILD A PROMISE

// A Promise object is created using the new keyword and its constructor.
// This constructor takes as its argument a function, called the "executor function".
// This function should take two functions as parameters. (a Promise works or fails)
//  - resolve: when the asynchronous task completes successfully and returns the results
//  - reject: when the task fails, and returns the reason for failure (typically an error object)
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // !! throw an Error object here (to see where the error happens)
    reject(Error('Err wes isn\'t cool'));
  }, 1000);
});

promise
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });


//--------------------------------------------------------------- CHAINING PROMISES

// Allow flow control, useful in nodejs (backend query DB)
// Chaining gives clarity
// => select an ID first to retrieve an article from separate tables
const posts = [
  { title: 'I love JavaScript', author: 'Wes Bos', id: 1 },
];

const authors = [
  { name: 'Wes Bos', twitter: '@wesbos', bio: 'Canadian Developer' },
];

// Find the post from its ID
function getPostById(id) {
  // create a new promise
  return new Promise((resolve, reject) => {
    // using a settimeout to mimick a databse
    setTimeout(() => {
      // find the post we want
      const post = posts.find(post => post.id === id);
      if(post) {
        resolve(post); // send the post back
      } else {
        reject(Error('No Post Was Found!'));
      }
    }, 200);
  });
}

// Find the author details to add the author details in the post object
function hydrateAuthor(post) {
  // create a new promise
  return new Promise((resolve, reject) => {
    // find the author in authors from the post.author (author.name === post.author)
    const authorDetails = authors.find(person => person.name === post.author);
    // When the author is found
    if(authorDetails) {
      // "hydrate" the post object with the author object
      post.author = authorDetails;
      resolve(post);
    } else {
      reject(Error('Can not find the author'));
    }
  });
}

getPostById(1)
  .then(post => {
    // whn returning a Promise, it allows to use .then (hydrateAuthor is a Promise)
    return hydrateAuthor(post);
  })
  .then(post => {
    console.log(post);
  })
  .catch(err => {
    console.error(err);
  });
// => {
//      "title":"I love JavaScript",
//      "author":{
//        "name":"Wes Bos",
//        "twitter":"@wesbos",
//        "bio":"Canadian Developer"
//       },
//      "id":1
//  };


//--------------------------------------------------------------- MULTIPLE INDEPENDANT PROMISES

// Promise.all: fire in the same time no dependencies
// The Promise.all (iterable) method returns a single Promise
// - resolves when all of the promises in the iterable argument have resolved
const weather = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ temp: 29, conditions: 'Sunny with Clouds'});
  }, 2000);
});

const tweets = new Promise((resolve) => {
  setTimeout(() => {
    resolve(['I like cake', 'BBQ is good too!']);
  }, 500);
});

Promise
  // Promise follow the order given but are fired in the same time
  .all([weather, tweets])
  .then(responses => {
    // order is respected hence the deconstructed variables
    const [weatherInfo, tweetInfo] = responses;
    console.log(weatherInfo, tweetInfo)
  });


// Promise on proper API with fecth
const postsPromise = fetch('http://wesbos.com/wp-json/wp/v2/posts');
const streetCarsPromise = fetch('http://data.ratp.fr/api/datasets/1.0/search/?q=paris');

Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => {
    // convert to JSON using the map based on the .all
    return Promise.all(responses.map(res => res.json()))
  })
  .then(responses => {
    console.log(responses);
  });


/*
  -----------------------------
  11 - SYMBOLS
  =>  Symbol is a new primitive type
  => unique identifier
  => may be used as an identifier for object properties
  7 JS data types:
    PRIMITIVE: (immutable values)
     - Boolean
     - Null
     - Undefined
     - Number
     - String
     - Symbol (new in ECMAScript 2015)
   NON PRIMITIVE:
    - Object
  -----------------------------
 */

//--------------------------------------------------------------- SYNTAX

// Pass a descriptor, 'Wes' is not a value
// corresponds to unique symbol: jjh23g42kh3423kg4b2h34k23jb4kjh2342yk3
// wes and person are absolutely unique: wes is !== person
const wes = Symbol('Wes');
const person = Symbol('Wes');

const classRoom = {
  [Symbol('Mark')] : { grade: 50, gender: 'male' },
  // here symbol avoid conflicts between the 2 olivia
  // and keeps both entries without overwriting
  [Symbol('olivia')]: { grade: 80, gender: 'female' },
  [Symbol('olivia')]: { grade: 80, gender: 'female' },
};

// !!NOTE: Symbols are not iterables
for (const person in classRoom) {
  console.log(person); // nothing happens
}

// To iterate use getOwnPropertySymbols
const syms = Object.getOwnPropertySymbols(classRoom);
const data = syms.map(sym => classRoom[sym]);
console.log(data);


/*
  -----------------------------
  12 - CLASSES
  -----------------------------
 */

//--------------------------------------------------------------- PROTOTYPAL INHERITANCE

// Prototypal inheritance:
// => when adding a method to the original constructor, it will be inherited by the rest of them
function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

// A method is added to the constructor, the position doesn't matter
Dog.prototype.bark = function() {
  console.log(`Bark Bark! My name is ${this.name}`)
};

const snickers = new Dog('Snickers', 'King Charles');
const sunny = new Dog('Sunny', 'Golden Doodle');

// The protoype are not part of the actual object but of the __proto
// .bark is overwritten here
Dog.prototype.bark = function() {
  console.log(`Bark Bark🇨🇦🇨🇦🇨🇦! My name is ${this.name} and I'm a ${this.breed}`);
};

Dog.prototype.cuddle = function() {
  console.log(`I love you owner!`);
};

snickers.bark();
// => Bark Bark! My name is Snickers


//--------------------------------------------------------------- CLASSES

// Class expression would be const Dog = class {};
// => similar to how stick a function inside a variable
// Class declaration
class Dog {
  // !!NOTE: constructor is absolutely required
  // !!NOTE SYNTAX: so comma separate between methods (constructor/bark/cuddle..)
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  // call with: snickers.bark()
  bark() {
    console.log(`Bark Bark! My name is ${this.name}`)
  }
  cuddle() {
    console.log(`I love you owner!`);
  }
  // static method:
  // think about array.from and array.of
  // array.from: create an array with all methods
  // array.of: lives on top of array, every arrays don't have array.og
  // snickers.info() => Uncaught TypeError: snickers.info is not a function.
  // => Dog.info() => because it is a static method (not shared)
  static info() {
    console.log('A dog is better than a cat by 10 times');
  }
  // getter function: return
  get description() {
    return `${this.name} is a ${this.breed} type of dog`;
  }
  // setter function: write
  // !!NOTE: call with: snickers.nicknnames = '  Snicky '
  set nicknames(value) {
    this.nick = value.trim();
  }
  get nicknames() {
    return this.nick.toUpperCase();
  }
}

const snickers = new Dog('Snickers', 'King Charles');
// call the setter
snickers.nicknnames = '  Snicky ';
// call the getter
// !!NOTE: call with: snickers.nicknames
// => NOT with snickers.nicknames() (getter function)
snickers.nicknnames
// => 'SNIKY'
const sunny = new Dog('Sunny', 'Golden Doodle');


//--------------------------------------------------------------- EXTENDING CLASSES

class Animal {
  constructor(name) {
    this.name = name;
    this.thirst = 100;
    this.belly = [];
  }
  drink() {
    this.thirst -= 10;
    return this.thirst;
  }
  eat(food) {
    this.belly.push(food);
    return this.belly;
  }
}

// Extends the Animal class to be more specific (Dog)
// - do not extend too multiple times to avoid deep complexity
class Dog extends Animal {
  constructor(name, breed) {
    // !!NOTE: super is absolutely required to extend
    // => means call the thing which is extended
    // first create an animal and pass name which is required in Animal
    super(name);
    this.breed = breed;
  }
  bark() {
    console.log('Bark bark I\'m a dog');
  }
}

const rhino = new Animal('Rhiney');
const snickers = new Dog('Snickers', 'King Charles');


//--------------------------------------------------------------- EXTENDING ARRAY

class MovieCollection extends Array {
  // pass array to the constructor supe (spread operator)
  constructor(name, ...items) {
    // super here is waiting for an array (native)
    // => comparable to new Array(...items) here
    super(...items);
    this.name = name;
  }
  add(movie) {
    // !!NOTE: because Array is inherited, this.push can be called
    // 'this' is an Array
    this.push(movie);
  }
  topRated(limit = 10) {
    // !!NOTE: because Array is inherited, this.sort can be called
    // 'this' is an Array
    return this.sort((a, b) => (a.stars > b.stars ? -1 : 1)).slice(0, limit);
  }
}

const movies = new MovieCollection('Wes\'s Fav Movies',
  { name: 'Bee Movie', stars: 10 },
  { name: 'Star Wars Trek', stars: 1 },
  { name: 'Virgin Suicides', stars: 7 },
  { name: 'King of the Road', stars: 8 }
);

movies.add({ name: 'Titanic', stars: 5 });
// !!NOTE:
//  if calling for (const movie in movies){};
//    => retieve 5 elements containing the name
//  CALL for of to skip properties:
//    => for (const movie of movies){};
//      => will retieve only the movies as expected
