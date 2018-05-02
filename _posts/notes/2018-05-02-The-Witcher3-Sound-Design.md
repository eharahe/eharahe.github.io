---
layout: default
title: The Witcher 3 Sound Design
permalink: /notes/the-witcher3-sound-design
tags: sound-design Wwise
category: sound-system-design
excerpt_separator: <!--break-->
---
巫师3的音效体验是超现实主义的。游戏音乐让人如身临其境于故事情节之中；而对细节的关注确保每一个声音都能将玩家带入一个神秘的世界，并完全吸引他们，从而让现实与游戏之间的界限如此模糊。

<!--break-->

## 环境声

1. **Global Wind**， **Glabal Rain** 是全局的环境音效。它们的强度分别由 **wind_intensity** 和 **rain_intensity** 两个RTPC加以控制，并籍此在基底层选取对应的Loop素材。风声和雨声都通过多个层级进行进行混合，譬如nml_global_wind，由基底层(bass)，环绕在人物周围的两层风声(New Blend Track 1/2)和草声(grass)四层构成。
![global_wind](\assets\images\global_wind.jpg)

2. 当玩家进入森林、城市、村落、沼泽等具体场景时，通过 **amb_global_override** 这个参数（由放置在地图中的众多Trigger触发环境切换，游戏程序将其映射成对应的RTPC），把global的wind或者rain给压下去，而覆盖以局部的环境声。

3. 当玩家进入到室内场景时，同样会通过 **amb_interiors** 参数把室外音全部压下去。

4. 动物的声音也做为环境音的一部分，它们受到 **time**， **wind_intensity** 和 **rain_intensity** 的影响。打雷的声音由游戏引擎控制，并根据玩家和闪电的距离计算出真实延迟。

## 人群声

狂猎音频团队努力使Crowd和Walla声具有更好的临场感，使这些声音会随着玩家的Action而发生移动及旋转。为了让音效获得一定的距离感和方向感，人群系统被分成四个象限，程序会计算每个象限中的人群的数量和距离Listener的平均距离，然后把这些参数传给Wwise。这个系统还会检测每个NPC是在室内还是室外（是否和玩家角色处在同一个空间），以及NPC的状态，如恐惧或不恐惧。

![crowds](\assets\images\crowds.jpg)

## 战斗系统

Weapon Switches:
* 武器类型
* 被击中的护甲类型
* 武器尺寸，对于部分武器（斧头，锤子）区别尺寸，但用得不多
* 攻击类型及被击中的位置：body, head..  

这样划分的好处：程序中可以采用同样一种形式来触发巫师3庞大世界中的任何一种武器声音，使得测试工作变得简单。

![weapon](\assets\images\weapon.jpg)

## 互动音乐

States: 探索模式的白天、晚上，普通战斗，昆特牌之间的切换  
Switches: 对白音乐，换场Cues，普通gameplay，boss战之间的切换  
RTPCs: intensity（探索模式，调查模式）；threat（普通gameplay） 

战斗系统音乐对齐：  
* 音乐按小节、拍、grid回调
* AI会等待至可预期的同步点和音乐同步
* 设置AI的最大等待时长

## References

[Wwise Tour 2016 - CD Projekt Red Witcher (2 of 6) - Ambience](https://www.youtube.com/watch?v=VJUuI_dw8Cc){:target="about:blank"}  
[Wwise Tour 2016 - CD Projekt Red Witcher (3 of 6) - Crowds and Walla](https://www.youtube.com/watch?v=bv4LBbrmu0A){:target="about:blank"}  
[Wwise Tour 2016 - CD Projekt Red Witcher (4 of 6) - Combat: Global Approach](https://www.youtube.com/watch?v=hM4hoZ3gFJs){:target="about:blank"}  