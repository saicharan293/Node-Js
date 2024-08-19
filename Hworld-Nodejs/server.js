const jsonString='{"name":"John","age":30,"city":"New York"}';
const jsonObject=JSON.parse(jsonString);
console.log('json object name is ',jsonObject.name);

const objectToConvert={name:"alice",age:24};
const jsonStringified=JSON.stringify(objectToConvert);
console.log(jsonStringified)

