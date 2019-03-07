const Oxford = require('oxford-dictionary');
const fs = require('fs');

const aid = 'f3c36fce', key = 'f9180969a76f8f39b2bfcb1561d25441';
const config = {
  app_id: aid,
  app_key: key,
  source_lang: "en"
};
let arr = [];

var oxf = new Oxford(config);

function s(res) {
  //arr.push(',##,')
  console.log(res instanceof String);
  console.log(res.hasOwnProperty());
  console.log(res.constructor.toString());
  arr.push(JSON.stringify(res, null, 2));
};

oxf.find('cool').then(s);

setTimeout(() => {
  fs.writeFile('output.json', arr.join('\n'), function (params) {
  });
}, 3000);

