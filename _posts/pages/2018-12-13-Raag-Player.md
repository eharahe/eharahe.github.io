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
    source.start(); //立即播放
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
loadAudioFile('/assets/audio/raag/SA2.mp3');
loadAudioFile('/assets/audio/raag/PA2.mp3');
</script>