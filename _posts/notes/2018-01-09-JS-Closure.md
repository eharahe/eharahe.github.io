---
layout: default
title: Memory Leak by Closure
permalink: /notes/js-closure-memleak
tags: memleak closure 
category: javascript
excerpt_separator: <!--break-->
---
> It is necessary to notice that closured [[Scope]] in ECMAScript is the same object for several inner functions created in this parent context. It means that modifying the closured variable from one closure, affects the variable in another closure. [ - Dmitry Soshnikov](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/#one-codescopecode-value-for-them-all)
<!--break-->   

### 一、代码

```javascript
var theThing = null;

var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing)
      console.log("hi");
  };

  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage);
    }
  };
};

setInterval(replaceThing, 1000);

```

**现象：**   
* 每次调用 *replaceThing()*，*theThing* 指向一个新对象（包含一个大数组 *longStr* 和一个方法 *someMethod*）
* 其中 *someMethod* 的 *[[Scopes]]* 属性中包含了闭包变量 *originalThing*（它是本次 *replaceThing* 执行前的 *theThing* 对象的引用） 

**泄漏原因：**   

在 *replaceThing* 激活时，NFE函数 *unused* 闭包了自由变量 *originalThing*。由于 *someMethod* 和 *unused* 共享同一个 *[[Scopes]]*，因此 *someMethod* 也持有对 *originalThing* 的引用。在 *theThing* 的生命周期内，scope chain所持的闭包变量将无法被GC，而 *originalThing* 即指向本次循环前的 *theTing* 对象，故形成链状引用，不断累积。   
<br>   

### 二、snapshot 截图

DevTools的Heap Snapshot有以下两种视图可以分析闭包：   

* 在Object窗口中可以看到对象的内存结构，其中 *[[Scopes]]* 属性中包含了scope chain上的所有闭包变量。（非自由变量会在函数定义时，即 *[[Scopes]]* 生成时被优化掉）  

![alt文本](/assets/images/heapsnapshot1.png "Object窗口"){:class="img-x2 img-center"}   

* 在堆视图中可以看到 *someMethod* 下的 *context* 属性（并不是执行上下文）中包含了闭包变量 *originalThing* 。但是在这个视图中闭包变量如果是number, string或boolean字面量类型，则有可能无法被看见[（被置于"renderer memory"中，所以在堆视图找不到？）](https://developers.google.com/web/tools/chrome-devtools/memory-problems/memory-101)。在Object窗口中观察则没有出现这种情况。   

![alt文本](/assets/images/heapsnapshot2.png "堆视图"){:class="img-x2 img-center"}  