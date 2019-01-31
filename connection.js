const request = require('request');

const aid = 'f3c36fce', key = 'f9180969a76f8f39b2bfcb1561d25441';
const base = 'https://od-api.oxforddictionaries.com/api/v1';
const target = '/entries/en/ace';
const headers = {
  app_id: aid, app_key: key
};

function getEntries(word_id, lan='en') {
  const url = `${base}/entries/${lan}/${word_id}`;
  let options = {
    url, headers
  };
  return new Promise((resolve, reject)=>{
    let callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        let data = JSON.parse(body);
        let result = data.results[0];
        //console.log('here I am in the Promise.')
        resolve(result.lexicalEntries);
        }
      };
    request(options, callback);
  })
}

module.exports = {
  defWord: getEntries
}

// Sample:
// getEntries('word').then((data)=>{for(each of data){;}});