---
layout: default
title: Sound Design of The Witcher 3： Wild Hunt
permalink: /notes/the-witcher3-sound-design
tags: witcher3-cover.jpg
category: game-audio
excerpt_separator: <!--break-->
---
起初只是打算对巫师3音频团队在Wwise Tour做的分享进行梳理，后来又断断续续地做了音频拆包和音乐分析，直到今天更新已经过了快三年了。在分析音乐结构地过程中，能够看到他们从刚开始做序章的保守到DLC中大胆尝试更多交互形式的突破；就我个人而言也从当初的只看个热闹到现在对各种细节穷追不舍，算是进步吧 —— 2021.3.13

<!--break-->

## 环境声

#### 设计目标

* 用足够丰富的内容填充庞大的开放世界
* 用多变的声音来避免重复
* 能够模仿真实世界的声音机制
* 能够实现混音和叙事目的实时控制
* 简单直接的整合方式；通过小系统的叠加实现复杂声景

#### 全局环境的实现

* **全局天气系统：** Global Wind，Glabal Rain 会被局部环境声override
* **风：** 由多个独立分层组成，受到 *wind_intensity* RTPC控制
* 无人之地和史凯利杰都有各自独立的素材和设置
* **雨：** 3个分层对应小雨、中雨、大雨的降雨强度，受到*rain_intensity* RTPC控制
* **雷** 由游戏天气系统触发

风声和雨声都通过多个层级进行进行混合，譬如 nml_global_wind，由基底层(bass)，环绕在人物周围的两层风声(New Blend Track 1/2)和草声(grass)四层构成：  
![global_wind](\assets\images\global_wind.jpg)

#### 局部环境的实现

* 通过RPTPC影响全局环境声的音量：当玩家进入森林、城市、村落、沼泽等局部场景时，通过 **amb_global_override** 这个参数（由放置在地图中的众多Trigger触发环境切换）
* 当玩家进入到室内场景时，通过 **amb_interiors** RTPC把室外环境声（全局风雨，局部室外环境等）全部压下去。

#### 动物的声音

* 动物的声音独立于其它环境声
* 响应 **time**， **wind_intensity** 和 **rain_intensity** 等RTPC
* 将整个世界作为一个大的有机体

## 人群声

为了让人群walla声效更加真实，音频团队需要让这些声音会随着玩家的Camera（Listener）旋转而发生旋转。同时为了让每个方向上的walla和对应的npc数量一致，系统被分成四个象限，程序会计算每个象限中的人群的数量和距离Listener的平均距离，然后把这些参数传给Wwise。这个系统还会检测每个NPC是在室内还是室外（是否和玩家角色处在同一个空间），以及NPC的状态，如不同的情绪因素。

![crowds](\assets\images\crowds.jpg)

## 战斗系统

#### 武器 Switches

* 玩家 / 对手的 武器类型
* 被击中的护甲类型
* 武器尺寸，对于部分武器（斧头，锤子）区别尺寸，但用得不多
* 攻击类型及被击中的位置：如躯干、头部等  

这样划分的好处：程序中可以采用同样一种形式来触发巫师3庞大世界中的任何一种武器声音，使得测试工作变得简单。

![weapon](\assets\images\weapon.jpg)  

#### 规模

* 67种怪物（包括DLC）
* 极其的详细和激进的设计
* 声音能够很好的融入环境中
* 大量的随机样本防止重复单调

## 互动音乐

#### 设计目标

让玩家在非线性的游戏环境中能够感受到线性的配乐体验。

#### 整体设计

1. Cues triggered by game systems vs tailor-made quest music
2. States VS. Switches  
States:  探索模式（白天、夜晚），普通战斗，昆特牌之间的切换  
Switches:  对白音乐，换场Cues，普通gameplay，boss战之间的切换  
3. RTPCs:  *intensity*（探索，调查）；*threat*（普通战斗） 

#### 基于场景的音乐

巫师3的配乐资源大致分为基于场景的探索、战斗音乐；及基于任务的叙事、对白音乐两大类。其中基于场景的音乐按不同场景进行资源组织；通过垂直分层的方式实现情绪强弱变化；通过wwise transition机制实现音乐之间的过渡。战斗音乐基本都包含了intro和outro；transition的align方式除了按beat, 小节对齐外还有采用Custom Cue。

<div style="position: relative; padding: 30% 45%;">
<iframe  style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="//player.bilibili.com/player.html?aid=844523808&bvid=BV1u54y1a7mX&cid=307204178&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div><p></p>

场景资源对照表如下：

<style>
.markdown th, .markdown td{padding: 3px 4px;font-size:12px;white-space:nowrap;}
</style>

