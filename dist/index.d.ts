/**Filters an array of objects by matching a field's value in each object to a search term.
 * Returns filtered array */
declare const find: (search: object, array: object[], key?: string, comparison?: "eq" | "ne" | "lt" | "gt" | "lte" | "gte") => Promise<object[] | []>;
export default find;
