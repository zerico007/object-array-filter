/**Returns the name of a variable as a string */
const variableName = (variableAsObj: object) => Object.keys(variableAsObj)[0];

/**Filters an array of objects by matching a field's value in each object to a search term.
 * Returns filtered array */
const find = (
  search: object,
  array: object[],
  key?: string,
  comparison?: "eq" | "ne" | "lt" | "gt" | "lte" | "gte"
): Promise<object[] | []> => {
  return new Promise((resolve, reject) => {
    let objKey;
    key ? (objKey = key) : (objKey = variableName(search));

    let operator;
    comparison ? (operator = comparison) : (operator = "eq");

    const searchValue = Object.values(search)[0];
    const searchIsString: boolean = typeof searchValue === "string";
    const searchIsBoolean: boolean = typeof searchValue === "boolean";
    const searchIsNumber: boolean = typeof searchValue === "number";

    if (
      (searchIsString || searchIsBoolean) &&
      operator !== "eq" &&
      operator !== "ne"
    ) {
      return reject(
        new Error(
          "Cannot perform a mathematical comparison with a string or boolean."
        )
      );
    }
    let searchRegex;
    if (searchIsString) searchRegex = new RegExp(searchValue, "ig");

    let filteredArray;

    if (searchIsString) {
      operator === "eq"
        ? (filteredArray = array.filter((item) =>
            item[objKey].match(searchRegex)
          ))
        : (filteredArray = array.filter(
            (item) => !item[objKey].match(searchRegex)
          ));
    }
    if (searchIsBoolean) {
      operator === "eq"
        ? (filteredArray = array.filter((item) => item[objKey] == searchValue))
        : (filteredArray = array.filter((item) => item[objKey] != searchValue));
    }

    if (searchIsNumber) {
      switch (operator) {
        case "eq":
          filteredArray = array.filter((item) => item[objKey] == searchValue);
          break;
        case "ne":
          filteredArray = array.filter((item) => item[objKey] != searchValue);
          break;
        case "lt":
          filteredArray = array.filter((item) => item[objKey] < searchValue);
          break;
        case "gt":
          filteredArray = array.filter((item) => item[objKey] > searchValue);
          break;
        case "gte":
          filteredArray = array.filter((item) => item[objKey] >= searchValue);
          break;
        case "lte":
          filteredArray = array.filter((item) => item[objKey] <= searchValue);
          break;
        default:
          break;
      }
    }
    resolve(filteredArray);
  });
};

export default find;