| 场景                  | 探索 |      |        |                                                   | 战斗 |      |        |       |                                      | 备注              |
|---------------------|------|-------|--------|---------------------------------------------------|------|-------|--------|-------|--------------------------------------|-----------------|
|                     | 分层   | Intro | Loop   | 素材命名                                              | 分层   | Intro | Loop   | Outro | 素材命名                                 |                 |
| Ise of Mists        | 1    |       | 1:34   | tw3_isle_of_mists_expl                            |      |       |        |       |                                      |                 |
| kaermorhen          | 4    |       | 2:34   | tw3_km_01_exploration                             | 2    |       | 1:15   | 0:05  | tw3_km_01_combat                     |                 |
| prologue            | 1    |       | 2:28   | tw3_prlg_village_exploration                      | 2    |       | 1:15   | 0:05  | tw3_km_01_combat                     | 凯尔莫汉战斗音乐是同一首    |
|                     | 1    |       | 1:47   | tw3_prlg_02_expl                                  |      |       |        |       |                                      |                 |
|                     | 1    |       | 2:16   | tw3_prlg_03_expl                                  |      |       |        |       |                                      |                 |
|                     | 1    |       | 1:08   | tw3_prlg_04_expl_crypt                            |      |       |        |       |                                      |                 |
| wyzima              | 3    |       | 1:32   | tw3_wyzima_01_exploration                         |      |       |        |       |                                      |                 |
| spiral              | 2    |       | 3:20   | tw3_spiral_01_exploration                         | 1    |       | 3:20   |       | tw3_spiral_01_combat_stem            | 探索和战斗为同一首       |
| nml swamps          | 3    | 0:36  | 2:46   | tw3_nml_05_exploration                            |      |       |        |       |                                      |                 |
|                     | 1    |       | 3:48   | tw3_nml_05_exploration_night                      |      |       |        |       |                                      |                 |
|                     | 2    |       | 3:16   | tw3_nml_05_exploration_var2                       |      |       |        |       |                                      |                 |
|                     | 1    |       | 1:44   | tw3_nml_05_witches_village_exploration            |      |       |        |       |                                      |                 |
|                     | 1    |       | 2:24   | tw3_nml_05_witches_village_exploration_with_rebec |      |       |        |       |                                      |                 |
| nml section_01      | 1    |       | 2:30   | tw3_main_themes_nilfgaard_emperor_theme           | 3    | 0:12  | 2:04   |       | NML_04_Combat                        |                 |
| nml section_02      | 3    |       | 2:49   | tw3_nml_04_exploration                            |      |       |        |       |                                      |                 |
|                     | 2    |       | 2:49   | tw3_nml_04_exploration_night                      |      |       |        |       |                                      |                 |
|                     | 3    |       | 2:56   | tw3_nml_08_exploration                            | 3    | 0:16  | 1:52   |       | tw3_nml_08_combat                    |                 |
|                     | 1    |       | 2:53   | tw3_nml_08_exploration_night                      |      |       |        |       |                                      |                 |
|                     | 1    |       | 2:16   | tw3_nml_10_ghost_forest_exploration               | 1    |       | 1:08   |       | tw3_nml_10_ghost_forest_combat       |                 |
| nml section_03      | 2    |       | 2:59   | tw3_nml_02_exploration_day                        | 3    | 0:11  | 2:03   | 0:11  | NML 02 Combat                        |                 |
|                     | 1    |       | 2:59   | tw3_nml_02_exploration_night                      |      |       |        |       |                                      |                 |
| nml section_04      | 3    |       | 2:51   | tw3_nml_07_exploration                            | 3    | 0:11  | 1:50   | 0:06  | tw3_nml_07_combat                    |                 |
|                     | 1    |       | 3:05   | tw3_nml_07_exploration_night                      |      |       |        |       |                                      |                 |
|                     | 1    |       | 1:36   | tw3_assassins_of_kings_theme_expl_p1              |      |       |        |       |                                      |                 |
|                     | 1    |       | 0:48   | tw3_assassins_of_kings_theme_expl_p2              |      |       |        |       |                                      |                 |
| nml barons_castle   | 3    |       | 2:59   | tw3_nml_03_exploration                            | 3    | 0:12  | 2:06   | 0:09  | NML_03_Combat                        |                 |
| nml elven_ruins     | 3    |       | 2:38   | NML 11 Exploration                                | 3    | 0:10  | 1:36   | 0:08  | NML_11_Combat                        |                 |
| nml mice_island     | 3    |       | 2:28   | tw3_nml_06_exploration_day                        |      |       |        |       |                                      |                 |
|                     | 1    |       | 2:32   | tw3_nml_06_exploration_night                      |      |       |        |       |                                      |                 |
| nml oxenfurt        | 3    |       | 0:50   | Novi_03_Exploration_A                             | 3    | 0:11  | 1:31   | 0:08  | Novi 03 Combat                       |                 |
|                     | 3    |       | 1:48   | Novi_03_Exploration_B                             |      |       |        |       |                                      |                 |
| novigrad            | 1    |       | 3:12   | tw3_novigrad_02_exploration                       | 3    | 0:12  | 2:06   | 0:10  | Novi 01                              |                 |
|                     | 2    |       | 2:45   | Novi_Inquisition_Theme                            | 3    | 0:12  | 2:02   |       | Novi 02 Combat                       |                 |
|                     | 1    |       | 1:05   | tw3_novigrad_sewers_explA                         |      |       |        |       |                                      |                 |
|                     | 1    |       | 1:32   | tw3_novigrad_sewers_explB                         | 3    | 0:08  | 1:01   | 0:05  | tw3_novigrad_sewers_cmb              |                 |
| nov brothel_harbor  | 2    |       | 3:12   | tw3_novigrad_05_exploration_day                   | 3    | 0:12  | 2:06   | 0:09  | Novi_05_Combat                       |                 |
|                     | 1    |       | 2:36   | tw3_novigrad_05_exploration_night                 |      |       |        |       |                                      |                 |
|                     | 1    |       | 1:44   | tw3_novigrad_06_tavern_03                         |      |       |        |       |                                      |                 |
| nov king_of_beggars | 1    |       | 4:03   | tw3_novigrad_01_exploration                       |      | 0:12  | 2:06   | 0:10  | Novi 01                              |                 |
| nov poor_district   | 3    |       | 1:40   | Novi_08_Exploration_Beggers_A                     | 3    | 0:11  | 1:36   | 0:08  | Novi_08 Combat                       |                 |
|                     | 3    |       | 0:58   | Novi_08_Exploration_Beggers_B                     |      |       |        |       |                                      |                 |
| nov rich_district   | 3    |       | 2:46   | tw3_novigrad_04_exploration                       | 3    | 0:13  | 2:02   |       | Novi 04 Combat                       |                 |
|                     | 1    |       | 2:24   | tw3_novigrad_04_exploration_night                 |      |       |        |       |                                      |                 |
| nov temple_island   | 3    |       | 1:29   | Novi_09_Exploration_Beggers_A                     | 3    | 0:11  | 1:35   | 0:08  | Novi_09_Combat                       |                 |
|                     | 3    |       | 1:12   | Novi_09_Exploration_Beggers_B                     |      |       |        |       |                                      |                 |
| skellige            | 2    |       | 1:29   | tw3_skellige_mood_music_drama02                   |      |       |        |       |                                      |                 |
|                     | 1    |       | 0:58   | tw3_skellige_tavern_minigames01_main_loop         |      |       |        |       |                                      |                 |
|                     | 1    |       | 2:20   | tw3_skellige_caves_exploration                    |      |       |        |       |                                      |                 |
|                     | 3    | 0:11  | 9×0:22 | tw3_skellige_monster_hunting                      | 2    | 0:22  | 5×0:22 | 0:09  | tw3_skellige_monster_hunting_combat  | Loop为随机播放的8小节序列 |
| skl an_skellig      | 3    |       | 2:07   | skl Exploration 12_A                              | 3    | 0:08  | 1:01   | 0:06  | SKL 12 Combat                        |                 |
|                     | 3    |       | 1:13   | skl Exploration 12_B                              |      |       |        |       |                                      |                 |
| skl ard_skellig     | 2    |       | 2:51   | tw3_skl_07_exploration                            | 3    | 0:08  | 2:04   | 0:08  | SKL_08_Combat                        |                 |
|                     | 2    |       | 2:44   | tw3_skl_08_exploration                            | 3    | 0:12  | 1:15   | 0:09  | tw3_ard_skellig_general_combat       |                 |
|                     | 2    |       | 3:09   | tw3_skellige_ard_skellig_expl                     |      |       |        |       |                                      |                 |
|                     | 2    |       | 2:24   | tw3_skellige_ard_skellig_settlements_expl         |      |       |        |       |                                      |                 |
|                     | 1    |       | 1:53   | tw3_bad_news_ahead_full_with_brass                |      |       |        |       |                                      |                 |
| skl ice_giant_isl   | 2    |       | 2:50   | tw3_skellige_ice_giant_expl                       | 2    | 0:09  | 6×0:17 |       | tw3_skellige_ice_giand_island_combat | Loop为随机播放的8小节序列 |
| skl spikeroog       | 3    |       | 1:01   | skl_11_Exploration_A                              | 3    | 0:13  | 1:14   | 0:10  | SKL 11 Combat                        |                 |
|                     | 3    |       | 2:14   | skl_11_Exploration_B                              |      |       |        |       |                                      |                 |
|                     | 1    |       | 2:12   | tw3_ambient01_hims_house_mix                      |      |       |        |       |                                      |                 |
| skl faroe           | 3    |       | 2:37   | SKL_13_Exploration                                | 3    | 0:11  | 1:10   | 0:08  | SKL 13 Combat                        |                 |
| skl hindarsfjall    | 3    |       | 1:36   | skl 14 Exploration_A                              | 3    | 0:10  | 1:40   | 0:07  | skl 14 Combat                        |                 |
|                     | 3    |       | 1:08   | skl 14 Exploration_B                              |      |       |        |       |                                      |                 |
|                     | 1    |       | 2:11   | tw3_skl_16_freyas_garden_expl                     | 3    | 0:12  | 1:09   | 0:10  | tw3_skl_16_freyas_garden_cmb         |                 |
| skl elven_ruins     | 1    |       | 2:38   | NML 11 Exploration                                | 3    | 0:11  | 2:08   | 0:11  | SKL 07 Combat                        |                 |

