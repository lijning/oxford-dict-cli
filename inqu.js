'use strict';
const inquirer = require('..');

var questions = [
  {
    type: 'input',
    name: 'word',
    message: "What word are you looking up?"
  },
  {
    type: 'expand',
    message: 'Quit, examples, more, or another word?',
    name: 'action',
    choices: [
      {
        key: 'q',
        name: 'Quit',
        value: 'quit'
      },
      {
        key: 'e',
        name: 'examples',
        value: 'overwrite_all'
      },
      {
        key: 'd',
        name: 'Show diff',
        value: 'diff'
      },
      new inquirer.Separator(),
      {
        key: 'x',
        name: 'Abort',
        value: 'abort'
      }
    ]
  }
];

function ask() {
  inquirer.prompt(questions).then(answers => {
    output.push(answers.tvShow);
    if (answers.askAgain) {
      ask();
    } else {
      console.log('Your favorite TV Shows:', output.join(', '));
    }
  });
}

ask();