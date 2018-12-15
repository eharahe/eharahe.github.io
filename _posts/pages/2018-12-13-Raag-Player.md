---
layout: default
title: Simple Raag Player
permalink: /page/raag-player
tags: music world
category: page
excerpt_separator: <!--break-->
---
<style>
y{cursor:pointer} 
table{font-size: 12px;box-shadow: 1px 1px 6px #ccc;}
table th{background-color: #363636;line-height: 2;color: #ddd;}
</style>

Player for basic Raag AROH, AVROH and PAKAD playing. Tones are changed when specific Thaat is chosen.
<!--break-->

## Player

<div class="panel">
  <div class="label">ṃ Ṃ Ꝓ ḍ Ḍ ṇ Ṇ S r R g G m M P d D n N Ś ŕ Ŕ ǵ Ǵ ḿ Ḿ</div>
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

| Thaat    | Eponymous Raga | Notes           | Western         | Carnatic Mela                               |
| -------- | -------------- | --------------- | --------------- | ------------------------------------------- |
| Bilaval  | Bilaval        | S R G m P D N Ś | Ionian          | All shuddha, and ni komal In Avroh          |
| Kafi     | Kafi           | S R g m P D n Ś | Dorian          | ga and ni komal                             |
| Bhairavi | Bhairavi       | S r g m P d n Ś | Phrygian        | re, ga, dha and ni komal                    |
| Kalyan   | Yaman(Kalyan)  | S R G M P D N Ś | Lydian          | MA tivra                                    |
| Khamaj   | Khamaj         | S R G m P D n Ś | Mixolydian      | ni komal                                    |
| Asavari  | Asavari        | S R g M P d n Ś | Aeolian         | ga, dha and ni komal               |
| Bhairav  | Bhairav        | S r G M P d N Ś | Double Harmonic | re and dha komal                   |
| Marva    | Marva          | S r G m P D N Ś | -               | re komal and MA’ tivra             |
| Poorvi   | Poorvi         | S r G m P d N Ś | Hungarian Minor | re and dha komal and MA’ tivra     |
| Todi     | Miyan ki Todi  | S r g m P d N Ś | -               | re, ga and dha komal and MA’ tivra |

## Raags

| SN   | RAAG   NAME       | THAAT          | AROH                       | AVROH                    | PAKAD - MUKHYANG                  | V    | SV   | TIME         | RM   |
| ---- | ----------------- | -------------- | -------------------------- | ------------------------ | --------------------------------- | ---- | ---- | ------------ | ---- |
| 1    | Aabhogi           | Kafi           | SRgmDŚ                     | ŚnDmgRS                  | DSRgmRS                           | S    | m    | morning      |      |
| 2    | Abhogi Kanhra     | Kafi           | SRgmDŚ                     | ŚDmgRS, ḌS               | mgRS, ḌSRg, mDmg, RS,             | S    | m    | 10 ~ 13      |      |
| 3    | Adana             | Asavari        | SRmP, dNŚ                  | ŚdnPmP, gmRS             | ŚdNŚ, d, nPmP, gmRS               | Ś    | P    | 1 ~ 4        |      |
| 4    | Ahir Bhairav      | Bhairav        | SrGm, PDnŚ                 | ŚnDP, mGrS               | GmrS, ḌṆrS                        | m    | S    | morning      |      |
| 5    | Alahiya Bilaval   | Bilaval        | SRGmGR, GP, DNŚ            | ŚNDP, DnDP, mGmRS        | GRGP, mGmR, GPDnDP                | D    | G    | morning      |      |
| 6    | Asavari           | Asavari        | SRmPdŚ                     | ŚndPmgRS                 | RmP, ndP, dmP, gRS                | D    | G    | 10 ~ 13      |      |
| 7    | Bageshri          | Kafi           | SgmDnŚ                     | ŚnDmgRS                  | SṇḌS, mg, mDnD, mg, mgRS          | m    | S    | 24 ~ 3       |      |
| 8    | Bahar             | Kafi           | ṇS, gmP, gm, nDNŚ          | ŚnDnP, mPgmRS            | mPgmDNŚ                           | m    | S    | 10 ~ 13      |      |
| 9    | Basant            | Poorvi         | SGMdŕ S                    | ŕ NdP, MG, MdMG, rS      | Mdŕ Ś, ŕ NdP, MGMG                | Ś    | P    | 4 ~ 7        |      |
| 10   | Bhairav           | Bhairav        | SrGmPdNŚ                   | ŚNdPmGrS                 | Dmr, GmP, mG, rS                  | D    | R    | 7 ~ 10       |      |
| 11   | **Bhairavi**      | Bhairavi       | S-r-g-m-P-d-n-Ś            | Ś-n-d-P-m-g-r-S          | ṇSgmdPmgmgrS                      | m    | S    | morning      |      |
| 12   | Bhimpalasi        | Kafi           | ṇSgmPnŚ                    | ŚnDPmgRS                 | ṇSm, mPg, mgRS                    | m    | S    | 10 ~ 13      |      |
| 13   | Bhupali           | Kalyan         | SRGPDŚ                     | ŚDPGRS                   | GRŚD, SRG, PG, DPG, RS            | G    | D    | 9 ~ 12       |      |
| 14   | Bihag             | Bilaval        | ṆSGmPNŚ                    | ŚNDPmGRS                 | ṆS, GmP, GmG, RS                  | G    | N    | 21 ~ 24      |      |
| 15   | Bihagra           | Bilaval        | ṆSG, GmPDnDP, NŚ           | ŚND, nDP, GmGRS          | GmPDnDP, GmGRS                    | m    | S    | 10 ~ 13      | M    |
| 16   | Bilaskhani Todi   | Bhairavi       | Srg, mG, Pd, nd, Ś         | Śŕ ndP, mgrgrS           | ḍSrg, mg, rg, rS                  | d    | g    | 10 ~ 13      |      |
| 17   | **Bilaval**       | Bilaval        | S-GR-GP-DN-Ś               | ŚNDP-DnDP-mGmRS          | GPDnŚ, ŚNDnDP, mGmRS              | D    | G    | morning      |      |
| 18   | Chandrakauns      |                | ṆSgmdNŚ                    | ŚNdmgmgS                 | gmNdmgmg ṆS                       | m    | S    | mid night    |      |
| 19   | Chayanat          | Kalyan         | S, RGmP, DP, ND, Ś         | ŚNDP, MPDP, RGmP, GmRS   | PR, RGmP, mGmR, S                 | R    | P    | 19 ~ 22      |      |
| 20   | Darbari Kanhdra   | Asavari        | ṇSRgRS, mPdnŔ Ś            | ŚdnP, mP, gmRS           | gmRS,  ḍ ṇSRS                     | R    | P    | 22 ~ 1       |      |
| 21   | Des               | Kamaj          | SRmPNŚ                     | ŚnDPmGRGS                | RmP, nDP, DmGR, ǴNS               | P/R  | R/P  | 19 ~ 22      |      |
| 22   | Deshkar           | Bilaval        | SRGPD, Ś                   | ŚDP, GRS                 | DDP, GPDP, GRS                    | D    | G    | 7 ~ 10       |      |
| 23   | Desi              | Asavari        | RgRSR ṇS, RmPnŚ            | ŚP, DmPRgSR ṇS           | RgRSŔnS, RmPDmPgRgRSŔnS           | P    | R    | 10 ~ 13      |      |
| 24   | Dhanashri         | Kafi           | ṇS, gmP, nŚ                | ŚnDP, mPg, mgRS          | ṇS, GmP, g, mgRS                  | P    | S    | 13 ~ 16      |      |
| 25   | Durga             | Bilaval        | SRmPDŚ                     | ŚDPmRS                   | DmR, mPDmR,  ḌS                   | m    | S    | 10 ~ 13      |      |
| 26   | Gaur Malhar       | Kafi / Bilaval | RGRm, GRS, mRPmP, DŚ       | ŚnDnP, DGPm, RGRmGRS     | RGRm, GRS, Pm, PD, Ś, DPm         | m    | S    | 13 ~ 16      |      |
| 27   | Gaur Sarang       | Kalyan         | S, GR, MG, PM, DP, ND, Ś   | ŚDNP, DMPG, mR, PR, S    | S, GRmG, PRS                      | G    | D    | 7 ~ 10       |      |
| 28   | Gurjari Todi      | Todi           | SrgMdNŚ                    | ŚndMgr, grS              | ḍ ṇSrg, rS, MgrgrS                | d    | r    | 10 ~ 13      |      |
| 29   | Hamir             | Kalyan         | SRS, GmD, NDŚ              | ŚNDP, MPDP, GmRS         | SRS, GmD                          | D    | G    | 19 ~ 22      |      |
| 30   | Hansadhvani       | Bilaval        | SGR, GP, NŚ                | ŚNP, GPGR, S             | SGRS,  ṆꝒ, GR, GPGR, S            | S/G  | P/N  | 19 ~ 22      |      |
| 31   | Hindol            | Kalyan         | SG, MDND, Ś                | Ś, ND, MG, S             | SG, MDND, MGS                     | D    | G    | 7 ~ 10       |      |
| 32   | Jai Jai Vanti     | Kamaj          | S, RgRS,  ṇ ḌꝒ, R, GmP, NŚ | ŚnDP, Gm, RgRS           | RgRS,  ṇḌꝒ, R, Gm, RgRS           | R    | P    | 10 ~ 13      |      |
| 33   | Jaunpuri          | Asavari        | SRmPdnŚ                    | ŚndP, mgRS               | RmP, ndP, dmP, gRS                | d    | g    | 10 ~ 13      |      |
| 34   | Jhinjhoti         | Khamaj         | SRGmPDnŚ                   | ŚnDPmGRS                 | ḌS, Rm, G, PmGR, ŚnḌꝒ             | G    | n    | 10 ~ 13      |      |
| 35   | Jogiya            | Bhairav        | SrmPdŚ                     | ŚNdPmrS                  | m, rS, SrrmrS                     | m    | S    | morning      |      |
| 36   | **Kafi**          | Kafi           | S-R-g-m-P-D-n-Ś            | Ś-n-D-P-m-g-R-S          | SSRRggmmP                         | P    | R    | 1 ~ 3pm      |      |
| 37   | Kalavati          | Khamaj         | SGmPDnŚ                    | ŚnDPmGRS                 | GmPDnD, mPDmG                     | P    | S    | 22 ~ 1       |      |
| 38   | Kamod             | Kalyan         | S, RP, MPDP, NDŚ           | ŚNDP, MPDP, GmP, Gm, RS  | RP, MPDP, GmP, GmRS               | P    | S    | 19 ~ 22      |      |
| 39   | Kausi Kanhda      | Asavari        | SRgmPDnŚ                   | ŚnDPmgRS                 |                                   | m    | S    | 22 ~ 1       |      |
| 40   | Kedar             | Kalyan         | Sm, mP, DP, NDŚ            | ŚNDP, MPDPm, PmRS        | Sm, mP, DPm, PmRS                 | S    | m    | 19 ~ 22      |      |
| 41   | **Khamaj**        | Khamaj         | S-G-m-P-D-N-Ś              | Ś-n-D-P-m-G-RS           | GmPDnD, mPD, mG                   | G    | N    | 22 ~ 1       |      |
| 42   | Lalit             | Marva          | ṆrGm, MmG, MDŚ             | Ŕ ND, MDMmG, RS          | ṆRGm, DM, mG, MGRS                | m    | S    | 4 ~ 7        |      |
| 43   | Madhuvanti        | Todi           | ṆSgMPNŚ                    | ŚNDPMgRS                 | ṆSGMP, MGRS                       | P    | S    | 16 ~ 19      |      |
| 44   | Madhyamad Sarang  | Kafi           | ṇSRmPnŚ                    | ŚnP, mRS                 | ṇSR, RmRPR, nP, mRS               | R    | P    | 7 ~ 10       |      |
| 45   | Malgunji          | Kafi           | Ḍ ṆSRGm, Gm, DNŚ           | ŚNDPmG, mgRS             | GmgRS,  ḌṇSRGm                    | S    | m    | night        |      |
| 46   | Malkauns          | Bharavi        | ṇSgmdnŚ                    | ŚndmgmgS                 | mg, mdnd, mg, mg, S               | m    | S    | 1 ~ 4        |      |
| 47   | Maluha Kedar      | Bilaval        | ṆRS, GmP, DPm, mPNŚ        | ŚNDP, GmPGmRS            | ṆSGmP, GmRS,  ḌꝒṂꝒṆS              | m    | S    | 22 ~ 1       |      |
| 48   | Mand              | Bilaval        | SGRmG, PmDP, NDŚ           | ŚDNP, DmPGmS             | S, RG, S, R, mmP, D, PDŚ          | S    | P    | all time     |      |
| 49   | Maru Bihag        | Kalyan         | ṆSGmPNŚ                    | ŚNDP, MGMGRS             | MG, RS, RS, SmGP, MGMGRS          | G    | N    | 22 ~ 1       |      |
| 50   | Marva             | Marva          | ṆrGMDNŚ                    | ŚNDMGrS                  | D, MGr, GMGrS                     | D    | R    | sunset       |      |
| 51   | Miya Ki Sarang    | Kafi           | SRmR, mPnDNŚ               | ŚnDnP, mP, mRmR, S ṆS    | SRS,  ṇDṇP,  ṂꝒṇḌṆS, R, mR, PmŔNS | R    | P    | 10 ~ 13      |      |
| 52   | Miya Malhar       | Kafi           | RmRS, mRP, mPnD, NŚ        | ŚnD, nmP, gmRS           | RmRS ṇ Ꝓ,  Ṃ Ꝓ ṇ Ḍ ṆS, PgmRS      | m    | S    | 22 ~ 1       |      |
| 53   | Multani           | Todi           | ṆSgMPNŚ                    | ŚNdPMgrS                 | ṆS, Mg, Pg, rS                    | P    | S    | 13 ~ 16      |      |
| 54   | Nand - Anandi     | Kalyan         | SGm, PD, NPŚ               | ŚD, NP, DMP, GmDPRS      | GmDP, RSGm                        | S    | P    | 22 ~ 1       |      |
| 55   | Pahadi            | Bilaval        | SRGPDŚ                     | ŚDP, GP, GRS             | G, RS,  Ḍ,  ꝒḌS                   | S    | P    | all time     |      |
| 56   | Paraj             | Poorvi         | ṆSG, MdNŚ                  | ŚNdP, MPdP, GmG, MGrS    | Ś, NdP, MPdP, GmG                 | Ś    | P    | 4 ~ 7        |      |
| 57   | Patdeep           | Kafi           | SgmPNŚ                     | ŚNDPmgRS                 | DP, g, mPNŚ                       | P    | S    | 13 ~ 16      | N↑   |
| 58   | Piloo             | Kafi           | ṆSGmPNŚ                    | ŚnDPndPdPmgS ṆS          | Ꝓ ṆSRgS, GmPgS,  ṆS               | G    | N    | 13 ~ 16      |      |
| 59   | Pooriya           | Marva          | ṆrS, G, MD, NŕŚ            | ŚNDMGrS                  | G,  ṆrS,  ṆḌṆṂ’Ḍ, rS              | G    | M    | sunset       |      |
| 60   | Pooriya Dhanashri | Poorvi         | ṆrGMP, DP, NŚ              | ŚNdP, MGMrG, rS          | ṆrG, MP, DP, MG, MrG, rS          | P    | r    | sunset       |      |
| 61   | Poorvi            | Poorvi         | ṆrG, MP, dNŚ               | ŚNdPM, GmG, rS           | Ṇ, SrG, mG, MGrS                  | G    | N    | sunset       |      |
| 62   | Rageshwari        | Khamaj         | SGmDNŚ                     | ŚnDmGRS                  | GmDNŚnDm, GmRS,  Ḍ ṇSGm           | m    | S    | 22 ~ 1       |      |
| 63   | Ramdasi Malhar    | Kafi           | ṆS, RGm, nDnPNŚ            | ŚnDnP, DPm, Pg, mPg, mRS | RPmGm, nPgmRS                     | m    | S    | rainy season |      |
| 64   | Ramkali           | Bhairav        | SrGmPdNŚ                   | ŚNdP, MPdndP, GmrS       | dP, MPdndP, GM, rPmGrS            | P    | S    | morning      |      |
| 65   | Rasranjani        | Bilaval        | SRmDNŚ                     | ŚNDm, DmRS               |                                   | m    | S    | midnight     |      |
| 66   | Saraswati         | Khamaj         | SRMP, nDP, nDŚ             | Ŕ nDPMRmP, MRS           |                                   | P    | R    | midnight     |      |
| 67   | Shankara          | Bilaval        | SGPNŚ                      | ŚNP, NDŚNP, GPGS         | ŚNP, NDŚNP, GPGS                  | G    | N    | 22 ~ 1       |      |
| 68   | Shivranjani       | Kafi           | SRgPDŚ                     | ŚDPgRS                   |                                   | P    | S    | midnight     |      |
| 69   | Shri              | Poorvi         | SrrS, rMPNŚ                | ŚNdP, MPdMGr, PrGrS      | SrrS, rMP, dMGrGrS                | R    | P    | sunset       |      |
| 70   | Shuddh Kalyan     | Kalyan         | SRGPDŚ                     | ŚND, NDP, MGR, GRPRGRS   | GRS,  ṆḌṆḌꝒ, S, GR, PR, GRS       | G    | D    | 19 ~ 22      |      |
| 71   | Shuddh Sarang     | Kafi           | SRmP, MPNŚ                 | ŚNDPMGRS                 |                                   | R    | P    | 10 ~ 13      |      |
| 72   | Shyam Kalyan      | Kalyan         | ṆSRMPNŚ                    | ŚNDPMPGmR ṆS             | ṆSRMP, GmR ṆS                     | P    | S    | 19 ~ 22      |      |
| 73   | Sindhu Bhairavi   | Asavari        | SRgmPdnŚ                   | ŚndPmgRS                 |                                   | m    | S    | 10 ~ 13      |      |
| 74   | Sohni             | Marva          | SGMDNŚ                     | Śŕ ŚND, GMD, GMG, MGrS   | ŚND, GMDNŚŕ Ś                     | D    | G    | 4 ~ 7        |      |
| 75   | Sughrai           | Kafi           | ṇSRg, mP, NŚ               | ŚD, NP, mP, g, mRS       | ṇSRg, mPnP, DP, mPgmRS            | P    | S    | 10 ~ 13      |      |
| 76   | Tilak Kamod       | Khamaj         | SRGS, RmPD, mP, Ś          | ŚPDmG, SRG, S Ṇ          | ꝒṆSRG, S, RPmG, ŚN                | R    | P    | 22 ~ 1       |      |
| 77   | Tilang            | Khamaj         | SGmPNŚ                     | ŚnPmGS                   | ṆSGmP, NŚ, ŚnP, GmGS              | G    | N    | 22 ~ 1       |      |
| 78   | Todi              | Todi           | SrgMPdNŚ                   | ŚNdPMgrS                 | ḍNS, r, gr, s, MgrgrS             | d    | g    | 10 ~ 13      |      |
| 79   | Vibhas            | Bhairav        | SrGPdPŚ                    | ŚdPGPdP, GrS             | d, P, GP, GrS                     | d    | G    | morning      |      |
| 80   | Vridavani Sarang  | Kafi           | SRmPNŚ                     | ŚnPmRS                   | ṆSR, mR, PmR, S                   | P    | R    | 10 ~ 13      |      |
| 81   | **Yaman Kalyan**  | Kalyan         | Ṇ-R-G-M-D-N-Ś              | Ś-N-D-P-M-G-R-S          | ṆRGMDNŚ, ŚNGMGRS                  | G    | N    | 19 ~ 22      |      |
| 82   | Yamani Bilaval    | Bilaval        | ṆRG, mRGP, MP, DNŚ         | ŚNDP, MPmG, RGRS         | ṆRG, MPmG, RGRS                   | P    | S    | morning      |      |


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
  toneMap.set('ṃ', {Bilaval: 0, Kafi: 0, Bhairavi: 0, Kalyan: 0, Khamaj: 0, Asavari: 0, Bhairav: 0, Marva: 0, Poorvi: 0, Todi: 0});
  toneMap.set('Ṃ', {Bilaval: 2, Kafi: 2, Bhairavi: 2, Kalyan: 2, Khamaj: 2, Asavari: 2, Bhairav: 2, Marva: 2, Poorvi: 2, Todi: 2});
  toneMap.set('Ꝓ', {Bilaval: 4, Kafi: 4, Bhairavi: 4, Kalyan: 4, Khamaj: 4, Asavari: 4, Bhairav: 4, Marva: 4, Poorvi: 4, Todi: 4});
  toneMap.set('ḍ', {Bilaval: 6, Kafi: 6, Bhairavi: 6, Kalyan: 6, Khamaj: 6, Asavari: 6, Bhairav: 6, Marva: 6, Poorvi: 6, Todi: 5});
  toneMap.set('Ḍ', {Bilaval: 7, Kafi: 7, Bhairavi: 7, Kalyan: 7, Khamaj: 7, Asavari: 7, Bhairav: 7, Marva: 7, Poorvi: 7, Todi: 7});
  toneMap.set('ṇ', {Bilaval:10, Kafi:10, Bhairavi:10, Kalyan:10, Khamaj:10, Asavari:10, Bhairav:10, Marva:10, Poorvi:10, Todi: 9});
  toneMap.set('Ṇ', {Bilaval:11, Kafi:11, Bhairavi:11, Kalyan:11, Khamaj:11, Asavari:11, Bhairav:11, Marva:11, Poorvi:11, Todi:11});

  toneMap.set('S', {Bilaval:13, Kafi:13, Bhairavi:13, Kalyan:13, Khamaj:13, Asavari:13, Bhairav:13, Marva:13, Poorvi:13, Todi:13});
  toneMap.set('r', {Bilaval:14, Kafi:14, Bhairavi:14, Kalyan:14, Khamaj:14, Asavari:14, Bhairav:14, Marva:14, Poorvi:14, Todi:14});
  toneMap.set('R', {Bilaval:16, Kafi:16, Bhairavi:16, Kalyan:16, Khamaj:16, Asavari:16, Bhairav:16, Marva:16, Poorvi:16, Todi:16});
  toneMap.set('g', {Bilaval:19, Kafi:19, Bhairavi:19, Kalyan:19, Khamaj:19, Asavari:19, Bhairav:19, Marva:19, Poorvi:19, Todi:18});
  toneMap.set('G', {Bilaval:20, Kafi:20, Bhairavi:20, Kalyan:20, Khamaj:20, Asavari:20, Bhairav:20, Marva:20, Poorvi:20, Todi:20});
  toneMap.set('m', {Bilaval:22, Kafi:22, Bhairavi:22, Kalyan:22, Khamaj:22, Asavari:22, Bhairav:22, Marva:22, Poorvi:22, Todi:22});
  toneMap.set('M', {Bilaval:24, Kafi:24, Bhairavi:24, Kalyan:24, Khamaj:24, Asavari:24, Bhairav:24, Marva:24, Poorvi:24, Todi:24});
  toneMap.set('P', {Bilaval:26, Kafi:26, Bhairavi:26, Kalyan:26, Khamaj:26, Asavari:26, Bhairav:26, Marva:26, Poorvi:26, Todi:26});
  toneMap.set('d', {Bilaval:28, Kafi:28, Bhairavi:28, Kalyan:28, Khamaj:28, Asavari:28, Bhairav:28, Marva:28, Poorvi:28, Todi:27});
  toneMap.set('D', {Bilaval:29, Kafi:29, Bhairavi:29, Kalyan:29, Khamaj:29, Asavari:29, Bhairav:29, Marva:29, Poorvi:29, Todi:29});
  toneMap.set('n', {Bilaval:32, Kafi:32, Bhairavi:32, Kalyan:32, Khamaj:32, Asavari:32, Bhairav:32, Marva:32, Poorvi:32, Todi:31});
  toneMap.set('N', {Bilaval:33, Kafi:33, Bhairavi:33, Kalyan:33, Khamaj:33, Asavari:33, Bhairav:33, Marva:33, Poorvi:33, Todi:33});

  toneMap.set('Ś', {Bilaval:35, Kafi:35, Bhairavi:35, Kalyan:35, Khamaj:35, Asavari:35, Bhairav:35, Marva:35, Poorvi:35, Todi:35});
  toneMap.set('ŕ', {Bilaval:36, Kafi:36, Bhairavi:36, Kalyan:36, Khamaj:36, Asavari:36, Bhairav:36, Marva:36, Poorvi:36, Todi:36});
  toneMap.set('Ŕ', {Bilaval:38, Kafi:38, Bhairavi:38, Kalyan:38, Khamaj:38, Asavari:38, Bhairav:38, Marva:38, Poorvi:38, Todi:38});
  toneMap.set('ǵ', {Bilaval:41, Kafi:41, Bhairavi:41, Kalyan:41, Khamaj:41, Asavari:41, Bhairav:41, Marva:41, Poorvi:41, Todi:40});
  toneMap.set('Ǵ', {Bilaval:42, Kafi:42, Bhairavi:42, Kalyan:42, Khamaj:42, Asavari:42, Bhairav:42, Marva:42, Poorvi:42, Todi:42});
  toneMap.set('ḿ', {Bilaval:44, Kafi:44, Bhairavi:44, Kalyan:44, Khamaj:44, Asavari:44, Bhairav:44, Marva:44, Poorvi:44, Todi:44});
  toneMap.set('Ḿ', {Bilaval:46, Kafi:46, Bhairavi:46, Kalyan:46, Khamaj:46, Asavari:46, Bhairav:46, Marva:46, Poorvi:46, Todi:46});

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
    xhr.open('GET', getAudioURL(ind), true);
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

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function playRaag(str, thaat){
  var tArr = str.split("");
  while(tArr.length > 0){
    var tone = tArr.splice(0, 1)[0];
    if(tone==" "){
      continue;
    }
    else if(tone==","){
      await sleep(1000);
    }
    else if(tone=="-"){
      await sleep(150);
    }
    else{
      playTone(tone, thaat);
      await sleep(500);
    }
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
