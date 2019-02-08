const vorpal = require('vorpal'), conn = require('./connection');
//const Dictionary = require("oxford-dictionary-api");

const aid = 'f3c36fce', key = 'f9180969a76f8f39b2bfcb1561d25441';

//const dict = new Dictionary(aid, key);
const cli = vorpal();

cli.command('definition <word>', 'Get the definition and examples of a word.')
  .alias('d', 'de', 'def')
  .option('-v, --verbose', 'print details.')
  .option('-e, --examples', 'print examples.')
  .action(function (args, backToVorpal) {
    //let print = this.log; //???
    let that = this;
    if (args.options.verbose) {
      args.options.examples = true;
    }
    conn.defWord(args.word).then(function (data) {
      let count = 1;
      for (let unit of data) {
        const entries = unit.entries;
        for (let entry of entries) {
          const senses = entry.senses;
          for (let i = 1; i <= senses.length; i++) {
            sense = senses[i - 1]; //that.log(sense);
            let lines = ['\n'];
            if (sense.definitions) {
              //lines.push(' Definitions:');
              for (let def of sense.definitions) {
                lines.push(' # '.padStart(4) + def);
              }
            }
            const examples = sense.examples;
            if (examples && args.examples) {
              //lines.push(' Examples:  ');
              for (let example of examples) {
                lines.push(' > '.padStart(4) + example.text);
              }
            }
            for (let line of lines) { that.log(line) }

          }
        }
      }
    },err=>console.error);
    //this.log('searching for: ', args.word);
    backToVorpal();
  });

cli.delimiter('dictionary$').show();

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