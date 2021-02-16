---
layout: default
title: Play by Sound - Sound Design of Overwatch
permalink: /notes/overwatch-sound-design
tags: overwatch-cover.jpg
category: game-audio
excerpt_separator: <!--break-->
---
"游戏性至上"是暴雪的核心价值之一。守望先锋的音频团队制定了颇具雄心的目标 —— Play by Sound：通过声音传递尽可能多的信息，给玩家的操作选择提供参考，而不是简单的响应角色动画或技能特效。

<!--break-->

## 守望先锋是什么

* 基于团队对战的FPS竞技游戏
* 独特的英雄及技能
* 6v6基于目标的Gameplay

## 工程整体结构

1. 1300 WWU 文件，14,300 被引用的 WAV 文件，55s 的加载时间（从 SSD 上），6 sound design, 2 music, 1 programmer, 1 production, 1QA 的人员配置。

2. 在 Master-Mixer 中，总线最高层级是按照2D_Audio和3D_Audio进行划分。划分目的应该是为了整合 Dolby 的 Binaural 解决方案。  
![](\assets\images\overwatch_master_mixer.png)  

3. 在 Actor-Mixer 中，声音是按照类别而不是英雄/地图进行组织的。在每个类别的子节点上划分英雄1P和3P，从而可以在较高层级上实现统一的参数调整，如RTPC，发送，复音数控制等，减少bug出现的几率。  
![](\assets\images\overwatch_actor_mixer.png)

4. Interactive Music 由 2个 Music Switch Container 组织。 Overwatch_Music 负责所有主要游戏状态对应的音乐； Overwatch_Stingers 负责所有短乐句叠加层。  

## 设计目标 —— **Play by Sound**

实现目标的途径：

* 清晰的混音（A Clear Mix）
* 精确的定位（Pinpoint Accuracy）
* 通过声音提供信息（Gameplay Information）
* 信息翔实的英雄语音（Informative Hero VO）
* 巴夫洛夫反射（Pavlovian Response）

## ① 清晰的混音

团队在一开始尝试使用 HDR (High Dynamic Range)，但在测试中发现这可能导致大量意料外的ducking出现。最终游戏采用了一套 *重要性系统* ，让玩家能优先听到最重要的声音。

#### 什么是重要的声音？

* 谁是我最大的威胁
* 我视野内的玩家是谁
* 我在谁的视野内
* 谁离我的距离最近
* 谁在我的附近开火
* 谁在使用有威胁性的技能
* 谁在对我造成伤害

#### 计算英雄的**重要性**

根据下表的每一项Sound Importance Factor计算该英雄的重要性：  

  | 类别                    | 权重      | 最小持续时间 (s) |
  | ----------------------- |:---------:| ------------:|
  | Damage                  | 0.5       | 2            |
  | Distance                | 0.3       | 1            |
  | Enemy Size on My Screen | 0.1       | 0.2          |
  | My Size on Enemy Screen | 0.3       | 3            |
  | Scripted                | 0.4       | 1            |
  | Seen By                 | 0.3       | 2            |
  | Shot At                 | 0.6       | 2            |

#### 英雄的重要性排序

将所有英雄按照**重要性**排序，依排序结果划分为4个级别：  

High - 1个， Normal - 2个， Low - 4-10个， Cull - 其它

![](\assets\images\overwatch_priority.png) 

#### Wwise中的操作

不同的重要性级别对应不同的RTPC值，通过其调节Volume, Priority, Filters, Pitch等参数 。对于Low和Cull级别，声音衰减非常明显，很多时候基本上听不到；动态空间大都给到了位于前两个级别的角色上。

![](\assets\images\overwatch_priority_rtpc.png) 

#### 友方 vs 敌方

友方一般拥有更低的**重要性**，在混音中居于更次要的位置。

## ② 精确的定位

> 我们现在知道你最大的威胁是谁，如何定位他？

* 声笼和声障
* 距离和空间
* 双耳声学

#### 声笼和声障

1. 计算声源到Listener的直线距离；
2. 计算声源到Listener绕过障碍的最短路径距离；
3. 用二者的差值（比值？）来计算衍射值，采用wwise内建RTPC：Obstruction和Occlusion；
4. 利用RTPC分别控制Footstep，WeaponFire等bus的音量、高低通、发送量等属性。

![](\assets\images\overwatch_obstruction.png)  

#### 距离和空间

* *Layered Sounds*：根据声源距离、位置播放不同的gun-tail素材
* *Indoor vs. Outdoor*：室内、室外的tail切换
* *Distance Filtering*：根据声源距离、位置设置高低通
* *Focus & Spread*：spread 使用较克制，因为精确定位的设计目标需要，立体声宽度不需要这么宽，定位优先！
* *Reverb & Quad Delay*：quad delay 是自研的插件。在游戏中实时 ray-trace 玩家面向的左前、右前、左后、右后四个方向的障碍物来计算早期反射声。插件通过4个multi-tap delay，4个eq，4个panner来模拟混响的ER。游戏中部署了2条 quad delay aux bus，其中一条用来处理枪声等较响的声音，会产生明显的echo；另一条处理脚步声等较安静的声音。

#### Doby Atmos

