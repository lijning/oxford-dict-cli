function senses(raw){
  if(raw.definitions.length > 1){
    return new Error('multiple definitions:'+raw.definitions);
  }
  this.definition = raw.definitions[0];
  
}

function Word(raw) {
  var result = Object.create(null);
  this.text = null;
  this.entries = [];
  if(!raw.results){
    console.log('No?')
  };
  if(raw.results.length > 1){
    throw new Error('more than one entry.')
  }
  this.text = raw.results[0].word;
  for(let each of raw.results[0].lexicalEntries){
    this.entries.push(new LexcialEntry(each));
  }
}

function LexcialEntry(raw) {
  if(this.entries.length > 1){
    throw new Error('more than one entry.')
  }
  this.derivatives = raw.derivatives.text;
  this.senses = [];
  for(let each of raw.entries.senses){
    this.senses.push({
      defini
    })
  }
}