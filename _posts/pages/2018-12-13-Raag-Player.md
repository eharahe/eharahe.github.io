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

| Names         | Are                | Cool              |
| ------------- |:------------------:|:-----------------:|
| Shadja        | ***<y key="SA2">SA</y>***           |                   |
| rishabha      | Komal ***ri***     | Madhya ***ri***   |
| Rishabha      | Suddha ***RI***    | Tivra ***RI***    |
| gandhara      | Ati-komal ***ga*** | Komal ***ga***    |
| Gandhara      | Suddha ***GA***    | Tivra ***GA***    |
| madhyama      | Suddha ***ma***    | Ekasruti ***ma*** |
| Madhyama      | Tivra ***MA***     | Tivratara ***MA***|
| Panchama      | ***PA***           |                   |
| dhaivata      | Ati-komal ***dha***| Komal ***dha***   |
| Dhaivata      | Suddha ***DHA***   | Tivra ***DHA***   |
| nishada       | Ati-komal ***ni*** | Komal ***ni***    |
| Nishada       | Suddha ***NI***    | Tivra ***NI***    |

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

$('y').click(function(e){
    console.log(e)
})

loadAudioFile('/assets/audio/raag/SA2.mp3');
loadAudioFile('/assets/audio/raag/PA2.mp3');
</script>
