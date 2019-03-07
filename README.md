# oxford-dict-cli

A command-line interface wraper of "oxford-dictionary" RESTful API.

## Use case

- 启动时，若有参数，进入查询结果。
- 否则，提示输入单词。
- 查询结果页面的操作：
  - more 显示当前Word的下一个entry（词性、基本释义）
  - detail 显示当前entry的变形、词源、语法特征等。
  - example 弹出列表，用方向键选择一个sense，查看它的例句。或者退出detail。
  - another 提示输入第二个Word

## TODO

- 封装Query类，调用方法，但不需要重新执行类型。使用原型。