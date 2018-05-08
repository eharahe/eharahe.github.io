---
layout: default
title: Inside Sound Design
permalink: /notes/inside-sound-design
tags: sound-design Wwise
category: sound-system-design
excerpt_separator: <!--break-->
---


<!--break-->

## Voice

#### Voice的目标

1. Natural and adaptable audio playback  
2. Integration of physical and emotional states

#### Voice实现

**素材录制**  

* 录制呼吸声素材时，首先按照Action、Emotion等进行分类，通过Switch Container进行组织。  
* 对于每一种类型，都会录制一段不同Intensity Level的素材（角色运动越剧烈Intensity越高，呼吸越急促）  
* 这些素材按照Inhale和Exhale切片，分层放入到不同的Random Container中，**但是每一个切片的长度是不定的**。  

![](\assets\images\inside_voice.jpg) 

**程序这边**
* 修改Wwise Unity Integration，实现了Voice Sequencer。


## References

[Wwise Tour 2016 系列讲座《INSIDE》游戏声音设计](https://soundoer.com/2016/10/06/wwise-tour-2016-playdead-inside/){:target="about:blank"}  