---
layout: default
title: Raag Player
permalink: /page/raag-player
tags: music world
category: page
excerpt_separator: <!--break-->
---
<style>y{cursor:pointer} table{font-size: 12px}</style>

Player for basic Raag AROH, AVROH and PAKAD playing. Tones are changed when specific Thaat is chosen.
<!--break-->

## Player

<div class="panel">
  <textarea id="player_text" rows="1" class="textarea" placeholder="S R G M P D N Ś" style="resize: none;margin-bottom: 10px;"></textarea>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-6"><strong>Thaat</strong></p>
      </div>
      <div class="level-item">
        <span class="select is-small">
          <select id="player_sel">
            <option selected>Bilaval</option>
            <option>Kafi</option>
            <option>Bhairavi</option>
            <option>Kalyan</option>
            <option>Khamaj</option>
            <option>Asavari</option>
            <option>Bhairav</option>
            <option>Marva</option>
            <option>Poorvi</option>
            <option>Todi</option>
          </select>
        </span>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <div id="play_btn" class="button is-info">
          <span class="icon">
            <i class="fas fa-play-circle"></i>
          </span>
          <span>
            Play
          </span>
         </div>
      </div>
    </div>  
  </div>
</div>

## Tones

ṃ Ṃ Ꝓ ḍ Ḍ ṇ Ṇ S r R g G m M P d D n N Ś ŕ Ŕ ǵ Ǵ ḿ Ḿ

| Names         | Are                              | Cool                            |
| ------------- |:--------------------------------:|:-------------------------------:|
| Shadja        | ***<y k="13">SA</y>***           |                                 |
| rishabha      | Komal ***<y k="14">ri</y>***     | Madhya ***<y k="15">ri</y>***   |
| Rishabha      | Suddha ***<y k="16">RI</y>***    | Tivra ***<y k="17">RI</y>***    |
| gandhara      | Ati-komal ***<y k="18">ga</y>*** | Komal ***<y k="19">ga</y>***    |
| Gandhara      | Suddha ***<y k="20">GA</y>***    | Tivra ***<y k="21">GA</y>***    |
| madhyama      | Suddha ***<y k="22">ma</y>***    | Ekasruti ***<y k="23">ma</y>*** |
| Madhyama      | Tivra ***<y k="24">MA</y>***     | Tivratara ***<y k="25">MA</y>***|
| Panchama      | ***<y k="26">PA</y>***           |                                 |
| dhaivata      | Ati-komal ***<y k="27">dha</y>***| Komal ***<y k="28">dha</y>***   |
| Dhaivata      | Suddha ***<y k="29">DHA</y>***   | Tivra ***<y k="30">DHA</y>***   |
| nishada       | Ati-komal ***<y k="31">ni</y>*** | Komal ***<y k="32">ni</y>***    |
| Nishada       | Suddha ***<y k="33">NI</y>***    | Tivra ***<y k="34">NI</y>***    |

## Thaats

| Thaat    | Eponymous Raga | Notes           | Western         | Carnatic Mela                      |
| -------- | -------------- | --------------- | --------------- | ---------------------------------- |
| Bilaval  | Bilaval        | S R G M P D N Ś | Ionian          | All pure notes                     |
| Kafi     | Kafi           | S R g M P D n Ś | Dorian          | ga and ni komal                    |
| Bhairavi | Bhairavi       | S r g M P d n Ś | Phrygian        | re, ga, dha and ni komal           |
| Kalyan   | Yaman(Kalyan)  | S R G m P D N Ś | Lydian          | MA’ tivra                          |
| Khamaj   | Khamaj         | S R G M P D n Ś | Mixolydian      | ni komal                           |
| Asavari  | Asavari        | S R g M P d n Ś | Aeolian         | ga, dha and ni komal               |
| Bhairav  | Bhairav        | S r G M P d N Ś | Double Harmonic | re and dha komal                   |
| Marva    | Marva          | S r G m P D N Ś | -               | re komal and MA’ tivra             |
| Poorvi   | Poorvi         | S r G m P d N Ś | Hungarian Minor | re and dha komal and MA’ tivra     |
| Todi     | Miyan ki Todi  | S r g m P d N Ś | -               | re, ga and dha komal and MA’ tivra |

## Raags

