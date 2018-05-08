---
layout: default
title: Overwatch Sound Design
permalink: /notes/overwatch-sound-design
tags: sound-design Wwise
category: sound-system-design
excerpt_separator: <!--break-->
---
“游戏至上”是暴雪的核心价值之一。Overwatch的音频团队制订了颇具雄心的目标“Play by Sound”：通过声音传达尽可能多的信息，指导与影响玩家操作，而不是简单的加强gameplay体验。Overwatch团队采用了Dolby Atmos Binaural Mixer plug-in技术。

<!--break-->

## 工程整体结构

1. Master-Mixer Hierarchies的总线最高层级是按照2D_Audio和3D_Audio进行划分的。
2. Actor-Mixer Hierarchies中，声音是按照类别，而不是按照角色进行组织的。在每个类别下的较高层级区分1P和3P，从而可以在较高层级上实现统一的参数调整，如RTPC，发送等，减少bug出现的几率。

## 主要目标和方案

* 翔实的英雄VO
* 清晰的混音
* 高度的精确性
* 通过声音为游戏提供信息
* 经典条件反射（巴夫洛夫条件反射）

## 翔实的英雄VO

* Stimulus driven - 事件是响应式的，瞬间触发的
* Criteria selection - 按照一定的评判标准，播放不同的英雄语音
* Server authentication - 拥有更多的权限控制能力，玩家之间交流
* Fast prototyping and audio post processing workflow with Reaper and Wwise
* Wwise external voices

**翔实的英雄VO例子：** 

场景：Pharah是一队；Reinhardt和Widowmaker是另一队。Pharah放大招-发射导弹；Reinhardt开盾挡住伤害；Widowmaker躲在Reinhardt后面狙杀掉Rharah；Reinhardt冲刺撞在墙上。
每一个英雄都根据不同的播报类型听到不同的语音事件：  

![](\assets\images\overwatch_vo.jpg)  

## 清晰的混音

团队在一开始尝试使用 HDR (High Dynamic Range)，但实际问题是运行时可能导致大量意料外的ducking出现。最终游戏采用了一套“重要性系统”，让玩家能优先听到最重要的声音。

1) 设定英雄**重要性**的计算方式，即按如下分类计算加权总值：  

  | 类别                    | 权重      | 最小持续时间 |
  | ----------------------- |:---------:| ------------:|
  | Damage                  | 0.5       | 2            |
  | Distance                | 0.3       | 1            |
  | Enemy Size on My Screen | 0.1       | 0.2          |
  | My Size on Enemy Screen | 0.3       | 3            |
  | Scripted                | 0.4       | 1            |
  | Seen By                 | 0.3       | 2            |
  | Shot At                 | 0.6       | 2            |

2) 对所有英雄按照**重要性**排序，依排序结果划分为4个级别：  

  1. High - 1个  
  2. Normal - 2个  
  3. Low - 4-10个  
  4. CULL - 其它

3) 对不同的级别设置不同的RTPC值，如Volume, Priority, Filters, Pitch等等。

## 高度的精确性

#### Obstruction & Occlusion

1. 计算声源到Listener的直线距离；
2. 计算声源到Listener绕过障碍的最短路径距离；
3. 以二者的差值来控制Obstruction和Occlusion的程度。

![](\assets\images\obstruction.jpg)  

#### Distance & Space

* Layered Sounds
* Indoor vs. Outdoor
* Distance Filtering
* Focus & Spread
* Reverb & Quad Delay

Quad Delay是自研的插件。通过4个multi-tap delay，4个EQ，4个panner来模拟混响ER。游戏中实时将玩家面向的左前、右前、左后、右后四个方向到障碍物的距离传给插件，计算出早期反射。原则上是，离墙越近声音越明亮；离墙越远则声音越闷。

#### Doby Atmos

在3D_Audio总线上挂载了Atmos插件

## 通过声音为游戏提供信息

* 为每一个英雄创建独一无二的声音
* 通过Dataflow（暴雪游戏引擎中获取角色生命值、进度、剩余时间、角色在地图中的高度）来实时控制RTPC、State、样本选择和音乐变化等

## References

[Overwatch - Game Audio Using Wwise (part 1/2)](https://blog.audiokinetic.com/overwatch-game-audio-using-wwise-1/){:target="about:blank"}  
[Overwatch - Game Audio Using Wwise (part 2/2)](https://blog.audiokinetic.com/overwatch-game-audio-using-wwise-part-2/){:target="about:blank"}