#### 基于任务的音乐

为了实现线性的音乐体验，基于任务的音乐采用了Horizontal和Vertical相结合的互动手法。

在凯尔莫罕之战任务中，战前会议采用了Vertical的分层素材，通过打击声部、弦乐声部和旋律声部的组合实现不同的情绪表达；狂猎接近的过场剧情中，通过Horizontal组织素材，将wild_hunt_approaches一曲分为4段，情绪依次增强。最后伊乐瑞斯杀死维瑟米尔的剧情采用了电影叙事镜头，配乐需要精确地对齐画面。

游戏的 *过场动画 (Cutscene)* 时间长度固定，采用固定长度地配乐适配即可。而 *剧情对白 (Dialogue)* 则分为两种情况：1. 正常对白和有时间限制的选项，这种情况最大时间固定，因此音乐只用适配最大长度即可；2. 无时间限制的选项，音乐必须是loop，且可能需要考虑玩家选择选项后音乐的transition方式。

在恶灵缠身任务中，非常成功的完成了有限时间限制选项的线性配乐，如果玩家不跳过对白的话可以获得完美的音乐体验：  
1. udalryk_enters_house_&_choice - 43s的音乐适配最大选择时间
2. baby_in_oven - 29s的transition实现剧情音乐到战斗音乐的过渡
3. combat_him_sequence - 开始战斗