| SN | RAAG NAME | THAAT | AROH | AVROH | PAKAD - MUKHYANG | V    | SV      | TIME | RM |
| -- | --------- | ----- | ---- | ----- | ---------------- | ---- | ------- | ---- | ------- |
| 01 | Aabhogi | Kafi | S R g M D Ś | Ś n D M g R S | D S R g M R S | S | M | morning |  |
| 02 | Abhogi Kanhra | Kafi | S R g M D Ś | Ś D M g R S, Ḍ S | MgRS, ḌSRg, MDMg, RS, | S | M | 10 ~ 13 |  |
| 03 | Adana | Asavari | S R M P, d N Ś | Ś d n P M P, g M R S | Ś d N Ś , d , n PMP, g M R S | Ś | P | 1 ~ 4 |  |
| 04 | Ahir Bhairav | Bhairav | S r G M, P D n Ś | Ś n D P, M G r S | G M r S, Ḍ Ṇ r S | M | S | morning |  |
| 05 | Alahiya Bilaval | Bilaval | SR GMGR, GP,D N Ś | Ś NDP, DnDP, MG MRS | G R GP,MGMR, GPDnDP | D | G | morning |  |
| 06 | Asavari | Asavari | S R M P d Ś | Ś n d P M g R S | R M P, n d P, d M P, g R S | D | G | 10 ~ 13 |  |
| 07 | Bageshri | Kafi | S g M D n Ś | Ś n D M g R S | S ṇ Ḍ S, M g, M D n D, Mg, M g R S | M | S | 24 ~ 3 |  |
| 08 | Bahar | Kafi | ṇ S, g M P, g M, n D N Ś | Ś n D n P, M P g M R S | M P g M D N Ś | M | S | 10 ~ 13 |  |
| 09 | Basant | Poorvi | S G M' d ŕ S | ŕ N d P, M' G, M' d M' G , r S | M' d ŕ Ś, ŕ N d P, M' G M' G | Ś | P | 4 ~ 7 |  |
| 10 | Bhairav | Bhairav | S r G M P d N Ś | Ś N d P MG r S | DM r , GMP, MG, r S | D | R | 7 ~ 10 |  |
| 11 | Bhairavi | Bhairavi | S r g M P d n Ś | Ś n d P M g r S | S g M P, d  p | M | S | morning |  |
| 12 | Bhimpalasi | Kafi | ṇ S g M P n Ś | Ś n D P M g R S | ṇ S M, M P g, M g R S | M | S | 10 ~ 13 |  |
| 13 | Bhupali | Kalyan | S R G P D Ś | Ś D P G R S | GRŚD, SRG, PG, DPG, R S | G | D | 9 ~ 12 |  |
| 14 | Bihag | Bilaval | Ṇ S G M P N Ś | Ś N D P M G R S | ṆS, GMP, GMG, RS | G | N | 21 ~ 24 |  |
| 15 | Bihagra | Bilaval | Ṇ S G, G M P D n D P, N Ś | Ś N D, n D P, G M G R S | GMPDnDP, GMGRS | M | S | 10 ~ 13 | M' |
| 16 | Bilaskhani Todi | Bhairavi | S r g, M G, P d, n d, Ś | Ś ŕ n d P, M g r g r S | ḍ S r g, Mg, r g, r S | d | g | 10 ~ 13 |  |
| 17 | Bilaval | Bilaval | S R G M P D Ś | Ś N D P M G RS | G R GP, DNŚ | D | G | morning |  |
| 18 | Chandrakauns |  | Ṇ S g M d N Ś | Ś N d M g M g S | g M N d M g M g Ṇ S | M | S | mid night |  |
| 19 | Chayanat | Kalyan | S, RGMP, DP, ND, Ś | Ś NDP, M' PDP, RGMP, GMRS | P R, RGMP, MG MR, S | R | P | 19 ~ 22 |  |
| 20 | Darbari Kanhdra | Asavari | ṇ S R g R S, M P d n Ŕ Ś | Ś d n P, M P, g M R S | g M R S, ḍ ṇ S R S | R | P | 22 ~ 1 |  |
| 21 | Des | Kamaj | S R M P N Ś | Ś n D P M G R G S | RMP, nDP, DMGR, ǴNS | P/R | R/P | 19 ~ 22 |  |
| 22 | Deshkar | Bilaval | S R G P D, Ś | Ś D P, G R S | D D P, G P D P, G R S | D | G | 7 ~ 10 |  |
| 23 | Desi | Asavari | R g R S R ṇ S, R M P n Ś | Ś P, D M P R g S R ṇ S | RgRSŔnS, RMPDMPgRgRSŔnS | P | R | 10 ~ 13 |  |
| 24 | Dhanashri | Kafi | ṇ S, g M P, n Ś | Ś n D P, M P g, M g R S | ṇ S, GMP, g , MgRS | P | S | 13 ~ 16 |  |
| 25 | Durga | Bilaval | S R M P D Ś | Ś D P M R S | DMR, MPDMR, ḌS | M | S | 10 ~ 13 |  |
| 26 | Gaur Malhar | Kafi / Bilaval | R G R M, G R S, M R P M P, D Ś | Ś n D n P, D G P M, R G R M G R S | RGRM, GRS, PM, PD, Ś , D P M | M | S | 13 ~ 16 |  |
| 27 | Gaur Sarang | Kalyan | S, GR, M' G, PM' , DP, ND, Ś | Ś DNP, DM' PG, MR, PR, S | S, GRMG, PRS | G | D | 7 ~ 10 |  |
| 28 | Gurjari Todi | Todi | S r g M' d N Ś | Ś n d M' g r, g r S | ḍ ṇ S r g, r S, M' g r g r S | d | r | 10 ~ 13 |  |
| 29 | Hamir | Kalyan | S R S , G M D, N D Ś | Ś N D P, M' P D P, G M R S | S R S, G M D | D | G | 19 ~ 22 |  |
| 30 | Hansadhvani | Bilaval | S G R, G P, N Ś | Ś N P, G P G R, S | SGRS, ṆꝒ, GR, GPGR, S | S/G | P/N | 19 ~ 22 |  |
| 31 | Hindol | Kalyan | S G, M' D N D, Ś | Ś , N D , M' G , S | SG, M'DND, M'GS | D | G | 7 ~ 10 |  |
| 32 | Jai Jai Vanti | Kamaj | S, R g R S, ṇ ḌꝒ, R, GMP, NŚ | Ś n D P, G M, R g R S | R g RS, ṇḌꝒ, R, GM, R g R S | R | P | 10 ~ 13 |  |
| 33 | Jaunpuri | Asavari | S RM P d n Ś | Ś n d P, M g R S | RMP, n d P, d M P, gRS | d | g | 10 ~ 13 |  |
| 34 | Jhinjhoti | Khamaj | S R G M P D n Ś | Ś n D P M G R S | ḌS, RM, G, PMGR, ŚnḌꝒ | G | n | 10 ~ 13 |  |
| 35 | Jogiya | Bhairav | S r M P d Ś | Ś N d P M r S | M, r S, S r r M r S | M | S | morning |  |
| 36 | Kafi | Kafi | S R g M P D n Ś | Ś n D P M g R S | SS RR gg MM P | P | R | 1 ~ 3pm |  |
| 37 | Kalavati | Khamaj | S G M P D n Ś | Ś n D P M G R S | G M P D n D, M P D MG | P | S | 22 ~ 1 |  |
| 38 | Kamod | Kalyan | S, RP, M' PDP, NDŚ | ŚNDP, M' PDP, GMP, GM, RS | RP, M' PDP, GMP,GMRS | P | S | 19 ~ 22 |  |
| 39 | Kausi Kanhda | Asavari | S R g M P D n Ś | Ś n D P M g R S |  | M | S | 22 ~ 1 |  |
| 40 | Kedar | Kalyan | S M, M P, D P, N D Ś | Ś NDP, M' PDPM, PMRS | S M, M P, D P M, P M R S | S | M | 19 ~ 22 |  |
| 41 | Khamaj | Khamaj | S G M P D N Ś | Ś n D P M G R S | G M P D n D, M P D,MG | G | N | 22 ~ 1 |  |
| 42 | Lalit | Marva | Ṇ r G M, M' M G, M' D Ś | Ŕ N D, M' D M' M G, R S | ṆRGM, DM', MG, M'GRS | M | S | 4 ~ 7 |  |
| 43 | Madhuvanti | Todi | Ṇ S g M' P N Ś | Ś N D P M' g R S | ṆSGM'P, M'GRS | P | S | 16 ~ 19 |  |
| 44 | Madhyamad Sarang | Kafi | ṇ S R M P n Ś | Ś n P , M R S | ṇSR, RMRPR, nP, MRS | R | P | 7 ~ 10 |  |
| 45 | Malgunji | Kafi | Ḍ Ṇ S R G M, G M, D N Ś | Ś N D P M G, M g R S | GMgRS, ḌṇSRGM | S | M | night |  |
| 46 | Malkauns | Bharavi | ṇ S g M d n Ś | Ś n d M g M g S | M g, M d n d, M g, M g, S | M | S | 1 ~ 4 |  |
| 47 | Maluha Kedar | Bilaval | Ṇ R S, G M P, D P M, M P N Ś | Ś N D P, G M P G M R S | ṆSGMP, GMRS, ḌꝒṂꝒṆS | M | S | 22 ~ 1 |  |
| 48 | Mand | Bilaval | S G R M G, P M D P, N D Ś | Ś D N P, D M P G M S | S, RG, S, R, MMP, D, PDŚ | S | P | all time |  |
| 49 | Maru Bihag | Kalyan | Ṇ S G M P N Ś | Ś N D P, M' G M' G R S | M' G, RS, RS, SMGP, M' G M' G RS | G | N | 22 ~ 1 |  |
| 50 | Marva | Marva | Ṇ r G M' D N Ś | Ś N D M' G r S | D, M' G r, G M' G r S | D | R | sunset |  |
| 51 | Miya Ki Sarang | Kafi | S R M R, M P n D N Ś | Ś n D n P, M P, M R M R, S Ṇ S | SRS, ṇDṇP, ṂꝒṇḌṆS, R, MR, PMŔNS | R | P | 10 ~ 13 |  |
| 52 | Miya Malhar | Kafi | R M R S, M R P, M P n D, N Ś | Ś n D, n M P, g M R S | RMR S ṇ Ꝓ, Ṃ Ꝓ ṇ Ḍ Ṇ S, P g M R S | M | S | 22 ~ 1 |  |
| 53 | Multani | Todi | Ṇ S g M' P N Ś | Ś N d P M' g r S | Ṇ S, M' g, P g, r S | P | S | 13 ~ 16 |  |
| 54 | Nand - Anandi | Kalyan | S G M , P D , N P Ś | Ś D, N P, D M' P, G M D P R S | GMDP, RSGM | S | P | 22 ~ 1 |  |
| 55 | Pahadi | Bilaval | S R G P D Ś | Ś D P , G P, G R S | G, RS, Ḍ, ꝒḌS | S | P | all time |  |
| 56 | Paraj | Poorvi | Ṇ S G, M' d N Ś | Ś N d P, M' P d P, G M G, M' G r S | Ś, N d P, M' P d P, G M G | Ś | P | 4 ~ 7 |  |
| 57 | Patdeep | Kafi | S g M P N Ś | Ś N D P M g R S | D P, g, M P N Ś | P | S | 13 ~ 16 | N↑ |
| 58 | Piloo | Kafi | Ṇ S G M P N Ś | Ś n D P n d P d P M g S Ṇ S | Ꝓ Ṇ S R g S, G M P g S, Ṇ S | G | N | 13 ~ 16 |  |
| 59 | Pooriya | Marva | Ṇ r S, G, M' D, N ŕŚ | Ś N D M' G r S | G, Ṇ r S, ṆḌṆṂ’Ḍ, r S | G | M' | sunset |  |
| 60 | Pooriya Dhanashri | Poorvi | Ṇ r G M' P, D P, N Ś | Ś N d P, M' G M' r G, r S | Ṇ r G, M' P, DP, M' G, M' r G, r S | P | r | sunset |  |
| 61 | Poorvi | Poorvi | Ṇ r G, M' P, d N Ś | Ś N d P M', GMG, r S | Ṇ, S r G, MG, M' G r S | G | N | sunset |  |
| 62 | Rageshwari | Khamaj | S G M D N Ś | Ś n D M G R S | GMDN Ś n DM, GMRS, Ḍ ṇ S G M | M | S | 22 ~ 1 |  |
| 63 | Ramdasi Malhar | Kafi | Ṇ S, R G M, n D n P N Ś | Ś n D n P, D P M, P g, M P g, M R S | RPMGM, nPgMRS | M | S | rainy season |  |
| 64 | Ramkali | Bhairav | S r G M P d N Ś | Ś N d P, M' P d n d P, G M r S | d P, M'PdndP, GM', r PMG r S | P | S | morning |  |
| 65 | Rasranjani | Bilaval | S R M D N Ś | Ś N D M, D M R S |  | M | S | midnight |  |
| 66 | Saraswati | Khamaj | S R M' P, n D P, n D Ś | Ŕ n D P M' R M P, M' R S |  | P | R | midnight |  |
| 67 | Shankara | Bilaval | S G P N Ś | Ś NP, ND Ś NP, GPGS | Ś NP, ND Ś NP, GPGS | G | N | 22 ~ 1 |  |
| 68 | Shivranjani | Kafi | S R g P D Ś | Ś D P g R S |  | P | S | midnight |  |
| 69 | Shri | Poorvi | S r r S, r M' P N Ś | Ś Nd P, M' P d M' G r, P r G r S | S r r S, r M' P, d M' G r G r S | R | P | sunset |  |
| 70 | Shuddh Kalyan | Kalyan | S R G P D Ś | Ś N D, N D P, M' G R, G R P R G R S | GRS, ṆḌṆḌꝒ, S, GR, PR, GRS | G | D | 19 ~ 22 |  |
| 71 | Shuddh Sarang | Kafi | S R M P, M' P N Ś | Ś N D P M' G R S |  | R | P | 10 ~ 13 |  |
| 72 | Shyam Kalyan | Kalyan | Ṇ S R M' P N Ś | Ś N D P M' P G M R Ṇ S | Ṇ S R M' P, G M R Ṇ S | P | S | 19 ~ 22 |  |
| 73 | Sindhu Bhairavi | Asavari | S R g M P d n Ś | Ś n d P M g R S |  | M | S | 10 ~ 13 |  |
| 74 | Sohni | Marva | S G M' D N Ś | Ś ŕ Ś N D, G M' D, G M' G, M' G r S | Ś N D, G M' DNŚ ŕ Ś | D | G | 4 ~ 7 |  |
| 75 | Sughrai | Kafi | ṇ S R g, M P, N Ś | Ś D, N P, M P, g , M R S | ṇ S R g, MP n P, DP, MP g MRS | P | S | 10 ~ 13 |  |
| 76 | Tilak Kamod | Khamaj | S R G S, R M P D, M P, Ś | Ś P D M G, S R G, S Ṇ | ꝒṆSRG, S, RPMG, ŚN | R | P | 22 ~ 1 |  |
| 77 | Tilang | Khamaj | S G M P N Ś | Ś n P M G S | ṆSGMP, NŚ , Ś nP, GMGS | G | N | 22 ~ 1 |  |
| 78 | Todi | Todi | S r g M' P d N Ś | Ś N d P M' g r S | ḍ NS, r , g r, s, M'g r g r S | d | g | 10 ~ 13 |  |
| 79 | Vibhas | Bhairav | S r G P d P Ś | Ś d P G P d P, G r S | d , P , GP, G r S | d | G | morning |  |
| 80 | Vridavani Sarang | Kafi | S R M P N Ś | Ś n P M R S | Ṇ S R, MR, PMR, S | P | R | 10 ~ 13 |  |
| 81 | Yaman Kalyan | Kalyan | S R G M' P D N Ś | Ś N D P M' G RS | Ṇ R G, R S, P M' G R S | G | N | 19 ~ 22 |  |
| 82 | Yamani Bilaval | Bilaval | Ṇ R G, M R G P, M' P, D N Ś | Ś N D P, M' P M G, R G R S | Ṇ R G, M' PMG, RGRS | P | S | morning |  |


