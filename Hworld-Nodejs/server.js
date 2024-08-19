const jsonString='{"name":"John","age":30,"city":"New York"}';

// JSON.parse() is used to convert a (JSON-formatted) string into a JavaScript object.

const jsonObject=JSON.parse(jsonString);
console.log('json object name is ',jsonObject.name);


// JSON.stringify() is used to convert a JavaScript object into a (JSON-formatted) string.
const objectToConvert={name:"alice",age:24};
const jsonStringified=JSON.stringify(objectToConvert);
console.log(jsonStringified)

