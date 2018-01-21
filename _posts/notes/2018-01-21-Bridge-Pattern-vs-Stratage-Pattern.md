---
layout: default
title: Design Patterns - Bridge vs. Stratage
permalink: /notes/bridge-vs-stratage
tags: design-patterns
category: design-patterns
excerpt_separator: <!--break-->
---

相对于策略模式，桥接模式要表达的内容更多，结构也更加复杂。  

桥接模式主要体现的是接口隔离的原则，即把本质上并不内聚的两个体系区别开来，使得它们可以松散的组合；而策略在解耦上还仅仅是某一个算法的层次，没有到体系这一层次。
<!--break-->

## 1. Bridge Pattern

意图：将抽象部分与它的实现部分分离，使它们都可以独立地变化   

### UML类图   
![Bridge Pattern UML](/assets/images/designpattern/bridge%20pattern.svg "Bridge Pattern UML")   

### 解释   
* 即把本质上并不内聚的两个体系区别开来，使得它们可以松散的组合   
* 采用聚合而非继承的方式将两个体系关联起来   

### 举例
JDBC数据库访问接口API[^2]

## 2. Stratage Pattern (Policy)

意图：让算法和对象分开来，使得算法可以独立于使用它的客户而变化   

### UML类图   
![Stratage Pattern UML](/assets/images/designpattern/stratage%20pattern.svg "Stratage Pattern UML")  

### 解释   
* 提供了一种用多个行为中的一个行为来配置一个类的方法
* 使用策略模式以避免暴露复杂的，与算法相关的数据结构
* 行为模式的主要特点就是处理的是对象之间的通信方式，往往是通过引入中介者对象将通信双方解耦，在这里实际上就是将Context与实际的算法提供者解耦[^1]

---
[^1]:[从桥接模式与策略模式谈起](http://www.blogjava.net/wangle/archive/2007/04/25/113545.html)
[^2]:[研磨设计模式之桥接模式-3](http://chjavach.iteye.com/blog/750381)