<script>
var ctx = new window.AudioContext();
var toneMap = new Map();

var audioCacheArr = [
  {fn:'m Suddha1', cache:null}, //0
  {fn:'m Ekasruti1', cache:null},
  {fn:'M Tivra1', cache:null},
  {fn:'M Tivratara1', cache:null},
  {fn:'P1', cache:null},
  {fn:'d Ati-komal1', cache:null},
  {fn:'d Komal1', cache:null},
  {fn:'D Suddha1', cache:null},
  {fn:'D Tivra1', cache:null},
  {fn:'n Ati-komal1', cache:null},

  {fn:'n Komal1', cache:null}, //10
  {fn:'N Suddha1', cache:null},
  {fn:'N Tivra1', cache:null},
  {fn:'S2', cache:null},
  {fn:'r Komal2', cache:null},
  {fn:'r Madhya2', cache:null},
  {fn:'R Suddha2', cache:null},
  {fn:'R Tivra2', cache:null},
  {fn:'g Ati-komal2', cache:null},
  {fn:'g Komal2', cache:null},

  {fn:'G Suddha2', cache:null}, //20 
  {fn:'G Tivra2', cache:null},
  {fn:'m Suddha2', cache:null},
  {fn:'m Ekasruti2', cache:null},
  {fn:'M Tivra2', cache:null},
  {fn:'M Tivratara2', cache:null},
  {fn:'P2', cache:null},
  {fn:'d Ati-komal2', cache:null},
  {fn:'d Komal2', cache:null},
  {fn:'D Suddha2', cache:null},

  {fn:'D Tivra2', cache:null}, //30
  {fn:'n Ati-komal2', cache:null},
  {fn:'n Komal2', cache:null},
  {fn:'N Suddha2', cache:null},
  {fn:'N Tivra2', cache:null},
  {fn:'S3', cache:null},
  {fn:'r Komal3', cache:null},
  {fn:'r Madhya3', cache:null},
  {fn:'R Suddha3', cache:null},
  {fn:'R Tivra3', cache:null},

  {fn:'g Ati-komal3', cache:null}, //40
  {fn:'g Komal3', cache:null},
  {fn:'G Suddha3',cache:null},
  {fn:'G Tivra3',cache:null},
  {fn:'m Suddha3',cache:null},
  {fn:'m Ekasruti3',cache:null},
  {fn:'M Tivra3',cache:null},
  {fn:'M Tivratara3',cache:null}
];

