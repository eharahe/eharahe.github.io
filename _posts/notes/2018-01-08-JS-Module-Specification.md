---
layout: default
title: JS Module Specification
permalink: /notes/js-module-specification
tags: es6 module commonjs
category: notes
excerpt_separator: <!--break-->
---

## 语法层面
#### 1. ES6引出，其他形式引入  

引出格式
```javascript
// 1
export let a = 1

// 2
let b = 2
let f = 'str'
export {b, f}

// 3
let c = 3
export {c as d}

// 4
let m = 'aaa'
export default m

```
<br><!--break-->
CommonJS引入，相当于ES6的 `import * as xxx` 方式
```javascript
let xxx = require('../utils/xxx.js')
let a = xxx.a
let m = xxx.default
```
<br>
ES6引入
```javascript
import {a} from '../utils/xxx.js'

import * as xxx from '../utils/xxx.js'
let a = xxx.a
let m = xxx.default

import m from '../utils/xxx.js'
```
   
[David Herman ](https://esdiscuss.org/topic/moduleimport) 关于引入**multi-export modules**的proposal:
```javascript
import * as fs from "fs"; // importing the named exports as an object
import Dict from "dict";  // importing a default export, same as ever
```
rather than:
```javascript
import "fs"; // state the dependency
var fs = this.get("fs");
```
***
#### 2. CommonJS引出，其他形式引入#1

引出格式
```javascript
const style = {
  link: '111',
  error: '222'
}
module.exports = style
```

CommonJS引入
```javascript
let style = require('../utils/xxx.js')
```


ES6引入
```javascript
import style from '../utils/ConsoleStyle.js'
```

***
#### CommonJS引出#2

引出格式
```javascript
const style = {
  link: '111',
  error: '222'
}
module.exports = {style: style, a: 1}
```

CommonJS引入
```javascript
let xxx = require('../utils/xxx.js')
let style = xxx.style
```

***
## 二者区别
**ES6**   
* 静态声明，解析时确定输出接口   
* 同步或异步加载（依赖于module loader的具体实现）
  > ECMAScript 6 modules must work independently of whether the engine loads modules synchronously (e.g. on servers) or asynchronously (e.g. in browsers) [ -- Dr. Axel Rauschmayer](http://2ality.com/2014/09/es6-modules-final.html#support-for-both-synchronous-and-asynchronous-loading)   

  > Import can be asynchronous (and in current ES6 Module Loader, it in fact is) and can perform a little better.[ -- Amit](https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export)
* 部分加载，可以单独加载模块输出的某些字段，
  > You can use named imports to selectively load only the pieces you need. That can save memory.   
* 输出的是值的引用
```javascript
//------ lib.js ------
export let counter = 0;
export function inc() {
    counter++;
}
//------ main.js ------
import { inc, counter } from 'lib';
console.log(counter); // 0
inc();
console.log(counter); // 1
```
* this 指向undefined   

**CommonJS**   
* 动态加载，懒加载，运行阶段确定加载的模块
  > You can have dynamic loading where the loaded module name isn't predefined /static, or where you conditionally load a module only if it's "truly required" (depending on certain code flow).
* 同步加载
  > Loading is synchronous. That means if you have multiple requires, they are loaded and processed one by one.   
* 整体加载，整个模块都将被加载进内存；单独引出的方法、值类型无法被引入，比如：  
```javascript
//------ a.js ------
exports = function(s) { ... }
//------ b.js ------
let a = require('./a') //{}
```
> Because B’s variable a would still refer to A’s original exports object. (空对象)
* 输出的是值的拷贝   
```javascript
//------ lib.js ------
exports.counter = 0;
exports.inc = function() {
  this.counter++;
}
//------ main.js ------
let foo = require('./lib').inc
let counter = require('./lib').counter
inc();
console.log(counter); // 0
```
* 循环依赖的问题
```javascript
//------ a.js ------
var b = require('b');
exports.foo = function () { ... };
//------ b.js ------
var a = require('a'); // (1)
// 此时a.foo == undefined
exports.bar = function () {
    a.foo(); // OK (2)
};
//------ main.js ------
var a = require('a');
```
> As a general rule, keep in mind that with cyclic dependencies, you can’t access imports in the body of the module. That is inherent to the phenomenon and doesn’t change with ECMAScript 6 modules.
* this 指向本模块
```javascript
this === module.exports //true
this === exports //true
``` 