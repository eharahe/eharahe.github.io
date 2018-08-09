---
layout: default
title: Loudness Bit-depth & More
permalink: /notes/loudness
tags: sound
category: acoustics
excerpt_separator: <!--break-->
---

关于数字音频的制式以及相应的响度关系的探讨。
<!--break-->

## 一、表头

常见的表头有三种：

* PPM (Peak Program Meter) 或者True Peak表：比较实时的反映声音的瞬态值，即直接反映采样的量化数值。
* RMS表及VU表：RMS表的读数是对窗口内采样求均方根后的平均值，常见的窗口大小是50ms - 400ms；VU表的磁针受惯性影响不可能发生瞬移，因此反映的是平均后的电平数值。在模拟领域它虽然是个有着悠久传统的表头，但在数字领域更多是用在模拟硬件的效果器UI展示中，其算法更接近RMS表，固归为一类。
* 响度表：比较通用的算法是LKFS和LUFS，两者唯一的区别是LUFS多增加了一个Peak Level的概念。Wwise的Loudness Meter用的是EBU的LUFS。

## 响度感知及LKFS算法

响度感知是心理声学的研究范畴，其影响因素众多。频率、波形包络、动态变化、声场、混响、听音者的年龄、心情状态等都会影响最终的感知。

#### 频率感知

单一频率等响曲线：
![equal loudness curves](\assets\images\fletcher_munson.jpg)  

人耳对于4k左右的频段是最为敏感的，而在100Hz以下则快速衰减。

#### 瞬态感知

响度感知受音频的瞬态影响。由于人体构造，从声音发出，被耳蜗听觉神经接收并传到脑干，Localization定位，到建立响度感知的总延迟在400ms左右。因此对于响度的测量和分析往往都需要持续最少400ms，低于这个值的分析意义不大。这也可以解释为什么很多RMS窗口，ITU-R，EBU的算法都以400ms做为默认配置。

#### 声场影响

声场、空间感会影响人耳对响度的感知。一个典型的例子就是在Wwise中对Stereo素材做Conversion到Mono后，即便电平上相差不大，听感上响度都会有所下降。同样的素材，加入混响后响度会提高。

#### 听者状态

听音者的心态，健康状况，听觉疲劳状况，背景噪声等因素都会影响响度感知，具体情况可以参考心理声学相关专题。

#### LKFS算法一探究竟 

LKFS算法是广电游戏等领域广泛使用的响度评估算法。根据ITU-R BS.1770-4 建议书中的算法，大致分析一下这套标准到底都考虑了上述哪些影响因素。
整体结构如下：

![BS.1770 structure](\assets\images\BS.1770global.jpg) 

