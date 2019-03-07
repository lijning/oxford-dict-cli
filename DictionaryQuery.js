const query = {
  breifDefinitions: function (sense) {
    // console.log(sense.subsenses);
    let def = sense.definitions;
    let sub = sense.subsenses;
    // let sub = sense.subsenses instanceof Array?sense.subsenses.map(breifDefinitions):null;
    let str = `> ${def}\n`;
    if (sub) {
      for (let i = 0; i < sub.length; i++) {
        str += `  > ${sub[i].definitions}\n`
      }
    };
    // console.log(str)
    return str;
  },
  printCurEntry: function () {
    let cEntry = this.cLexical.entries[this.iEntry];
    let senses = cEntry.senses.map(this.breifDefinitions);
    //console.log(senses);
    let str = `$\n`;
    for (let i = 0; i < senses.length; i++) {
      str += senses[i];
    }
    return str;
  },
  getListSenses: function () {
    let cEntry = this.cLexical.entries[this.iEntry];
    let senses = cEntry.senses.map(e => e.short_definitions.join('\n'));
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

module.exports=Query;

const fs = require('fs');

fs.readFile('output.json', 'utf-8', (err, data) => {
  //console.log(err, '?\n', JSON.parse(data))
  let a = new Query(JSON.parse(data));
  console.log(a.printCurEntry());

})