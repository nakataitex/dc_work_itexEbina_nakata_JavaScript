//ページが読み込まれた時に鍵盤を1オクターブ分設置するスクリプト
window.onload = function () {
    for (let i = 0; i < 7; i++) {
        $(".piano").append(`<div class='key'><button>${scale[i]}</button></div>`);
    };
}

//ピアノに盛り込む機能の定数･変数
const piano_status = $(".sound_view span");//音階を文字として表示する際に使う
let scaleHideCount = null;//表示された音階を非表示にするタイマー
//基本的な箇所の定数宣言
var actx = new AudioContext();// WebAudioAPIコンテキスト
var oscillator = null;
const scaleHz = [261, 293, 329, 349, 392, 440, 493];//C4から1オクターブ分の周波数
const scale = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"];//表示用の音階

//鍵盤を押した時の挙動
$(".piano").on("mousedown", ".key", function () {
    let i = $(".key").index(this);
    oscillator = actx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(scaleHz[i], actx.currentTime);//押されたキーによって音を変える様に
    oscillator.connect(actx.destination);
    oscillator.start();
    piano_status.text(scale[i]);
    clearTimeout(scaleHideCount);//音階を表示中に"文字非表示"が割り込まない様に
});

//マウスが離された時の挙動
$(document).on("mouseup", function () {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
        //音が消えてから1秒後非表示に変更
        scaleHideCount = setTimeout(function () {
            piano_status.text("");
        }, 1000);
    }
});

