# object-array-filter

# Explanation 

Filters an array of objects by matching a field's value in each object to a search term. Returns filtered array. Field values must be strings, numbers or booleans. 

# Installation & Usage

Run `npm install --save object-array-filter`

```javascript
const find = require('object-array-filter');

const testArray = [
  { color: "black", size: 2, big: false },
  { color: "pink", size: 3, big: false },
  { color: "black", size: 3, big: false },
  { color: "pink", size: 14, big: true}
];

const size = 3;
const color = 'black';

const big = true;

const filteredSize = find({size}, testArray);
const filteredColor = find({color}, testArray);
const filteredBig = find({big}, testArray);
console.log({ filteredSize, filteredColor, filteredBig });

/* expected output: {
  filteredSize: [
    { color: 'pink', size: 3, big: false },
    { color: 'black', size: 3, big: false }
  ],
  filteredColor: [
    { color: 'black', size: 2, big: false },
    { color: 'black', size: 3, big: false }
  ],
  filteredBig: [ { color: 'pink', size: 14, big: true } ]
} */

//NB: Variable name should match the name of the field in the object. If the variable name does not match the field name, the following syntax must be used

const color2 = 'pink'
const filteredPink = find({color2}, testArray, 'color');
console.log(filteredPink);

/* expected output: [ { color: 'pink', size: 3 }, { color: 'pink', size: 14 } ] */

```