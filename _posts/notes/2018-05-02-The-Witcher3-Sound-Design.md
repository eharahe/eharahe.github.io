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

1. **Global Wind**， **Glabal Rain** 是全局的环境音效。它们的强度分别由 **wind_intensity** 和 **rain_intensity** 两个RTPC加以控制，实现素材分层。然后通过blend container进行混合，如nml_global_wind，由基底(bass)，两个人物周围的环绕声(New Blend Track 1/2)和草声(grass)四层构成。
![global_wind](\assets\images\global_wind.jpg)

2. 当玩家进入森林、城市、村落、沼泽等具体场景时（通过地图中放置的众多Trigger触发，游戏程序控制），通过 **amb_global_override** 这个参数，把global的wind或者rain给压下去，而覆盖以局部的环境声。

3. 当玩家进入到室内场景时，会通过 **amb_interiors** 参数把室外音全部压下去。

4. 动物的声音也做为环境音的一部分，它们收到时间，风强，和雨的大小影响。打雷的声音由游戏引擎控制，并根据玩家和闪电的距离计算出真实延迟。

## References

[Wwise Tour 2016 - CD Projekt Red Witcher (2 of 6) - Ambience](https://www.youtube.com/watch?v=VJUuI_dw8Cc){:target="about:blank"}