function init(){
  // set tone map
  toneMap.set('ṃ', {Bilaval:0});
  toneMap.set('Ṃ', {Bilaval:2});
  toneMap.set('Ꝓ', {Bilaval:4});
  toneMap.set('ḍ', {Bilaval:5});
  toneMap.set('Ḍ', {Bilaval:7});
  toneMap.set('ṇ', {Bilaval:9});
  toneMap.set('Ṇ', {Bilaval:11});

  toneMap.set('S', {Bilaval:13});
  toneMap.set('r', {Bilaval:14});
  toneMap.set('R', {Bilaval:16});
  toneMap.set('g', {Bilaval:18});
  toneMap.set('G', {Bilaval:20});
  toneMap.set('m', {Bilaval:22});
  toneMap.set('M', {Bilaval:24});
  toneMap.set('P', {Bilaval:26});
  toneMap.set('d', {Bilaval:27});
  toneMap.set('D', {Bilaval:29});
  toneMap.set('n', {Bilaval:31});
  toneMap.set('N', {Bilaval:33});

  toneMap.set('Ś', {Bilaval:35});
  toneMap.set('ŕ', {Bilaval:36});
  toneMap.set('Ŕ', {Bilaval:38});
  toneMap.set('ǵ', {Bilaval:40});
  toneMap.set('Ǵ', {Bilaval:42});
  toneMap.set('ḿ', {Bilaval:44});
  toneMap.set('Ḿ', {Bilaval:46});

  // download audio files
  for(i in audioCacheArr){
    loadAudioFile(+i, false);
    console.log('i='+i);
  }
}

