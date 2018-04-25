---
layout: default
title: Planet Coaster Sound Design
permalink: /notes/planet-coaster-sound-design
tags: sound-design Wwise
category: sound-system-design
excerpt_separator: <!--break-->
---
Planet Coaster（过山车之星）的乐趣在于建造并管理世界最伟大的过山车乐园，并同世界分享你的创意。它是Frontier目前为止最具雄心，也是技术上最先进的模拟游戏。就像在现实世界一样，一个过山车乐园关键就在于人的体验。即使在过山车的呼啸声和烟花的爆破声中，我们还是能听到游客或激动，或害怕，或惊喜的声音。设计团队采用了独特的Crowd-Soundbox系统实现了栩栩如生的人群音效。

<!--break-->

## 设计目标

* Soundscape需要接收主题公园实际建造的具体信息（支持用户创意）；
* Soundscape必须是动态的、自适应的和互动的；
* Soundscape必须是画内音（diegetic），除非出现了前两条规则不能适用的情况；
* Code及Wwise中做的任何实现都要支持扩展。

##  人群声实现

分层系统实现：

* **Background Layer**: 一个非常简单的、音频驱动的背景循环（安静地待在混音之中）为整个乐园增加了“临场”感。
* **Crowd Soundbox**: 创建了一个数据通知层，描述在“Soundscape”中整个人群的密度、位置和情绪。在“舞台”的例子中，它就是我们的后台层，它会根据镜头位置动态进行缩放，并通过确定数目的发声体管理。
* **The Close-Up Sounds System**: 为前景游客创建了对号同步的发声点，并且只有在镜头近到能听到这些细节时才会激活。特写系统使用了一个特别的Soundbox，它进行了优化，用来寻找各个游客以及他们正在干什么。这个Soundbox会找到镜头周围的单元格，并且会为那些最近的游客们分配十个发声体。

## Crowd Soundbox

1. 采用流体力学（而不是路径查找）对人流建模。
2. 对镜头观察的范围划分网格（动态的），分别计算每个网格内的人流密度，人群分布，情绪，行为等统计信息。
3. 将(2)中的工作分摊到多帧中进行计算，每帧大概能计算1/30的网格数。
4. 镜头周围的人群，用四个方向上的点声源表示：**Close 1 - Close 4**
5. 叠加一层关联网格整体的人流密度的背景人群声：**Far 1**

![Crowd Soundbox](http://info.audiokinetic.com/hubfs/Blog_Images/Planet%20Coaster/Blog2/Blog2_Image_05_ExtractingDataFromCrowdSimulation.png "Crowd Soundbox")

#### Sound Assets
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

2. 计算人群散布值，并用该值修改质心极坐标系下的Distance（用来控制Wwise的Spread衰减曲线），该distance不衰减Volume

![](http://info.audiokinetic.com/hubfs/Blog_Images/Planet%20Coaster/Blog2/Blog2_Image_12_TopDownViewOfCrowds.png)

3. 单独建一个描述真实的质心到听者距离的RTPC: **DistanceToListener** 控制Volume, LPF等的衰减

![](http://info.audiokinetic.com/hubfs/Blog_Images/Planet%20Coaster/Blog2/Blog2_Image_13_DunamicSpredInWwise.png)

### 过山车音效设计

1. 将原始素材拆分成Track Wind Car Clunks & Flanges
2. 使用Acceleration, Weight, Speed, Lateral Rotation等RTPC触发一些素材（如轨道间隙，转向时的咔咔声等），以及实时控制Loop的滤波、Pitch特性。
3. 根据RTPC实时控制Loop的Pitch，效果不够真实；采用带通滤波，控制其通带宽度的做法要更好。

### References

[“The Challenge of Creating Audio for Planet Coaster” - Using contextual impressions and data gathering to design crowd audio.](https://vimeo.com/255463243){:target="about:blank"}

[Planet Coaster - Crowd Management : Using Data to Generate Dynamic Crowd Audio (PART 1)](https://blog.audiokinetic.com/planet-coaster-part-1-crowd-management-using-data-to-generate-dynamic-crowd-audio/){:target="about:blank"}   
[Planet Coaster - Crowd Audio : The Crowd Soundbox System (PART 2)](https://blog.audiokinetic.com/planet-coaster-part-2-crowd-audio-the-crowd-soundbox-system/){:target="about:blank"}   
[Planet Coaster - Crowd Audio : Additional Layers (PART 3)](https://blog.audiokinetic.com/planet-coaster-crowd-audio-additional-layers-part-3/){:target="about:blank"}
