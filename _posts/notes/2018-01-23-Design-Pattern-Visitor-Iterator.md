---
layout: default
title: Design Patterns - Visitor vs. Iterator
permalink: /notes/visitor-vs-iterator
tags: design-pattern.jpg
category: design-patterns
excerpt_separator: <!--break-->
---

二者最大的区别在于聚集中的元素是否异构，对于访问者模式，其存在最大的理由就是分离异构元素上的不同操作。迭代器模式用于按一定顺序访问聚集中的元素而不用暴露聚集的内部表示；而访问者模式是用来操作聚集上的元素，可以在不改变各元素的类的前提下定义作用于这些元素的新操作。访问者模式在遍历聚集元素时也可采用迭代器实现。
<!--break-->

## 1. Visitor Pattern

意图：表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。   

### UML类图   
![Visitor Pattern UML](/assets/images/designpattern/visitor%20pattern.svg "Visitor Pattern UML")   

### 解释   
* 元素异构：*ObjectStructure* 包含的众多 *IElement* 对象分别实现自不同的接口   
* 元素上的操作易变：需要对 *ObjectStructure* 中的 *IElement* 对象进行很多不同且不相关的操作，为避免这些操作污染具体的 *IElement* 类  
* 元素类型比较固定：*IElement* 的种类很少改变，但需要经常定义新的操作（经常增加和变更 *IVisitor* 类） 
* 动态双分派：通过两次动态单分派实现双分派效果:   
  第一次在 *ObjectStructure* 中遍历 *elements* 时，确定Accept方法的版本 `elements.Accept(visitor)`   
  第二次在 *Element* 中，确定 *Visit* 方法的版本 `v.Visit(this)`
* 由谁负责遍历元素：通常是 *ObjectStructure* 负责；也可以使用一个迭代器来访问

### 举例   
**中介看房的例子**   
中介（*ObjectStructure*）：拥有大量房源信息 *elements*；   
房源（*IElement*）：分为城中村，商品房，别墅等。房源类型相对固定，但相互异构，拥有不同的属性和方法；  
购房者（*IVisitor*）：毕业生，白领，土豪等。购房者类型不固定，随时可能增加。每一种购房者针对每一种房源都有不同的关注点，同时购房者随着时间推移对于同一种房源的评价也会发生变化（如购房政策变化时）；  


## 2. Iterator Pattern (Cursor)

意图：提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示。  

![Iterator Pattern](/assets/images/designpattern/iterator%20pattern.svg "Iterator Pattern") 

### 解释   
* 它支持以不同方式遍历一个聚合；
* 在同一个聚合上可以同时进行多个遍历   
* 对外特性 - 由谁控制迭代：  
    客户来控制 - 外部迭代器（external iterator）  
    迭代器控制 - 内部迭代器（internal iterator） 
* 内部实现 - 由谁控制聚集：  
    聚集本身控制 - 游标迭代器（cursor iterator）  
    迭代器控制 - 内禀迭代器（intrinsic iterator），通常在聚集中作为 `private sealed class` 实现
* 迭代器的健壮性、线程安全   

### 举例   
* JS Array.prototype.forEach, Array.prototype.map - 内部迭代器   
* JS ES6 iterator - 外部迭代器，内禀迭代器  

  ```javascript
  var obj = {}  
  obj[Symbol.iterator] = function() {
    let index = 1;
    return {
      next() {
        return {done: index>100, value: index++}
      }
    }
  }
  for(var i of obj) {
    console.log(i);
  }
  ```