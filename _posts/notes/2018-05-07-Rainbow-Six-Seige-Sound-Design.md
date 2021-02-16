---
layout: default
title: Sound Design of Rainbow Six Seige
permalink: /notes/rainbow-six-seige-sound-design
tags: rainbow-six-cover.jpg
category: game-audio
excerpt_separator: <!--break-->
---
「彩虹六号：围攻」 中最主要的创新之一是在场景中放置一系列的 **Propagation-Nodes** 摆件，它可以用来辅助计算经过衍射的声源像点位置，从而实现了游戏中可破坏墙体的声音衍射。

<!--break-->

育碧蒙特利尔音频总监 Louis Philippe Dion 分享了彩六中空间音频采用的新技术。 他在育碧工作了七年。在 「彩虹六号：围攻」 之前，曾在「波斯王子」和「细胞分裂」等作担任过Audio Artist。他还曾担任过育碧内部音频引擎解决方案的产品经理。

## 可破坏的环境中的动态声音传播

声音传播有三个主要的物理概念：*反射*，指声波被反射表面反弹回来； *吸收*（Absorption，对应 Wwise 的 Occlusion 概念）指声音穿墙后某些固定频率被吸收； *衍射*（Diffraction，对应 Wwise 的 Obstruction 概念），指声音绕过障碍物进行传播。  
![Sound Propagation with Diffraction](\assets\images\siege1.jpg)  
  
* **衍射**  
「彩虹六号：围攻」 的主要创新是衍射技术的广泛应用。通过在地图中使用一系列策略性地放置的点（称为 Propagation Nodes），我们可以计算出Listener和声源之间声音的最短传播路径。传播路径的加权值取决于多个因素，包括 *路径的长度*， *累积角度* 以及某个传播节点受到攻击后的 *被破坏级别权重*。当一面墙体是完好的时候，Propagation Nodes 完全不参与到衍射计算中；当墙被破坏时会产生孔洞，则最靠近孔洞的Nodes将成为计算“传播路径”的候选，并可能成为声音传播的通路。 这时会将声源移动到衍射路径的虚像点上，而不是声源的实际位置，从而最终模拟了衍射。  
![Sound Propagation Nodes](\assets\images\siege6.jpg)
* **吸收**  
主要采用两种方式模拟声音的吸收。对于一般的声源，通过播放预先渲染好的采样来模拟，比如天花板上的脚步声。而对于枪声，会对原始的枪声声源做实时滤波处理。由于实时滤波的CPU开销更大一些，因此它基本上只应用于枪声。游戏中会同时结合衍射和吸收来给予玩家更多的定位信息提示。

* **反射**  
最后，对于反射（从游戏角度而言本质上是混响），最终使用了IR混响。这种特定类型的混响“采样”真实房间的声音，然后通过它播放我们的游戏声音。这种方法比传统的参数混响要先进好几年-至少出于仿真目的。唯一的缺点是由于CPU的限制，我们无法在太多情况下使用它。为了克服这种限制，我们 "Baking" 了枪声的混响，并将其作为3d声源在枪的位置播放它。这使玩家可以受益于武器上的定位混响，从而提供了比仅含有枪声干声更丰富的位置信息。  
![Rainbow Six: Siege's Hereford map](\assets\images\siege5.jpg)

## 空间音频实施及考量

1. 在可破坏表面上计算最短声音路径，而可破坏表面的破坏程度还是个变量，计算复杂度较高。需要在破坏面上放置多个Propagation Nodes，反复迭代正确的数量和位置，同时保证CPU的开销可控。  

2. 传播路径的变化并不是单向的。墙面可以被破坏也可以被加固。加固后衍射路径的计算仍然会被考虑，并不是完全封死的。同时加固的材料（木头，金属）会导致不同的传播效果。  

3. 由于子弹的破坏性和穿透性很高，如果只考虑声笼而不考虑声障效果会不够理想，利用声笼特性会成为一种主要的玩法技巧。例如，作为一名防御者，需要做的就是尽可能多的加固墙体，等待攻击者经过没有加固的墙边然后朝他射击。攻击者永远不知道袭击他们的人躲在哪（因为Obstruction改变了虚像点位置）。这样看上去似乎有些不公平，但真实世界里的情况就是如此，音频团队对这个结果的态度是十分坚持肯定的。有意思的是玩家的评论是两级分化的：[Reddit上某些并不买账的玩家☺](https://www.reddit.com/r/Rainbow6/comments/5oqwbz/great_article_on_how_rainbow_six_siege_audio/){:target="about:blank"} 

## 聆听对手的设计理念

安静的埋伏是游戏的一大核心体验，即便对于3分钟一局相对较快的游戏节奏，玩家的主要行为仍然是仔细聆听。当我们开始开发这款游戏的时候，从声音的角度来看，地图的环境声显得有些无聊。在一间郊区的卧室里埋伏，并不像战场或是太空中那么紧张刺激。

当时并不是所有的特工工具 (Gadgets)，导航和枪声都被整合到游戏，声音设计仍处于早期阶段。但是随着各个声音模块逐步整合到位，我们意识到我们有比 "fake tension" 更棒的方式： 你所听到的威胁是真实的，它正在朝你而来。*限制使用复杂的环境声层级* 帮助我们提升了tension，同时留下了更多的空间来为玩家提供准确的信息。

在行为动作的声音设计上，致力于提供真实感和大量细节，帮助玩家只需聆听其他人在地图上的行为动作，就可以获得更多信息。特工小工具，诸如 breach charges, barricades 等，也受到了特别关注，以确保我们从声音获得的信息能够给予玩家很好的提示。

第一人称行为动作声效在混音中很响的原因有两个：警示玩家自己正在发出大量噪音，这会曝露自身位置；其次是让玩家意识到如果想听到对手的声音，则需要放慢脚步和动作。这是彩六声音设计的基础；如果你走慢一点，听听周围的环境，则可以收集到更多信息并表现得更好。


## 实现结果

从项目的初期开始，我们追求的就是营造紧张的情绪。我们一度添加了大量的音乐和人为音效以注入更多的 tension，但是正如前面所述，我们拥有的最好的声音元素恰恰是你看不见的其他玩家发出的。因此，我们删除了所有“人为”的情绪渲染的声音，以专注于真正重要的事情：玩家创造的声音。 回顾今天，这看上去很明显，但是我发现很少有游戏在gameplay中避免使用任何经典的tension声效。对我来说，在游戏体验中避免“人为”音效的使用，使彩六拥有了一种不仅很有趣而且可以极大地影响游戏性的声音效果。

### Gameplay Demo

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=51694961&bvid=BV1h4411e7Xb&cid=90490375&page=1&as_wide=1&high_quality=1&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
</div>

## References

[Game Design Deep Dive: Dynamic audio in destructible levels in Rainbow Six: Siege](https://www.gamasutra.com/view/news/288565/Game_Design_Deep_Dive_Dynamic_audio_in_destructible_levels_in_Rainbow_Six_Siege.php){:target="about:blank"}
