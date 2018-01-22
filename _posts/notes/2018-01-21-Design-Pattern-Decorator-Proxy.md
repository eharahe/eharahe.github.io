---
layout: default
title: Design Patterns - Decorator vs. Proxy
permalink: /notes/decorator-vs-proxy
tags: design-patterns
category: design-patterns
excerpt_separator: <!--break-->
---

装饰器模式关注于在一个对象上动态的添加方法，然而代理模式关注于控制对对象的访问。   

用代理模式，代理类可以对它的客户隐藏一个对象的具体信息。因此，当使用代理模式的时候，我们常常在一个代理类中创建一个对象的实例。而当我们使用装饰器模式的时候，我们通常的做法是将原始对象作为一个参数传给装饰者的构造器。
<!--break-->

## 1. Decorator Pattern (Wrapper)

意图：动态地给一个对象添加一些额外的职责   

### UML类图   
![Decorator Pattern UML](/assets/images/designpattern/decorator%20pattern.svg "Decorator Pattern UML")   

### 解释   
* 使用者像包糖纸一样，把对象一层一层包在里面   
* 包装是动态的，可以自由决定包装顺序，组合，比继承的方式更灵活
* 装饰者模式更强调对于原始对象的补充和扩展，对Component没有控制权

### 举例
Java I/O   

```java
BufferedReader reader = new BufferedReader(
                          new InputStreamReader(
                            new FileInputStream(
                              new File("d:/text.txt"))));
```

## 2. Proxy Pattern

意图：为其他对象提供一种代理以控制对这个对象的访问   

### UML类图   
![Proxy Pattern UML](/assets/images/designpattern/proxy%20pattern.svg "Proxy Pattern UML")  

### 解释   
* 代理模式更强调访问控制，代理类对被代理的主体有控制权，决定其执行或者不执行
* 代理模式可用来执行与被代理的主体关系不大的统一操作

### 举例
String AOP：非业务主体相关的行为扩展（如日志）   
PWA Server Worker：控制网络请求，命中缓存则直接返回，否则Fetch后台数据