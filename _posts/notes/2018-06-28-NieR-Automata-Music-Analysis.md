---
layout: default
title: The music of NieR:Automata
permalink: /notes/nieR-automata-music-analysis
tags: nier-cover.jpg
category: game-audio
excerpt_separator: <!--break-->
---

「尼尔：机械纪元」获得2017年TGA的最佳作曲/配乐奖，在玩家群体中也获得不错的口碑。现以一周目主线剧情Gameplay素材为参考对其互动音乐结构进行分析。
<!--break-->

<style type="text/css">
  td{font-size:12px;}
  th{font-size: 12px; white-space: nowrap;}
</style>

## 整体感受

#### 关于Ducking  
* 中等的fadeout time，很长的fadein time。
* Vocal对Music的Ducking是最为明显的，不小于6dB。
* Camera距离对Music的Ducking：基于演出需要，由脚本控制而不是直接计算Camera距离。通常是在切到远景时会把Music压下去。

#### 垂直分层   

* 器乐多分为3层。Pad/Drone层，创造氛围，以合成Pad和Bass为主；基础层，或者是吉他和小打，或者是管弦的织体，创造主要的旋律和律动；打击层，G.C, Timpani和其他强烈的节奏乐器。  
* 除此之外还有Vocal层，相对独立于上面三个分层，多用于和器乐分层做叠加。  
* 这些分层的混合，大多数是预渲染的（而不是在Wwise中混音），应该主要是出于提升音质的考量；而Vocal层往往是独立的，比较便于调整其混音的音量比例。
* 可以看出垂直分层的策略是以满足叙事性需求为主，以丰富音乐的多样性和随机性为辅，这符合ARPG的实际需求。

#### 关于过渡

* 同一段Music不同分层间的过渡：通过Wwise的时间补偿机制，无缝过渡。
* 不同BGM之间的过渡：Fadein Fadeout。fadein很快，fadeout较慢。
* 游戏中制作了大量的Room Tone和Outdoor Ambient。音乐过渡往往是前段音乐fadeout，Ambient提起来，Boss音乐再fadein。

## 分析数据

在同一段BGM中的停留时间平均不大于3次。但是像「遺サレタ場所/斜光 」等主要场景的BGM重复率仍然较高，设计时采用了大量分层（8轨）增加其丰富性和随机性。  
在长达20分钟的最终Boss战中仍然会有听觉疲劳的感觉。在游戏后期音乐还是感觉略微单调枯燥。  

#### 2B线序章

| Song Name | Variation                           | Description           | Bpm | Total | Intro | Loop | Gameplay | Loop |
|-----------|-------------------------------------|-----------------------|-----|-------|-------|------|----------|------|
| 顕現シタ異物    | with intro, no vocal                | 固定视角叙事，通过Intro带入      | 72  | 3:40  | 53    | 2:47 | 4:45     | <2   |
| 顕現シタ異物    | with intro, no vocal                | 杂兵战                   | 72  | 3:40  | 53    | 2:47 | 55       | <1   |
| イニシエノウタ   | no vocal                            | 防卫装置小Boss             |     | 2:38  | 22    | 2:16 | 50       | <1   |
| 顕現シタ異物    | normal, no vocal                    | 杂兵战                   | 72  | 2:50  | 0     | 2:47 | 7:56     | <3   |
| 顕現シタ異物    | normal, with vocal                  | 进入最后一个杂兵房间后过渡到vocal版本 | 72  | 2:50  | 0     | 2:47 | 1:03     | <1   |
| 双極ノ悪夢     | no vocal                            | 大型兵器出现                | 79  | 2:29  | 0     | 2:26 | 58       | <1   |
| 双極ノ悪夢     | with vocal                          | 大型兵器变身                | 79  | 2:29  | 0     | 2:26 | 2:56     | <2   |
| 顕現シタ異物    | normal, with vocal                  | 大型兵器身上杂兵战             | 72  | 2:50  | 0     | 2:47 | 1:14     | <1   |
| 終ワリノ音     | full arrangements, with vocal layer | 大型兵器最终战               | 104 | 2:18  | 9     | 2:09 | 2:25     | <2   |
| 茫洋タル病     | full arrangements                   | 线性叙事                  |     | 1:33  | 31    | 1:02 | 55       | <1   |
| 偽リノ城塞     | full arrangements                   | 太空总部                  |     | 2:15  | 15    | 2:00 | 6:40     | <4   |


