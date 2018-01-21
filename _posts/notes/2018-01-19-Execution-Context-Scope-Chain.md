---
layout: default
title: Variable Object, Scope Chain and Execution Contexts
permalink: /notes/js-scope-and-context
tags: scope-chain variable-object execution-context
category: javascript
excerpt_separator: <!--break-->
---
简单的梳理一下ECMA **Variable Object**[^1]， **Scope Chain**[^2] 及 **Execution Contexts**[^3] 相关的概念，以便在分析devtools heap-snapshot时明白各个属性表示的意义。

<!--break-->

## 1. Variable Object / Activation Object
### Variable Object (VO)   
**VO** 是一个与**执行上下文(execution context)**相关的特殊对象   
它是执行上下文的属性，用来存储上下文中的以下信息：

```javascript
VO = {
  variables,         //变量声明
  functions,         //函数声明
  formal_parameters  //函数的形参
}
```
填充VO的顺序是: 函数的形参 -> 函数申明 -> 变量申明
<p></p>   

### Activation Object (AO)   
在函数执行上下文中，VO是不能直接访问的，由AO扮演VO的角色   
活动对象是在 **函数激活**（进入函数上下文）时被创建的，它通过函数的 **arguments** 属性初始化：

```javascript
AO = { 
  arguments: <ArgO> //指向Arguments对象
}              
Arguments = {
  callee      //the reference to the current function;
  length      //quantity of real passed arguments;
  properties  //indexes of function’s arguments
}
```

可以理解为 `AO = VO + Arguments`  
<br>   

## 2. Scope Chain 作用域链
### Scope Chain 定义
> Scope chain is related with an execution context a chain of variable objects which is used for variables lookup at identifier resolution.    

`Scope = withObj|catchObj + AO|VO + [[Scopes]]`   

* 其中[[Scopes]]在函数定义时创建，而withObj/catchObj以及该函数的AO/VO是在函数激活时才能确定   
* 在做标识符解析（identifier resolution）时，按照从左到右的匹配顺序，匹配成功则返回 

### [[Scopes]] 属性
[[Scopes]]是该函数所有父节点VO的层级链，随着函数创建产生，函数生命周期结束时消亡   
在下例中，someMethod的[[Scopes]]包含了其父节点(replaceThing)的闭包属性originalThing以及Global上下文的VO：   
![alt文本](/assets/images/heapsnapshot1.png "title"){:class="img-x2"}   

### 闭包Closure与[[Scopes]]关系
`closure = [[FunctionLocation]] + [[Scopes]]`   
<p></p>
[[FunctionLocation]] 指向函数code所在的位置   
[[Scopes]] 保存着函数创建时的词法环境，直至函数消亡 

### 标识符解析的 2D Scope Chain 查找

> Identifier resolution is a process of determination to which variable object in scope chain the variable (or the function declaration) belongs. 

(1) on scope chain links,   
(2) and on every of scope chain link — deep into on prototype chain links. 

AO是没有原型这一说的，下例bar的AO匹配失败后，在foo的AO中找到x:
```javascript
function foo() {
  var x = 20;
  function bar() {
    alert(x);
  }
  bar();
}
Object.prototype.x = 10; 
foo(); // 20
```

<br>   

## 3. Execution Context
### 定义
一系列活动的执行上下文从逻辑上形成一个栈。栈底总是全局上下文，栈顶是当前（活动的）执行上下文。当在不同的执行上下文间切换（退出的而进入新的执行上下文）的时候，栈会被修改（通过压栈或者退栈的形式）。
```javascript
activeExecutionContext = {
    VO: {...}, // or AO
    this: thisValue,
    Scope: [...]
};
```

### Eval Code
在Eval上下文之前会先压入调用上下文

> 在1.7以上版本SpiderMonkey的实现中（Firefox，Thunderbird浏览器内置的JS引擎），允许在调用eval函数的时候，将调用上下文作为第二个参数传递给eval函数。因此，如果传入的调用上下文存在的话，就有可能会影响该上下文中原有的私有变量

---

[^1]: [Variabl_Object](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/)
[^2]: [Scope_Chain](http://dmitrysoshnikov.com/ecmascript/chapter-4-scope-chain/)
[^3]: [Execution_Contexts](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)