---
layout: default
title: Cinematic Sound Systems & Home Theater
permalink: /notes/cinematic-sound-system
tags: home-theater.jpg
category: audio-technique
excerpt_separator: <!--break-->
---

在即将发布的 wwise 2021.1中，在影视行业流行了十来年的 Object-Based Audio 被带到了游戏互动音频领域，成为最有意思的新功能之一。本文回顾影视行业的声音系统的大致发展历程，梳理了当下主流的声音系统技术。

<!--break-->

## 早期主流的声音系统

* **Silent**  
1888年起，这是无声电影的时代。。。

* **Phonofilm**  
1920年，由 Lee de Forest 和 Theodore Case 发明，是一种 sound-on-film 系统。声音被同步录制在和电影胶片视屏轨平行的轨道上。

* **Vitaphone**  
1926年，由华纳兄弟设计，是唯一取得商业成功的 sound-on-disc 系统。音频轨不是印在胶片上，而是单独录制到留声机唱片上。唱片的直径为16英寸（41厘米），录制速度为 ​<span class="frac nowrap">33<style data-mw-deduplicate="TemplateStyles:r993651011">.mw-parser-output .sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap}</style><span class="sr-only">&nbsp;</span><sup>1</sup>⁄<sub>3</sub></span> rpm。当电影放映时，在一个与放映机电机物理耦合的转盘上播放。频率响应为4300Hz。  
![Auro-3D-13.1](\assets\images\film_sound\vitaphone.jpg) 

* **Stereo**  
现代的立体声技术被认为是由英国工程师 Alan Blumlein 于上世纪30年代发明的。但它被影视行业商业化是从1952年 Cinerama 才开始。此后随着宽屏电影发展，Todd-AO, VistaVision, CinemaScope等格式相继问世。1975年Dolby Stereo被发明，随着1977年《星球大战》的成功，成为行业标杆。它将4通道的原始音频下混为2轨的立体声信号，录制到胶片的光学声轨上，来实现模拟降噪的目的。 降噪系统包括 Dolby A, Dolby B, Dolby SR。稍后 Ultra Stereo 被推出，作为 Dolby Stereo 的竞争对手，采用了和竞品相同的技术实现。

  | Dolby Stereo Mix  | Left  | Right | Center                  | Surround                 |
  | ----------------- | ----- | ----- | ----------------------- | ------------------------ |
  | Left Total        | 1     | 0     | $$\frac{1}{\sqrt{2}}$$  | $$+j\frac{1}{\sqrt{2}}$$ |
  | Right Total       | 0     | 1     | $$\frac{1}{\sqrt{2}}$$  | $$-j\frac{1}{\sqrt{2}}$$ |

* **Dolby Digital (Dolby AC-3)**
1992年，Dolby Digital被发明，影视音频进入到数字世界。它的采样率支持到48k，支持最多6个独立的声道，最知名的是5.1声道技术。 Dolby Digital 格式也支持单声道及立体声输出。1999年发布的 Dolby Digital EX 能够分离出6.1或7.1的声道输出。但是，这技术并不能视为真正的6.1或7.1编码，与它的竞争对手DTS-ES格式不同，它并不能提供完整独立分离的6条或7条音轨。直到2009年 Dolby Surround 7.1 发布，才真正实现了7.1声道的声音系统。

* **DTS (Digital Theater Systems)**  
1993年，最大6通道，最普及的声道配置是5.1。DTS-ES 是DTS在Digital Sound/Digital Surround基础上的6.1声道版，分Matrix（以矩阵方式由5.1模拟至6.1）及Discrete（原生6.1声道）两种，与DTS 96/24一样。

* **SDDS (Sony Dynamic Digital Sound)**  
1993年发布，最多8个独立通道，Left - Left Center - Center - Right Center - Right - Left Surround - Right Surround - Subwoofer

## 2010年以后的主要系统   

#### Auro 3D 2010

在传统的 5.1, 7.1 声道的基础上增加30度仰角的声道分层，以及天花板正上方的声道。  
![Auro-3D-concept](\assets\images\film_sound\auro_concept.png)  

家庭影院格式: 9.1, 10.1  
![Auro-3D-9.1](\assets\images\film_sound\auro91.jpg)
![Auro-3D-10.1](\assets\images\film_sound\auro101.jpg) 

电影院格式 11.1, 13.1  
![Auro-3D-11.1](\assets\images\film_sound\Auro_Layers_11_1.jpg){:style="width:491px;max-height:403px;"}
![Auro-3D-13.1](\assets\images\film_sound\Auro_Layers_13_1.jpg){:style="width:491px;max-height:403px;"}

