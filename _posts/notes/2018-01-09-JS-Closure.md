---
layout: default
title: Typical V8 Memory Leak by Closure
permalink: /notes/js-closure-memleak
tags: memleak closure v8
category: notes
---

# Typical V8 Memory Leak by Closure

***
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

* 每次调用 replaceThing 方法，theTing被赋为 <u>包含数组 longStr 和方法 someMethod 的新对象</u> 的引用
* 其中 someMethod 的 context 包含了 originalThing字段（它是本次replaceThing执行前的theThing对象的引用）
* someMethod 的 context属性 中没有 unused 字段，说明已经被v8在内联时干掉了

### 二、snapshot 截图
![alt文本](/assets/images/snapshot.png "title")   

![alt文本](/assets/images/snapshot2.png "title")  