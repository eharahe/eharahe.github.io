---
layout: default
title: Design Patterns - Chain of Responsibility vs. State
permalink: /notes/cor-vs-state
tags: design-patterns
category: design-patterns
excerpt_separator: <!--break-->
---
状态模式中，状态之间的转移可以是网状的关系；责任链中节点的关系是链状关系。   
状态模式中，状态转移是在类的设计阶段就定好的；而责任链的下一级是由客户端动态确定的。   
<!--break-->

## 1. Chain of Responsibility

将能够处理同一类请求的对象连成一条链，请求在这个链上传递，直到链上的某一个对象决定处理此请求。   

### UML类图   
![Chain of Responsibility Pattern UML](/assets/images/designpattern/cor%20pattern.svg "Chain of Responsibility Pattern UML")   

### 解释   
* 请求发送者无须知道请求在何时、何处以及如何被处理，实现了请求发送者与处理者的解耦  
* 可以通过改变链中的成员或成员的顺序来动态的新增或则删除责任
* 客户端负责组装链式结构，但是客户端不需要关心最终是谁来处理了任务

### 举例
JavaScript中的时间冒泡和捕获机制

## 2. State Pattern

意图：允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。   

### UML类图   
![State Pattern UML](/assets/images/designpattern/state%20pattern.svg "State Pattern UML")  

### 解释   
* 它将与特定状态相关的行为局部化，并且将不同状态的行为分割开来
* 它使得状态转换显式化
* State对象可被共享

### 举例
播放器有 ▶ 和 ■ 两个按钮，三个状态 *Playing*，*Paused*，*Stopped*；   
1. 点击 ▶ 按钮时，进入 *Playing* 状态，同时按钮图案变为 <span class="pauseBtn">〓</span>；   
2. 点击 <span class="pauseBtn">〓</span> 按钮时，进入 *Paused* 状态，同时图案变为 ▶；再次点击可以继续播放；  
3. 点击 ■ 按钮时，音乐可从 *Playing* 或 *Paused* 状态变成 *Stopped* 状态，播放位置归零。

```java

//   ┌──→ Stopped ←──┐
//   │   ┌─┘         │
//   │   ↓           │
//  Playing ←─── Paused
//     │           ↑
//     └───────────┘

public interface PlaybackState{
  public void playOrPause(Context c);
  public void stop(Context c);
}

public class PlayingState implements PlaybackState{
  public void playOrPause(Context c){
    c.changeBtnImgToPlay();
    c.setState(new PausedState());
  }
  public void stop(Context c){
    c.changeBtnImgToPlay();
    c.setState(new StoppedState());
  }
}

public class StoppedState implements PlaybackState{
  public void playOrPause(Context c){
    c.changeBtnImgToPause();
    c.setState(new PlayingState());
  }
  public void stop(Context c){
    // ignore
  }
}

public class PausedState implements PlaybackState{
  public void playOrPause(Context c){
    c.changeBtnImgToPause();
    c.setState(new PlayingState());
  }
  public void stop(Context c){
    c.setState(new StoppedState());
  }
}

public class Context{
  private PlaybackState state = new StoppedState();

  public void setState(State state){
    this.state = state;
  }

  public void playPauseBtnOnClick(){
    state.playOrPause();
  }
  public void stopBtnOnClick(){
    state.stop();
  }

  public void changeBtnImgToPause(){
    // 把按钮图标换成暂停图标
  }
  public void changeBtnImgToPlay(){
    // 把按钮图标换成播放图标
  }
}

```

<style type="text/css">
.pauseBtn{
  transform: rotate(90deg);
  display: inline-block;
}
</style>