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

### Voice实现

**素材录制**  

* 录制呼吸声素材时，首先按照Action、Emotion等进行分类，通过Switch Container进行组织。  
* 对于每一种类型，都会录制一段不同Intensity Level的素材（角色运动越剧烈Intensity越高，呼吸越急促）  
* 这些素材按照Inhale和Exhale切片，分层放入到不同的Random Container中，**但是每一个切片的长度是不定的**。  

![](\assets\images\inside_voice.jpg) 

**程序这边**

* 程序通过修改Wwise Unity Integration实现了Voice Sequencer。它是一个播放器，用来无缝地循环播放Inhale和Exhale  
* Voice Sequencer工作在两种模式：*循环模式* 和 *节奏模式*  
* 循环模式工作在角色闲置，攀爬，落地等时刻。由于每个呼吸素材的切片长度不定，因此需要SDK的回调API通知Sequencer上个素材已经播完了，继续播放下一个素材。具体的循环逻辑是：
  1. 设置呼吸状态：呼气还是吸气
  2. 设置switch，确定呼吸的类型
  3. 调用Event，播放声音切片
  4. 等待AK_EndOfEvent回调，进入下一个循环  
* 循环模式下，小男孩的呼吸动画是对齐声音的（切片长度决定动画播放时机）
* 跳起和落地时，呼吸的逻辑：起跳时如果处于吸气态，则停止吸气声；如果处于呼气态，则播放一个很短的吸气然后停止声音。落地时播放呼气声。

![](\assets\images\inside_voice2.png)   

## References

[Wwise Tour 2016 系列讲座《INSIDE》游戏声音设计](https://soundoer.com/2016/10/06/wwise-tour-2016-playdead-inside/){:target="about:blank"}  