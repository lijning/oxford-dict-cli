const inquirer = require('inquirier');
const connection = require('./connection');
const Query = require('./DictionaryQuery');

var qWord = {
  type: 'input',
  name: 'word',
  message: "What word are you looking up?"
};

var qAction = {
  type: 'expand',
  message: function (answers) {
    var json = connection.defWord(answers[word]);
    var word = new Query(json);
    return word + '\n';
  },
  name: 'action',
  choices: [
    {
      key: 'n',
      name: 'Move to next entry.',
      value: 'next'
    },
    {
      key: 'a',
      name: 'Another word.',
      value: 'another'
    },
    {
      key: 'e',
      name: 'Examples',
      value: 'examples'
    },
    {
      key: 'd',
      name: 'Details',
      value: 'details'
    },
    new inquirer.Separator(),
    {
      key: 'q',
      name: 'Quit',
      value: 'quit'
    }
  ]
};

var qSenses = {
  type: 'rawlist',
  message: '\n',
  name: 'senses',
  choices: null
};

function askWord() {
  inquirer.prompt([qWord]).then(answers => {
    output.push(answers.tvShow);
    if (answers.askAgain) {
      ask();
    } else {
      console.log('Your favorite TV Shows:', output.join(', '));
    }
  });
}

ask();

function interact() {
  while (true) {
    inquirer.prompt([qWord, qAction])
  }
}