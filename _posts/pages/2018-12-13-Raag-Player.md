---
layout: default
title: Raag Player
permalink: /page/raag-player
tags: music world
category: page
excerpt_separator: <!--break-->
---

The basic information about 82 main raags
<!--break-->
<style>
y{
  cursor:pointer;    
}
</style>

| Names         | Are                              | Cool                            |
| ------------- |:--------------------------------:|:-------------------------------:|
| Shadja        | ***<y k="6">SA</y>***            |                                 |
| rishabha      | Komal ***<y k="7">ri</y>***      | Madhya ***<y k="8">ri</y>***    |
| Rishabha      | Suddha ***<y k="9">RI</y>***     | Tivra ***<y k="10">RI</y>***    |
| gandhara      | Ati-komal ***<y k="11">ga</y>*** | Komal ***<y k="12">ga</y>***    |
| Gandhara      | Suddha ***<y k="13">GA</y>***    | Tivra ***<y k="14">GA</y>***    |
| madhyama      | Suddha ***<y k="15">ma</y>***    | Ekasruti ***<y k="16">ma</y>*** |
| Madhyama      | Tivra ***<y k="17">MA</y>***     | Tivratara ***<y k="18">MA</y>***|
| Panchama      | ***<y k="19">PA</y>***           |                                 |
| dhaivata      | Ati-komal ***<y k="20">dha</y>***| Komal ***<y k="21">dha</y>***   |
| Dhaivata      | Suddha ***<y k="22">DHA</y>***   | Tivra ***<y k="23">DHA</y>***   |
| nishada       | Ati-komal ***<y k="24">ni</y>*** | Komal ***<y k="25">ni</y>***    |
| Nishada       | Suddha ***<y k="26">NI</y>***    | Tivra ***<y k="27">NI</y>***    |


<div>
</div>

<script>
var context = new window.AudioContext();
var source = null;
var audioBuffer = null;
function stopSound() {
    if (source) {
        source.stop(0);
    }
}
function playSound() {
    source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = false;
    source.connect(context.destination);
    source.start(); 
}
function initSound(arrayBuffer) {
    context.decodeAudioData(arrayBuffer, function(buffer) { 
        audioBuffer = buffer;
        playSound();
    }, function(e) {
        console.log('Error decoding file', e);
    });
}
function loadAudioFile(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
        initSound(this.response);
    };
    xhr.send();
}
function getAudioURL(k) {
  let arr = [
      'Shuddha DHA1',
      'Tivra DHA1',
      'Ati-Komal ni1',
      'Komal ni1',
      'Shuddha NI1',
      'Tivra NI1',
      'SA2',
      'Komal re2',
      'Madhya re2',
      'Suddha RE2',
      'Tivra RE2',
      'Ati-Komal ga2',
      'Komal ga2',
      'Suddha GA2',
      'Tivra GA2',
      'Suddha ma2',
      'Ekasruti ma2',
      'Tivra MA2',
      'Tivratara MA2',
      'PA2',
      'Ati-Komal dha2',
      'Komal dha2',
      'Shuddha DHA2',
      'Tivra DHA2',
      'Ati-Komal ni2',
      'Komal ni2',
      'Shuddha NI2',
      'Tivra NI2',
      'SA3',
      'Komal re3',
      'Madhya re3',
      'Suddha RE3',
      'Tivra RE3',
      'Ati-Komal ga3',
      'Komal ga3',
      'Suddha GA3',
      'Tivra GA3',
      'Suddha ma3',
      'Ekasruti ma3',
      'Tivra MA3',
      'Tivratara MA3',
      'PA3',
      'Ati-Komal dha3',
      'Komal dha3',
  ];
  let pre = '/assets/audio/raag/',
      post = '.mp3';

  return pre + arr[k] + post;
}
$('y').click(function(e){
    loadAudioFile(getAudioURL($(e.target).attr('k')));
})
</script>
