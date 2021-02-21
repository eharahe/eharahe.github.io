---
layout: default
title: Sound Design of Planet Coaster 
permalink: /notes/planet-coaster-sound-design
tags: planet-coaster-cover.jpg
category: game-audio
excerpt_separator: <!--break-->
---
「过山车之星」 的乐趣在于建造并经营最伟大的过山车乐园，并同世界分享你的创意。它是Frontier目前最具雄心，也是技术上最先进的模拟经营游戏。音频团队通过独特的Crowd-Soundbox系统实现了栩栩如生的人群音效。

<!--break-->

## Soundscape指导方针

* Soundscape需要接收主题公园实际建造的具体信息（支持用户创意）；
* Soundscape必须是动态的、自适应的和互动的；
* Soundscape必须是画内音（diegetic），除非出现了前两条规则不能适用的情况；
* Code及Wwise中做的任何实现都要支持扩展。

##  人群声实现

分层系统实现：

* **Backdrop**: 一个非常简单的、音频驱动的背景循环（安静地待在混音之中）为整个乐园增加了“临场”感，会根据公园中的游客人数发生变化。
* **Crowd Soundbox**: 创建了一个数据通知层，描述在“Soundscape”中整个人群的密度、位置和情绪。在“舞台”的例子中，它就是我们的后台层，它会根据镜头位置动态进行缩放，并通过确定数目的发声体管理。
* **The Close-Up Sounds System**: 为前景游客创建了对号同步的发声点，并且只有在镜头近到能听到这些细节时才会激活。特写系统使用了一个特别的Soundbox，它进行了优化，用来寻找各个游客以及他们正在干什么。这个Soundbox会找到镜头周围的单元格，并且会为那些最近的游客们分配十个发声体。

## Crowd Soundbox

一个200×200的网格，统计每个网格中的人流密度，情绪，人群类型等信息，并通过这些信息生成Emitter。  

![Crowd Soundbox](/assets/images/coaster_soundbox.png "Crowd Soundbox")

1. 采用流体力学（而不是路径查找）对人流建模。
2. 对镜头观察的范围划分网格（动态的），分别计算每个网格内的人流密度，人群分布，情绪，行为等统计信息。
3. 将(2)中的工作分摊到多帧中进行计算，每帧大概能计算1/30的网格数。
4. 根据前两步的分析数据，用位于东，南，西，北方向的四个点声源 **Close 1** - **Close 4** 表示镜头周围的人群。
5. 在(4)的基础上叠加一层关联网格整体的人流密度的背景人群声：**Far 1**


#### 人群划分
* **Crowd Size**: Small, Medium, Large
* **Crowd Diversities**: Adult male, Adult female, Teenage male Teenage female, Child

#### 循环迭代

Crowd Soundbox围绕三个阶段不断循环迭代，并将计算量分配到多帧上。在平衡计算量和收益后：每帧更新点声源位置和1/30的人流密度网格数。

![Loop](http://info.audiokinetic.com/hubfs/Blog_Images/Planet%20Coaster/Blog2/Blog2_Image_07_SoundBoxLoopImage.png "Loop")

#### 情绪和大小

1. 只有在镜头拉到大特写时，才使用情绪样本（因为一个无聊（抱怨）的人群声是很让人烦的）。
2. 非大特写：开心的人群会充满活力，而乐园中任何的问题会倾向于让人群安静下来，以此提示玩家去调查。
3. 通过阈值切换场景样本，而不是用Blend Container混合多种情绪。（我们很少在网格中看到任何一种情绪的值超过60%）

![Mood](http://info.audiokinetic.com/hubfs/Blog_Images/Planet%20Coaster/Blog2/Blog2_Image_09_CrowdMoodSwitchInWwise.png)

#### 放置点声源

1. 计算人群质心
![](http://info.audiokinetic.com/hubfs/Blog_Images/Planet%20Coaster/Blog2/Blog2_Image_11_CentreOfMassFormula.png)

2. 计算人群散布值。算法是以Listener和质心的连线为基线，以Listener为轴心向两侧扫描，直到90%的人群包含在在扇面范围内，所得到的角度即为散布值。在保证质心相对于Listener的朝向的基础上，用散布值修改质心的Distance，这样Wwise衰减曲线的Spread参数就能反映人群相对于Listener的散布。但是该distance不衰减Volume：
![Crowd Spread](/assets/images/crowd_spread.png "计算人群散布值")

3. 由于(2)中把Distance给用了，所以要单独建一个真实的质心到Listener距离的RTPC: **DistanceToListener** 来控制Volume, LPF等的衰减
![](http://info.audiokinetic.com/hubfs/Blog_Images/Planet%20Coaster/Blog2/Blog2_Image_13_DunamicSpredInWwise.png)

## 过山车音效设计

1. 将原始素材拆分成Track Wind Car Clunks & Flanges。用分层录制的素材，先给一段过山车视频线性贴片，搞清楚每种声音的作用以及它们随物理的变化规律。然后再通过wwise将设计好的声音结构动态实现。
2. 使用Acceleration, Weight, Speed, Lateral Rotation等RTPC触发一些素材（如轨道间隙，转向时的咔咔声等），以及实时控制Loop的滤波、Pitch特性。
3. 根据RTPC实时控制Loop的Pitch，效果不够真实；采用带通滤波，控制其通带宽度的做法要更好。

## References

[“The Challenge of Creating Audio for Planet Coaster” - Using contextual impressions and data gathering to design crowd audio.](https://vimeo.com/255463243){:target="about:blank"}

[Planet Coaster - Crowd Management : Using Data to Generate Dynamic Crowd Audio (PART 1)](https://blog.audiokinetic.com/planet-coaster-part-1-crowd-management-using-data-to-generate-dynamic-crowd-audio/){:target="about:blank"}   
[Planet Coaster - Crowd Audio : The Crowd Soundbox System (PART 2)](https://blog.audiokinetic.com/planet-coaster-part-2-crowd-audio-the-crowd-soundbox-system/){:target="about:blank"}   
[Planet Coaster - Crowd Audio : Additional Layers (PART 3)](https://blog.audiokinetic.com/planet-coaster-crowd-audio-additional-layers-part-3/){:target="about:blank"}

[Steam 上的 Planet Coaster](http://store.steampowered.com/app/493340/Planet_Coaster/){:target="about:blank"}