function playSound(ind) {
  var source = ctx.createBufferSource();
  source.buffer = audioCacheArr[ind].cache;
  source.loop = false;
  source.connect(ctx.destination);
  source.start(); 
}
function createBuffer(arrayBuffer, ind, isPlay) {
  ctx.decodeAudioData(arrayBuffer, function(buffer) { 
    var audioBuffer = buffer;
    audioCacheArr[ind].cache = audioBuffer;
    if(isPlay){
      playSound(ind);
    }
  }, function(e) {
    console.log('Error decoding file', e);
  });
}
function loadAudioFile(ind, isPlay) {
  if(audioCacheArr[ind].cache){
    if(isPlay){
      playSound(ind);
    }
  }
  else{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', getAudioURL(audioCacheArr[ind].fn), true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
      createBuffer(this.response, ind, isPlay);
    };
    xhr.send();
  }
}
function getAudioURL(k) {
  let pre = '/assets/audio/raag/',
      post = '.ogg';
  return pre + audioCacheArr[k].fn + post;
}
//ṃ Ṃ Ꝓ ḍ Ḍ ṇ Ṇ S r R g G m M P d D n N Ś ŕ Ŕ ǵ Ǵ ḿ Ḿ

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function playRaag(str, thaat){
  var tArr = str.split("");
  while(tArr.length > 0){
    playTone(tArr.splice(0, 1)[0], thaat);
    await sleep(600);
  }
}
function playTone(tone, thaat){
  var toneVal = (toneMap.get(tone));
  console.log('play: ' + tone);
  if(toneVal){
    loadAudioFile(toneVal[thaat], true);
  }
}
$('#play_btn').click(function(e){
  var t = $('#player_text'),
      s = $('#player_sel option:selected');
  playRaag(t.val(), s.text());
})
$('y').click(function(e){
  loadAudioFile($(e.target).attr('k'), true);
})
init();
</script>
