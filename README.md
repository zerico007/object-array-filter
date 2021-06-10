# object-array-filter

# Explanation 

Filters an array of objects by compariing a field's value in each object to a search term. 
The following operators can be used: "eq" | "ne" | "lt" | "gt" | "lte" | "gte".
Returns a promise of a filtered array. Field values must be strings, numbers or booleans.

# Installation & Usage

Run `npm install --save object-array-filter`

```javascript
const find = require('object-array-filter');

/**
 * @param search object
 * @param array an array of object with the same properties
 * @param key <optional> object key to perform comparison.
 * @param comparison <optional> comparison operator to use.
 * @returns {Promise<object[] | []>} Returns filtered array
 */



const testArray = [
  { color: "black", size: 2, big: false },
  { color: "pink", size: 3, big: false },
  { color: "black", size: 3, big: false },
  { color: "pink", size: 14, big: true}
];

const size = 3;
const color = 'black';
const big = true;

const testing = async () => {
  try {
    const filteredSize = await find({ size }, testArray);
    const filteredColor = await find({ color }, testArray);
    const filteredNotBig = await find({ big }, testArray);
    console.log({ filteredSize, filteredColor, filteredBig });
  } catch (error) {
    console.log(error);
  }
};

//Run function
testing();

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
find({ color2 }, testArray, "color")
  .then((filtered) => console.log(filtered))
  .catch((error) => console.log(error));

/* expected output: [ { color: 'pink', size: 3 }, { color: 'pink', size: 14 } ] */

//NB: The default operator is 'eq'. If you wish to use another operator, below are some examples.
const testingOperators = async () => {
  try {
    const filteredLessThanOrEqual3 = await find({ size }, testArray, "size", "lte");
    const filteredGreaterThan3 = await find({ size }, testArray, "size", "gt");
    const filteredNotBlack = await find({ color }, testArray, "color", "ne");
    const filteredNotBig = await find({ big }, testArray, "big", "ne");
    console.log({ filteredLessThanOrEqual3, filteredGreaterThan3, filteredNotBlack, filteredNotBig });
  } catch (error) {
    console.log(error);
  }
};

testingOperators();

/* expected output: {
  filteredLessThanOrEqual3: [
    { color: 'black', size: 2, big: false },
    { color: 'pink', size: 3, big: false },
    { color: 'black', size: 3, big: false }
  ],
  filteredGreaterThan3: [ { color: 'pink', size: 14, big: true } ],
  filteredNotBlack: [
    { color: 'pink', size: 3, big: false },
    { color: 'pink', size: 14, big: true }
  ],
  filteredNotBig: [
    { color: 'black', size: 2, big: false },
    { color: 'pink', size: 3, big: false },
    { color: 'black', size: 3, big: false }
  ]
} */

```