const actx = new AudioContext();// WebAudioAPIコンテキスト
let oscillator = null; //オシレーターのnull指定

// 定数宣言
const scaleHz = [261.626, 293.665, 329.628, 349.228, 392.000, 440.000, 493.883];//音階
const scale = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ"];//表示用の音階
const piano_status = $(".sound_view span");//音階を文字として表示する際に使う
const key = $(".key");//キー管理用
let scaleHideCount = null;//表示された音階を非表示にするタイマー



/* 
//音階を挿入(追加機能に鍵盤を追加する機能を実装する場合に使えそう)
for (let i = 0; i < key.length; i++) {
    $(key[i]).text(scale[i % scale.length]);
}
 */

//鍵盤を押した時の挙動
$(".key").on("mousedown", function () {
    let i = $(".key").index(this);//キーの場所を
    oscillator = actx.createOscillator();//オシレーター作成
    oscillator.type = "sine";//波の種類
    oscillator.frequency.setValueAtTime(scaleHz[i], actx.currentTime);//押されたキーによって音を変える様に
    oscillator.connect(actx.destination);//出力先に接続
    oscillator.start();//開始
    piano_status.text(scale[i]);//音を文字として表示
    clearTimeout(scaleHideCount);//音階を表示中に"なし"が割り込んで表示されない様に
});

//マウスが離された時の挙動
$(document).on("mouseup", function () {
    // オシレーターを停止する
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
        //音が消えてから1秒後に「ステータス:なし」と表示されるように変更
        scaleHideCount = setTimeout(function () {
            piano_status.text("なし");
        }, 1000);
    }
});