| Name | Variaty | Desc | Total Length | Intro Length | Loop Length | Gameplay Time | Loop |
| -----|-------- | ---- | ------------ | ------------ | ----------- | ------------- | ---- |
| 崩壊ノ虚妄 |  | 线性叙事，向地球进发 | 1:36 | 1 | 1:35 | 2:10 | <2 |
| 遺サレタ場所/斜光 | Pad Layer + Guitar Piano Layer | 探索地球废墟。 从Pad层起，概率性过渡到Guitar Piano层 | 1:55 | 0 | 1:55 | 5:09 | <3 |
| 穏ヤカナ眠リ | No Vocal | 反抗军营地 | 2:14 | 14 | 2:00 | 2:25 | <2 |
| 遺サレタ場所/斜光 | Pad Layer + Guitar Piano Layer | 进入废墟，从Pad层起，概率性过渡到Guitar Piano层。上面再叠加Vocal层 （Vocal是独立的） | 1:55 | 0 | 1:55 | 4:00 | <3 |
| 砂塵ノ記憶 | Pad Layer | 进入沙漠Pad | 2:14 | 22 | 1:52 | 5:38 | <3 |
| 砂塵ノ記憶 | Guitar Tabla Layer | 可能是随机过渡，或者按地图位置过渡 | 2:14 | 22 | 1:52 | 23 | <1 |
| 砂塵ノ記憶 | Guitar Tabla Layer + Vocal Layer | 从看家沙漠中的城市废墟开始 | 2:14 | 22 | 1:52 | 5:44 | <3 |
| 砂塵ノ記憶 | Full Arrangements | Boss前的杂兵战 | 2:14 | 22 | 1:52 | 1:30 | <1 |
| 生マレ出ヅル意思 |  | Boss战 | 2:47 | 29 | 2:18 | 2:03 | <1 |
| オバアチャン | With Vocal | 岩石崩塌 | 1:44 | 14 | 1:30 | 36 | <1 |
| 砂塵ノ記憶 | Full Arrangements | Boss后的杂兵战 | 2:14 | 22 | 1:52 | 7:12 | <4 |
| 遊園施設 | Pad + Grove + Vocal | 在几根层级间随机切换 | 2:14 | 0 | 2:14 | 5:34 | <3 |
| 終ワリノ音 | No Vocal | Boss 坦克 | 2:18 | 9 | 2:09 | 50 | <1 |
| 遊園施設 | Full Arrangements | 杂兵战 | 2:14 | 0 | 2:14 | 2:10 | <1 |
| 美シキ歌 | Full Arrangements / 8-bit | Boss战机械女王 多个层级间叠加过渡，boss战分几个阶段，中间穿插着8-bit的小游戏 | 2:18 | 18 | 2:00 | 6:13 | <4 |
| 遊園施設 | Pad + Grove + Vocal | 在几根层级间随机切换 | 2:14 | 0 | 2:14 | 2:28 | <2 |
| パスカル | No Vocal / With Vocal | 村里人物，对话 | 2:15 | 15 | 2:00 | 4:00 | <2 |
| オバアチャン | No Vocal / With Vocal | 开始Boss战时过渡到带Vocal | 1:48 | 14 | 1:34 | 5:31 | <4 |
| 遺サレタ場所/斜光 | Pad Layer + Guitar Piano Layer | 探索大型兵器陷落大坑。 从Pad层起，概率性过渡到Guitar Piano层 | 1:55 | 0 | 1:55 | 5:00 | <3 |
| 茫洋タル病 | Full Arrangements | 进入地下 | 1:33 | 31 | 1:02 | 1:20 | <1 |
| 異形ノ末路 | Full Arrangements | 打Adam | 2:21 | 13 | 2:08 | 2:30 | <2 |
| 森ノ王国 | Pad  Lead Drum + Vocal | 三个层级叠加Vocal层的排列组合 | 1:48 | 8 | 1:40 | 7:56 | <6 |
| 顕現シタ異物 | With Intro With Vocal | A2 之前的杂兵战 | 3:40 | 53 | 2:47 | 4:25 | <2 |
| 双極ノ悪夢 | No Vocal No Drum | A2 Boss战 | 2:29 | 3 | 2:26 | 1:16 | <1 |
| 遺サレタ場所/斜光 | Pad Layer + Guitar Piano Layer | 从管道中出来，来到flooded city。 以Pad为主，最后过渡到Guitar层 | 1:55 | 0 | 1:55 | 4:48 | <4 |
| 終ワリノ音 | No Vocal No Drum | 海上空战，从弦乐声部逐渐过渡到带打击声部的变奏 | 2:18 | 9 | 2:09 | 4:48 | <3 |
| 全テヲ破壊スル黒キ巨人/怪獣 | Organ / No Vocal No Drum | Boss战第一阶段，管风琴一遍，过渡到管弦编配 | 2:02 | 14 | 1:48 | 3:41 | <3 |
| 全テヲ破壊スル黒キ巨人/怪獣 | Organ / No Vocal No Drum | Boss战第二阶段，管弦编配 | 2:02 | 14 | 1:48 | 1:32 | <1 |
| 全テヲ破壊スル黒キ巨人/怪獣 | Full Arrangements | Boss战第三阶段，从管弦过渡到全编配 | 2:02 | 14 | 1:48 | 5:43 | <4 |
| 複製サレタ街 | Full Arrangements | 进入复制之城到Boss战Adam第一阶段。 从Pad逐步过渡到全编配，进入Boss战时进Vocal变奏 | 1:58 | 16 | 1:42 | 4:52 | <3 |
| 複製サレタ街 | Dance | Boss战第二阶段，舞曲编配 | 2:21 | 14 | 2:07 | 1:51 | <1 |
| 愚カシイ兵器 | Full Arrangements | 甲乙丙 + Vocal层 | 2:45 | 16 | 2:29 | 1:14 | <1 |
| 生マレ出ヅル意思 | Full Arrangements | 邪教杂兵战，多个层次间的切换 | 2:47 | 29 | 2:18 | 16:41 | <7 |
| 取リ憑イタ業病 | Full Arrangements | 从Robot Vocal层逐层过渡到全编配 | 3:56 | 51 | 2:05 | 4:14 | <2 |
| 生マレ出ヅル意思 | Full Arrangements | 反抗军营地杂兵战 | 2:47 | 29 | 2:18 | 5:14 | <3 |
| 終ワリノ音 | No Vocal | Boss战第一阶段 | 2:18 | 9 | 2:09 | 3:14 | <2 |
| 依存スル弱者 | No Vocal | Boss战第二阶段 | 2:30 | 13 | 2:17 | 3:06 | <2 |
| 終ワリノ音 | With Vocal | Boss战第三阶段，机械毛毛虫 | 2:18 | 9 | 2:09 | 5:16 | <3 |
| 依存スル弱者 | With Vocal | Boss战第四阶段 | 2:30 | 13 | 2:17 | 4:27 | <2 |
| 終ワリノ音 | Full Arrangements | Boss战第五阶段，最终战 | 2:18 | 9 | 2:09 | 2:00 | <1 |
| 曖昧ナ希望/氷雨 | With Vocal | 掐死S9 | 1:53 | 11 | 1:42 | 1:45 | <2 |
| 再生ト希望 |  | 线性叙事-结尾表演 | 36 | 0 |  | 36 | 1 |