#### Dolby Atmos （杜比全景声） 2012

杜比全景声技术允许将多达128条*音频轨道* 以及相关的空间音频描述元数据（如位置或声像的自动化数据）分配给剧院，以便根据剧院的实际情况向扬声器提供最佳的动态渲染。每条*音频轨道* 可以分配给一条*基础声道* 或者一个*动态对象*。 影院版的 Atmos 包括10条*基础声道* （9.1 bed）可用于 Ambience 或中置声道播放的 Dialogue；同时还为音频*动态对象* 留出118条音轨。 家庭版的Atmos在LFE中只有1条*基础声道* ，通常有11个*动态对象* 。 在Atmos游戏中，通过 ISF（Intermediate Spatial format），支持32条*音频轨道*（对于7.1.4的*基础声道* ，则可以支持20个*动态对象* ）。

电影后期混音时需要使用Dolby提供的Renderer插件（有 Pro-Tools 和 Nuendo 版本），将声音的空间自动化信息存到元数据中。以下是 home theater 版本的插件界面：
![dolby_renderer](\assets\images\film_sound\dolby_renderer.jpg)

设置工程的不同音轨与杜比 *音频轨道* 之间的路由：
![dolby_renderer_io_setup](\assets\images\film_sound\dolby_renderer_io.jpg)

***Dolby Atmos 家庭影院***  

2014年底，Dolby推出了家庭影院版的 Atmos。最大支持 24.1.10 通道，118 动态对象和10条bed通道。通过“空间编码对象子流”将音频混缩到匹配的输出扬声器配置。由于蓝光碟带宽和家用功放解码器性能的限制，家庭版和影院版的渲染方式有所不同:
>  A spatially-coded substream is added to Dolby TrueHD or Dolby Digital Plus or is present as metadata in Dolby MAT 2.0, LPCM like format. This substream is an efficient representation of the full, original object-based mix. This is not a matrix-encoded channel, but a spatially-encoded digital signal with panning metadata.   

家庭影院版内容制作的工作流如下，在拿到电影原始工程后需要进一步优化、编码，使其各项指标能够符合蓝光碟发布的要求：  
![dolby_home_theater_content_creation_workflow](\assets\images\film_sound\dolby_home_theater_content_creation_workflow.jpg)

[7.1.4 通道格式的扬声器安装 ](https://www.dolby.com/siteassets/about/support/guide/setup-guides/7.1.4-hybrid-dolby-atmos-enabled--overhead-speaker-placement/sell-.pdf){:id="dolby_7_1_4"}  
在7.1格式的基础上增加4个 overhead 扬声器：  
![Dolby-Atmos-7.1.4](\assets\images\film_sound\714_speaker.png)

头顶扬声器安装细节：  
![Dolby-Atmos-9.1.6](\assets\images\film_sound\714_detail1.png)
![Dolby-Atmos-9.1.6](\assets\images\film_sound\714_detail2.png)

#### DTS: X 2015

DTS:X 是使用沉浸式音频技术的电影声带及再现系统，涵盖商业影院和家庭影院解决方案。DTS:X for cinema为电影工作室及内容创作者提供了前所未有的对声音对象的位置、移动和音量的控制，从而大大扩展了电影声带创作的可能性。 DTS:X 使用极坐标表示*音频轨道* 对象的位置信息。音频处理器会根据影院的扬声器数量及位置动态的将声音渲染出来。

Base Layer 扬声器阵列：传统的5.1，7.1影院扬声器编组方式（图1），多个扬声器受同一条channel控制发声，但在小范围的定位上存在限制；图2中的阵列，通过增加 Lssa 与 Rssa 分组，组成9.1阵列，对声音定位有一定的改进；理想的情况是每个扬声器都能独立的输出不同的音频信号，这对于基于对象的音频定位会很有帮助：  
![DTS-X base layer speaker layout](\assets\images\film_sound\dtsx_base.png)  

Higher Layer 扬声器阵列：在侧墙、天花板、荧幕上方安置，同一套声道制式可以有不同的实现方式，如下面的15.1 DTS:X 系统：  
![DTS-X base layer speaker layout](\assets\images\film_sound\dtsx_15.1.png)  

## References

[电影声音系统-Wikipedia](https://en.wikipedia.org/wiki/List_of_film_sound_systems){:target="about:blank"}  

<script type="text/javascript" async="" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"> </script>
