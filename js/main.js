//鍵盤を1オクターブ分設置するスクリプト
function keySet() {
    for (let i = 0; i < 7; i++) {
        $('.piano').append(`<div class='key'><button>${scale[i]}</button></div>`);
    };
};

//ページが読み込まれたときに実行
window.onload = function () {
    keySet();
}

//簡易ピアノ用の基本的な部分の定数宣言
var actx = new AudioContext();// WebAudioAPIコンテキスト
let oscillator = null; //オシレータ
const scaleHz = [261.626, 293.665, 329.628, 349.228, 392.000, 440.000, 493.883];//C4から1オクターブ分の周波数
const scale = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"];//表示用の音階
const piano_status = $(".sound_view span");//音階を文字として表示する際に使う
let scaleHideCount = null;//表示された音階を非表示にするタイマー

//鍵盤を押した時の挙動
$(".piano").on("mousedown", ".key", function () {
    let i = $(".key").index(this);//キーの場所を
    oscillator = actx.createOscillator();//オシレーター作成
    oscillator.type = "sine";//波の種類
    oscillator.frequency.setValueAtTime(scaleHz[i], actx.currentTime);//押されたキーによって音を変える様に
    oscillator.connect(actx.destination);//出力先に接続
    oscillator.start();//開始
    piano_status.text(scale[i]);//音を文字として表示
    clearTimeout(scaleHideCount);//音階を表示中に"文字非表示"が割り込まない様に
});

//マウスが離された時の挙動
$(document).on("mouseup", function () {
    // オシレーターを停止する
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
        //音が消えてから1秒後非表示に変更
        scaleHideCount = setTimeout(function () {
            piano_status.text("");
        }, 1000);
    }
});