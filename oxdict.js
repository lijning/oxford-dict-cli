console.log('Hello');
setTimeout(function () {}, 10000);
var Dictionary = require("oxford-dictionary-api");
var aid = 'f3c36fce';
var key = 'f9180969a76f8f39b2bfcb1561d25441';
var dict = new Dictionary(aid, key);
dict.find("ace", (error, data) => {
  if (error) return console.log(error);
  console.log(data);
});