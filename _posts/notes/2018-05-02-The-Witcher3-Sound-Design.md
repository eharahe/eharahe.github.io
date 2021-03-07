---
layout: default
title: Sound Design of The Witcher 3： Wild Hunt
permalink: /notes/the-witcher3-sound-design
tags: witcher3-cover.jpg
category: game-audio
excerpt_separator: <!--break-->
---
巫师3的音效体验是超现实主义的。游戏音乐让人如身临其境于故事情节之中；而对细节的关注确保每一个声音都能将玩家带入一个神秘的世界，并完全吸引他们，从而让现实与游戏之间的界限如此模糊。

<!--break-->

## 环境声

1. **Global Wind**， **Glabal Rain** 是全局的环境音效。它们的强度分别由 **wind_intensity** 和 **rain_intensity** 两个RTPC加以控制，并籍此在基底层选取对应的Loop素材。风声和雨声都通过多个层级进行进行混合，譬如nml_global_wind，由基底层(bass)，环绕在人物周围的两层风声(New Blend Track 1/2)和草声(grass)四层构成。
![global_wind](\assets\images\global_wind.jpg)

2. 当玩家进入森林、城市、村落、沼泽等具体场景时，通过 **amb_global_override** 这个参数（由放置在地图中的众多Trigger触发环境切换，游戏程序将其映射成对应的RTPC），把global的wind或者rain给压下去，而覆盖以局部的环境声。

3. 当玩家进入到室内场景时，同样会通过 **amb_interiors** 参数把室外音全部压下去。

4. 动物的声音也做为环境音的一部分，它们受到 **time**， **wind_intensity** 和 **rain_intensity** 的影响。打雷的声音由游戏引擎控制，并根据玩家和闪电的距离计算出真实延迟。

## 人群声

狂猎音频团队努力使Crowd和Walla声具有更好的临场感，使这些声音会随着玩家的Action而发生移动及旋转。为了让音效获得一定的距离感和方向感，人群系统被分成四个象限，程序会计算每个象限中的人群的数量和距离Listener的平均距离，然后把这些参数传给Wwise。这个系统还会检测每个NPC是在室内还是室外（是否和玩家角色处在同一个空间），以及NPC的状态，如恐惧或不恐惧。

![crowds](\assets\images\crowds.jpg)

## 战斗系统

Weapon Switches:
* 武器类型
* 被击中的护甲类型
* 武器尺寸，对于部分武器（斧头，锤子）区别尺寸，但用得不多
* 攻击类型及被击中的位置：body, head..  

这样划分的好处：程序中可以采用同样一种形式来触发巫师3庞大世界中的任何一种武器声音，使得测试工作变得简单。

![weapon](\assets\images\weapon.jpg)

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

场景资源对照表如下：

<style>
.markdown th, .markdown td{padding: 3px 4px;font-size:12px;}
</style>

| 场景                  | 探索{:style="white-space:nowarp"}  |      |        |                                                   | 战斗{:style="white-space:nowarp"} |      |        |       |                                      | 备注              |
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



战斗系统音乐对齐：  
* 音乐按小节、拍、grid回调
* AI会等待至可预期的同步点和音乐同步
* 设置AI的最大等待时长

## References

[Wwise Tour 2016 - CD Projekt Red Witcher (2 of 6) - Ambience](https://www.youtube.com/watch?v=VJUuI_dw8Cc){:target="about:blank"}  
[Wwise Tour 2016 - CD Projekt Red Witcher (3 of 6) - Crowds and Walla](https://www.youtube.com/watch?v=bv4LBbrmu0A){:target="about:blank"}  
[Wwise Tour 2016 - CD Projekt Red Witcher (4 of 6) - Combat: Global Approach](https://www.youtube.com/watch?v=hM4hoZ3gFJs){:target="about:blank"}  
