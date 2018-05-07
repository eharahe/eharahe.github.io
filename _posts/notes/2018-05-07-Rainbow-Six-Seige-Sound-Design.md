---
layout: default
title: Rainbow Six Seige Sound Design
permalink: /notes/rainbow-six-seige-sound-design
tags: sound-design Wwise
category: sound-system-design
excerpt_separator: <!--break-->
---
Rainbow Six: Seige（彩虹六号：围攻）中最主要的创新之一是通过在地图中放置一些列的Propagation Nodes来计算声源到玩家之间的加权路径，从而实现声音的衍射（Obstruction）。

<!--break-->

## 可破坏的环境中的动态声音传播

在声音传播中有三个主要的物理概念：反射，指声音在反射表面反弹；吸收（Absorption，对应Wwise的Occlusion）指声音在穿墙后某系固定频率被吸收；衍射（Diffraction，对应Wwise的Obstruction），指声音绕过障碍物进行传播。

* **衍射**  
在彩虹六号中，通过Propagation Nodes来计算声源到玩家之间的加权路径。加权路径的权值受到多种因素作用，如路径长度，路径累计转角角度，以及Propagation Nodes对应墙体的破坏程度。当一面墙体是完好的时候，Propagation Nodes完全不参与到衍射计算中；当开墙后，它有可能成为主要的衍射路径，这时，我们会将声源移动到衍射路径的虚像点上。
![Sound Propagation](https://www.gamasutra.com/db_area/images/Siege%201.jpg)

* **吸收**  
主要采用两种方式模拟声音的穿墙。对于一般的声音，我们通过播放预先渲染好的采样来模拟，比如天花板上的脚步声。对于枪声，会对原始声源做实时滤波处理。由于实时滤波的CPU开销更大一些，因此它基本上只应用于枪声。

* **反射**  
采用IR混响。但由于CPU的开销，不能作用于太多Instance。为了克服这个限制，对于枪声预渲染（Baking）其房间混响，并且把它也放置在声源的位置。这相当于多了一层带空间定位的混响，也给玩家多了一些定位的信息。

![global_wind](\assets\images\siege5.jpg)

## 问题与挑战

1. 在可破坏表面上计算最短声音路径，而可破坏表面的破坏程度还是个变量，计算复杂度较高。需要在破坏面上放置多个Propagation Nodes，反复迭代正确的数量和位置，同时保证CPU的开销可控。  

2. 传播路径的变化并不是单向的。墙面可以被破坏也可以被加固。加固后衍射路径的计算仍然会被考虑，并不是完全封死的。同时加固的材料（木头，金属）会导致不同的传播效果。  

3. 在可穿墙的环境中，防御者要做的就是尽可能多的加固墙体，并且等待攻击者经过没有加固的墙边，然后朝他射击。攻击者永远不知道袭击他们的人躲在哪（因为Obstruction改变了虚像点位置）。然后玩家开始吐槽：[对于枪声定位Reddit上玩家并不买账](https://www.reddit.com/r/Rainbow6/comments/5oqwbz/great_article_on_how_rainbow_six_siege_audio/){:target="about:blank"} 

## References

[Game Design Deep Dive: Dynamic audio in destructible levels in Rainbow Six: Siege](https://www.gamasutra.com/view/news/288565/Game_Design_Deep_Dive_Dynamic_audio_in_destructible_levels_in_Rainbow_Six_Siege.php){:target="about:blank"}