在3D_Audio总线上挂载了 Dolby Headphone Virtualizer 插件，其子总线的通道设置为7.1.4（ [参考Dolby Atmos 7.1.4](/notes/cinematic-sound-system#dolby_7_1_4){:target="about:blank"}  ），子总线中的信号通过插件下混为 Binaural 的立体声信号。 Scott Lawlor 使劲吹捧了一下插件的效果，能够准确的分辨后方和垂直方向上的声源😄

## ③ 通过声音提供信息

> 我们现在知道你最大的威胁是谁，也知道他在什么位置，但你能听出他是谁并且他在做什么呢？

* 为每一个英雄创建独特的声音 - 以脚步为例：样本差异、步频差异、Foley材质区别
* 清晰的游戏性提示 - 普通技能、大招的差异；友方、敌方差异等
* 根据游戏上下文改变声音
* 通过 Dataflow 改变声音 - 游戏引擎中获取角色生命值、进度、剩余时间、角色在地图中的高度等调整 RTPC、State、样本选择和音乐变化等
* 音乐和游戏状态之间通信

## ④ 信息翔实的英雄语音

#### 关键词

* Stimulus driven - 玩家按键、敌人出现、倒计时等，所有这些事件都是瞬时激发的
* Criteria selection - 根据gameplay的上下文作为评判依据，选择播放不同英雄的语音
* Server authentication - 由Server决定推送哪些语音给玩家，可以实现更丰富的互动形式，比如能听到友方英雄之间唠嗑
* Powerful Post Processing - 快速的原型验证，强大的后期处理自动化工作流
* Wwise external voices - 让英雄语音可以pipe through，按类型依次播放

#### 基于 External Source 的VO层级结构 

switch结构实际上是回答一系列问题：这个语音是系统语音么？是大招么 ？是无线电信号么？  
不同的VO Sound SFX 对应了不同的优先级、混音总线、RTPC设置等。  
![](\assets\images\overwatch_voice.png) 

#### Voice 数据

* 3个平台，13种本地化语言
* 每个平台 9,400 Voice WEMs（21个英雄）, 160MB
* 总共 6.2GB，370k文件
* 平均文件大小 52k

#### Voice over IP 

场景：Reinhardt和Widowmaker在一队，Pharah在另一队。Pharah释放大招被Reinhardt开盾吸收伤害；Widowmaker躲在Reinhardt后面狙杀掉Rharah；Reinhardt冲刺撞在墙上。每一个英雄都根据不同的播报类型听到不同的语音事件。 

![](\assets\images\overwatch_vo.jpg)

从 **Pharah** 的视角看，备选语音列表:  

| Hero       | Stimulus            | Broadcast          | Category  | Heard? |
| ---------- | ------------------- | ------------------ | --------- |:------:|
| Reinhardt  | Shield activate     | Friendly + Player  | Chatter   | ×      |
|*Pharah*    |*Jump*               |*Player*            |*Exerts*   |*√*     |
|*Pharah*    |*Rocket barrage*     |*Enemy + Player*    |*Critical* |*√*     |
| Pharah     | Damage taken        | Involved Heroes    | Pain      | ×      |
|*Pharah*    |*Death*              |*All*               |*Death*    |*√*     |
| Widowmaker | Enemy killed - Crit | Player             | Chatter   | ×      |
| Reinhardt  | Shield low health   | Player             | Chatter   | ×      |
|*Reinhardt* |*Charge activate*    |*All*               |*Critical* |*√*     |
| Reinhardt  | Charge unsuccessful | Player             | Chatter   | ×      |

从 **Widowmaker** 的视角看，备选语音列表:  

| Hero       | Stimulus            | Broadcast          | Category  | Heard? |
| ---------- | ------------------- | ------------------ | --------- |:------:|
|*Reinhardt* |*Shield activate*    |*Friendly + Player* |*Chatter*  |*√*     |
| Pharah     | Jump                | Player             | Exerts    | ×      |
| Pharah     | Rocket barrage      | Enemy + Player     | Critical  | √      |
| Pharah     | Damage taken        | Involved Heroes    | Pain      | ×      |
| Pharah     | Death               | All                | Death     | √      |
|*Widowmaker*|*Enemy killed - Crit*|*Player*            |*Chatter*  |*√*     |
| Reinhardt  | Shield low health   | Player             | Chatter   | ×      |
| Reinhardt  | Charge activate     | All                | Critical  | √      |
| Reinhardt  | Charge unsuccessful | Player             | Chatter   | ×      |

从 **Reinhardt** 的视角看，备选语音列表:  

| Hero       | Stimulus            | Broadcast          | Category  | Heard? |
| ---------- | ------------------- | ------------------ | --------- |:------:|
| Reinhardt  | Shield activate     | Friendly + Player  | Chatter   | √      |
| Pharah     | Jump                | Player             | Exerts    | ×      |
| Pharah     | Rocket barrage      | Enemy + Player     | Critical  | √      |
| Pharah     | Damage taken        | Involved Heroes    | Pain      | ×      |
| Pharah     | Death               | All                | Death     | √      |
| Widowmaker | Enemy killed - Crit |Player              | Chatter   | ×      |
|*Reinhardt* |*Shield low health*  |*Player*            |*Chatter*  |*√*     |
| Reinhardt  | Charge activate     | All                | Critical  | √      |
|*Reinhardt* |*Charge unsuccessful*|*Player*            |*Chatter*  |*√*     |
  
## ⑤ 巴夫洛夫反射

* 最小的音效及语音变化（提高可记忆性）
* 通过直觉判断
* 朝标志性的声音迈进
* 快速反应时间
* 积极的情绪反应

## References

[Overwatch - Game Audio Using Wwise (part 1/2)](https://blog.audiokinetic.com/overwatch-game-audio-using-wwise-1/){:target="about:blank"}  
[Overwatch - Game Audio Using Wwise (part 2/2)](https://blog.audiokinetic.com/overwatch-game-audio-using-wwise-part-2/){:target="about:blank"}  
[Overwatch - The Elusive Goal: Play by Sound on GDC pdf](http://gdcvault.com/play/1023010/Overwatch-The-Elusive-Goal-Play){:target="about:blank"}  