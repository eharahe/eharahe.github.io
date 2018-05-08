---
layout: default
title: Inside Sound Design
permalink: /notes/inside-sound-design
tags: sound-design Wwise
category: sound-system-design
excerpt_separator: <!--break-->
---


<!--break-->

## Voice的设计

### Voice的目标

1. Natural and adaptable audio playback  
2. Integration of physical and emotional states

## Voice实现 - 素材录制   

* 录制呼吸声素材时，首先按照Action、Emotion等进行分类，通过Switch Container进行组织。  
* 对于每一种类型，都会录制一段包含不同Intensity Level的素材（角色运动越剧烈Intensity越高，呼吸越急促）  
* 这些素材按照Inhale和Exhale切片，分层放入到不同的Random Container中，**但是每一个切片的长度是不定的**。  

![](\assets\images\inside_voice.jpg) 

## Voice实现 - 程序实现

程序通过修改Wwise Unity Integration实现了Voice Sequencer。它是一个播放器，用来无缝地循环播放Inhale和Exhale。Voice Sequencer工作在两种模式：*连续模式* 和 *节奏模式*。  

连续模式工作在角色闲置，攀爬，落地等时刻。由于每个呼吸素材的切片长度不定，因此需要SDK的回调API通知Sequencer上个素材已经播完了，继续播放下一个素材。具体的循环逻辑是：
  1. 设置呼吸状态：呼气还是吸气
  2. 设置Switch，确定呼吸的类型
  3. 调用Event，播放声音切片
  4. 等待AK_EndOfEvent回调，进入下一个循环  
连续模式下，小男孩的呼吸动画是对齐声音的。（切片长度决定动画播放时机）  
跳起和落地时呼吸的逻辑：起跳时如果正在**吸气**则立即停止吸气声；如果处于**呼气**则播放一个很短的吸气声然后停止。落地时根据落地的轻重播放对应的呼气声。  

![](\assets\images\inside_voice2.png)   

节奏模式工作在角色跑步时。这时动画速度是固定的，声音需要对齐动画：两步一个呼吸循环。其难点在于从连续模式切换到节奏模式，声音应该如何过渡：
  1. 首先计算在连续模式上一次完整呼吸的频率和相位；而我们已知节奏模式的频率（动画决定）和相位（为0），所以问题变为两个圆周运动频率和相位的同步，类似DJ打碟。
  2. 将频率从连续模式渐变至节奏模式
  3. 调整频率补偿（缩小）相位差：有时为了追赶相位，频率会over compensate，等到相位追上后再逐渐回到正确频率。

![](\assets\images\inside_voice3.png)  

## Voice实现 - 其它细节

小男孩的面向（朝屏幕里面还是外面）会影响声音。
Intensity相关：
  1. 小男孩的运动量的平均值（原文用的 'Lowpass'， 是指消除抖动后的均值）即为Intensity
  2. Intensity决定样本的选取；用来表现身体的消耗程度和角色情感的紧张程度。
  3. Intensity曲线会受到 **场景位置** 和 **时间** 因素的Clamping来满足具体的游戏需求。

## References

[Wwise Tour 2016 系列讲座《INSIDE》游戏声音设计](https://soundoer.com/2016/10/06/wwise-tour-2016-playdead-inside/){:target="about:blank"}  