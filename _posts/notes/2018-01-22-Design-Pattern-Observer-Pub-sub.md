---
layout: default
title: Design Patterns - Observer vs. Pub-sub
permalink: /notes/observer-vs-pubsub
tags: design-pattern.jpg
category: design-patterns
excerpt_separator: <!--break-->
---

订阅/发布 模式重点是对外广播消息，*Observable* (a.k.a *Publisher*) 并不关心哪些 *Observers* (a.k.a *Subscribers*) 接收到事件，只管发送事件。  
* 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
* 观察者模式大多数时候是同步的（回调函数）；而发布-订阅模式大多数时候是异步的（使用消息队列）。
* 观察者模式需要在单个应用程序地址空间中实现，而发布-订阅更像网络通信模式。
<!--break-->

## 1. Observer Pattern

意图：定义对象间一种一对多的关系，当一个对象状态发生改变时，所有依赖于它的对象都得到通知并自动更新   

### UML类图   
![Observer Pattern UML](/assets/images/designpattern/observer%20pattern.svg "Observer Pattern UML")   

### 解释   
* 把所有对观察者对象的引用保存在一个集合中，每个被观察者角色都可以有任意数量的观察者   
* 当被观察者内部状态改变时，给所有登记过的观察者发出通知   
* 在目标角色和观察者角色通信的具体实现中，有两个版本：推模式或拉模式

### 举例   
**ECMA Promise**   
所有通过 *then*, *catch* 方法注册的回调都是观察者，Promise对象本身是被观察者。当Promise的状态变更（onResove或onReject）时，通知观察者（通过回调）。   

**RxJS** [源码](https://github.com/ReactiveX/rxjs/blob/master/src/internal/Subject.ts)   
UML如下图所示，观察Subject和Subscriber的关系可以发现，这是典型的观察者模式，通过 *subscribe* 方法将Subscriber注册到 *observers* 数组中，当Subject接收到新消息时（*next*, *error*, *complete*, 被调用），通过对应的方法推送给每一个Subscriber。

![RXJS UML](/assets/images/designpattern/rxjs.svg "RXJS UML") 

## 2. Publish Subscribe Pattern

> 在软件架构中，发布-订阅是一种通信模式。消息的发送方（称为发布者），并不是直接将消息发送给具体的接收者（称为订阅者）, 而是将消息进行分类，无需了解是否有对应的订阅者存在；同样，订阅者表达对一个或多个类别感兴趣，只接受感兴趣的消息，而无需了解发布者的存在。 [ - wikipedia](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)

![Publish Subscribe Pattern](/assets/images/designpattern/pubsub%20pattern.svg "Publish Subscribe Pattern") 

### 解释   
* 在发布-订阅模式，消息的发送方，publishers不会直接发送给特定的接收者Subscriber。   
* 需要一个第三方组件，叫做消息中心，将订阅者和发布者串联起来，过滤和分配所有输入的消息。

### 举例   
* 微博消息中转   
* 众多支持发布-订阅方式的消息队列： ZeroMQ,  RabbitMQ等