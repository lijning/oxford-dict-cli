function Entry() {
  // no data
}

let queryLexicalEntry = {
  getLess: function () {
    let definitions = this.se
  }
}

// function DictQuery(raw) {
//   if (raw.results.length > 1) {
//     throw new Error('multiple results.')
//   }
//   this.data = raw.results[0];
//   this.index
// }

// let query = {
//   //
// }

// function QueryResult(raw) {
//   if (raw.results.length > 1) {
//     throw new Error('multiple results.')
//   }
//   this.data = raw.results[0];
//   for (let each of this.data.lexicalEntries) {
//     each.prototype = new Entry();
//   }
//   this.index = 0;
//   this.cur = null;
// }
// QueryResult.prototype = {
//   // 展示当前LexicalEntry的简略信息，包括：
//   // 该LE的所有entries的所有senses的定义，并为
//   nextLexicalEntry: function () {
//     this.cur = this.data.lexicalEntries[this.index];
//     this.index++;
//     return this.cur.getLess();
//   },

// }

// let createQuery = (raw) => {
//   if (raw.results.length > 1) {
//     throw new Error('multiple results.')
//   }
//   let result = Object.create(raw.results[0]);
// }

const query = {
  breifDefinitions: function (sense) {
    // console.log(sense.subsenses);
    let def = sense.short_definitions;
    let sub = sense.subsenses;
    // let sub = sense.subsenses instanceof Array?sense.subsenses.map(breifDefinitions):null;
    let str = `> ${def}\n`;
    if (sub) {
      for (let i = 0; i < sub.length; i++) {
        str += `  > ${sub[i].short_definitions}\n`
      }
    };
    // console.log(str)
    return str;
  },
  printCurEntry: function () {
    let cEntry = this.cLexical.entries[this.iEntry];
    let senses = cEntry.senses.map(this.breifDefinitions);
    console.log(senses);
    let str = `$\n`;
    for (let i = 0; i < senses.length; i++) {
      str += senses[i];
    }
    return str;
  },
  nextEntry: function() {
    iEntry+=1;
    if(this.iEntry>=this.cLexical.entries.length){
      iEntry=0;
      iLexical+=1;
      if (this.iLexical >= this.results[this.iResult].lexicalEntries.length){
        return -1;
      }
    }
  }
}

function Query(json) {
  this.results = json.results;
  this.iResult = 0;
  this.iLexical = 0;
  this.iEntry = 0;
  this.iSense = 0;
  this.cLexical = this.results[this.iResult].lexicalEntries[this.iLexical];
}

Query.prototype = query;


const fs = require('fs');

fs.readFile('output.json', 'utf-8', (err, data) => {
  //console.log(err, '?\n', JSON.parse(data))
  let a = new Query(JSON.parse(data));
  console.log(a.printCurEntry());

})