<div style="position: relative; padding: 30% 45%;">
<iframe  style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="//player.bilibili.com/player.html?aid=502053125&bvid=BV1aN411Q7BF&cid=309750652&page=1" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</div><p></p>

任务配乐素材对照表如下：

| 场景           | 任务id | 子任务名                                  | 类型    | 素材命名                                              | 时长   | 备注            |
|--------------|------|---------------------------------------|-------|---------------------------------------------------|------|---------------|
| Ise of Mists | q402 | The Isle of Mists                     | 过场    | tw3_cs402_entering_mist_island                    | 0:34 |               |
|              |      |                                       | 过场    | tw3_cs402_Ciri WelcomeV5_A                        | 2:43 | 父女重逢          |
|              |      |                                       | 过场    | tw3_cs402_teleport_to_KM                          | 0:44 |               |
| kaermorhen   | q001 | Kaer Morhen                           | 过场    | tw3_cs001_geralt_and_yen                          | 2:19 |               |
|              |      |                                       | 过场    | tw3_cs001_little_ciri_intro                       | 1:02 |               |
|              |      |                                       | 过场    | tw3_cs001_nightmare_p1                            | 1:40 | 音乐从47秒起       |
|              |      |                                       | 过场    | tw3_cs001_nightmare_p2                            | 0:58 |               |
|              |      |                                       | 对白    | tw3_q001_training                                 | 1:15 |               |
|              | q110 |                                       | 对白    | tw3_q205_08a_1_replacer_ciri_wakes_up_NoFLute     | 1:36 |               |
|              | q401 | No Place Like Home                    | 过场    | tw3_cs401_sex_with_yennefer                       | 2:02 |               |
|              |      |                                       | 过场    | tw3_cs401_uma_intro                               | 0:20 |               |
|              |      |                                       | 过场    | tw3_cs401_uma_changes_into_avallach               | 1:37 |               |
|              |      |                                       | 对白    | tw3_q401_trial_of_the_grasses                     | 1:54 |               |
|              |      |                                       | 对白    | tw3_q401_avallach_interrogation                   | 1:04 |               |
|              | q403 | The Battle of Kaer Morhen             | 对白    | tw3_q403_council_Dr                               | 1:53 | 召集大家开会        |
|              |      |                                       | 对白    | tw3_q403_council_Str                              | 1:53 |               |
|              |      |                                       | 对白    | tw3_q403_council_GasleThem                        | 0:58 |               |
|              |      |                                       | 对白    | tw3_q403_council_GasleTheme_Accomp                | 0:54 | 以上四轨为同1首      |
|              |      |                                       | 过场    | tw3_cs403_wild_hunt_approaches_p1                 | 0:19 |               |
|              |      |                                       | 过场    | tw3_cs403_wild_hunt_approaches_p2                 | 0:58 |               |
|              |      |                                       | 过场    | tw3_cs403_wild_hunt_approaches_p3                 | 0:33 |               |
|              |      |                                       | 过场    | tw3_cs403_wild_hunt_approaches_p4                 | 1:23 |               |
|              |      |                                       | 过场    | tw3_hunt_or_be_hunted_chasing_edit_02_percussion  | 1:29 | 战斗音乐的鼓声部      |
|              |      |                                       | 战斗/对白 | tw3_q001_griffin_chase                            | 1:29 | 以上二轨为同1首      |
|              |      |                                       | 过场    | tw3_cs403_canaris                                 | 2:06 | 卡兰西尔现身        |
|              |      |                                       | 过场    | tw3_cs403_finale_p1                               | 0:50 | 伊乐瑞斯破门而入      |
|              |      |                                       | 过场    | tw3_cs403_finale_p2                               | 2:42 | 维瑟米尔之死        |
|              |      |                                       | 过场    | tw3_cs403_finale_unfreeze                         | 0:29 |               |
|              |      |                                       | 过场    | tw3_cs403_finale_sword                            | 1:10 |               |
|              |      |                                       | 过场    | tw3_nml_01_exploration_with_percival              | 3:00 | 维瑟米尔的葬礼       |
|              |      |                                       | 过场    | tw3_cs403_finale_explosion_p1                     | 0:52 |               |
|              |      |                                       | 过场    | tw3_cs403_finale_explosion_p2                     | 1:02 |               |
|              |      |                                       | 过场    | tw3_cs403_triss_spell_p2_start_at_32s             | 0:20 |               |
| prologue     | q001 | Lilac and Gooseberries                | 过场    | tw3_cs001_wake_up                                 | 0:28 |               |
|              |      |                                       | 过场    | tw3_cs001_tavern_intro                            | 1:23 |               |
|              |      | The Beast of White Orchard            | 过场    | tw3_cs001_griffin                                 | 1:12 |               |
|              |      |                                       | 战斗/对白 | tw3_q001_griffin_combat                           | 1:15 |               |
|              |      |                                       | 战斗/对白 | tw3_q001_griffin_chase_short                      | 0:33 |               |
|              |      |                                       | 战斗/对白 | tw3_q001_griffin_chase                            | 1:29 |               |
| wyzima       | q002 | Imperial Audience                     | 对白    | q002_geralt_talks_to_emperor                      | 1:39 |               |
|              |      |                                       | 对白    | tw3_q002_yen_in_palace                            | 1:36 |               |
| nomansgrad   | q101 | The Nilfgaardian Connection           | 过场    | cs101_wild_hunt_burns_village_Full                | 1:15 |               |
|              |      |                                       | 过场    | tw3_cs101_wild_hunt_burns_village_p2              | 0:42 |               |
|              |      |                                       | 对白    | q101_04b_talk_with_survivor                       | 1:34 |               |
|              | q102 | Bloody Baron                          | 对白    | tw3_q102_baron_in_his_chambers                    | 0:44 |               |
|              | q103 | Ciri's Story: The King of the Wolves  | 过场    | tw3_q103_02e_werewolf                             | 0:56 |               |
|              |      | Family Matters                        | 过场    | tw3_cs103_guslar_prophecy                         | 1:16 |               |
|              |      |                                       | 对白    | tw3_q103_guslar_after_ritual                      | 1:36 | 通用回忆的音乐       |
|              |      |                                       | 对白    | tw3_q103_poroniec_main                            | 1:50 | 来到墓地          |
|              |      |                                       | 过场转战斗 | tw3_cs103_poroniec_attack_choice                  | 0:24 | 选择攻击怪物        |
|              |      |                                       | 过场转战斗 | tw3_cs103_poroniec_transform                      | 0:15 | 尸婴变身          |
|              |      |                                       | 过场    | tw3_q103_blood_ritual                             | 0:56 | 巫医施血魔法        |
|              |      |                                       | 过场    | tw3_q103_blood_ritual_outro                       | 0:12 |               |
|              |      |                                       | 过场    | tw3_cs103_baron_digs_grave                        | 1:16 |               |
|              |      |                                       | 过场    | tw3_cs103_baron_taken                             | 0:28 |               |
|              |      | Ciri's Story: The Race                | 赛马    | tw3_novigrad_07_narrative                         | 2:46 | Ciri和男爵赛马     |
|              |      | Ciri's Story: Out of the Shadows      | 过场    | tw3_cs103_basilisk                                | 0:16 | 石化蜥蜴出场        |
|              |      |                                       | 战斗    | tw3_q103_ciri_saves_baron_p1_calm                 | 0:24 |               |
|              |      |                                       | 战斗    | tw3_q103_ciri_saves_baron_p2_main                 | 0:48 |               |
|              |      |                                       | 战斗    | tw3_q103_ciri_saves_baron_p3_outro                | 0:08 |               |
|              |      |                                       | 过场    | tw3_cs103_ciri_runs                               | 0:32 |               |
|              | q104 | Wandering in the Dark                 | 对白    | tw3_q104_01c2_see_wild_hunt                       | 1:10 |               |
|              |      |                                       | 对白    | tw3_q104_boss_in_last_room                        | 0:48 |               |
|              |      |                                       | 战斗    | tw3_q104_blizzard_calm                            | 1:36 |               |
|              |      |                                       | 战斗    | tw3_q104_blizzard_calm_drums_only                 | 1:19 |               |
|              |      |                                       | 战斗    | tw3_q104_blizzard_tense_segment01                 | 0:37 |               |
|              |      |                                       | 战斗    | tw3_q104_blizzard_tense_segment02                 | 0:37 |               |
|              |      |                                       | 战斗    | tw3_q104_blizzard_tense_segment03                 | 0:55 |               |
|              | q105 | Ladies of the Wood                    | 过场/对白 | cs105_geralt_meet_witch_sisters                   | 1:42 |               |
|              |      |                                       | 对白    | tw3_q105_gobelin_intro                            | 0:18 |               |
|              |      |                                       | 对白    | tw3_q105_gobelin_loop                             | 1:48 |               |
|              |      |                                       | 对白    | tw3_q105_gobelin_outro                            | 0:09 |               |
|              |      |                                       | 过场    | cs105_ciri_meet_witch_sisters                     | 1:13 |               |
|              |      |                                       | 过场    | tw3_cs105_ciri_escapes_swamps                     | 0:55 | Ciri逃出沼泽      |
|              | q106 | A Towerful of Mice                    | 过场    | tw3_cs106_anabelle_kisses_graham                  | 1:10 |               |
|              | q107 |                                       | 过场    | tw3_cs107_witch_gravehag                          | 0:37 |               |
|              |      |                                       | 过场    | tw3_cs107_witch_normal                            | 0:35 |               |
|              |      |                                       | 过场    | tw3_cs107_witch_village_burns                     | 0:53 |               |
|              | q111 | Bald Mountain                         | 过场    | tw3_cs111_witch_transform                         | 1:32 |               |
|              |      |                                       | 战斗    | tw3_q111_ciri_replacer_combat                     | 1:29 |               |
|              |      |                                       | 战斗    | tw3_q111_ciri_replacer_combat_outro               | 0:09 |               |
|              |      |                                       | 过场    | tw3_cs111_one_witch_escapes                       | 0:48 |               |
|              |      |                                       | 过场    | tw3_cs111_welcome_imlerith_pt1                    | 0:56 | 只用了很短的开头      |
|              |      |                                       | 对白    | tw3_q111_conversation_with_imlerith               | 0:36 |               |
|              |      |                                       | 战斗    | tw3_q111_combat_with_imlerith                     | 1:42 |               |
|              |      |                                       | 过场    | tw3_cs111_imlerith_dies                           | 1:14 |               |
|              |      |                                       | 对白    | tw3_q111_7_final_dlg                              | 1:36 |               |
|              | q301 | Pyres of Novigrad                     | 过场    | tw3_cs301_novigrad_opening                        | 1:32 | 火刑现场          |
|              |      |                                       | 对白    | tw3_q301_menge_shows_up                           | 2:42 | Triss家Menge现身 |
|              |      | Novigrad Dreaming                     | 过场    | tw3_cs301_dreamer_nightmare                       | 0:49 |               |
|              |      |                                       | 对白    | tw3_q301_14_dreamer_dreams_stage1                 | 1:44 | 回忆Ciri        |
|              |      |                                       | 对白    | tw3_q301_14_dreamer_dreams_stage2                 | 1:44 | 以上为同一首        |
|              |      |                                       | 对白    | tw3_nml_08_dramatic_loop                          | 1:31 |               |
|              | q302 | Get Junior                            | 对白    | tw3_q302_04a_mafia_meeting                        | 1:10 |               |
|              |      |                                       | 对白    | tw3_q302_04a_assassins                            | 0:32 | 以上为同一首        |
|              |      |                                       | 对白    | Novi_Inquisition_ThemeV3_NoChoirPerc_NoSoloVlnBrs | 2:45 |               |
|              |      |                                       | 过场    | tw3_cs302_castration                              | 0:54 |               |
|              | q303 | Count Reuven's Treasure               | 过场    | tw3_cs303_triss_kills_menge                       | 0:47 |               |
|              | q304 |                                       | 对白    | tw3_q304_05a_luiza_and_voorhis                    | 1:12 |               |
|              | q305 | Ciri's Story: Breakneck Speed         | 过场    | cs305_ciri_disappears                             | 0:59 |               |
|              |      |                                       | 过场    | cs305_convoy_in_ambush                            | 0:56 |               |
|              | q308 |                                       | 对白    | tw3_bad_news_ahead                                | 1:53 |               |
|              |      |                                       | 对白    | tw3_the_urn_full_of_sorrows_no_flute              | 1:59 |               |
|              | q309 | The Rose of Remembrance               | 做爱    | tw3_cs309_sex_with_triss_p1                       | 1:09 |               |
|              |      |                                       | 对白    | tw3_love_theme_short_harp_only                    | 1:01 |               |
|              |      |                                       | 对白    | tw3_q309_08a_goodbye                              | 0:35 |               |
|              |      |                                       | 对白    | tw3_q309_08a_goodbyePT2                           | 0:35 |               |
|              |      |                                       | 对白    | tw3_q309_08a_goodbyePT3_63bpm                     | 0:34 |               |
|              |      |                                       | 过场    | tw3_cs309_triss_leaves                            | 0:27 |               |
|              | q310 |                                       | 对白    | Novi_Inquisition_ThemeV3_Strings                  | 2:45 |               |
|              |      |                                       | 过场    | tw3_cs310_triss_yennefer_payback                  | 1:56 |               |
|              |      |                                       | 对白    | tw3_q310_ciri_talks_to_the_lodge                  | 1:35 |               |
|              |      |                                       | 对白    | tw3_the_urn_full_of_sorrows_no_flute              | 1:59 |               |
|              | q311 |                                       | 对白    | tw3_bad_news_ahead_full_with_brass                | 1:53 |               |
|              |      |                                       | 过场    | tw3_cs311_geels_dreams                            | 0:55 |               |
|              | q401 |                                       | 过场    | tw3_cs401_interception_p2                         | 1:02 |               |
|              | q503 |                                       | 过场    | tw3_cs503_geralts_departure                       | 2:05 |               |
| skellige     | q201 | Destination: Skellige                 | 过场    | tw3_cs201_storm                                   | 0:22 |               |
|              |      |                                       | 过场    | tw3_cs201_pirates_attack_p2                       | 0:22 |               |
|              |      | The King is Dead – Long Live the King | 过场    | cs201_burial                                      | 2:16 |               |
|              |      |                                       | 赛马    | q201_race_intro                                   | 0:15 |               |
|              |      |                                       | 赛马    | q201_race_loop                                    | 0:51 |               |
|              |      |                                       | 赛马    | q201_race_outro                                   | 0:11 |               |
|              |      |                                       | 战斗    | q201_fistfight_loop                               | 1:12 |               |
|              |      |                                       | 战斗    | q201_fistfight_outro                              | 0:07 |               |
|              |      |                                       | 做爱    | tw3_love_theme_full                               | 1:35 |               |
|              | q202 | The Lord of Undvik                    | 过场    | cs202_enter_the_giant                             | 1:27 | 冰霜巨人任务        |
|              |      |                                       | 过场    | cs202_harpies_destroy_bridge                      | 0:23 |               |
|              |      |                                       | 过场    | tw3_cs202_geralt_wakes_giant_(fade_5s)            | 0:30 | Boss战         |
|              |      |                                       | 战斗    | tw3_q202_ice_giant_bossfight_stage1               | 0:54 |               |
|              |      |                                       | 过场    | tw3_cs202_giant_destroy_cage_(fade_15s)           | 0:37 |               |
|              |      |                                       | 战斗    | tw3_q202_ice_giant_bossfight_stage2               | 0:54 |               |
|              |      |                                       | 过场    | tw3_cs202_giant_death_(fade_13s)                  | 0:30 | 以上5轨为同一首      |
|              | q203 | Possession                            | 过场    | tw3_cs203_udalryk_enters_house_&_choice           | 0:43 |               |
|              |      |                                       | 过场    | tw3_cs203_baby_in_oven                            | 0:29 | 选择放进火炉        |
|              |      |                                       | 战斗    | tw3_q203_combat_him_sequence                      | 1:07 |               |
|              |      |                                       | 过场    | tw3_cs203_him_shows                               | 1:34 |               |
|              |      |                                       | 过场    | tw3_cs203_give_baby_uldaryk                       | 0:43 | 选择还给uldaryk   |
|              |      |                                       | 对白    | tw3_q203_09_examine_elf_corpse_full               | 1:43 |               |
|              | q205 | The Calm Before the Storm             | 对白    | tw3_q205_07_necro_ritual                          | 1:06 |               |
|              |      |                                       | 过场    | tw3_cs205_ciri_landing                            | 0:55 |               |
|              |      |                                       | 过场    | tw3_cs205_good_night_cirilla_p1                   | 0:59 |               |
|              |      |                                       | 过场    | tw3_cs205_good_night_cirilla_p2                   | 0:25 |               |
|              |      |                                       | 对白    | tw3_q205_08a_1_replacer_ciri_wakes_up             | 1:36 |               |
|              |      |                                       | 对白    | tw3_q205_08c_replacer_astrid_at_barn              | 0:31 |               |
|              |      |                                       | 对白    | tw3_q205_ciri_replacer_wild_hunt_encounter_intro  | 0:11 |               |
|              |      |                                       | 战斗    | tw3_q205_ciri_replacer_wild_hunt_encounter_L1     | 1:40 |               |
|              |      |                                       | 战斗    | tw3_q205_ciri_replacer_wild_hunt_encounter_L2     | 1:40 |               |
|              |      |                                       | 战斗    | tw3_q205_ciri_replacer_wild_hunt_encounter_L3     | 1:40 |               |
|              | q206 | King's Gambit ( Help Hjalmar )        | 对白    |  skl_11_tavern01_intro                            | 0:18 |               |
|              |      |                                       | 对白    | skl_11_tavern01_loop_alt                          | 2:50 |               |
|              |      |                                       | 对白    | tw3_bad_news_ahead_full_with_brass                | 1:53 |               |
|              |      |                                       | 过场    | tw3_cs206_berserkers_kill_people                  | 0:16 |               |
|              |      |                                       | 过场    | tw3_cs206_ritual_of_berserkers                    | 2:06 |               |
|              |      |                                       | 过场    | tw3_q206_halgrim_transforms_into_bear             | 0:31 |               |
|              | q208 |                                       | 过场    | tw3_cs208_becca_wins_start_at_20sec               | 0:32 |               |
|              |      |                                       | 过场    | tw3_cs208_ragnar_wins_start_at_20sec              | 0:32 |               |
|              | q210 | The Sunstone                          | 过场    | tw3_cs210_ciri_destroys_lab_start_at_20-3sec      | 2:06 |               |
|              |      |                                       | 过场    | tw3_cs210_entering_skellige                       | 1:32 |               |
|              |      |                                       | 过场    | tw3_cs210_geralt_refuses_skjall                   | 1:12 |               |
|              |      |                                       | 对白    | tw3_q210_confrontation                            | 1:58 |               |
|              |      |                                       | 对白    | tw3_q210_skjall_funeral                           | 3:00 |               |
|              | q501 | On Thin Ice                           | 过场    | tw3_cs501_naglfar_arrives                         | 2:10 |               |
|              |      |                                       | 过场    | tw3_cs501_naglfar_freezes                         | 0:26 |               |
|              |      |                                       | 过场    | tw3_cs501_naglfar_freezes_2                       | 0:27 |               |
|              |      |                                       | 过场    | tw3_cs501_naglfar_freezes_b                       | 0:45 |               |
|              |      |                                       | 过场    | tw3_cs501_cam_transfer_to_geralt                  | 1:43 |               |
|              |      |                                       | 战斗    | tw3_q501_combat_with_canaris                      | 1:29 | 战卡兰希尔-杰洛特主题   |
|              |      |                                       | 过场    | tw3_cs501_underwater_teleport                     | 0:45 | 卡兰希尔的传送       |
|              |      |                                       | 过场    | tw3_cs501_crach_dies                              | 2:01 |               |
|              |      |                                       | 战斗    | tw3_q501_eredin_fight                             | 1:38 |               |
|              |      |                                       | 过场    | tw3_cs501_eredin_dies                             | 1:29 |               |
|              |      |                                       | 过场    | tw3_cs501_ciri_escapes                            | 0:45 |               |
|              | q502 | Tedd Deireadh, The Final Age          | 战斗    | tw3_skellige_bossfight_intensity1_intro           | 0:18 |               |
|              |      |                                       | 战斗    | tw3_skellige_bossfight_intensity1_loop            | 1:30 |               |
|              |      |                                       | 战斗    | tw3_skellige_bossfight_intensity2_loop            | 1:30 |               |
|              |      |                                       | 战斗    | tw3_skellige_bossfight_ending                     | 0:09 | 以上4轨为同一首      |
|              |      |                                       | 过场    | tw3_cs502_tower_shutdown                          | 0:42 |               |


#### 音乐驱动的战斗系统  

血与酒DLC，在陶森特遇到的Boss——巨人的战斗中，采用了音乐驱动AI的实现方式。程序通过wwise回调及计算技能前摇耗时，控制怪物的技能释放时机，让技能命中和音乐的重拍保持同步。

* 程序由音乐回调（按小节、拍、grid）同步节奏信息
* AI会伺机发动技能，并通过计算前摇的方式与节奏信息同步，小技能对齐节拍，大技能对齐小节
* 设置AI的最大等待时长

## References

[Wwise Tour 2016 - CD Projekt Red Witcher (2 of 6) - Ambience](https://www.youtube.com/watch?v=VJUuI_dw8Cc){:target="about:blank"}  
[Wwise Tour 2016 - CD Projekt Red Witcher (3 of 6) - Crowds and Walla](https://www.youtube.com/watch?v=bv4LBbrmu0A){:target="about:blank"}  
[Wwise Tour 2016 - CD Projekt Red Witcher (4 of 6) - Combat: Global Approach](https://www.youtube.com/watch?v=hM4hoZ3gFJs){:target="about:blank"}  
