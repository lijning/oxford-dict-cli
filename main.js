const vorpal = require('vorpal'), conn = require('./connection');
//const Dictionary = require("oxford-dictionary-api");

const aid = 'f3c36fce', key = 'f9180969a76f8f39b2bfcb1561d25441';

//const dict = new Dictionary(aid, key);
const oxford = vorpal();

oxford.command('definition <word>', 'Get the definition of a word.')
  .alias('d', 'de', 'def')
  .action(function (args, backToVorpal) {
    //let print = this.log; //???
    let that = this;
    conn.defWord(args.word).then(function (data, err) {
      let count = 1;
      for (let unit of data) {
        const entries = unit.entries;
        for (let entry of entries) {
          const senses = entry.senses;
          for (let sense of senses) {
            //that.log(sense);
            let output = ' Definitions:\n';
            if (!sense.definitions) continue;
            for (let def of sense.definitions) {
              output += ' # ' + def + '\n';
            }
            output += ' Examples:\n';
            const examples = sense.examples;
            if(!examples) continue;
            for (let example of examples) {
              output += ' > ' + example.text + '\n';
            }
            that.log(output);
          }
        }
      }
    });
    //this.log('searching for: ', args.word);
    backToVorpal();
  });

oxford.delimiter('dictionary$').show();

/* 数组的每一个元素：似乎是按照词性分类的。
{ entries:
   [ { grammaticalFeatures: [Array],
       homographNumber: '102',
       senses: [Array] } ],
  language: 'en',
  lexicalCategory: 'Verb',
  pronunciations:
   [ { audioFile:
        'http://audio.oxforddictionaries.com/en/mp3/ace_1_gb_1_abbr.mp3',
       dialects: [Array],
       phoneticNotation: 'IPA',
       phoneticSpelling: 'eɪs' } ],
  text: 'ace' }
  homographNumber:相同拼写但不同词源的词的编号。
*/