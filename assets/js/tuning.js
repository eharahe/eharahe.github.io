function init(){
    let centsText = $("#cents"),
        ratioText = $("#ratio"),
        denominatorText =  $("#denominator"),
        btn = $("#calc");

    let rst1 = $("#rst_1"),
        rst2 = $("#rst_2"),
        rst3 = $("#rst_3"),
        rst4 = $("#rst_4");

    centsText.change(function(e){
        let accVal = +centsText.val();
        ratioText.val(centsToRatio(accVal).toFixed(5));
    })
    
    ratioText.change(function(e){
        let accVal = +ratioText.val();
        centsText.val(ratioToCents(accVal).toFixed(3));
    })

    btn.click(function(e){
        if(+centsText.val()){
            let rstArr = getFraction(+centsText.val(), false, +denominatorText.val());
            for(let i=0; i<4; i++){
                $("#rst_"+(1+i)).html(rstArr[i]);
            }
        }
        else if(+ratioText.val()){
            let rstArr = getFraction(+ratioText.val(), true, +denominatorText.val());
            for(let i=0; i<4; i++){
                $("#rst_"+(1+i)).html(rstArr[i]);
            }
        }
        else{
            for(let i=0; i<4; i++){
                $("#rst_"+(1+i)).html("");
            }
        }
    })
}

function centsToRatio(cents){
    return Math.pow(2, cents/1200);
}

function ratioToCents(ratio){
    return Math.log2(ratio)*1200;
}

function printFraction(o, ratio){
    if(o.numerator > 0)
        return ("<b>"+o.numerator + "/" + o.denominator + "</b>&nbsp;&nbsp;with error: " + (ratioToCents(o.numerator/o.denominator)-ratioToCents(ratio)).toFixed(3) + " cents");
    return ""
}

function isFractionSimplified(a, b){

    if(a%b == 0){
        return false;
    }

    let c = a,
        d = b;
    let r = c%d;

    while(r!=0){
        c = d;
        d = r;
        r = c%d;
    }
    return d>1;
}

function copyObj(t, s){
    t.denominator = s.denominator;
    t.numerator = s.numerator;
    t.error = s.error;
}

function getFraction(value, isRatio, limit){

    let max = 100;
    if(limit && limit >=5){
        max = limit;
    }

    let ratio = value;
    if(!isRatio){
        ratio = centsToRatio(ratio);
    }

    let best = {denominator:'-', numerator:'-', error:1};
    let secondBest = {denominator:'-', numerator:'-', error:1};
    let third = {denominator:'-', numerator:'-', error:1};
    let fourth = {denominator:'-', numerator:'-', error:1};

    for(let i=1; i<max; i++){

        for(let j=1; j<5*i; j++){

            if(isFractionSimplified(i, j))
                continue;

            let nRatio = j/i;
            let err = nRatio - ratio;

            if(Math.abs(err) < Math.abs(best.error)){
                best.denominator = i;
                best.numerator = j;
                best.error = err; 
                if(err==0){
                    secondBest.error = 0;
                    third.error = 0;
                    fourth.error = 0;
                }
                else{
                    copyObj(fourth, third);
                    copyObj(third, secondBest);
                    copyObj(secondBest, best);
                }
            }
            else if(Math.abs(err) < Math.abs(secondBest.error)){
                copyObj(fourth, third);
                copyObj(third, secondBest);
                secondBest.denominator = i;
                secondBest.numerator = j;
                secondBest.error = err; 
            }
            else if(Math.abs(err) < Math.abs(third.error)){
                copyObj(fourth, third);
                third.denominator = i;
                third.numerator = j;
                third.error = err; 
            }
            else if(Math.abs(err) < Math.abs(fourth.error)){
                fourth.denominator = i;
                fourth.numerator = j;
                fourth.error = err; 
            }
        }
    }

    let rtnArr = [];
    rtnArr.push(printFraction(best, ratio));
    rtnArr.push(printFraction(secondBest, ratio));
    rtnArr.push(printFraction(third, ratio));
    rtnArr.push(printFraction(fourth, ratio));
    canvasUpdate(ratio,best);
    initPlayerBtns(ratio);
    return rtnArr;
}

