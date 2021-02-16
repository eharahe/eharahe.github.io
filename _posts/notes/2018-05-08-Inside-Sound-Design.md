---
layout: default
title: The Voice System of Game Inside
permalink: /notes/inside-sound-design
tags: inside-cover.jpg
category: game-audio
excerpt_separator: <!--break-->
---

「Inside」是Playdead工作室继 「Limbo」 后出品的又一力作，游戏荣获 E3 大赏Game Critics Awards最佳独立游戏。 在 2016 Wwise Tour 讲座上，Playdead 团队的音效师 Martin Stig Andersen 和音频开发 Jakob Schmid 对游戏的声音设计做了分享，其中着重介绍了游戏的Voice系统。
<!--break-->

## Voice设计

#### Voice的设计概念

1. 自然且适应性的音频播放   
真实的呼吸声是不均匀的，在素材处理和播放逻辑上追求一种真实自然的节奏和音量，而不是播放固定长度的随机素材。
2. 基于生理和情绪状态的整合  
小男孩在不同情绪下会触发专门录制的不同情绪的声音素材；实时变化的身体状态也会影响和改变声音的播放。比如剧烈地运动、跳跃等会导致更加急促的呼吸，而当遇到敌人逼近时男孩会屏住呼吸，从而导致更加轻微的呼吸声。

#### Voice实现 - 素材录制   

* 录制呼吸声素材时，首先按照Action、Emotion等进行分类，最终在Wwise中通过Switch Container进行组织。  
* 对于每一种类型，都会录制一段包含不同Intensity Level的素材（角色运动越剧烈Intensity越高，呼吸越急促）  
* 这些素材按照Inhale和Exhale切片，分别放入到不同的Random Container中，**但是每一个切片的长度是不定的**。  

![](\assets\images\inside_voice.jpg) 

#### Voice实现 - 程序实现

程序修改了Wwise Unity Integration，并通过Wwise的回调实现了Voice Sequencer。它是一个播放器，用来无缝地循环播放Inhale和Exhale。它会根据*Action* , *Emotion* 以及*Intensity* switch来决定播放的素材。Intensity是一个数值，当小男孩用力的时候数值会升高，空闲的时候数值会下降。Voice Sequencer工作在两种模式：*连续模式* 和 *节奏模式*。  

![](\assets\images\inside_voice2.png)   

***连续模式*** 对应角色闲置，攀爬，落地等情形。由于每个呼吸素材的切片长度不定，因此需要Wwise的事件回调来通知Sequencer上个素材已经播完，可继续播放下一个素材。具体的循环逻辑是：
  1. 更新呼吸循环状态：呼气还是吸气
  2. 设置*Action* , *Emotion* 以及*Intensity* 等switch
  3. 播放声音： **PostEvent** ( eventID, gameObject, AK_EndOfEvent, ... )
  4. 等待AK_EndOfEvent回调，进入下一个循环  

连续模式下，小男孩的呼吸动画是音频驱动的：事件回调会触发呼吸动画，并影响小男孩的Pose。  

跳跃时屏住呼吸的实现逻辑：  
* 起跳时如果正在**吸气**则立即停止吸气声；如果处于**呼气**则播放一个很短的吸气声然后停止。  
* 落地时播放呼气声并重新开始呼吸循环。根据落地的轻重决定播放的素材。  
  
  
***节奏模式*** 对应角色跑步的情形。这时动画速度是固定的，声音需要对齐动画（动画驱动声音）：小男孩每跑两步完成一个呼吸循环。其难点在于从连续模式切换到节奏模式，呼吸节奏应该如何过渡：
  1. 首先计算在连续模式上一次完整呼吸的频率和相位；而我们已知节奏模式的频率（动画决定）和相位（起始为0），所以问题变为两个圆周运动频率和相位的同步，类似DJ打碟。  
  ![](\assets\images\inside_alignment.png)  
  2. 将频率从连续模式渐变至节奏模式
  3. 调整频率补偿（缩小）相位差：有时为了追赶相位，频率会over compensate，等到相位追上后再逐渐回到正确频率。  
  ![](\assets\images\inside_voice3.png)  

#### Voice实现 - 其它细节

小男孩的面向（朝屏幕里面还是外面）会影响声音。  

通过Trigger Box, 状态机, 脚本来控制声音参数（action, emotion, intensity）  

Intensity的获取及morph：
  1. 小男孩的运动会产生疲劳
  2. Intensity = 疲劳程度的平均值（ppt中用的 'Lowpass'，是指消除抖动后的均值）
  3. Intensity决定样本的选取（呼吸的深度和力度）；它反映了*身体的消耗程度* 和*角色情绪的紧张程度*
  4. 可以在某些特定的场景位置morph出Intensity的数值。如在某些阴森的场景位置，男孩需要强行屏住呼吸时，可以将Intensity 调得较低
  5. Intensity可以随时间插值渐变。如在濒死逃生后需要一定时间让情绪/呼吸平复等等

## 换场

从角色死亡到换场结束在存档点重生的过程中，希望声音连续、音乐能够继续播放；直到换场完成，所有的游戏状态一次性重置：
* Wwise updates are paused during scene change:
* Retains audio state during scene change
* Wwise commands accumulated during load （需要2MB的缓存队列）
* All commands are executed at once when scene change is complete

## References

[Wwise Tour 2016 系列讲座《INSIDE》游戏声音设计](https://www.bilibili.com/video/BV1Ht411V7qr){:target="about:blank"}  