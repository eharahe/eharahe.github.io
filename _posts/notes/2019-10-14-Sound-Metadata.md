---
layout: default
title: Sound Metadata
permalink: /notes/sound-metadata
tags: sound-design 
category: sound-system-design
excerpt_separator: <!--break-->
---

音频的metadata记录了音乐、音效的元数据信息，包括厂牌、类别、制作发行时间、所属专辑、Description等等。由于历史原因，现存多套规范被不同的管理、播放工具使用。制作发行时应该尽量兼容这些规范以保证素材可被更多工具检索。
<!--break--> 

# 标准本身及兼容情况

| Name                   | Format | Specification         | Metadata apps                                                 | Editing apps                                                                                                      |
|------------------------|--------|-----------------------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| BWAV                   | Open   | Fixed                 | Basehead, BWF Metaedit, Soundly, Soundminer, Wave Agent       | Audition, Nuendo, Peak, Pro Tools, Pyramix, SaDiE, Sequoia, soundBlade, Sound Forge Pro, Wave Agent, WaveLab      |
| iXML                   | Open   | Fixed \+ extensible   | Basehead, BWF Metaedit, Soundly, Soundminer, Wave Agent       | Audition, Cubase \(extended tags\), Final Cut Pro, Nuendo \(extended tags\), Pro Tools \(standard tags\), WaveLab |
| XMP                    | Open   | Fixed \+ extensible   | Soundminer                                                    | Audition, Premiere Pro CC                                                                                         |
| Soundminer Metawrapper | Closed | Fixed \+ evolving     | Soundminer                                                    | Pro Tools                                                                                                         |
| ID3                    | Open   | Fixed                 | Basehead, iTunes, Soundminer, MP3TAG, TagScanner, many others | Audacity, WaveLab                                                                                                 |
| MP4                    | Open   | Fixed \+ optional XMP | iTunes, MP3TAG, Soundminer, TagScanner, many others           | WaveLab                                                                                                           |
| Vorbis                 | Open   | Fixed                 | foobar2000, MP3TAG, TagScanner                                |                                                                                                                   |
| LIST\-INFO             | Open   | Fixed                 | BWF Metaedit, Soundminer                                      | Audition, Audacity, Sound Forge, WaveLab                                                                          |

# Metadata格式解析

## Riff and fmt chunk

```
5249 4646  98f4 3a00  5741 5645  666d 7420  1000 0000  0100 0200  0077 0100  00ca 0800  0600         1800 
R I  F F   size       W A  V E   f m  t                pcm  chn   SR         Byte rate  Block Align  Bit Depth 
```