function canvasUpdate(ratio, bestMatch){
    let canvas = $("#graph"),
        canW = canvas.width(),
        canH = canvas.height();

    canvas.attr("width", canW);
    canvas.attr("height", canH);

    var graphW = canW * 10/11,
        graphX = canW * 1/22,
        graphY = canH / 2,
        _2ndHarmonicPos = graphW/5.5;

    var ctx=canvas[0].getContext("2d");
    ctx.strokeStyle="#000000";
    ctx.lineWidth = 6;
    ctx.moveTo(graphX-1, graphY);
    ctx.lineTo(graphX+graphW+1, graphY);
    ctx.stroke();

    //draw lower one
    var currNext = 0;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = "purple";
    ctx.font = '14px "微软雅黑"';
    ctx.textBaseline = "bottom";
    ctx.textAlign = "left";
    ctx.fillText( 'Tone A', graphX-5, graphY-45 );
    ctx.font = '12px "微软雅黑"';
    ctx.textAlign = "center";
    for(var i=1; i < 100 && currNext < graphX + graphW; i++){
        var currX = graphX + Math.log2(i)*_2ndHarmonicPos;
        ctx.strokeStyle="#FF0000";
        ctx.moveTo(currX, graphY-3);
        ctx.lineTo(currX, graphY-15);
        ctx.stroke();
        if(i==1 || i%5 == 0){       
            ctx.fillText( i, currX, graphY-20 );
        }
        currNext = graphX + Math.log2(i+1)*_2ndHarmonicPos;
    }

    //draw the other half
    currNext = 0;
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.font = '14px "微软雅黑"';
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText( 'Tone B', graphX-5, graphY+45 );
    ctx.font = '12px "微软雅黑"';
    ctx.textAlign = "center";
    for(var i=1; i < 100 && currNext < graphX + graphW; i++){
        var currX = graphX + Math.log2(i*ratio)*_2ndHarmonicPos;
        ctx.strokeStyle="#038bff";
        ctx.moveTo(currX, graphY+3);
        ctx.lineTo(currX, graphY+15);
        ctx.stroke();
        if(i==1 || i%5 == 0){
            ctx.fillText( i, currX, graphY+20 );
        }
        currNext = graphX + Math.log2((i+1)*ratio)*_2ndHarmonicPos;
    }

    // draw best match square
    var bestX1 = graphX + Math.log2(bestMatch.numerator)*_2ndHarmonicPos,
        bestX2 = graphX + Math.log2(bestMatch.denominator*ratio)*_2ndHarmonicPos,
        sW = 10,
        sH = 45
    
    if(bestX1 > bestX2){
        bestX1 += sW;
        bestX2 -= sW;
    }
    else{
        bestX2 += sW;
        bestX1 -= sW;
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "green";
    ctx.moveTo(bestX1, graphY-sH);
    ctx.lineTo(bestX1, graphY+sH);
    ctx.lineTo(bestX2, graphY+sH);
    ctx.lineTo(bestX2, graphY-sH);
    ctx.lineTo(bestX1, graphY-sH);
    ctx.stroke();
}

function initPlayerBtns(ratio){
    let toneA = 432,
        toneB = toneA * ratio;

    let btnA = $("#play_a"),
        btnB = $("#play_b"),
        btnAll = $("#play_both");

        btnA.removeAttr("disabled");
        btnB.removeAttr("disabled");
        btnAll.removeAttr("disabled");

        btnA.unbind();
        btnB.unbind();
        btnAll.unbind();
        btnA.click(function(e){
            tonePlayer.playA(toneA);
        })
        btnB.click(function(e){
            tonePlayer.playB(toneA*ratio);
        })
        btnAll.click(function(e){
            tonePlayer.playA(toneA);
            tonePlayer.playB(toneA*ratio);
        })
}

let tonePlayer = {
    audioCtx : null
}
tonePlayer.init = function(){
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    let biquadFilter = this.audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.value = 4500;
    biquadFilter.gain.value = 1;
    biquadFilter.connect(this.audioCtx.destination);

    this.oscA = this.audioCtx.createOscillator();
    this.gainA = this.audioCtx.createGain();
    this.oscA.type = 'sawtooth';
    this.oscA.connect(this.gainA);
    this.gainA.connect(biquadFilter);
    this.oscA.start();
    this.gainA.gain.value = 0;

    this.oscB = this.audioCtx.createOscillator();
    this.gainB = this.audioCtx.createGain();
    this.oscB.type = 'square';
    this.oscB.connect(this.gainB);
    this.gainB.connect(biquadFilter);
    this.oscB.start();
    this.gainB.gain.value = 0;

    this.adsr = this.initAdsrCurve(.03, .4, -10, 3, 100, -10);
}
tonePlayer.initAdsrCurve = function(a, d, sustainInDb, r, points, maxVolumeInDb){
    let total = a + d + r,
        step = total / (points - 1),
        arr = new Float32Array(points);

    arr[0] = 0;

    for(let i=1; i<arr.length; i++){
        let accStep = step*i;
        if(accStep <= a){
            let prop = accStep / a,
                start = -128,
                end = maxVolumeInDb;
            arr[i] = this.dbToGain(start + (end - start) * prop);
        }
        else if(accStep <= a+d){
            let prop = 1 - (accStep-a)/d,
                start = sustainInDb,
                end = maxVolumeInDb;
            arr[i] = this.dbToGain(start + (end - start) * prop);
        }
        else{
            let prop = 1 - (accStep-a-d)/r;
            start = -128,
            end = sustainInDb;
            arr[i] = this.dbToGain(start + (end - start) * prop);
        }
    }
    console.log(arr)
    return arr;
}
tonePlayer.dbToGain = function(db){
    return Math.pow(10, (db / 20));
}
tonePlayer.playA = function(freq){
    let now = this.audioCtx.currentTime;
    this.audioCtx.resume()
    this.oscA.frequency.value = freq;
    this.gainA.gain.cancelScheduledValues(now)
    // this.gainA.gain.linearRampToValueAtTime( 0.3, now + 0.3);
    // this.gainA.gain.exponentialRampToValueAtTime( 0.0001, now + 2);
    this.gainA.gain.setValueCurveAtTime(this.adsr, now, 2);
}
tonePlayer.playB = function(freq){
    let now = this.audioCtx.currentTime;
    this.audioCtx.resume()
    this.oscB.frequency.value = freq;
    this.gainB.gain.cancelScheduledValues(now)
    // this.gainA.gain.linearRampToValueAtTime( 0.3, now + 0.3);
    // this.gainA.gain.exponentialRampToValueAtTime( 0.0001, now + 2);
    this.gainB.gain.setValueCurveAtTime(this.adsr, now, 2);
}
window.onload = function() {
    tonePlayer.init();
}


init();
// getFraction(500,false);