var o = {a:1}
var b = Object.create(o)
console.dir(b.a)
console.dir(o)

// const vorpal = require('vorpal');
// const cli = vorpal();
// cli.command('rrr <arg1> [arg2]','a command.')
// .option('-v')
// .parse(function (command, args) {
//   cli.log(args)
//   if(args=='')return 'mod';
//   return command
// }).action(function (args, back) {
//   cli.log(args)
// });
// cli.mode('mod')
//   .delimiter('you are in repl>')
//   .action(function (command, callback) {
//     this.log(eval(command));
//   });
// cli.delimiter('dictionary$').show();

/*
parse返回的args有点问题：是一个字符串，而非对象。
*/