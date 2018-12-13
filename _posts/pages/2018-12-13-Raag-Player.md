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
        source.noteOff(0); //立即停止
    }
}
function playSound() {
    source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    source.connect(context.destination);
    source.noteOn(0); //立即播放
}
function initSound(arrayBuffer) {
    context.decodeAudioData(arrayBuffer, function(buffer) { //解码成功时的回调函数
        audioBuffer = buffer;
        playSound();
    }, function(e) { //解码出错时的回调函数
        console.log('Error decoding file', e);
    });
}
function loadAudioFile(url) {
    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) { //下载完成
        initSound(this.response);
    };
    xhr.send();
}
loadAudioFile('/assets/audio/raag/SA2.mp3');
</script>
