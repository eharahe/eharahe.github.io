---
layout: default
title: Design Patterns - Factory vs. Builder
permalink: /notes/factory-vs-builder
tags: design-pattern.jpg
category: design-patterns
excerpt_separator: <!--break-->
---

可以把建造者模式看成对工厂模式中的每一个ConcreteFactory的进一步细化。
<!--break-->

## 1. Factory Method Pattern

意图：定义一个用于创建对象的接口，让子类决定实例化哪一个类   

### UML类图   
![Factory Method Pattern UML](/assets/images/designpattern/factory%20method%20pattern.svg "Factory Method Pattern UML")   

### 解释   
* 一个抽象产品类，可以派生出多个具体产品类   
* 一个抽象工厂类，可以派生出多个具体工厂类   
* 每个具体工厂类只能创建一个具体产品类的实例
* 将构造对象的细节和使用对象的客户解耦 

### 举例   

```java
ConcreteCreater factory = new ConcreteCreater();  
Product prod = factory.FactoryMethod();  
```

## 2. Abstract Factory Pattern

意图：提供一个创建一系列相关或相互依赖对象的接口，而无需指定他们相关的类   

### UML类图   
![Abstract Factory Pattern UML](/assets/images/designpattern/abstract%20factory%20pattern.svg "Abstract Factory Pattern UML")  

### 解释   
* 多个抽象产品类，每个抽象产品类可以派生出多个具体产品类   
* 一个抽象工厂类，可以派生出多个具体工厂类   
* 每个具体工厂类可以创建多个具体产品类的实例
* Abstract Factory模式即为多个Factory Method模式的打包

## 3. Builder Pattern

意图：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示   

试用性：当构造方法或者静态工厂方法中的参数过多的时候，尤其是可选参数很多时，考虑使用建造者模式

### UML类图   
![Builder Pattern UML](/assets/images/designpattern/builder%20pattern.svg "Builder Pattern UML")

### 解释   
* Builder只是提供了使用部件装配产品的操作接口，但不提供具体的装配算法
* 装配算法在Director中定义，可复用BuildPart操作，让目标Product聚合多个Part[^1]
* 同样的构建过程可以创建不同的表示：

  ```java
  HumanDirector dr = new HumanDirector();  
  Man man = dr.build(new ManBuilder());  
  Woman woman = dr.build(new WomanBuilder());  
  ```
* 不同的构建过程可以复用相同的部件组装方式：

  ```java
  HumanDirector dr = new HumanDirector();  
  Man man = dr.buildMan(new ManBuilder());  
  Man halfman = dr.buildHalfman(new ManBuilder());  
  ```

* Composite通常是用Builder生成的

### 举例   
建造者模式还有一种简单做法：若果一个Builder只是用来构建某个单独的Product，可以把它作为 `static sealed class` 放至于Product类中，这样看上去更加紧凑。如[ Picasso源码](https://github.com/square/picasso/blob/master/picasso/src/main/java/com/squareup/picasso/Picasso.java)：
```java
// Define
public class Picasso {
  ...
  Picasso(Context context, Dispatcher dispatcher, Cache cache, Listener listener,
      RequestTransformer requestTransformer, List<RequestHandler> extraRequestHandlers, Stats stats,
      Bitmap.Config defaultBitmapConfig, boolean indicatorsEnabled, boolean loggingEnabled) { 
    ...
  }
  ...
  public static class Builder {
    ...
    public Picasso build() {
      Context context = this.context;

      if (downloader == null) {
        downloader = Utils.createDefaultDownloader(context);
      }
      if (cache == null) {
        cache = new LruCache(context);
      }
      if (service == null) {
        service = new PicassoExecutorService();
      }
      if (transformer == null) {
        transformer = RequestTransformer.IDENTITY;
      }

      Stats stats = new Stats(cache);

      Dispatcher dispatcher = new Dispatcher(context, service, HANDLER, downloader, cache, stats);

      return new Picasso(context, dispatcher, cache, listener, transformer, requestHandlers, stats,
          defaultBitmapConfig, indicatorsEnabled, loggingEnabled);
    }
    ...
}

// User
Picasso.with(context)
       .load(url)
       .placeholder(R.drawable.loading)
       .error(R.drawable.error)
       .into(imageView);

```
---
[^1]:[Builder模式的误区：将复杂对象的构建进行封装，就是Builder模式了吗？](http://www.cnblogs.com/happyhippy/archive/2010/09/01/1814287.html)