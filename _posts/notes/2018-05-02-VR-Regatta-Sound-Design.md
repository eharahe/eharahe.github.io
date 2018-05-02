---
layout: default
title: VR Regatta Sound Design
permalink: /notes/vr-regatta-sound-design
tags: sound-design Wwise
category: sound-system-design
excerpt_separator: <!--break-->
---
VR Regatta（VR 赛艇）是一款航行游戏。从声音的角度来说，每艘船在操作的过程中都会发出一系列特别的噪音，但整个体验中音频基本就是风声和水声的结合。营造良好的环境声不光可以更富沉浸感，还做到了让声音指引玩家。

<!--break-->

## 世界底噪 Camera_Ambience

构建一个基本的背景风声环绕在玩家周围，那么当他们前后转头的时候，就会听到风声声源角度的变化。  
创造出四个循环的风声源分别位于听者的东、南、西、北方向。在Position Source控制中，取消Follow Listener Orientation的勾选。这意味着当VR头部追踪在跟踪玩家的头部动作时，循环风声的朝向不会改变，即它们在世界中的位置锁定不变。

![Positioning](http://info.audiokinetic.com/hubfs/Blog_Images/VR%20Regatta%20-%20Stephen%20S./Picture2.png)

风声对象有一系列由RTPC（**PointOfSail**, **BoatSpeed**）控制的状态，可以按需增强或减弱风声的强度；风声素材按风的强度分为三层，由Wind_Speed参数加以混合，那么随着风速增加时，围绕玩家的风将会从清风徐徐慢慢增加为狂风咆哮。

![Amb RTPC](http://info.audiokinetic.com/hubfs/Blog_Images/VR%20Regatta%20-%20Stephen%20S./Picture3.png)

因为玩家视角是锁定在船内的，所以可以为海的声音创造相同的效果。位于船周围的发声体会播放水花拍打船体的声音，进一步增强了玩家被风和水包围的感觉。当船开始移动时，会有额外的声音来强化移动感。通过**Boat_Speed**参数跟踪船速。

## 方向风声 Directional_Wind

在此基础上，我们还增加了一个有方向的风声对象，正好放置在朝玩家吹来的风向上。  
我们给项目增加了另一个参数 **Azimuth**（方位角），追踪玩家的头部相对于风声源的位置，让风在你直接面对它的时候声音最大。随着你逐渐转身到90度，风声会变得轻柔。这强化了玩家弄清风向的能力。 

![Direction Wind RTPC](http://info.audiokinetic.com/hubfs/Blog_Images/VR%20Regatta%20-%20Stephen%20S./Picture4.png)

当迎风航行时因为顶着气流，风声听起来非常吵。但当顺风航行时，风声基本就没有了。所以我又增加了另一个RTPC (**Wind_Direction**) 对风声进行更多控制，模拟这种效果。《VR Regatta》光是控制玩家航行时对风的听感就使用了7个参数。

![Direction Wind RTPC](http://info.audiokinetic.com/hubfs/Blog_Images/VR%20Regatta%20-%20Stephen%20S./Picture6.png)

## 其他声音

你掌舵时，系统会检测你身体的动作，可以让自己和船倾斜一些，更接近水面（哪一侧都行），这时，因为水会超出船的边沿，较低一侧的水流声会变大。如果将船的姿态纠正为水平，那么侧面的尾迹声就会减少。通过**Boat_Tilt**参数传递船体倾斜度。

值得一提的是该项目使用了Auro®-HeadPhones™插件，这是一款Audiokinetic推荐的空间化音频解决方案。


## References

[VR Regatta Sound Design : Immersion and Guidance via Sound](https://blog.audiokinetic.com/en/audio-designer-blog-vr-regatta-vive-unity-wwiseimmersion-and-guidance-via-sound/){:target="about:blank"}