## BWAV chunk
bext扩展头，604个字节，一般塞入description和版权信息。
[The Broadcast WAV 标准](https://en.wikipedia.org/wiki/Broadcast_Wave_Format)

```
6265 7874  5c02 0000  5549 2053  4d41 4c4c  2048 4947  4820 5469  6e79 2061  6e64 2067  6c61 7373  7920 636c  6963 6b73  2e00
b e  x t   size 604   U I    S   M A  L L     H  I G   H    T i   n y    a   n d    g   l a  s s   y    c l   i c  k s   .

c2a9 2032  3031 3820 424f 4f4d 204c 6962 7261 7279 2041 6c6c 2052 6967 6874 7320 7777 772e 626f 6f6d 6c69 6272 6172 792e 636f 6d00
©      2   0 1  8    B O  OM     L  ib   ra   ry     A  ll     R  ig   ht   s    ww   w.   bo   om   li   br   ar   y.   co   m
```

## Data chunk

```
6461 7461  3246 3900  0000 
d a  t a   size       sample starts here！
```

## ID3v2 chunk
这个规范也是mp3格式最常使用的规范。素材description信息写入'COMM (Comment)' 标签
[ID3各版本Tag](http://web.mit.edu/jhawk/mnt/cgs/Image-ExifTool-6.99/html/TagNames/ID3.html)
```
4944 3320  0070 0000  4944 3303  00        00    0001 5f76  
I D  3     size       ID3  v2.3  Revision  flag  tag size   

5443 4f50 0000 001c 0000 0032 3031 3820 424f 4f4d 204c 6962 7261 7279 2d4d 6f64 6572 6e20 5549 
TCOP      size 28   flag ␀2018 BOOM Library-Modern UI

544f 414c 0000 0014 0000 0077 7777 2e62 6f6f 6d6c 6962 7261 7279 2e63 6f6d 
TOAL      size 20   flag ␀www.boomlibrary.com 

544f 5259 0000 0005 0000 0032 3031 38 
TORY      size  5   flag ␀2018

54 5045 3200 0000 0a00 0000 4d6f 6465 726e 2055 49
TPE2      size 10   flag ␀Modern UI 

54 5945 5200 0000 0500 0000 3230 3138 
TYER      size  5   flag ␀2018

544f 574e 0000 000a 0000 004d 6f64 6572 6e20 5549
TOWN      size 10   flag ␀Modern UI 

434f 4d4d 0000 002a 0000 0000 0000 0055 4920 534d 414c 4c20 4849 4748 2054 696e 7920 616e 6420 676c 6173 7379 2063 6c69 636b 732e
COMM      size 42   flag ␀␀␀UI SMALL HIGH Tiny and glassy clicks. 

5452 434b 0000 0002 0000 0030 
TRCK                     ␀0

5449 5432 0000 0021 0000 004d 5549 2053 454c 4543 5420 4449 4749 5441 4c20 4265 6570 2054 696e 792e 7761 76
TIT2                     ␀MUI SELECT DIGITAL Beep Tiny.wav 

54 5045 3100 0000 0d00 0000 424f 4f4d 204c 6962 7261 7279
TPE1                     ␀BOOM Library 

5449 5433 0000 0043 0000 0041 6c6c 2073 6f75 6e64 2065 6666 6563 7473 2061 7265 2063 6f70 7972 6967 6874 2042 4f4f 4d20 4c69 6272
6172 7920 2d20 616c 6c20 7269 6768 7473 2072 6573 6572 7665 64
TIT3                     ␀All sound effects are copyright BOOM Library - all rights reserved 

41 5049 4300 0067 9000 0000 696d 6167 652f 6a70 6567 ...
APIC      size 26512     ␀image/jpeg 

54 434f 4e00 0000 0f00 0000 5573 6572 2049 6e74 6572 6661 6365 
TCON      size 15        ␀User Interface
```

## SMED Chunk（Soundminer Metawrapper）
这个是Soundminer自己的数据库格式

```
534d 4544 a429 0100   0001 299e e3fd 75fc ...
SMED      size 76196  data of SMED ...
```

## LIST-INFO Chunk
1991年的老规范

```
4c49 5354 ec00 0000 494e 464f 4947 4e52 1000 0000 5573 6572 2049 6e74 6572 6661 6365 0000 4941 5254 0e00 0000 424f 4f4d 204c 6962
7261 7279 0000
LIST      size 236  INFO      IGNR                User Interface                          IART                BOOM Library 

4943 4d54 2600 0000 5549 2053 4d41 4c4c 2048 4947 4820 5469 6e79 2061 6e64 2067 6c61 7373 7920 636c 6963 6b73 2e00 
ICMT                UI SMALL HIGH Tiny and glassy clicks. 

4943 4f50 3200 0000 3230 3138 2042 4f4f 4d20 4c69 6272 6172 7920 284d 6f64 6572 6e20 5549 2920 7777 772e 626f 6f6d 6c69 6272 6172
792e 636f 6d00 
ICOP                2018 BOOM Library (Modern UI) www.boomlibrary.com 

494e 414d 2200 0000 4d55 4920 5345 4c45 4354 2044 4947 4954 414c 2042 6565 7020 5469 6e79 2e77 6176 0000 
INAM                MUI SELECT DIGITAL Beep Tiny.wav 

4953 4654 0c00 0000 536f 756e 646d 696e 6572 0000 
ISFT                Soundminer 

4943 5244 0c00 0000 3230 3138 2d30 372d 3035 0000
ICRD                2018-07-05 
```

## iXML Chunk
[iXML metadata forma](https://en.wikipedia.org/wiki/IXML)

```xml
<?xml version="1.0" encoding="utf-8"?>
<BWFXML>
  <IXML_VERSION>1.61</IXML_VERSION>
  <STEINBERG>
    <ATTR_LIST>
      <ATTR>
        <NAME>MediaLibrary</NAME>
        <TYPE>string</TYPE>
        <VALUE>Modern UI</VALUE>
      </ATTR>
      <ATTR>
        <NAME>MediaCategoryPost</NAME>
        <TYPE>string</TYPE>
        <VALUE>User Interface</VALUE>
      </ATTR>
      <ATTR>
        <NAME>MediaLibraryManufacturerName</NAME>
        <TYPE>string</TYPE>
        <VALUE>BOOM Library</VALUE>
      </ATTR>
      <ATTR>
        <NAME>MediaArtist</NAME>
        <TYPE>string</TYPE>
        <VALUE>BOOM Library</VALUE>
      </ATTR>
      <ATTR>
        <NAME>MediaComment</NAME>
        <TYPE>string</TYPE>
        <VALUE>UI SMALL HIGH Tiny and glassy clicks.</VALUE>
      </ATTR>
      <ATTR>
        <NAME>MusicalCategory</NAME>
        <TYPE>string</TYPE>
        <VALUE>User Interface</VALUE>
      </ATTR>
      <ATTR>
        <NAME>SmfSongName</NAME>
        <TYPE>string</TYPE>
        <VALUE>MUI SELECT DIGITAL Beep Tiny.wav</VALUE>
      </ATTR>
    </ATTR_LIST>
  </STEINBERG>
</BWFXML>
```

## \_PMX (XMP) Chunk
[Extensible Metadata Platform](https://en.wikipedia.org/wiki/Extensible_Metadata_Platform)

```xml
<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="XMP Core 5.5.0">
   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
      <rdf:Description rdf:about=""
            xmlns:xmp="http://ns.adobe.com/xap/1.0/"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:xmpDM="http://ns.adobe.com/xmp/1.0/DynamicMedia/">
         <xmp:CreatorTool>Soundminer v4</xmp:CreatorTool>
         <xmp:MetadataDate>2018-07-17T15:06:01+02:00</xmp:MetadataDate>
         <xmp:ModifyDate>2018-07-17T15:06:01+02:00</xmp:ModifyDate>
         <xmp:rating>0.000000</xmp:rating>
         <dc:description>
            <rdf:Alt>
               <rdf:li xml:lang="x-default">UI SMALL HIGH Tiny and glassy clicks.</rdf:li>
               <rdf:li xml:lang="en-US">UI SMALL HIGH Tiny and glassy clicks.</rdf:li>
            </rdf:Alt>
         </dc:description>
         <dc:publisher>
            <rdf:Bag>
               <rdf:li/>
            </rdf:Bag>
         </dc:publisher>
         <dc:title>
            <rdf:Alt>
               <rdf:li xml:lang="x-default">MUI SELECT DIGITAL Beep Tiny.wav</rdf:li>
               <rdf:li xml:lang="en-US">MUI SELECT DIGITAL Beep Tiny.wav</rdf:li>
            </rdf:Alt>
         </dc:title>
         <xmpDM:comment/>
         <xmpDM:album/>
         <xmpDM:artist>BOOM Library</xmpDM:artist>
         <xmpDM:composer/>
         <xmpDM:genre>User Interface</xmpDM:genre>
         <xmpDM:instrument/>
         <xmpDM:key/>
      </rdf:Description>
   </rdf:RDF>
</x:xmpmeta>
```

# Metadata App Comparison Chart

| Product Name                       | Price              | Mac OS          | Windows                                                | Demo     | Copy Protection           | Embed                 | Batch Meta | Search Style | \# of DBs | Playlists | Text DB Import | Text DB Export | Number of Fields                            | Custom Fields | BEXT Read | BEXT Write | ID3 Read | ID3 Write | iXML Read | iXML Write | Multi\-chnl?| Adv Search | Transfer to DAW    | In\-App Editing or Processing | Max Sampling Rate        | Sample Rate Conversion | ReWire     | Plug\-in Support |
|------------------------------------|--------------------|-----------------|--------------------------------------------------------|----------|---------------------------|-----------------------|------------|--------------|-----------|-----------|----------------|----------------|---------------------------------------------|---------------|-----------|------------|----------|-----------|-----------|------------|-------------|------------|--------------------|-------------------------------|--------------------------|------------------------|------------|------------------|
| Soundminer Standard                | $599\.00           | 10\.7\-10\.12   |                                                        | 30 days  | iLok, HASP                | √                     |            | DB           | ∞         | √         | √              | √              | 64\*                                        |               | √         | √          | √        | √         | √         | √          | √           | √          | DnD, Bin, Timeline |                               | 192 / 24                 | √                      | 2\-channel |                  |
| Soundminer vPro                    | $899\.00           | 10\.7\-10\.12   |                                                        | 30 days  | iLok, HASP                | √                     | √          | DB           | ∞         | √         | √              | √              | 64\*                                        |               | √         | √          | √        | √         | √         | √          | √           | √          | DnD, Bin, Timeline | √                             | 192 / 24                 | √                      | 6\-channel | VST              |
| Soundminer HD Basic                | $199\.00           | 10\.5\+         | XP, Vista, 7, 10                                       | 30 days  | iLok, HASP                | Category, Description |            | DB           | 2         | √         | √              | √              | Selection from 64                           |               | √         | √          | √        | √         | √         | √          | √           |            | Bin, DnD           |                               | 48 / 24                  | √                      |            |                  |
| Soundminer HD Plus                 | $399\.00           | 10\.5\+         | XP, Vista, 7, 10                                       | 30 days  | iLok, HASP                | √                     |            | DB           | ∞         | √         | √              | √              | Selection from 64                           |               | √         | √          | √        | √         | √         | √          | √           |            | DnD, Bin, Timeline |                               | 192 / 24, 48 / 24 export | √                      |            |                  |
| Basehead 4\.x                      | $249\.00           | 10\.9 \- 10\.12 | XP\*, Vista\*, 7, 8                                    | √        | USB, CMStick, iLok, Drive | 1                     |            | DB           | ∞         | √         |                |                | Varies by Type                              |               | √         | √          | √        | √         | √         | √          | √           | √          | DnD                |                               | 192 / 32, 48 / 24 export | √                      |            |                  |
| Basehead 4\.x Lite                 | $399\.00           | 10\.9 \- 10\.12 | XP\*, Vista\*, 7, 8                                    | √        | USB, CMStick, iLok, Drive | 1                     |            | DB           | ∞         | √         |                |                | Varies by Type                              |               | √         | √          | √        | √         | √         | √          | √           | √          | DnD, Bin, Timeline |                               | 192 / 32, 48 / 24 export | √                      |            | VST              |
| Basehead 4\.x Ultra                | $549\.00           | 10\.9 \- 10\.12 | XP\*, Vista\*, 7, 8                                    | √        | USB, CMStick, iLok, Drive | √                     | √          | DB           | ∞         | √         |                |                | Varies by Type                              |               | √         | √          |          | √         | √         | √          | √           | √          | DnD, Bin, Timeline | √                             | 192 / 32                 | √                      | 6\-channel | VST              |
| Soundly                            | Free, $14\.95\+    | 10\.6\.8\+      | XP\+                                                   |          | Login                     | √                     | √          | DB           | 1         | √         | √              | √              | 2                                           |               | √         | √          | √        |           | √         | √          | √           | √          | DnD, Timeline      |                               | 192 / 32                 | √                      | 2\-channel |                  |
| Resonic Pro                        | €69\.00            |                 | 7, 8, 10                                               | √        | Serial Number             |                       |            | DB           | √         | √         |                |                |                                             |               | √         |            | √        |           | √         |            | √           |            | DnD                | √                             | 192 / 32                 | √                      |            |                  |
| Library Monkey                     | $129\.00           | 10\.4\+         |                                                        | √        | Serial Number             |                       | √          | DB           | ∞         | √         | √              | √              | Varies by Type                              | 30            | √         |            | √        | √         |           |            | √           | √          | Bin                |                               | 192 / 32                 | √                      |            |                  |
| Library Monkey Pro                 | $449\.00           | 10\.4\+         |                                                        | √        | Serial Number             |                       | √          | DB           | ∞         | √         | √              | √              | Varies by Type                              | 30            | √         |            | √        | √         |           |            | √           | √          | Bin, Timeline      | √                             | 192 / 32                 | √                      |            | AU, VST          |
| AudioFinder                        | $69\.95            | 10\.4\+         |                                                        | √        | Serial Number             |                       |            | DB           | 1         | √         | √              |                | ?                                           | 20            | ?         |            | √        |           |           |            | ?           | √          | Timeline           | √                             | ?                        | √                      |            | ?                |
| iTunes                             | Free               | 10\.9\+         | 7\+                                                    |          |                           | √                     | √          | DB           | 1         | √         | √              | √              | Varies by Type                              |               |           |            | √        | √         |           |            |             | √          | DnD                |                               | 192 / 24                 | √                      |            |                  |
| Metadigger                         | Free               | ?               | ?                                                      |          |                           |                       |            | DB           | Multiple  | √         | √              | √              | 1 \(No embedding\)                          |               | √         |            | √        |           |           |            |             |            |                    |                               | 96 / 24                  |                        |            |                  |
| Aural Probe                        | Free               |                 | Vista, 7, 8                                            |          |                           |                       |            | DB           | 1         | √         |                |                |                                             |               |           |            |          |           |           |            |             |            | DnD                |                               | ?                        |                        |            |                  |
| Sample Librarian                   | €30\.00            |                 | XP, Vista, 7                                           | 30 days  | Serial Number             |                       |            | DB           | 1         | √         |                | √              | 2 \(No embedding\)                          |               |           |            |          |           |           |            | √           | √          | DnD                |                               | 48 / 32                  |                        |            |                  |
| SampleSort                         | Free               |                 | Vista, 7, 8, 10                                        |          |                           |                       |            | DB           | 1         |           |                | √              | \(No embedding\)                            |               |           |            |          |           |           |            | √           | √          | DnD                |                               | 192 / 32                 |                        |            |                  |
| MetadataTouch Standard Edition     | $40\.00            |                 | Server 2003 SP2, Server 2008, XP SP3, Vista SP1, 7\-10 | 14 days  | Serial Number             | √                     |            | Single File  |           |           |                |                | Varies by Type                              |               | √         | √          | √        | √         | √         | √          |             |            |                    |                               |                          |                        |            |                  |
| MetadataTouch Professional Edition | $60\.00            |                 | Server 2003 SP2, Server 2008, XP SP3, Vista SP1, 7\-10 | 14 days  | Serial Number             | √                     |            | Single File  |           |           |                |                | Varies by Type                              |               | √         | √          | √        | √         | √         | √          |             |            |                    |                               |                          |                        |            |                  |
| Remetacator                        | Free               | 10\.3\+         |                                                        |          | Serial Number             | √                     | √          | Single File  |           |           |                |                | 31                                          |               | √         | √          |          |           | √         | √          |             |            |                    |                               | 192 / 24                 |                        |            |                  |
| TwistedWave                        | $79\.90            | 10\.6\+         |                                                        | 30 days  | Serial Number             | √                     |            | Single File  |           |           |                |                | 30                                          |               | √         | √          | √        | √         |           |            | √           |            |                    | √                             | 192 / 32                 | √                      |            | AU, VST          |
| Wave Agent                         | Free               | 10\.4\+         | XP, Vista, 7                                           |          |                           | √                     |            | Single File  |           |           |                | √              | 7                                           |               | √         | √          |          |           | √         | √          | √           |            |                    |                               | 96 / 24                  | √                      |            |                  |
| BWF\-Widget                        | $49\.95 \- $99\.00 |                 | 2000, XP, 9                                            |          | Serial Number             | √                     | √          | Single File  |           |           | √              | √              |                                             |               | √         | √          |          |           | √         | √          |             |            |                    |                               |                          |                        |            |                  |
| BWF MetaEdit                       | Free               | 10\.6\-10\.9    | XP, Vista, 7, 8                                        |          |                           | √                     |            | Single File  |           |           |                | √              | Varies by Type                              |               | √         | √          |          |           | √         | √          |             |            |                    |                               | 96 / 24                  |                        |            |                  |
| Commenteer                         | $13\.99            | 10\.6\.8\+      |                                                        |          | Mac App Store             | √                     | √          | Single File  |           |           | √              | √              | 1                                           |               |           |            |          |           |           |            |             |            |                    |                               |                          |                        |            |                  |
| Snapper                            | $79\.00            | 10\.9\.5\+      |                                                        | 100 days | Serial Number             |                       |            | Single File  |           |           |                |                |                                             |               | √         |            | √        |           |           |            | √           |            | DnD, Timeline      |                               | 192                      | √                      |            |                  |
| NOTES                              |                    |                 | \* = extra software required                           |          |                           |                       |            |              |           |           |                |                | \* = total fields, only some are modifiable |               |           |            |          |           |           |            |             |            |                    |                               | • = max tested           |                        |            |                  |

max-width: 1100px;
    overflow-x: scroll;
    display: block;
    font-size: 8px;
## References

[Sound FX Metadata Tech Specs: Demystified](https://www.creativefieldrecording.com/2016/08/25/sound-fx-metadata-tech-specs-demystified/)

[Soundminer Metadata 101](https://www.creativefieldrecording.com/2016/08/30/soundminer-metadata-101/)

[An Introduction to Sound FX Metadata Apps 2 – Comparing Apps](https://www.creativefieldrecording.com/2014/06/17/an-introduction-to-sound-fx-metadata-apps-2-comparing-apps/)

[The Quick-Start Guide to Adding Sound FX Library Metadata](https://www.creativefieldrecording.com/2016/08/18/the-quick-start-guide-to-adding-sound-fx-library-metadata/)
