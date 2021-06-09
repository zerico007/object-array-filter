/**Returns the name of a variable as a string */
const variableName = (variableAsObj: object) => Object.keys(variableAsObj)[0];

/**Filters an array of objects by matching a field's value in each object to a search term. Returns filtered array */
const find = (search: object, array: object[], key?: string): object[] | [] => {
  let objKey;
  key ? (objKey = key) : (objKey = variableName(search));

  const searchValue = Object.values(search)[0];
  const searchRegex =
    typeof searchValue === "string"
      ? new RegExp(searchValue, "ig")
      : searchValue;

  const filteredArray =
    typeof searchValue === "string"
      ? array.filter((item) => item[objKey].match(searchRegex))
      : array.filter((item) => item[objKey] == searchValue);
  return filteredArray;
};

// const testArray = [
//   { color: "black", size: 2, big: false },
//   { color: "pink", size: 3, big: false },
//   { color: "black", size: 3, big: false },
//   { color: "pink", size: 14, big: true },
// ];

// const size = 3;
// const color = "black";
// const big = true;

// const color2 = "pink";
// const filteredPink = find({ color2 }, testArray, "color");
// console.log(filteredPink);

// const filteredSize = find({ size }, testArray);
// const filteredColor = find({ color }, testArray);
// const filteredBig = find({ big }, testArray);
// console.log({ filteredSize, filteredColor, filteredBig });

export default find;
